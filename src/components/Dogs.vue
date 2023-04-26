<script setup>
import { ref, watch } from "vue";
import { PlusIcon } from "@heroicons/vue/24/solid";
import { uuidv4 } from "@firebase/util";

import DogCard from "./DogCard.vue";
import Modal from "./Modal.vue";
import ImageUpload from "./ImageUpload.vue";
import { useCurrentOwner } from "../composables/useCurrentOwner";
import { useMemoize } from "@vueuse/core";
import {
  getDogsByHouseholdId,
  upsertDogByUid,
  upsertHouseholdByUid,
} from "../firebase";

const owner = useCurrentOwner();

const open = ref(false);
const householdDogs = ref([]);
const modalDog = ref(null);

const newDog = {
  id: uuidv4(),
  dateOfBirth: "",
  name: "",
  imageUrl: "",
  imageStorageName: "",
  householdId: "",
};

const getDogs = () => {
  getDogsByHouseholdId(owner.value.householdId).then((result) => {
    if (!result.empty) {
      householdDogs.value = result.docs;
    }
  });
};

const onOpenDogModal = (dog) => {
  const dogValue = dog?.data?.() ?? dog.value ?? dog;
  modalDog.value = dogValue;
  open.value = true;
};

const onSaveDog = useMemoize(async (dog) => {
  const dogId = dog.id;
  const ownerDogs = owner?.value?.dogs ?? [];

  await upsertDogByUid(dogId, dog);

  if (
    !ownerDogs.length ||
    !ownerDogs.some((ownerDog) => ownerDog.id === dog.id)
  ) {
    await upsertHouseholdByUid(owner.value.householdId, {
      dogs: [...ownerDogs, dogId],
    });
  }

  getDogs();
  open.value = !open;
});

watch(owner, () => {
  const householdId = owner.value?.householdId;

  if (householdId) {
    newDog.householdId = householdId;
    getDogs();
  }
});
</script>

<template>
  <!-- `${initialDog ? "Edit" : "Add New"} Dog 🐕` -->
  <Modal :open="open" @change-open="open = !open" @get-dogs="getDogs">
    <div class="mt-3 text-center sm:mt-5">
      <div class="mt-8">
        <form
          class="flex flex-col space-y-4"
          @submit.prevent="onSaveDog(modalDog)"
        >
          <ImageUpload
            :on-new-image-storage-name="(v) => (modalDog.imageStorageName = v)"
            :on-new-image-url="(v) => (modalDog.imageUrl = v)"
            :on-upload-status-change="(v) => (isUploadingImage = v)"
            :image-storage-name="modalDog.imageStorageName"
            storage-path="dog-images"
          />
          <label for="name">
            Name
            <input id="name" v-model="modalDog.name" />
          </label>
          <label for="date-of-birth">
            Date of birth
            <input
              id="date-of-birth"
              type="date"
              min="2003-01-01"
              class="border-none text-base"
              v-model="modalDog.dateOfBirth"
            />
          </label>

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
      <DogCard :dog="dog.data()" @edit-dog="onOpenDogModal(dog)" />
    </li>
  </ul>
</template>
