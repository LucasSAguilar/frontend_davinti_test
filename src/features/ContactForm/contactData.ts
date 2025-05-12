import api from "../../services/api";
import { Contact } from "../../types/contact";
import { PhoneNumber } from "../../types/number";

export async function getContactByID(id: number): Promise<Contact> {
  const res = await api.get<Contact>(`/contact/${id}`);
  return res.data;
}

export async function getPhonesByContactID(id: number): Promise<PhoneNumber[]> {
  const res = await api.get<PhoneNumber[]>(`/phone/contact/${id}`);
  return res.data;
}

export async function createContact(contact: Contact): Promise<Contact> {
  const res = await api.post<Contact>("/contact", contact);
  return res.data;
}

export async function updateContact(contact: Contact): Promise<Contact> {
  const res = await api.put<Contact>(`/contact/${contact.id}`, contact);
  return res.data;
}