import { useEffect } from 'react';
import { useFetchClientListQuery } from '../api/clientApi';

const ClientList: React.FC = () => {
  const { data: clients = [], isLoading, refetch  } = useFetchClientListQuery();
  
  useEffect(() => {
    refetch();
  }, [refetch]);

  return isLoading ? (
    <div>Cargando...</div>
  ) : (
    <div className="p-4 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Lista de Clientes</h2>
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
            </tr>
          </thead>
          <tbody>
            {clients.map((client, index: number) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{client.name}</td>
                <td className="px-4 py-2">{client.ci_nit}</td>
                <td className="px-4 py-2">{client.document_type}</td>
                <td className="px-4 py-2">{client.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
export default ClientList;
