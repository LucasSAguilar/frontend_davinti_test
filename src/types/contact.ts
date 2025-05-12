import { PhoneNumber } from "./number";

export type Contact = {
  id?: number;
  nome: string;
  idade: number;
  numeros?: PhoneNumber[];
};