import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchEmployeeListQuery,  useDeleteEmployeeMutation } from '../api/employeeApi';
import {
  PencilSquareIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';

const EmployeeList: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useFetchEmployeeListQuery();
  const [deleteEmployee] = useDeleteEmployeeMutation();

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

  return isLoading ? (
    <div>Cargando...</div>
  ) : (
    <div className="p-4 bg-white shadow-md rounded-lg overflow-auto max-w-full">
      {employees.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        <table className="min-w-full table-auto relative">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left w-28">Nombre Completo</th>
              <th className="px-4 py-2 text-left">Cargo</th>
              <th className="px-4 py-2 text-left">Fecha Contratación</th>
              <th className="px-4 py-2 text-left">Salario</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Departamento</th>
              <th className="px-4 py-2 text-left">Jefe</th>
              <th className="px-4 py-2 text-left">Estado</th>
              <th className="px-4 py-2 text-left sticky right-0 bg-gray-200 z-10">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee, index: number) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">
                  {employee.first_name} {employee.last_name}
                </td>
                <td className="px-4 py-2">{employee.job_title}</td>
                <td className="px-4 py-2">
                  {new Date(employee.hire_date).toLocaleDateString('es-ES')}
                </td>
                <td className="px-4 py-2">{employee.salary}</td>
                <td className="px-4 py-2">{employee.phone}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.department_name}</td>
                <td className="px-4 py-2">{employee.manager_name}</td>
                <td className="px-4 py-2">{employee.status}</td>
                <td className="right-0 bg-white px-4 py-2 flex space-x-2 justify-end z-20">
                  <button
                    data-testid={'btnGetProduct-'}
                    type="button"
                    className="px-2 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    onClick={() => {
                      handleSelect(employee.id.toString());
                    }}
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    data-testid={'btnGetProduct-'}
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
      )}
    </div>
  );
};

export default EmployeeList;
