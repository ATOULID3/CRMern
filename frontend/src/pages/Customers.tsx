import { useEffect, useState } from 'react';
import { getClients } from '../services/api';
import { DataGrid } from '@mui/x-data-grid';

const Clients = () => {
  const [rows, setRows] = useState<any[]>([]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 150 },
  ];

  useEffect(() => {
    const token = localStorage.getItem('token') || '';
    getClients(token).then(data => setRows(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Clients</h2>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>
    </div>
  );
};

export default Clients;