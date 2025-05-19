import router from '@/router';
import {defineStore} from 'pinia'
import { useTaskStore } from './task';

export const useAuthStore = defineStore('authStore', {
    state(){
        return {
            user: null,
            errors: {},
        }
    },
    actions: {
        async authenticate(apiRole, formData ){
            const res = await fetch(`/api/${apiRole}`, {
                method: 'POST',
                body: JSON.stringify(formData),
            })

            const data = await res.json();

            if (res.ok && !data.errors) {
                this.user = data.user;
                localStorage.setItem('token', data.token);
                this.errors = {};
                this.router.push({name: 'home'})
            }else{
                this.errors = data.errors;
            }
        },
        async logout(){
            const res = await fetch('/api/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            })
            
            if(res.ok){
                this.user = null;
                const taskStore = useTaskStore()
                taskStore.lists = [];
                taskStore.errors = [];
                localStorage.removeItem('token');
                this.router.push({name: 'login'})
            }
        },
        async getUser(){
            if(localStorage.getItem('token')){
                const res = await fetch('api/user', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                })
                const data = await res.json();

                if(res.ok){
                    this.user = data;

                }else{
                    this.user = null;
                }
            } 
        }
    }
})