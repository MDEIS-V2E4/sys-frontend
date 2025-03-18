import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PencilSquareIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';
import { useFetchProductsQuery } from '../api/productsApi';

const ProductList: React.FC = () => {
   const navigate = useNavigate();
  const { data: products = [], isLoading, error, refetch } = useFetchProductsQuery();

    useEffect(() => {
      refetch();
    }, [refetch]);

  const handleDeleteClient = async (clientId: string) => {
    try {
      // await deleteClient({ clientId }).unwrap();
      console.log('Cliente eliminado correctamente', clientId);
      refetch();
    } catch (error) {
      console.error('Error al eliminar cliente', error);
    }
  };

  const handleSelect = (id: string) => {
    navigate(`/cliente/${id}`);
  };


  if (isLoading) {
    return <div>Loading products...</div>;
  }
  if (error) {
    return <div>Failed to load products.</div>;
  }
  return (
    <div className="p-4 max-w-4xl mx-auto bg-white shadow-md rounded-lg">
      {products.length === 0 ? (
        <p>No hay productos registrados.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">SKU</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Precio Lista</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index: number) => (
              <tr key={index} className="border-t">
                <td className="px-4 py-2">{product.code}</td>
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="flex space-x-2 justify-end">
                  <button
                    data-testid={'btnGetProduct-'}
                    type="button"
                    className="px-2 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                    onClick={() => {
                      handleSelect(product.id.toString());
                    }}
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    data-testid={'btnGetProduct-'}
                    type="button"
                    className="px-2 py-2 bg-red-500 text-white rounded hover:bg-red-700"
                    onClick={() => handleDeleteClient(product.id.toString())}
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
export default ProductList;
