import { ref, watch } from "vue";
import { queryHouseholdByOwnerUid } from "../firebase";
import { useCurrentUser } from "vuefire";

export function useUserHousehold() {
  const user = useCurrentUser();
  const household = ref<any>({ data: null, householdId: null });

  watch(user, () => {
    if (user.value?.uid) {
      queryHouseholdByOwnerUid(user.value?.uid).then((queryResult) => {
        if (!queryResult?.empty) {
          const householdDoc = queryResult?.docs[0];
          household.value = {
            data: householdDoc?.data(),
            householdId: householdDoc?.id,
          };
        }
      });
    }
  });

  return household;
}
