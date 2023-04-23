<script setup>
import { ref, watch } from "vue";
import { PlusIcon } from "@heroicons/vue/24/solid";

import Modal from "./Modal.vue";
import DogCard from "./DogCard.vue";
import { getDogsByHouseholdId } from "../firebase";
import { useUserHousehold } from "../composables/useUserHousehold";

const open = ref(false);
const householdDogs = ref([]);

const household = useUserHousehold();

const getDogs = () => {
  getDogsByHouseholdId(household.value.householdId).then((result) => {
    if (!result.empty) {
      householdDogs.value = result.docs;
    }
  });
};

watch(household, () => {
  if (household.value.householdId) getDogs();
});
</script>

<template>
  <Modal :open="open" @change-open="open = !open" @get-dogs="getDogs" />
  <div class="p-4 sm:px-6 w-max max-w-3xl min-w-[400px] mx-auto">
    <div
      class="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap"
    >
      <div class="ml-4 mt-2">
        <h3 class="text-xl font-semibold leading-6 text-gray-900">Doggos 🐾</h3>
      </div>
      <div class="ml-4 mt-2 flex-shrink-0">
        <button @click="open = true" class="btn-secondary flex bg-transparent">
          <PlusIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          Add Dog
        </button>
      </div>
    </div>

    <ul class="mt-8 flex flex-wrap space-x-4">
      <li v-for="dog in householdDogs">
        <DogCard :dog="dog.data()" />
      </li>
    </ul>
  </div>
</template>
