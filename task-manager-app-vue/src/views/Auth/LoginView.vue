<template>
<div class="container p-5 m-auto w-75 border my-5 rounded-3 shadow" style="max-width:600px">
    <h2 class="mb-4">Task manager</h2>
    <form @submit.prevent="authenticate('login', formData)">
        <div class="mb-3">
            <label class="form-label">Email address</label>
            <input v-model="formData.email" type="email" class="form-control " >
        </div>
        <p v-if="errors.email" class="text-danger">{{ errors.email[0] }}</p>
        <div class="mb-3">
            <label class="form-label">Password</label>
            <input  v-model="formData.password" type="password" class="form-control" >
        </div>
        <p v-if="errors.password" class="text-danger">{{ errors.password[0] }}</p>

        <button type="submit" class="btn btn-primary " >Login</button>
    </form>
</div>
</template>

<script setup>
import { ref } from "vue";
import {useAuthStore} from "@/stores/auth.js"
import { storeToRefs } from "pinia";

const {errors} = storeToRefs(useAuthStore());
const {authenticate} = useAuthStore();

let formData = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
});
</script>