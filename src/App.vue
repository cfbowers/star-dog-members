<template>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import { useFirebaseAuth } from "vuefire";
import { upsertOwnerByUid, queryHouseholdByOwnerUid } from "./firebase";
import { upsertHouseholdByUid } from "./firebase";
import { IUser } from "./types";

const auth = useFirebaseAuth();
const router = useRouter();
const route = useRoute();

const createOwnerHousehold = async (user: IUser) => {
  const { uid } = user;
  const isOwnerWithoutHousehold = (await queryHouseholdByOwnerUid(uid)).empty;

  if (isOwnerWithoutHousehold) {
    upsertHouseholdByUid(uid, {
      owners: [uid],
      dogs: [],
    });

    upsertOwnerByUid(uid, {
      householdId: uid,
    });
  }
};

auth?.onAuthStateChanged(async (user) => {
  if (!user && route.fullPath !== "/login") {
    router.push("/login");
  } else if (user) {
    const { uid, householdId } = user as IUser;

    if (!householdId) {
      createOwnerHousehold(user as IUser);
    }

    upsertOwnerByUid(uid, {
      lastLogin: new Date(),
    });
  }
});
</script>
