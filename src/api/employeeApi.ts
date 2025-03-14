import { systemApi } from './baseQuery';
import { Employee } from './response/types';
import { EmployeeRequest } from './request/types';


const employeeApi = systemApi.injectEndpoints({
  endpoints: (builder) => ({
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
  }),
  overrideExisting: false,
});

export const { useFetchEmployeeListQuery,useCreateEmployeeMutation } = employeeApi;
