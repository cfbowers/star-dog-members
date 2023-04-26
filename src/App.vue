<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";
import { upsertOwnerByUid, queryHouseholdByOwnerUid } from "./firebase";
import { upsertHouseholdByUid } from "./firebase";
import { IOwner } from "./types";

const auth = useFirebaseAuth();
const router = useRouter();
const route = useRoute();

const createOwnerHousehold = async (user: IOwner) => {
  const { uid } = user;
  const isOwnerWithoutHousehold = (await queryHouseholdByOwnerUid(uid)).empty;

  if (isOwnerWithoutHousehold) {
    upsertHouseholdByUid(uid, {
      owners: [uid],
      dogs: [],
      id: uid,
    });
  }
};

auth?.onAuthStateChanged(async (user) => {
  if (!user && route.fullPath !== "/login") {
    router.push("/login");
  } else if (user) {
    const { uid, householdId } = user as IOwner;
    const ownerUpdates: any = {
      uid,
      lastLogin: new Date().toISOString(),
    };

    if (!householdId) {
      createOwnerHousehold(user as IOwner);
      ownerUpdates.householdId = uid;
    }

    upsertOwnerByUid(uid, ownerUpdates);
  }
});
</script>
