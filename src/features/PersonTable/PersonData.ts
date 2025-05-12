import api from "../../services/api";
import { Contact } from "../../types/contact";

export async function getAllContacts(): Promise<Contact[]> {
  const res = await api.get<Contact[]>(`/contact`);
  return res.data;
}

export async function searchContactByNameNumber(term: string): Promise<Contact[]> {
  const res = await api.get<Contact[]>(`/contact/search/${term}`);
  return res.data;
}

export async function deleteContact(id: number): Promise<void> {
  const res = await api.delete(`/contact/${id}`);
  return res.data;
}