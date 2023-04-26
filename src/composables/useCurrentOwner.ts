import { ref, watch } from "vue";
import { getOwnerByUid } from "../firebase";
import { useCurrentUser } from "vuefire";
import { IOwner } from "../types";

export function useCurrentOwner() {
  const user = useCurrentUser();
  const owner = ref();

  watch(user, () => {
    if (user.value?.uid) {
      getOwnerByUid(user.value?.uid).then((queryResult) => {
        if (queryResult.exists()) {
          owner.value = queryResult.data() as IOwner;
        }
      });
    }
  });

  return owner;
}
