// src/App.jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Contacto from './components/Contacto/Contacto';
import SobreNosotros from './components/Sobrenosotros/SobreNosotros';

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <div className="logo">🏋️‍♂️ Polygym</div> {/* Logo placeholder */}
        <div className="nav-links">
          <Link to="/">Inicio</Link> | 
          <Link to="/register">Registrarse</Link> | 
          <Link to="/login">Acceso</Link> | 
          <Link to="/contacto">Contáctanos</Link> | 
          <Link to="/sobre-nosotros">Sobre Nosotros</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;