import React, { useState } from 'react';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  useCreateEmployeeMutation,
  useFetchEmployeeListQuery,
} from '../api/employeeApi';
import Notification from './Notification';
import { EmployeeRequest } from '../api/request/types';

const validationSchema = Yup.object({
  first_name: Yup.string().required('El nombre es obligatorio'),
  last_name: Yup.string().required('El apellido es obligatorio'),
  job_title: Yup.string().required('El cargo es obligatorio'),
  hire_date: Yup.date().required('La fecha de contratación es obligatoria'),
  salary: Yup.number()
    .required('El salario es obligatorio')
    .min(0.01, 'El salario debe ser mayor que cero'),
  phone: Yup.string(),
  email: Yup.string()
    .email('El formato del email es inválido')
    .required('El email es obligatorio'),
  department_id: Yup.number()
    .required('El ID del departamento es obligatorio')
    .min(1, 'Debe seleccionar una opción'),
  //   manager_id: Yup.number().required("El ID del jefe es obligatorio"),
  //   status: Yup.string().required("El estado es obligatorio"),
});

interface ModalEmployeeProps {
  isOpen: boolean;
  closeModal: () => void;
  handleAddEmployee: (isRegistered: boolean) => void;
}

const ModalEmployee: React.FC<ModalEmployeeProps> = ({
  isOpen,
  closeModal,
  handleAddEmployee,
}) => {
  const [createEmployee] = useCreateEmployeeMutation();
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');

  const {
    data: employees = [],
    isLoading,
    error,
  } = useFetchEmployeeListQuery();

  const onSubmit = (values: EmployeeRequest) => {
    try {
      const formValues = {
        ...values,
        department_id: Number(values.department_id),
        manager_id: values.manager_id === 0 ? null : Number(values.manager_id),
      };
      console.log(formValues);
      createEmployee({ request: formValues }).unwrap();
      handleAddEmployee(true);
      setMessage('Guardado correctamente');
      closeModal();
    } catch (error) {
      console.error('Error al registrar el empleado: ', error);
    }
  };

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <Notification
        message={message}
        show={show}
        setShow={setShow}
        type="success"
      />
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-md data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <DialogTitle
                  as="h3"
                  className="flex items-center text-2xl font-semibold leading-6 text-gray-900"
                >
                  <div className="flex mr-3 h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 sm:h-10 sm:w-10">
                    <ShoppingCartIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-blue-600"
                    />
                  </div>
                  <span>Agregar Empleado</span>
                </DialogTitle>

                <Formik
                  initialValues={{
                    first_name: '',
                    last_name: '',
                    job_title: '',
                    hire_date: '',
                    salary: 0,
                    phone: '',
                    email: '',
                    department_id: 0,
                    manager_id: 0,
                    status: 'Active',
                  }}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  <Form>
                    <div className="mb-4">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Nombre
                      </label>
                      <Field
                        id="first_name"
                        name="first_name"
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="first_name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Apellido
                      </label>
                      <Field
                        id="last_name"
                        name="last_name"
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="last_name"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="job_title"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Cargo
                      </label>
                      <Field
                        id="job_title"
                        name="job_title"
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="job_title"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="hire_date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Fecha Contratación
                      </label>
                      <Field
                        id="hire_date"
                        name="hire_date"
                        type="date"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="hire_date"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="salary"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Salario
                      </label>
                      <Field
                        id="salary"
                        name="salary"
                        type="number"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="salary"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Teléfono
                      </label>
                      <Field
                        id="phone"
                        name="phone"
                        type="text"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="department_id"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Departamento
                      </label>
                      <Field
                        as="select"
                        id="department_id"
                        name="department_id"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="0" disabled>
                          Seleccionar una opción
                        </option>
                        <option value="1">Desarrollo</option>
                        <option value="2">Recursos Humanos</option>
                        <option value="3">Finanzas</option>
                        <option value="4">Marketing</option>
                        <option value="5">Soporte Técnico</option>
                      </Field>
                      <ErrorMessage
                        name="department_id"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>

                    <div className="mb-4">
                      <label
                        htmlFor="manager_id"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Jefe
                      </label>
                      <Field
                        id="manager_id"
                        name="manager_id"
                        as="select"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="0" disabled>
                          Seleccionar una opción
                        </option>
                        {isLoading ? (
                          <option>Loading...</option>
                        ) : error ? (
                          <option>Error loading data</option>
                        ) : (
                          employees.map((employee) => (
                            <option key={employee.id} value={employee.id}>
                              {employee.first_name} {employee.last_name}
                            </option>
                          ))
                        )}
                      </Field>
                      <ErrorMessage
                        name="manager_id"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div>
                    {/*
                    <div className="mb-4">
                      <label
                        htmlFor="status"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Estado
                      </label>
                      <Field
                        as="select"
                        id="status"
                        name="status"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Active">Activo</option>
                        <option value="Inactive">Inactivo</option>
                      </Field>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="text-red-500 text-sm"
                      />
                    </div> */}

                    <div className="bg-white-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="button"
                        className="w-auto px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm sm:text-base"
                        onClick={closeModal}
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="mt-2 mr-2 sm:mt-0 sm:ml-4 w-auto px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm sm:text-base"
                      >
                        Agregar Empleado
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalEmployee;
