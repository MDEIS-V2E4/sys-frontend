import { Client } from './response/types';
import { ClientRequest } from './request/types';
import { systemApi } from './baseQuery';

const clientApi = systemApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchClientById: builder.query({
      query: (id) => ({ url: `client/id/${id}`, method: 'get' }),
      transformResponse: (response: { data: Client }) => response.data,
    }),
    fetchClientList: builder.query<Client[], void>({
      query: () => ({ url: 'client/list', method: 'get' }),
      transformResponse: (response: { data: Client[] }) => response.data,
    }),
    createClient: builder.mutation<
      string,
      {
        request: ClientRequest;
      }
    >({
      query: ({ request }) => ({
        url: 'client',
        data: request,
        method: 'post',
      }),
    }),
    updateClient: builder.mutation<
      string,
      {
        clientId: string;
        request: ClientRequest;
      }
    >({
      query: ({ clientId, request }) => ({
        url: `client/${clientId}`,
        data: request,
        method: 'put',
      }),
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

export const {
  useFetchClientByIdQuery,
  useFetchClientListQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientApi;
