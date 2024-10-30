import { client } from "~/libs/AmplifyDataClient";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { data } = await client.models.Users.create({
    id: body.id,
    userId: body.id,
    given_name: body.given_name,
    family_name: body.family_name,
    birthdate: body.birthdate,
    address: body.address,
    city: body.city,
    country: body.country,
    tipo_documento: body.tipo_documento,
    numero_documento: body.numero_documento,
    email: body.email,
    rol: body.rol,
    permissions: body.permissions,
    phone_number: body.phone_number
  });
  return data
});
