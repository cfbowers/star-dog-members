import { initializeApp } from "firebase/app";

import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyAYL2TqG5VEyBt5w4OZo_ozmYe1h2ooACw",
  authDomain: "star-dog-members.firebaseapp.com",
  projectId: "star-dog-members",
  storageBucket: "star-dog-members.appspot.com",
  messagingSenderId: "838654802029",
  appId: "1:838654802029:web:7fbe34c6b234206419e764",
});

const db = getFirestore(firebaseApp);

export const getByUid = (collection: string) => {
  return (uid: string) => getDoc(doc(db, collection, uid));
};

export const upsertByUid = (collection: string) => {
  return (uid: string, data: any) => {
    return setDoc(doc(db, collection, uid), data, { merge: true });
  };
};

export const queryHouseholdByCollectionUid = (c: string) => {
  return (uid: string) => {
    const q = query(
      collection(db, "households"),
      where(c, "array-contains", uid)
    );

    return getDocs(q);
  };
};

//owners
export const getOwnerByUid = getByUid("owners");
export const upsertOwnerByUid = upsertByUid("owners");
export const queryHouseholdByOwnerUid = queryHouseholdByCollectionUid("owners");

//households
export const upsertHouseholdByUid = upsertByUid("households");

//dogs
export const upsertDogByUid = upsertByUid("dogs");
export const getDogsByHouseholdId = (householdId: string) => {
  const q = query(
    collection(db, "dogs"),
    where("householdId", "==", householdId)
  );

  return getDocs(q);
};
