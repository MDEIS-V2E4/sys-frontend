import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useFetchClientListQuery,
  useDeleteClientMutation,
} from '../api/clientApi';
import {
  PencilSquareIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const { data: clients = [], isLoading, refetch } = useFetchClientListQuery();
  const [deleteClient] = useDeleteClientMutation();

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDeleteClient = async (clientId: string) => {
    try {
      await deleteClient({ clientId }).unwrap();
      console.log('Cliente eliminado correctamente');
      refetch();
    } catch (error) {
      console.error('Error al eliminar cliente', error);
    }
  };

  const handleSelect = (id: string) => {
    navigate(`/cliente/${id}`);
  };

  return isLoading ? (
    <div>Cargando...</div>
  ) : (
    <>
      <div className="p-4 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
        {clients.length === 0 ? (
          <p>No hay clientes registrados.</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">Nombre</th>
                <th className="px-4 py-2 text-left">Nro. NIT/CI</th>
                <th className="px-4 py-2 text-left">Tipo Documento</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left"></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client, index: number) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{client.name}</td>
                  <td className="px-4 py-2">{client.ci_nit}</td>
                  <td className="px-4 py-2">{client.document_type}</td>
                  <td className="px-4 py-2">{client.email}</td>
                  <td className="flex space-x-2 justify-end">
                    <button
                      data-testid={'btnGetProduct-'}
                      type="button"
                      className="px-2 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                      onClick={() => {
                        handleSelect(client.id.toString());
                      }}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
                      data-testid={'btnGetProduct-'}
                      type="button"
                      className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                      onClick={() => handleDeleteClient(client.id.toString())}
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
    </>
  );
};
export default ClientList;
