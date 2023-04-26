<script setup lang="ts">
import { PencilIcon, CheckCircleIcon } from "@heroicons/vue/24/solid";
import { differenceInMonths } from "date-fns";

import { IDog } from "../types";

const { dog } = defineProps<{ dog: IDog }>();
defineEmits(["editDog"]);

const getDogAge = (dateOfBirth: string) => {
  const diffInMonths = differenceInMonths(new Date(), new Date(dateOfBirth));
  const numAgeYears = Math.floor(diffInMonths / 12);
  const numAgeMonths = diffInMonths % 12;
  const yearsString = numAgeYears > 0 ? numAgeYears + " years " : "";
  const monthsString = numAgeMonths > 0 ? numAgeMonths + " months" : "";
  return `${yearsString}${monthsString} old`;
};
</script>

<template>
  <div
    class="w-56 bg-white shadow-md border border-1 border-slate-200 rounded-md"
  >
    <div class="flex flex-1 flex-col px-3 py-6 place-items-center">
      <div class="h-40 w-40 flex-shrink-0 rounded-full overflow-hidden">
        <img class="m-auto" :src="dog.imageUrl" alt="" />
      </div>
      <h3 class="mt-6 font-medium text-gray-900">{{ dog.name }}</h3>
      <dl class="mt-1 flex flex-grow flex-col justify-between">
        <dt class="sr-only">Title</dt>
        <dd class="text-sm text-gray-500">
          {{ getDogAge(dog.dateOfBirth) }}
        </dd>
      </dl>
    </div>
    <div class="flex">
      <div class="flex w-0 flex-1 border-t border-slate-200">
        <span
          @click="$emit('editDog', dog)"
          class="relative hover:bg-slate-100 inline-flex w-0 flex-1 items-center justify-center gap-x-2 py-4 text-sm border-r border-slate-200"
        >
          <PencilIcon class="h-4 w-4 text-gray-400" aria-hidden="true" />
          Edit
        </span>
        <span
          @click=""
          class="relative hover:bg-slate-100 inline-flex w-0 flex-1 items-center justify-center gap-x-2 py-4 text-sm"
        >
          <CheckCircleIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          Check In
        </span>
      </div>
    </div>
  </div>
</template>
