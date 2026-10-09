import { useState } from 'react';

export function CustomerAdd({ onCustomerAdded }) {
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });

    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    // Manejar los cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Manejar el envío de datos al backend
    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setMessage(null);

        try {
            const response = await fetch('http://localhost:9090/api/v1/customer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'flow': 'tu_valor_para_el_header' // El header obligatorio que te pide el backend
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Error al guardar el cliente en el servidor.');
            }

            setMessage({ type: 'success', text: '¡Cliente guardado con éxito!' });
            setFormData({ name: '', phone: '' }); // Limpiar formulario

            // Si pasas una función por props, puedes actualizar la lista de clientes automáticamente
            if (onCustomerAdded) {
                onCustomerAdded();
            }

        } catch (err) {
            setMessage({ type: 'error', text: err.message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Registrar Nuevo Cliente</h2>

            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Nombre:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Ej. FLOOR JANSEN"
                        required
                        style={styles.input}
                    />
                </div>

                <div style={styles.inputGroup}>
                    <label style={styles.label}>Teléfono:</label>
                    <input
                        type="text"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Ej. 1234567891"
                        required
                        style={styles.input}
                    />
                </div>

                <button type="submit" disabled={submitting} style={styles.button}>
                    {submitting ? 'Guardando...' : 'Guardar Cliente'}
                </button>
            </form>

            {message && (
                <p style={message.type === 'success' ? styles.successMsg : styles.errorMsg}>
                    {message.text}
                </p>
            )}
        </div>
    );
}

// Estilos básicos en línea para que luzca ordenado de inmediato
const styles = {
    container: {
        maxWidth: '400px',
        margin: '2rem auto',
        padding: '1.5rem',
        background: '#ffffff',
        borderRadius: '8px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        fontFamily: 'sans-serif'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.3rem'
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: 'bold',
        color: '#334155'
    },
    input: {
        padding: '0.75rem',
        borderRadius: '6px',
        border: '1px solid #cbd5e1',
        fontSize: '1rem'
    },
    button: {
        padding: '0.75rem',
        backgroundColor: '#2563eb',
        color: '#ffffff',
        border: 'none',
        borderRadius: '6px',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '0.5rem'
    },
    successMsg: {
        marginTop: '1rem',
        color: '#16a34a',
        backgroundColor: '#dcfce7',
        padding: '0.5rem',
        borderRadius: '4px',
        textAlign: 'center'
    },
    errorMsg: {
        marginTop: '1rem',
        color: '#dc2626',
        backgroundColor: '#fee2e2',
        padding: '0.5rem',
        borderRadius: '4px',
        textAlign: 'center'
    }
};