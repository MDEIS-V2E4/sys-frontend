import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchEmployeeListQuery, useDeleteEmployeeMutation } from '../api/employeeApi';
import {
  PencilSquareIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';
import ReactPaginate from 'react-paginate';

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useFetchEmployeeListQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      await deleteEmployee({ employeeId }).unwrap();
      console.log('Empleado eliminado correctamente');
      refetch();
    } catch (error) {
      console.error('Error al eliminar empleado', error);
    }
  };

  const handleSelect = (id: string) => {
    navigate(`/empleado/${id}`);
  };

  // Calcular total de páginas
  const pageCount = Math.ceil(employees.length / itemsPerPage);

  // Obtener empleados de la página actual
  const offset = currentPage * itemsPerPage;
  const paginatedEmployees = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return employees.slice(startIndex, startIndex + itemsPerPage);
  }, [employees, currentPage]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return isLoading ? (
    <div>Cargando...</div>
  ) : (
    <div className="p-4 bg-white shadow-md rounded-lg overflow-auto max-w-full">
      {employees.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        <>
          <table className="min-w-full table-auto relative">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-2 py-2 text-left">Nombre Completo</th>
                <th className="px-2 py-2 text-left w-8">Cargo</th>
                <th className="px-2 py-2 text-left w-8">F. de Contrato</th>
                <th className="px-2 py-2 text-left w-8">Salario $us</th>
                <th className="px-2 py-2 text-left w-8">Telf.</th>
                <th className="px-2 py-2 text-left">Email</th>
                <th className="px-2 py-2 text-left w-8">Area</th>
                <th className="px-2 py-2 text-left">Jefe</th>
                <th className="px-2 py-2 text-left">Estado</th>
                <th className="px-2 py-2 text-left sticky right-0 bg-gray-200 z-10"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedEmployees.map((employee, index: number) => (
                <tr key={index} className="border-t">
                  <td className="px-2 py-2">{employee.first_name} {employee.last_name}</td>
                  <td className="px-2 py-2">{employee.job_title}</td>
                  <td className="px-2 py-2">{new Date(employee.hire_date).toLocaleDateString('es-ES')}</td>
                  <td className="px-2 py-2">{Number(employee.salary)}</td>
                  <td className="px-2 py-2">{employee.phone}</td>
                  <td className="px-2 py-2">{employee.email}</td>
                  <td className="px-2 py-2">{employee.department_name}</td>
                  <td className="px-2 py-2">{employee.manager_name}</td>
                  <td className="px-2 py-2">{employee.status}</td>
                  <td className="right-0 bg-white py-2 flex space-x-1 justify-end z-20">
                    <button
                      type="button"
                      className="px-2 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                      onClick={() => handleSelect(employee.id.toString())}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => handleDeleteEmployee(employee.id.toString())}
                    >
                      <ArchiveBoxXMarkIcon className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between">
            <p className="mt-4 text-sm text-gray-600">
              Mostrando {offset + 1} a{' '}
              {Math.min(offset + itemsPerPage, employees.length)} de{' '}
              {employees.length} resultados
            </p>
            <ReactPaginate
              previousLabel="<"
              nextLabel=">"
              breakLabel="..."
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={handlePageChange}
              containerClassName="flex justify-center mt-4 space-x-2"
              pageClassName="px-3 py-1 border rounded hover:bg-gray-200"
              activeClassName="bg-purple-600 text-white"
              previousClassName="px-3 py-1 border rounded hover:bg-gray-200"
              nextClassName="px-3 py-1 border rounded hover:bg-gray-200"
              disabledClassName="text-gray-400 cursor-not-allowed"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
