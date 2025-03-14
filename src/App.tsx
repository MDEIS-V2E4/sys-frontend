import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// import ProductForm from './components/ProductForm';
import ProductList from "./components/ProductList";
import RegisterClient from "./components/RegisterClient";
import RegisterInvoice from "./components/RegisterInvoice";
import ClientList from "./components/ClientList";
import EmployeeList from "./components/EmployeeList";
const App: React.FC = () => {
  return (
    <Router>
      <div className="p-8">
        {/* Navigation Links */}
        <nav className="mb-4">
          <ul className="flex space-x-4">
            <li>
              <Link to="/clientes" className="text-blue-500 hover:underline">
                Registrar nuevo Cliente
              </Link>
            </li>
            <li>
              <Link to="/facturas" className="text-blue-500 hover:underline">
                Registrar Factura
              </Link>
            </li>
            <li>
              <Link
                to="/lista-clientes"
                className="text-blue-500 hover:underline"
              >
                Listar Clientes
              </Link>
            </li>
            <li>
              <Link
                to="/lista-empleados"
                className="text-blue-500 hover:underline"
              >
                Listar Empleados
              </Link>
            </li>
          </ul>
        </nav>
        {/* Routes */}
        <Routes>
          <Route path="/" element={<RegisterClient />} />
          <Route path="/list" element={<ProductList />} />
          <Route path="/clientes" element={<RegisterClient />} />
          <Route path="/facturas" element={<RegisterInvoice />} />
          <Route path="/lista-clientes" element={<ClientList />} />
          <Route path="/lista-empleados" element={<EmployeeList />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
};
export default App;
