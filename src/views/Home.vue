<script setup lang="ts">
import HeaderContent from "../components/HeaderContent.vue";
import FooterContent from "../components/FooterContent.vue";
import BaseLayout from "../layouts/BaseLayout.vue";
import Dogs from "../components/Dogs.vue";
</script>

<template>
  <BaseLayout>
    <template #header>
      <HeaderContent />
    </template>

    <div class="flex min-h-full flex-col w-full">
      <div class="mx-auto w-full grow lg:flex xl:px-2">
        <Dogs />
      </div>
    </div>

    <template #footer>
      <FooterContent />
    </template>
  </BaseLayout>
</template>
