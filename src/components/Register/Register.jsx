import { useState } from 'react';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [numero, setNumero] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 1) Crear usuario en Auth
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // 2) (Opcional pero recomendado) setear displayName en el perfil de Auth
      const fullName = `${nombre} ${apellido}`.trim();
      await updateProfile(user, { displayName: fullName });

      // 3) Guardar datos adicionales en Firestore
      const telefonoNormalizado = numero.replace(/\s+/g, '');
      await setDoc(doc(db, 'users', user.uid), {
        nombre,
        apellido,
        numero: telefonoNormalizado,
        email,
        createdAt: serverTimestamp()
      });

      alert('Registro exitoso');
      navigate('/login');
    } catch (error) {
      alert('Error al registrarse: ' + error.message);
    }
  };

  return (
    <div className="auth-container">
      <h1 className="auth-title">Registro</h1>
      <form onSubmit={handleRegister} className="auth-form">
        <input
          type="text"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="auth-input"
          required
        />
        <input
          type="text"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          className="auth-input"
          required
        />
        <input
          type="tel"
          placeholder="Número de teléfono"
          value={numero}
          onChange={(e) => setNumero(e.target.value)}
          className="auth-input"
          required
        />
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
          required
        />
        <button type="submit" className="auth-button">Registrarse</button>
      </form>
      <p className="auth-link">¿Ya tienes cuenta? <a href="/login">Inicia Sesión</a></p>
    </div>
  );
}

export default Register;
