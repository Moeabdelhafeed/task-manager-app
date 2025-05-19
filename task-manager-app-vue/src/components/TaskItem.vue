<template>
    <div>
    <div  v-if="!showEdit" class=" bg-primary my-3 rounded-3 shadow" :class="{'bg-success': props.item.is_completed}">
        
        <p @dblclick="showEdit = !showEdit" v-if="!showEdit" class="py-2 px-2 ">{{ props.item.name }}</p>
    </div>

    <form v-if="showEdit" @submit.prevent="updateItem(props.item, formDataEdit); showEdit = !showEdit" class="py-2 w-100 " >
            <div class="input-group">
                <input type="text" v-model="formDataEdit.name" class="  form-control text-center">
                <button class="btn btn-outline-warning" >Edit</button>
            </div>
        </form>
    
    </div>
    
</template>

<script setup>
import { useTaskStore } from '@/stores/task';
import { ref } from 'vue';


const props = defineProps({
    item: {
        type: Object,
        required: true
    },
})

const showEdit = ref(false);

const formDataEdit = ref({
    task_list_id: props.item.task_list_id,
    name: props.item.name
});


const { updateItem } = useTaskStore();

</script>

<style>

</style>