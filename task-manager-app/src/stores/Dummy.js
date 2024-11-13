import router from '@/router';
import {defineStore} from 'pinia'
import axios from 'axios'

export const useDummyStore = defineStore('dummyStore', {
    state(){
        return {
            users: [],
            errors: [],
            isLoading: false,
            isFinished: false,
        }
    },
    actions: {
       async getDummy(limit, skip){
        try{

            const response = await axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
            this.users.push(...response.data.users);
            if(response.data.users.length == 0){
                this.isLoading = false;
                this.isFinished = true;
            }



        }
        catch(error){
            this.errors = error.response.data.errors;
            console.error(error);
            
        }
    },
    async getDummyOnScroll(){
        if(!this.isFinished){
            this.isLoading = true;
            this.getDummy(15, this.users.length);
        }
    }
    }
})