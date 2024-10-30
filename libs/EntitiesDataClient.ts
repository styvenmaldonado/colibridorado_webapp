import { client } from "./AmplifyDataClient";

type ListResponse<T> = { data: T[]; nextToken?: string | null };
type FilterInput = { eventId?: string; userId?: string };

// Función auxiliar para obtener todos los registros de un modelo con paginación y opcionalmente un filtro
const fetchAllData = async <T>(model: any, filter: any = null): Promise<T[]> => {
  let nextToken: string | null = null;
  const allData: T[] = [];

  do {
    const response: ListResponse<T> = await model.list({ nextToken, filter });
    allData.push(...response.data);
    nextToken = response.nextToken ?? null;
  } while (nextToken);

  return allData;
};

// Función específica para obtener todos los usuarios de eventos con filtro opcional
export const getAllEventUsers = async (input: FilterInput = {}) => {
  const filter = {
    or: [
      input.eventId ? { eventId: { eq: input.eventId } } : undefined,
      input.userId ? { userId: { eq: input.userId } } : undefined,
    ].filter(Boolean), // Elimina los filtros no definidos
  };

  return fetchAllData(client.models.EventsUser, filter);
};

// Función específica para obtener todos los usuarios
export const getAllUsers = async () => {
  return fetchAllData(client.models.Users);
};

// Función específica para obtener todos los eventos
export const getAllEvents = async () => {
  return fetchAllData(client.models.Events);
};
