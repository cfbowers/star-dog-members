<script setup>
import Modal from "./Modal.vue";
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <Modal :open="open" @change-open="open = !open" />
  <div class="w-full h-full">
    <button @click="open = true" class="btn-secondary">Add Dog</button>
  </div>
</template>
