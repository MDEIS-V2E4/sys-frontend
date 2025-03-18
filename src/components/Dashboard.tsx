import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFetchEmployeeListQuery } from '../api/employeeApi';
import { useFetchClientListQuery } from '../api/clientApi';
import { useFetchProductsQuery } from '../api/productsApi';

const DashboardCharts: React.FC = () => {
  const { data: employees = [] } = useFetchEmployeeListQuery();
  const { data: clients = [] } = useFetchClientListQuery();
  const { data: products = [] } = useFetchProductsQuery();

  const data = [
    { name: 'Empleados', total: employees.length },
    { name: 'Clientes', total: clients.length },
    { name: 'Productos', total: products.length },
  ];

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Resumen General</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DashboardCharts;
