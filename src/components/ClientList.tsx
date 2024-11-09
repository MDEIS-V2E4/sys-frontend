
const ClientList: React.FC = () => {

  const clients =[
    {
        id: 1,
        name: "Pepito Perez",
        nrodoc: "7546452012",
        tipodoc: "NIT",
        email: "pepito@gmail.com",
      },
      {
        id: 2,
        name: "Maria Mendez",
        nrodoc: "652325",
        tipodoc: "CI",
        email: "maria@gmail.com",
      },
  ]
  return (
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
                <td className="px-4 py-2">{client.nrodoc}</td>
                <td className="px-4 py-2">{client.tipodoc}</td>
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
