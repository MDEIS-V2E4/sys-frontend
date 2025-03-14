import { useEffect, useState } from "react";
import { useFetchEmployeeListQuery } from "../api/employeeApi";
import {
  PencilSquareIcon,
  ArchiveBoxXMarkIcon,
} from "@heroicons/react/24/outline";
import ModalEmployee from "./ModalEmployee";
import Notification, { NotificationType } from "./Notification";

const EmployeeList: React.FC = () => {
  const {
    data: employees = [],
    isLoading,
    refetch,
  } = useFetchEmployeeListQuery();

  const [open, setOpen] = useState(false);
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [typeNotif, setTypeNotif] = useState<NotificationType>("success");

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  const handleAddEmployee = (isRegistered: boolean) => {
    refetch();
    if (isRegistered) {
      // closeModal();
      setTypeNotif("success");
      setMessage("Registrado correctamente");
      setShow(true);
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  return isLoading ? (
    <div>Cargando...</div>
  ) : (
    <div className="p-4 max-w-6xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lista de Empleados</h2>
      <Notification
        message={message}
        show={show}
        setShow={setShow}
        type={typeNotif}
      />
      <button
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={openModal}
      >
        Nuevo Empleado
      </button>

      {employees.length === 0 ? (
        <p>No hay empleados registrados.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">Nombre Completo</th>
              <th className="px-4 py-2 text-left">Cargo</th>
              <th className="px-4 py-2 text-left">Fecha Contratación</th>
              <th className="px-4 py-2 text-left">Salario</th>
              <th className="px-4 py-2 text-left">Teléfono</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Departamento</th>
              <th className="px-4 py-2 text-left">Jefe</th>
              <th className="px-4 py-2 text-left">Estado</th>
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
                  {new Date(employee.hire_date).toLocaleDateString("es-ES")}
                </td>
                <td className="px-4 py-2">{employee.salary}</td>
                <td className="px-4 py-2">{employee.phone}</td>
                <td className="px-4 py-2">{employee.email}</td>
                <td className="px-4 py-2">{employee.department_name}</td>
                <td className="px-4 py-2">{employee.manager_name}</td>
                <td className="px-4 py-2">{employee.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <ModalEmployee
        isOpen={open}
        closeModal={closeModal}
        handleAddEmployee={handleAddEmployee}
      />
    </div>
  );
};

export default EmployeeList;
