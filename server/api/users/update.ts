import { client } from "~/libs/AmplifyDataClient";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { data } = await client.models.Users.update({
    id: body.id,
    given_name: body.givenName,
    family_name: body.familyName,
    birthdate: body.birthdate,
    address: body.address,
    city: body.city,
    country: body.country,
    tipo_documento: body.tipo_documento,
    numero_documento: body.numero_documento,
    email: body.email,
    rol: body.rol,
    permissions: body.permissions
  });
  return data
});
