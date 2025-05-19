<script setup>

import { storeToRefs } from "pinia";
import { computed, onMounted, ref } from "vue";
import TaskListItem from "@/components/TaskListItem.vue"
import { useTaskStore } from "@/stores/task";
import FakeDataLoading from "./FakeDataLoading.vue";
import gsap from "gsap";

const taskStore = useTaskStore();

const isLoading = ref(true)


onMounted(async () => {
    await taskStore.getLists();
    isLoading.value = false; 
});

const lists = computed(() => taskStore.lists)

const startDrag = (event, findex) => {
    
    event.dataTransfer.effectAllowed ='move';
    event.dataTransfer.setData('flist_index', findex);
}

const onDrop = (event, sindex) => {
    const findex = parseInt(event.dataTransfer.getData('flist_index'));
    if (!isNaN(findex)) {
        taskStore.moveList(findex, sindex);
    }
    event.preventDefault(); 
};


const beforeEnter = (el) => {
    gsap.set(el, {
        y:100,
        opacity:0
    })
};

const enter = (el, done) => {
    gsap.to(el, {
        y:0,
        opacity: 1,
        duration: 0.5,
        delay: el.dataset.index * 0.2,
        onComplete: done
    })
};

const leave = (el, done) => {
    console.log('Leave animation triggered for:', el);
    gsap.to(el, {
        y:0,
        opacity:0,
        onComplete: done
    })
}

const beforeLeave = (el) => {
    gsap.set(el, {
        y:100,
        opacity:0
    })
}

</script>

<template>
    <div v-if="isLoading">
    <FakeDataLoading />
   </div>
  <div v-else-if="lists.length > 0"  class="container d-flex justify-content-center flex-wrap ">
    <transition-group
        appear
        @beforeEnter="beforeEnter"
        @enter="enter"
        @beforeLeave="beforeLeave"
        @leave="leave"
    >
       <TaskListItem @dragenter.prevent @dragover.prevent @drop="onDrop($event, lists.indexOf(list))" @dragstart="startDrag($event, lists.indexOf(list))" draggable="true" :list="list" v-for="(list, index) in lists" :key="index" :data-index="index" />
    </transition-group>
   </div>
   
   <div v-else class="text-center p-5 m-5">
    <p style="font-size:20px">
        there is no data
        </p>
   </div>
   
</template>









