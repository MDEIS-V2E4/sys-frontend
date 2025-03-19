import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PencilSquareIcon,
  ArchiveBoxXMarkIcon,
} from '@heroicons/react/24/outline';
import ReactPaginate from 'react-paginate';
import { useFetchProductsQuery } from '../api/productsApi';

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const {
    data: products = [],
    isLoading,
    error,
    refetch,
  } = useFetchProductsQuery();

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10;

  useEffect(() => {
    refetch();
  }, [refetch]);

  const handleDeleteClient = async (clientId: string) => {
    try {
      console.log('Cliente eliminado correctamente', clientId);
      refetch();
    } catch (error) {
      console.error('Error al eliminar cliente', error);
    }
  };

  const handleSelect = (id: string) => {
    navigate(`/cliente/${id}`);
  };

  // Calcular el total de páginas
  const pageCount = Math.ceil(products.length / itemsPerPage);

  // Obtener los productos de la página actual
  const offset = currentPage * itemsPerPage;
  const paginatedProducts = useMemo(() => {
    const startIndex = currentPage * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  }, [products, currentPage]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    setCurrentPage(selected);
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner"></div>
      </div>
    );
  if (error) return <div>Failed to load products.</div>;

  return (
    <>
      <div className="p-4 w-full mx-auto bg-white shadow-md rounded-lg">
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
              {paginatedProducts.map((product, index: number) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{product.code}</td>
                  <td className="px-4 py-2">{product.name}</td>
                  <td className="px-4 py-2">{product.price}</td>
                  <td className="flex space-x-2 justify-end">
                    <button
                      type="button"
                      className="px-2 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
                      onClick={() => handleSelect(product.id.toString())}
                    >
                      <PencilSquareIcon className="h-5 w-5" />
                    </button>
                    <button
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
      <div className="flex justify-between">
        <p className="mt-4 text-sm text-gray-600">
          Mostrando {offset + 1} a{' '}
          {Math.min(offset + itemsPerPage, products.length)} de{' '}
          {products.length} resultados
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

export default ProductList;
