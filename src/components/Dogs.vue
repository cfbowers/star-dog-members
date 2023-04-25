<script setup>
import { ref, watch } from "vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { uuidv4 } from "@firebase/util";

import DogCard from "./DogCard.vue";
import Modal from "./Modal.vue";
import ImageUpload from "./ImageUpload.vue";
import { useUserHousehold } from "../composables/useUserHousehold";
import { AgeType } from "../types";
import {
  getDogsByHouseholdId,
  upsertDogByUid,
  upsertHouseholdByUid,
} from "../firebase";

const household = useUserHousehold();

const open = ref(false);
const householdDogs = ref([]);
const modalDog = ref(null);

const newDog = {
  uid: uuidv4(),
  age: 0,
  name: "",
  ageType: AgeType.years,
  imageUrl: "",
  imageStorageName: "",
  householdId: "",
};

watch(household, () => {
  if (household.value.householdId) getDogs();
});

const getDogs = () => {
  getDogsByHouseholdId(household.value.householdId).then((result) => {
    if (!result.empty) {
      householdDogs.value = result.docs;
    }
  });
};

const onOpenDogModal = (dog) => {
  modalDog.value = dog;
  open.value = true;
};

const onSaveDog = async () => {
  const dogData = dog.value;
  const dogId = dogData.uid;

  await upsertDogByUid(dogId, dogData);
  await upsertHouseholdByUid(household.value.householdId, {
    dogs: [...household.value.data.dogs, dogId],
  });

  getDogs();
  open.value = !open;
};
</script>

<template>
  <!-- `${initialDog ? "Edit" : "Add New"} Dog 🐕` -->
  <Modal :open="open" @change-open="open = !open" @get-dogs="getDogs">
    <div class="mt-3 text-center sm:mt-5">
      <div class="mt-8">
        <form class="flex flex-col space-y-4" @submit.prevent="onSaveDog">
          <ImageUpload
            :on-new-image-storage-name="(v) => (modalDog.imageStorageName = v)"
            :on-new-image-url="(v) => (modalDog.imageUrl = v)"
            storage-path="dog-images"
          />
          <label for="name">
            Name
            <input id="name" v-model="modalDog.name" />
          </label>

          <div class="flex space-x-2">
            <label for="age" class="flex-1">
              Age
              <input id="age" v-model.number="modalDog.age" />
            </label>
            <label for="ageType">
              <p>&nbsp;</p>
              <select id="ageType" v-model="modalDog.ageType" class="my-auto">
                <option v-for="ageType in AgeType">
                  {{ ageType }}
                </option>
              </select>
            </label>
          </div>
          <div
            class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
          >
            <button
              type="button"
              class="btn-secondary w-full"
              @click="open = false"
            >
              Cancel
            </button>
            <button type="submit" class="btn-primary">Save Dog</button>
          </div>
        </form>
      </div>
    </div>
  </Modal>

  <div class="flex items-center justify-between my-4">
    <h3 class="text-xl font-semibold leading-6 text-gray-900">Doggos 🐾</h3>
    <button
      @click="onOpenDogModal(newDog)"
      class="btn-secondary flex bg-transparent"
    >
      <PlusIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
      Add Dog
    </button>
  </div>

  <ul class="flex flex-wrap mx-auto justify-center">
    <li v-for="dog in householdDogs" class="mr-4 mt-4">
      <DogCard :dog="dog.data()" @edit-dog="(dog) => onOpenDogModal(dog)" />
    </li>
  </ul>
</template>
