<template>
    <div class="container d-flex justify-content-center flex-wrap  ">
        <div v-for="i in 10" :key="i" class=" m-3 pt-2 list text-center justify-content-center rounded-3 p-3" >
            <p class="rounded-3 m-auto my-3 fake-pill text-center rounded-pill" style="height:20px; width:50px"></p>
            <p class="border-bottom"></p>
            <div v-for="i in 5" :key="i"  class="rounded-3 my-3 fake-pill"></div>
            <p class="border-bottom"></p>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.list{
    background-color:#ffffff10;
    height:500px;
    width: 300px;
}

.fake-pill{
    width: 100%;
    height: 40px;
    background-color:#ffffff3b ;
    opacity: .7;
    animation: skeleton-loading 0.5s linear infinite alternate;
}

@keyframes skeleton-loading {
  0% {
    background-color: hsla(199, 20%, 70%, 0.644);
  }

  100% {
    background-color: hsla(204, 20%, 95%, 0.541);
  }
}





</style>