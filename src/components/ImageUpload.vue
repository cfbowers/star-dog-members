<script setup lang="ts">
import { uuidv4 } from "@firebase/util";
import { useFileDialog } from "@vueuse/core";
import { ref as storageRef } from "firebase/storage";
import { watch } from "vue";
import { useFirebaseStorage, useStorageFile } from "vuefire";

const {
  storagePath,
  imageStorageName,
  onNewImageStorageName,
  onNewImageUrl,
  onUploadStatusChange,
} = defineProps<{
  storagePath: string;
  imageStorageName?: string;
  onNewImageStorageName: (imageStorageName: string) => void;
  onNewImageUrl: (url: string) => void;
  onUploadStatusChange: (url: boolean) => void;
}>();

const firebaseImageName = imageStorageName ?? uuidv4();
const fullFilePath = `${storagePath}/${firebaseImageName}`;
const storage = useFirebaseStorage();
const fileRef = storageRef(storage, fullFilePath);

const fileStorage = useStorageFile(fileRef);
const { files, open } = useFileDialog();
const { url, upload, uploadTask } = fileStorage;

const uploadPicture = async (imgData: any) => {
  if (imgData) {
    await upload(imgData);
    onNewImageStorageName(firebaseImageName);
  }
};

watch(uploadTask, () => {
  onUploadStatusChange(Boolean(uploadTask));
});

watch(files, () => {
  const imgData = files?.value?.item(0);
  const imageName = imgData?.name;
  if (imageName) uploadPicture(imgData);
});

watch(url, () => {
  if (url.value) onNewImageUrl(url.value);
});
</script>

<template>
  <label for="image-upload">
    Image
    <div class="flex flex-col space-y-4">
      <div
        class="aspect-square w-56 overflow-hidden rounded-md"
        :hidden="!Boolean(url)"
      >
        <img :src="url || ''" alt="" />
      </div>
      <button
        class="btn-primary"
        type="button"
        @click="open({ accept: 'image/*', multiple: false })"
        :disabled="Boolean(uploadTask)"
      >
        Upload Image
      </button>
    </div>
  </label>
</template>
