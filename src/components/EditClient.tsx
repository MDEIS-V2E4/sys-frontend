import { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import { FC, useState } from 'react';
import * as Yup from 'yup';
import { ClientRequest } from '../api/request/types';
import { useUpdateClientMutation } from '../api/clientApi';
import Notification from './Notification';
import { useFetchClientByIdQuery } from '../api/clientApi';

const RegisterClient: FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const {
    data: client,
    isLoading,
    refetch,
  } = useFetchClientByIdQuery(id || '');
  const initialValues: ClientRequest = {
    name: client?.name || '',
    ciNit: client?.ci_nit || '',
    documentType: client?.document_type || 'CI',
    email: client?.email || '',
  };
  const [show, setShow] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [updateClient] = useUpdateClientMutation();
  const validationSchema = Yup.object({
    name: Yup.string().required('Nombre es requerido'),
    ciNit: Yup.number()
      .typeError('CI/NIT solo acepta numeros')
      .required('CI/NIT es requerido'),
    documentType: Yup.string().required('Tp Doc es requerido'),
    email: Yup.string()
      .email('Formato de email invalido')
      .required('El email es requerido'),
  });
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus(); // Aplica el enfoque al campo
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const onSubmit = async (
    values: ClientRequest,
    { resetForm, setSubmitting }: FormikHelpers<ClientRequest>,
  ) => {
    try {
      console.log(values);
      await updateClient({ clientId: id || '', request: values }).unwrap();
      setMessage('Guardado correctamente');
      setShow(true);
      resetForm();
      setSubmitting(false);
      navigate('/clientes');
    } catch (error) {
      console.error('Failed to register product', error);
    }
  };

  return isLoading ? (
    <div>Cargando...</div>
  ) : (
    <div className="p-4 max-w-md mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Editar Cliente</h2>
      <Notification
        message={message}
        show={show}
        setShow={setShow}
        type="success"
      />

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className="space-y-4">
            {status && status.success && (
              <div className="text-green-500">{status.success}</div>
            )}
            <div className="flex flex-col">
              <label htmlFor="name" className="mb-1 font-semibold">
                Nombre:
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                className="p-2 border border-gray-300 rounded"
                innerRef={nameRef}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="ciNit" className="mb-1 font-semibold">
                Nro. CI/NIT:
              </label>
              <Field
                id="ciNit"
                name="ciNit"
                type="text"
                className="p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="ciNit"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="documentType" className="mb-1 font-semibold">
                Tp Doc:
              </label>
              {/* <Field id="documentType" name="documentType" type="text" className="p-2 border border-gray-300 rounded" /> */}
              <Field
                id="documentType"
                name="documentType"
                as="select"
                className="p-2 border border-gray-300 rounded bg-white"
              >
                <option value="CI">CI</option>
                <option value="NIT">NIT</option>
              </Field>
              <ErrorMessage
                name="documentType"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1 font-semibold">
                Email:
              </label>
              <Field
                id="email"
                name="email"
                className="p-2 border border-gray-300 rounded"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="bg-white-50 py-3 flex justify-between">
              <button
                type="button"
                className="w-auto px-3 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 text-sm sm:text-base"
                onClick={() => navigate('/clientes')}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Cargando...' : 'Editar cliente'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterClient;
