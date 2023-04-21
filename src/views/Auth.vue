<script setup lang="ts">
import { auth } from "firebaseui";
import { useFirebaseAuth } from "vuefire";
import { EmailAuthProvider } from "@firebase/auth";
import { onMounted, onUnmounted } from "vue";

const ui = new auth.AuthUI(useFirebaseAuth());

onMounted(() => {
  ui.start("#auth-container", {
    signInSuccessUrl: "/",
    signInOptions: [EmailAuthProvider.PROVIDER_ID],
  });
});

onUnmounted(ui.delete);
</script>

<template>
  <div id="auth-container" class="flex h-full w-full"></div>
</template>

<style>
.firebaseui-container {
  margin: auto;
  height: 600px;
  width: 350px;
}

.firebaseui-title {
  font-size: 32px;
  font-weight: 700;
  margin: 32px 0;
  text-align: center;
}

.firebaseui-text,
.firebaseui-form-links,
.firebaseui-error-wrapper {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.firebaseui-text {
  margin: 24px 0;
  text-align: center;
}

.firebaseui-error-wrapper {
  margin-top: 16px;
  text-align: center;
}

.firebaseui-card-content {
  margin: 0 auto;
}

.firebaseui-form-links {
  margin: 24px auto;
}

.firebaseui-card-actions {
  display: flex;
  flex-direction: column;
  margin: 24px 0;
}

.firebaseui-form-actions {
  margin: 0 auto;
}

.firebaseui-form-actions > button {
  margin: 0 8px;
}

.mdl-button--primary {
  background-color: white;
  color: rgb(17 24 39 / var(--tw-text-opacity));
  border: lightgray 1px solid;
}

.mdl-button--primary:hover {
  background-color: rgb(243, 243, 243);
}

.firebaseui-id-submit {
  background-color: rgb(79 70 229 / var(--tw-bg-opacity)) !important;
}

.firebaseui-id-submit:hover {
  background-color: rgb(99 102 241 / var(--tw-bg-opacity)) !important;
}
</style>
