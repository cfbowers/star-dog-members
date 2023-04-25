<script setup lang="ts">
import HeaderContent from "../components/HeaderContent.vue";
import FooterContent from "../components/FooterContent.vue";
import BaseLayout from "../layouts/BaseLayout.vue";
</script>

<template>
  <BaseLayout>
    <template #header>
      <HeaderContent />
    </template>
    <div class="flex flex-col mx-auto min-h-full max-w-3xl px-4 lg:px-4">
      <slot></slot>
    </div>
    <template #footer>
      <FooterContent />
    </template>
  </BaseLayout>
</template>
