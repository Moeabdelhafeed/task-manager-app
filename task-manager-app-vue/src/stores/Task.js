import router from '@/router';
import {defineStore} from 'pinia'

export const useTaskStore = defineStore('taskStore', {
    state(){
        return {
            lists: [],
            errors: [],
            showedit:false,
        }
    },
    actions: {
        async getLists(){
            const response = await fetch('/api/tasklist', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            } )

            const data = await response.json();

            console.log(data)

            if (response.ok){
                this.lists = data.taskLists;
            }
        },
        async addList(formData){
            const response = await fetch('/api/tasklist', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(formData)
            } )

            const data = await response.json();

            if (response.ok){
                this.lists.unshift(data.taskList);
            }else{
                this.errors = data.errors;
            }

        },
        async updateList(formData, id){
            const response = await fetch(`/api/tasklist/${id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData)
            } )

            const data = await response.json();

            if (response.ok){
                const list = this.lists.find(list => list.id === id)
                Object.assign(list, formData);
            }else{
                this.errors = data.errors;
            }

        },

        async deleteList(id){
            const response = await fetch(`/api/tasklist/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            } )


            const data = await response.json();

            if (response.ok){
                this.lists = this.lists.filter(list => list.id !== id);
            }else{
                this.errors = data.errors;
            }
        },

        moveList(findex, sindex){
            let c = this.lists[findex];
            this.lists[findex] = this.lists[sindex]
            this.lists[sindex] = c;
        },
        async updateItem(item, formData){
            const response = await fetch(`api/tasklist/${item.task_list_id}/taskitem/${item.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData)
            } )

            const data = await response.json();

            if (response.ok){
                const list = this.lists.find(l => l.id === item.task_list_id);
                list.task_items = list.task_items.filter(i => i.id !== item.id);
                
                const newlist = this.lists.find(l => l.id === data.taskItem.task_list_id)

                newlist.task_items.push(data.taskItem);

                
            }else{
                console.log(data.errors)
                this.errors = data.errors;
            }
        },
        async addItem(formData, listparam){
            const response = await fetch(`api/tasklist/${listparam.id}/taskitem`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData)
            } )

            const data = await response.json();

            if (response.ok){
                const list = this.lists.find(list => list.id === listparam.id);
                console.log(data.taskItem)
                list.task_items.push(data.taskItem)
                console.log(this.lists)
    
            } else{
                this.errors = data.errors;
            }
        },
        async deleteTask(task){
            const response = await fetch(`api/tasklist/${task.task_list_id}/taskitem/${task.id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            } )

            const data = await response.json();

            if (response.ok){
                const list = this.lists.find(list => list.id === task.task_list_id);
                list.task_items = list.task_items.filter(i => i.id!== task.id)
            } else{
                this.errors = data.errors;
            }
        }
    }
})