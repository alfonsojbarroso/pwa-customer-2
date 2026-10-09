import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { CustomerList } from './components/CustomerList';
import { CustomerAdd } from './components/CustomerAdd';


export default function App() {
  return (
    <BrowserRouter>
      <div style={{ fontFamily: 'sans-serif', minHeight: '100vh', backgroundColor: '#f8fafc' }}>

        {/* Barra de navegación superior con Links */}
        <nav style={styles.nav}>
          <Link to="/" style={styles.link}>🏠 Ver Clientes</Link>
          <Link to="/nuevo" style={styles.link}>➕ Registrar Cliente</Link>
        </nav>

        {/* Contenedor donde cambian las páginas dinámicamente */}
        <main style={{ padding: '2rem' }}>
          <Routes>
            <Route path="/" element={<CustomerList />} />
            <Route path="/nuevo" element={<CustomerAdd />} />
          </Routes>
        </main>

      </div>
    </BrowserRouter>
  );
}

// Estilos sencillos para el menú
const styles = {
  nav: {
    display: 'flex',
    gap: '1.5rem',
    padding: '1rem 2rem',
    backgroundColor: '#ffffff',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  link: {
    textDecoration: 'none',
    color: '#2563eb',
    fontWeight: 'bold',
    fontSize: '1rem'
  }
};