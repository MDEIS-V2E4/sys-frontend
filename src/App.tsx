import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList";
import RegisterClient from "./components/RegisterClient";
import EditClient from "./components/EditClient";
import ClientList from "./components/ClientList";
import EmployeeList from "./components/EmployeeList";
import RegisterEmployee from "./components/RegisterEmployee";
import EditEmployee from "./components/EditEmployee";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/cliente" element={<RegisterClient />} />
          <Route path="/clientes" element={<ClientList />} />
          <Route path="/cliente/:id" element={<EditClient />} />
          <Route path="/empleados" element={<EmployeeList />} />
          <Route path="/empleado/:id" element={<EditEmployee />} />
          <Route path="/empleado" element={<RegisterEmployee />} />
          <Route path="/productos" element={<ProductList />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
