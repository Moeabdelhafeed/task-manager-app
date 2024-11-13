<template>
  <div class="container p-5 m-auto w-75 border my-5 rounded-3 shadow" style="max-width:600px">
    <h2 class="mb-4">Task manager</h2>
    <form @submit.prevent="authenticate('register', formData)">
        <div class="mb-3">
            <label class="form-label">name</label>
            <input v-model="formData.name" type="text" class="form-control " >
        </div>
        <p v-if="errors.name" class="text-danger">{{ errors.name[0] }}</p>
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

        <div class="mb-3">
            <label class="form-label">Confirm password</label>
            <input  v-model="formData.password_confirmation" type="password" class="form-control" >
        </div>
        <button type="submit" class="btn btn-primary" >Register</button>
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