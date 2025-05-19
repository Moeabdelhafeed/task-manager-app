<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {useAuthStore} from "@/stores/auth.js"
import AddListForm from "@/components/AddListForm.vue"
import { ref } from 'vue';

const showform = ref(false);


const authStore = useAuthStore();
</script>

<template>
<nav class="navbar bg-body-tertiary">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">task manager</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul v-if="authStore.user" class="navbar-nav">
        <li class="nav-item">
          <RouterLink :to="{name: 'home'}" class="nav-link" exact-active-class="active">Home</RouterLink>
        </li>
        <li class="nav-item">
          <form @submit.prevent="authStore.logout()">
            <button class="nav-link">Log Out</button>
          </form>
        </li>

        <li class="nav-item">
          <button class="nav-link" :class="{active: showform}" @click="showform = !showform">Add List</button>
        </li>
        <transition>
        <AddListForm v-if="showform"/>
      </transition>
      </ul>

      <ul v-else class="navbar-nav">
        <li class="nav-item">
          <RouterLink :to="{name: 'login'}" class="nav-link" exact-active-class="active">login</RouterLink>
        </li>

        <li class="nav-item">
          <RouterLink :to="{name: 'register'}" class="nav-link" exact-active-class="active">register</RouterLink>
        </li>
      </ul>
    </div>
  </div>
</nav>

  <RouterView />
</template>
