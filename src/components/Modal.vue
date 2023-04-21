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
                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100"
                >
                  <CheckIcon
                    class="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-base font-semibold leading-6 text-gray-900"
                    >Add New Dog</DialogTitle
                  >
                  <div class="mt-2">
                    <form @submit.prevent="onSubmit" class="flex flex-col">
                      <img :src="newDog.imageUrl" />

                      <button
                        class="text-black"
                        type="button"
                        @click="ofd({ accept: 'image/*', multiple: false })"
                      >
                        Add Dog
                      </button>

                      <label for="age">
                        Age
                        <input id="age" v-model.number="newDog.age" />
                      </label>

                      <label for="ageType">
                        Age type
                        <select id="ageType" v-model="newDog.ageType">
                          <option v-for="ageType in AgeType">
                            {{ ageType }}
                          </option>
                        </select>
                      </label>
                      <label for="name">
                        Name
                        <input id="name" v-model="newDog.name" />
                      </label>
                    </form>
                  </div>
                </div>
              </div>
              <div
                class="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:col-start-2"
                  @click="onSubmit"
                >
                  Save Dog
                </button>
                <button
                  type="button"
                  class="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0"
                  @click="emit('changeOpen')"
                  ref="cancelButtonRef"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup lang="ts">
import { CheckIcon } from "@heroicons/vue/24/outline";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { ref } from "vue";
import { IDog, AgeType } from "../types";

import { useFileDialog } from "@vueuse/core";
import { ref as storageRef } from "firebase/storage";
import { useFirebaseStorage, useStorageFile, useCurrentUser } from "vuefire";

defineProps<{ open: boolean }>();

const emit = defineEmits(["changeOpen"]);

const newDog = ref<IDog>({
  age: 0,
  name: "",
  ageType: AgeType.years,
  imageUrl: "",
});
const user = useCurrentUser();

const { files, open: ofd } = useFileDialog();
const storage = useFirebaseStorage();
const dogImageRef = storageRef(
  storage,
  `images/${newDog.value.name}.${files.value?.item(0)?.name.split(".").pop()}`
);

const onSubmit = () => {
  console.log(dogImageRef);
  emit("changeOpen");
};
</script>
