import { systemApi } from './baseQuery';
import { Client } from './response/types';

const clientApi = systemApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchClientList: builder.query<Client[], void>({
      query: () => ({ url: 'client/list', method: 'get' }),
      transformResponse: (response: { data: Client[] }) => response.data,
    }),
    deleteClient: builder.mutation<string, { clientId: string }>({
      query: ({ clientId }) => ({
        url: `client/${clientId}`,
        method: 'delete',
      }),
    }),
  }),
  overrideExisting: false,
});

export const { useFetchClientListQuery, useDeleteClientMutation } = clientApi;
