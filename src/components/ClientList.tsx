import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useFetchClientListQuery,
  useDeleteClientMutation,
} from '../api/clientApi';
import {
  PencilSquareIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';
import ReactPaginate from 'react-paginate';

const ClientList: React.FC = () => {
  const navigate = useNavigate();
  const { data: clients = [], isLoading, refetch } = useFetchClientListQuery();
  const [deleteClient] = useDeleteClientMutation();

  // Estado para paginación
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

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

  const offset = currentPage * itemsPerPage;
  const paginatedClients = clients.slice(offset, offset + itemsPerPage);
  const pageCount = Math.ceil(clients.length / itemsPerPage);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  return isLoading ? (
    <div>Cargando...</div>
  ) : (
    <>
      <div className="p-4 mx-auto bg-white shadow-md rounded-lg overflow-auto max-w-full">
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
              {paginatedClients.map((client, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{client.name}</td>
                  <td className="px-4 py-2">{client.ci_nit}</td>
                  <td className="px-4 py-2">{client.document_type}</td>
                  <td className="px-4 py-2">{client.email}</td>
                  <td className="flex space-x-2 justify-end">
                    <button
                      type="button"
                      className="px-2 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                      onClick={() => handleSelect(client.id.toString())}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
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
      <div className="flex justify-between">
        <p className="mt-4 text-sm text-gray-600">
          Mostrando {offset + 1} a{' '}
          {Math.min(offset + itemsPerPage, clients.length)} de {clients.length}{' '}
          resultados
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
          activeClassName="bg-purple-600 text-white hover:bg-purple-800"
          previousClassName="px-3 py-1 border rounded hover:bg-gray-200"
          nextClassName="px-3 py-1 border rounded hover:bg-gray-200"
          disabledClassName="text-gray-400 cursor-not-allowed"
        />
      </div>
    </>
  );
};

export default ClientList;
