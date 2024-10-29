export interface UsersInterface {
  id?: string;
  userId?: string;
  given_name: string;
  family_name: string;
  address?:string;
  email: string;
  birthdate?: string;
  phone_number: string;
  numero_documento?: string;
  tipo_documento?: string;
  city?: string;
  country?: string;
  userTypeId?: string;
  permissions?: string;
  rol?: string;
  createdAt?: string;
  updatedAt?: string;
}
