import { User } from "@firebase/auth";

export interface IDog {
  id: string;
  householdId: string;
  name: string;
  imageUrl: string;
  imageStorageName: string;
  dateOfBirth: string;
}

export interface IOwner extends User {
  householdId: string;
  firebaseUid: string;
  lastLogin: string;
}
