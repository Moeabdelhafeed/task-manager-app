<template>
    <div ref="listScroll" class="bg-primary p-2 m-5 overflow-y-auto" style="height:400px;">
   <div v-if="isLoading" class="text-center justify-content-center h-100 d-flex align-items-center">
    data is loading
   </div>
   <div v-else-if="users.length > 0">

   <div  v-for="user in users" :key="user.id">
    <p> {{ user.firstName }}</p>
   </div>
   <p v-if="dummyStore.isLoading" class="text-dark">the data is still loading...</p>
   </div>
   <div  v-else class=" text-center justify-content-center h-100 d-flex align-items-center">
    there is no data
   </div>
</div>
</template>

<script setup>
import { useDummyStore } from '@/stores/Dummy.js';
import { useInfiniteScroll } from '@vueuse/core';
import { computed, onMounted, ref } from 'vue';

const listScroll = ref(null);
const isLoading = ref(true);

const dummyStore = useDummyStore();

onMounted( async ()=>{
    await dummyStore.getDummy(15, 0);
    isLoading.value = false;
})

const users = computed(() => dummyStore.users)

useInfiniteScroll(listScroll, async () => {
    if(isLoading.value == false){
        await dummyStore.getDummyOnScroll();

    }
}, {distance: 10} )



</script>

<style>

</style>