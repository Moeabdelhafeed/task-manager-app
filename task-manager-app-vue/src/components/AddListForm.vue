<template>
  <div>
    <form @submit.prevent="taskStore.addList(formData)" class="my-3 w-50">
        <div class=" input-group ">
            <input  placeholder="Name" v-model="formData.name" type="text" class="form-control bg-transparent" >
            <button class="btn btn-outline-primary" >Add List</button>
        </div>
        <p v-if="errors.name" class="mt-3 text-danger">{{ errors.name[0] }}</p>
    </form>
</div>
</template>

<script setup>
import {useTaskStore} from "@/stores/task.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";

const formData = ref({
    name: '',
})

const taskStore = useTaskStore();

const {errors} = storeToRefs(taskStore);
</script>

<style>

</style>