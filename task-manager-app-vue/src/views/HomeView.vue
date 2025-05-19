<script setup>
import TaskList from "@/components/TaskList.vue"
import { onMounted, ref } from "vue";

const showAlert = ref(true);
onMounted(() => {
  setTimeout(() => {
    showAlert.value = false;
  }, 5000); // Hide the alert after 5 seconds
});
</script>

<template>
  <div v-if="showAlert" class="w-75 d-flex justify-content-center mx-auto text-center ">
    <p class="text-info alert alert-info mt-3">use drag and drop to move tasks and to make them completed, to delete task hold CTRL and click on the task or drop it to the trash</p>

  </div>
  <TaskList />

  

</template>
