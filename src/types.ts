export interface IDog {
  age: number;
  ageType: AgeType;
  name: string;
  imageUrl: string;
}

export enum AgeType {
  months = "months",
  years = "years",
}
