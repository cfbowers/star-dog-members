<template>
  <BaseLayout>
    <template #header>
      <HeaderContent />
    </template>

    <div class="flex min-h-full flex-col w-full">
      <div class="mx-auto w-full grow lg:flex xl:px-2">
        <div class="flex-1 xl:flex">
          <Dogs />
        </div>
        <div class="shrink-0 px-4 py-6 sm:px-6 lg:w-96 lg:pr-8 xl:pr-6">
          <div class="px-4 py-6 sm:px-6 lg:pl-8 xl:w-64 xl:shrink-0 xl:pl-6">
            <h1>Visits</h1>
          </div>

          <div class="px-4 py-6 sm:px-6 lg:pl-8 xl:flex-1 xl:pl-6">
            <h1>Credits</h1>
          </div>
        </div>
      </div>
    </div>

    <template #footer>
      <FooterContent />
    </template>
  </BaseLayout>
</template>

<script setup lang="ts">
import HeaderContent from "../components/HeaderContent.vue";
import FooterContent from "../components/FooterContent.vue";
import BaseLayout from "../layouts/BaseLayout.vue";
import Dogs from "../components/Dogs.vue";
</script>
