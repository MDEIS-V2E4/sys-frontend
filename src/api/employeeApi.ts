import { systemApi } from './baseQuery';
import { Employee } from './response/types';
import { EmployeeRequest } from './request/types';

const employeeApi = systemApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchEmployeeById: builder.query({
      query: (id) => ({ url: `employee/id/${id}`, method: 'get' }),
      transformResponse: (response: { data: Employee }) => response.data,
    }),
    fetchEmployeeList: builder.query<Employee[], void>({
      query: () => ({ url: 'employee/list', method: 'get' }),
      transformResponse: (response: { data: Employee[] }) => response.data,
    }),
    createEmployee: builder.mutation<
      string,
      {
        request: EmployeeRequest;
      }
    >({
      query: ({ request }) => ({
        url: 'employee',
        data: request,
        method: 'post',
      }),
    }),
    updateEmployee: builder.mutation<
      string,
      {
        employeeId: string;
        request: EmployeeRequest;
      }
    >({
      query: ({ employeeId, request }) => ({
        url: `employee/${employeeId}`,
        data: request,
        method: 'put',
      }),
    }),
    deleteEmployee: builder.mutation<string, { employeeId: string }>({
      query: ({ employeeId }) => ({
        url: `employee/toggle-status/${employeeId}`,
        method: 'put',
        data: {
          status: 'Inactive',
        },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useFetchEmployeeByIdQuery,
  useFetchEmployeeListQuery,
  useCreateEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeeApi;
