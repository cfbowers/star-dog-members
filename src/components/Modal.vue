<script setup lang="ts">
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ref, watch } from "vue";
import { uuidv4 } from "@firebase/util";

import ImageUpload from "./ImageUpload.vue";
import { IDog, AgeType } from "../types";
import { upsertDogByUid, upsertHouseholdByUid } from "../firebase";
import { useUserHousehold } from "../composables/useUserHousehold";

const { initialDog } = defineProps<{ open: boolean; initialDog?: IDog }>();
const emit = defineEmits(["changeOpen", "getDogs"]);

const dog = ref<IDog>(
  initialDog ?? {
    uid: uuidv4(),
    age: 0,
    name: "",
    ageType: AgeType.years,
    imageUrl: "",
    imageStorageName: "",
    householdId: "",
  }
);

const household = useUserHousehold();

watch(household, () => {
  dog.value.householdId = household.value.householdId;
});

const onNewImageStorageName = (firebaseStorageName: string) => {
  dog.value.imageStorageName = firebaseStorageName;
};

const onNewImageUrl = (url: string) => {
  dog.value.imageUrl = url;
};

const onSubmit = async () => {
  const dogData = dog.value;
  const dogId = dogData.uid;

  await upsertDogByUid(dogId, dogData);
  await upsertHouseholdByUid(household.value.householdId, {
    dogs: [...household.value.data.dogs, dogId],
  });

  emit("changeOpen");
  emit("getDogs");
};
</script>

<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="emit('changeOpen')">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
            >
              <div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-2xl font-semibold leading-6 text-gray-900 space-y-2"
                    >{{
                      `${initialDog ? "Edit" : "Add New"} Dog 🐕`
                    }}</DialogTitle
                  >
                  <div class="mt-8">
                    <form
                      class="flex flex-col space-y-4"
                      @submit.prevent="onSubmit"
                    >
                      <ImageUpload
                        :on-new-image-storage-name="onNewImageStorageName"
                        :on-new-image-url="onNewImageUrl"
                        storage-path="dog-images"
                      />
                      <label for="name">
                        Name
                        <input id="name" v-model="dog.name" />
                      </label>

                      <div class="flex space-x-2">
                        <label for="age" class="flex-1">
                          Age
                          <input id="age" v-model.number="dog.age" />
                        </label>
                        <label for="ageType">
                          <p>&nbsp;</p>
                          <select
                            id="ageType"
                            v-model="dog.ageType"
                            class="my-auto"
                          >
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
                          @click="emit('changeOpen')"
                          ref="cancelButtonRef"
                        >
                          Cancel
                        </button>
                        <button type="submit" class="btn-primary">
                          Save Dog
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
