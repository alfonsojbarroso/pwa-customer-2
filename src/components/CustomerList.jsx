import { useState, useEffect } from 'react';

export function CustomerList() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function getCustomers() {
            try {
                const response = await fetch('http://localhost:9090/api/v1/customer', {
                    headers: {
                        'Content-Type': 'application/json',
                        'flow': 'customer'
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al obtener los datos del servidor');
                }

                const data = await response.json();
                setCustomers(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        getCustomers();
    }, []);

    if (loading) return <p>Cargando clientes...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
 
            <h1>Lista de Clientes (React PWA)</h1>
            {customers.map((customer) => (
                <div key={customer.id} style={{
                    background: '#fff',
                    padding: '1rem',
                    marginBottom: '1rem',
                    borderRadius: '8px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    borderLeft: '4px solid #2563eb'
                }}>
                    <h3>{customer.name}</h3>
                    <p>ID: {customer.id}</p>
                    <p>Teléfono: {customer.phone}</p>
                </div>
            ))}
        </div>
    );
}
