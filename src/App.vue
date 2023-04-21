<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";
import { upsertOwnerByUid, queryHouseholdByOwnerUid } from "./firebase";
import { upsertHouseholdByUid } from "./firebase";

const auth = useFirebaseAuth();
const router = useRouter();
const route = useRoute();

async function createOwnerHousehold(uid: string) {
  const isOwnerWithoutHousehold = (await queryHouseholdByOwnerUid(uid)).empty;

  if (isOwnerWithoutHousehold) {
    upsertHouseholdByUid(uid, {
      owners: [uid],
    });
  }
}

auth?.onAuthStateChanged((user) => {
  if (!user && route.fullPath !== "/login") {
    router.push("/login");
  } else if (user) {
    const { uid } = user;
    createOwnerHousehold(uid);
    upsertOwnerByUid(uid, {
      lastLogin: new Date(),
      uid,
    });
  }
});
</script>
