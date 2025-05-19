<template>
    <div>
   <div    class=" list overflow-y-scroll  m-3 border shadow rounded-3 p-3">
    <form @submit.prevent="updateList(formDataEdit, props.list.id);showedit = !showedit">
        <div v-if="showedit" class="input-group">
        <input type="text" v-model="formDataEdit.name" class="form-control text-center">
         <button class="btn btn-outline-warning" >Edit</button>
        </div>
    </form>
        <div class="dropdown text-center border-bottom pb-1" v-if="!showedit">
            <button class="btn  dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {{ list.name }}
            </button>
            <ul class="dropdown-menu">
                <span  @click="taskStore.deleteList(list.id)" class="dropdown-item"> <i  class="bi bi-trash-fill"></i> delete</span>
                <span @click="showedit = !showedit" class="dropdown-item">  <i   class="bi bi-pencil-fill "></i> edit</span>
                <span @click="showaddform = !showaddform" class="dropdown-item">  <i   class="bi bi-plus-circle-fill "></i> add</span>
             
            </ul>
        </div>
        
        <div @drop="onDrop($event, 0,list.id)" class="h-auto" style="min-height:40%" >
            <form v-if="showaddform" @submit.prevent="addItem(formDataAdd, props.list);showaddform = !showaddform;formDataAdd.name = ''" class="mt-2">
                <div  class="input-group">
                <input type="text" v-model="formDataAdd.name" class="form-control text-center">
                <button class="btn btn-outline-primary"  >add</button>
                </div>
            </form>

            <TaskItem @dragenter.prevent @dragover.prevent @click.ctrl="deleteTask(item)"  @dragstart.stop="startDrag($event, item)" draggable="true" v-for="item in notcompleted" :key="item.id" :item="item" />
        </div>
        
        <div  @drop="onDrop($event, 1, list.id)" class="border-top h-auto" style="min-height:40%">
            <TaskItem @dragenter.prevent @dragover.prevent @click.ctrl="deleteTask(item)"  @dragstart.stop="startDrag($event, item)" draggable="true" v-for="item in completed" :key="item.id" :item="item" />
        </div>

       
    </div>
<!-- Changed from start-0 end-0 to fixed bottom-end corner -->
<div
  class="position-fixed alert alert-danger start-0 mx-auto bottom-0 end-0 m-4 d-flex justify-content-center align-items-center"
  style="width: 50px; height: 50px; border-radius: 50%;"
  @drop.prevent="handleDeleteDrop"
  @dragover.prevent
>
  <i class="bi bi-trash-fill fs-3"></i>
</div>

</div>


    

</template>

<script setup>
import { computed, defineProps, reactive, ref, toRef, watch } from 'vue'
import TaskItem from './TaskItem.vue';
import { useTaskStore } from '@/stores/task';

const handleDeleteDrop = (event) => {
  const itemData = event.dataTransfer.getData('item')
  if (itemData) {
    const item = JSON.parse(itemData);
    deleteTask(item);
  }
}


const taskStore = useTaskStore()

const { updateList, addItem, deleteTask } = taskStore
const props = defineProps({
    list: {
        type: Object,
        required: true
    },
})

const formDataEdit = ref({
    name: props.list.name,
})

const formDataAdd = ref({
    name: "",
})



const completed = computed(() => props.list.task_items.filter(item => item.is_completed))
const notcompleted = computed(() => props.list.task_items.filter(item => !item.is_completed))


const showedit = ref(false)

const showaddform = ref(false)


const startDrag = (event, item) => {
    
    event.dataTransfer.effectAllowed ='move';
    event.dataTransfer.setData('item', JSON.stringify(item));
    
}

const onDrop = (event, value, list) => {
    if(event.dataTransfer.getData('item')){
        const item = JSON.parse(event.dataTransfer.getData('item'));
        let formData = {
            task_list_id: list,
            is_completed: value,
        }
        taskStore.updateItem(item,formData);
        event.preventDefault();
    }
}

</script>

<style scoped>
.text-wrap {
  overflow-wrap: break-word;
}
.list{
    height:500px;
    min-width:300px;
    width: auto;
    max-width: 450px;

}
</style>