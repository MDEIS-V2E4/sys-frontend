import { ClientRequest, ProductRequest, InvoiceRequest } from './request/types';
import { systemApi } from './baseQuery';
import {
  Fabricante,
  GrupoProducto,
  Producto,
  Proveedor,
  UnidadMedida,
} from './response/types';

const productsApi = systemApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchProductBySku: builder.query<string, string>({
      query: (sku) => ({ url: `product/${sku}`, method: 'get' }),
    }),
    fetchProducts: builder.query<Producto[], void>({
      query: () => ({ url: 'product/list', method: 'get' }),
      transformResponse: (response: { data: Producto[] }) => response.data,
    }),
    createProduct: builder.mutation<
      string,
      {
        request: ProductRequest;
      }
    >({
      query: ({ request }) => ({
        url: 'product',
        data: request,
        method: 'post',
      }),
    }),
    fetchFabricantes: builder.query<Fabricante[], void>({
      query: () => ({ url: 'fabricante', method: 'get' }),
      transformResponse: (response: { data: Fabricante[] }) => response.data,
    }),
    fetchGrupos: builder.query<GrupoProducto[], void>({
      query: () => ({ url: 'grupo-producto', method: 'get' }),
    }),
    fetchProveedores: builder.query<Proveedor[], void>({
      query: () => ({ url: 'proveedor', method: 'get' }),
      transformResponse: (response: { data: Proveedor[] }) => response.data,
    }),
    fetchUnidadMedida: builder.query<UnidadMedida[], void>({
      query: () => ({ url: 'unidad-medida', method: 'get' }),
      transformResponse: (response: { data: UnidadMedida[] }) => response.data,
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
    createInvoice: builder.mutation<
      string,
      {
        request: InvoiceRequest;
      }
    >({
      query: ({ request }) => ({
        url: 'sale',
        data: request,
        method: 'post',
      }),
    }),
    fetchClientByCiNit: builder.query({
      query: (cinit) => ({ url: `client/${cinit}`, method: 'get' }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchProductBySkuQuery,
  useCreateProductMutation,
  useFetchFabricantesQuery,
  useFetchGruposQuery,
  useFetchProveedoresQuery,
  useFetchUnidadMedidaQuery,
  useFetchProductsQuery,
  useCreateClientMutation,
  useCreateInvoiceMutation,
  useFetchClientByCiNitQuery,
} = productsApi;
