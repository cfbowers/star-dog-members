import { User } from "@firebase/auth";

export interface IDog {
  uid: string;
  householdId: string;
  age: number;
  ageType: AgeType;
  name: string;
  imageUrl: string;
  imageStorageName: string;
}

export enum AgeType {
  months = "months",
  years = "years",
}

export interface IUser extends User {
  householdId: User["uid"];
}
