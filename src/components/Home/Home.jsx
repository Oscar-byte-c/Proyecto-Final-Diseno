// src/Components/Home/Home.jsx
import { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import {
  doc, setDoc, getDoc, serverTimestamp,
  collection, query, where, getDocs, deleteDoc
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,  
  Legend,
} from 'chart.js';
import './Home.css';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Home() {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [displayName, setDisplayName] = useState('Usuario');

  // Estado para marcar reservas
  const [dayReservation, setDayReservation] = useState(null); // slot reservado del día
  const [reservasByDate, setReservasByDate] = useState({});   // {'YYYY-MM-DD': true}

  const [userStats, setUserStats] = useState({
    name: '',
    career: '',
    age: '',
    weight: '',
    height: '',
    workoutsCompleted: '',
    avgWorkoutTime: ''
  });

  // === Cerrar sesión ===
  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/login');
    } catch (error) {
      alert('Error al cerrar sesión: ' + error.message);
    }
  };

  // ==== Helpers fecha ====
  const formatDateLocal = (d) => {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  };
  const todayLocalISO = formatDateLocal(new Date());
  const isPastDate = (d) => formatDateLocal(d) < todayLocalISO;

  // ==== Slots defecto ====
  const generateSlotsForDate = (date) => {
    const day = date.getDay();
    if (day === 0 || day === 6) {
      return ['09:00 - 10:00', '11:00 - 12:00', '16:00 - 17:00'];
    }
    return ['07:00 - 08:00', '09:00 - 10:00', '12:00 - 13:00', '15:00 - 16:00', '17:00 - 18:00'];
  };

  // ==== Cargar usuario + perfil + stats ====
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          const nombre = data?.nombre?.trim() || '';
          const apellido = data?.apellido?.trim() || '';
          const fullName = `${nombre} ${apellido}`.trim();
          setDisplayName(fullName || user.displayName || user.email || 'Usuario');
        } else {
          setDisplayName(user.displayName || user.email || 'Usuario');
        }
      } catch {
        setDisplayName(user.displayName || user.email || 'Usuario');
      }

      const statsDoc = await getDoc(doc(db, 'userStats', user.uid));
      if (statsDoc.exists()) setUserStats(statsDoc.data());
    });

    return unsubscribe;
  }, []);

  // ==== Guardar stats ====
  const handleSaveStats = async () => {
    const user = auth.currentUser;
    if (!user) return alert('Debes iniciar sesión para guardar datos');
    try {
      await setDoc(doc(db, 'userStats', user.uid), userStats, { merge: true });
      alert('Datos guardados correctamente');
    } catch (error) {
      console.error('Error al guardar estadísticas:', error);
      alert('Error al guardar estadísticas');
    }
  };

  // ==== Agenda base ====
  const schedules = {
    '2025-08-01': ['08:00 - 09:00', '10:00 - 11:00', '14:00 - 15:00'],
    '2025-08-02': ['09:00 - 10:00', '12:00 - 13:00', '16:00 - 17:00'],
    '2025-08-03': ['07:00 - 08:00', '11:00 - 12:00', '15:00 - 16:00'],
    '2025-08-10': ['09:00 - 10:00', '11:00 - 12:00', '15:00 - 16:00'],
  };

  // ==== Actualizar slots al cambiar fecha ====
  useEffect(() => {
    const formattedDate = formatDateLocal(selectedDate);
    const slots = schedules[formattedDate] || generateSlotsForDate(selectedDate);
    setAvailableSlots(isPastDate(selectedDate) ? [] : slots);
  }, [selectedDate]);

  // ==== Consultar reserva del día (para marcar) ====
  useEffect(() => {
    const fetchDayReservation = async () => {
      const user = auth.currentUser;
      if (!user) return setDayReservation(null);

      const fecha = formatDateLocal(selectedDate);
      try {
        const q = query(
          collection(db, 'reservas'),
          where('uid', '==', user.uid),
          where('fecha', '==', fecha)
        );
        const snap = await getDocs(q);
        if (!snap.empty) {
          const data = snap.docs[0].data();
          setDayReservation(data.slot || null);
        } else {
          setDayReservation(null);
        }
      } catch (e) {
        console.error('Error leyendo reserva del día:', e);
        setDayReservation(null);
      }
    };
    fetchDayReservation();
  }, [selectedDate]);

  // ==== Consultar reservas del mes (para puntito calendario) ====
  useEffect(() => {
    const fetchMonthReservations = async () => {
      const user = auth.currentUser;
      if (!user) return setReservasByDate({});

      const y = selectedDate.getFullYear();
      const m = selectedDate.getMonth();
      const monthStart = new Date(y, m, 1);
      const monthEnd = new Date(y, m + 1, 0);

      const startStr = formatDateLocal(monthStart);
      const endStr = formatDateLocal(monthEnd);

      try {
        const q = query(
          collection(db, 'reservas'),
          where('uid', '==', user.uid),
          where('fecha', '>=', startStr),
          where('fecha', '<=', endStr)
        );
        const snap = await getDocs(q);
        const map = {};
        snap.forEach(docu => {
          const d = docu.data();
          if (d.fecha) map[d.fecha] = true;
        });
        setReservasByDate(map);
      } catch (e) {
        console.error('Error leyendo reservas del mes:', e);
        setReservasByDate({});
      }
    };
    fetchMonthReservations();
  }, [selectedDate]);

  // ==== Reservar (1 por día) ====
  const handleReserve = async (slot) => {
    const user = auth.currentUser;
    if (!user) return alert('Debes iniciar sesión para reservar');

    const fecha = formatDateLocal(selectedDate);
    if (isPastDate(selectedDate)) return alert('Selecciona una fecha futura');

    try {
      const q = query(
        collection(db, 'reservas'),
        where('uid', '==', user.uid),
        where('fecha', '==', fecha)
      );
      const snap = await getDocs(q);
      if (!snap.empty) {
        alert(`Ya tienes una reserva para el ${fecha}.`);
        const data = snap.docs[0].data();
        setDayReservation(data.slot || null);
        setReservasByDate(prev => ({ ...prev, [fecha]: true }));
        return;
      }

      const reservaId = `${user.uid}_${fecha}_${slot.replace(/\W/g, '')}`;
      await setDoc(doc(db, 'reservas', reservaId), {
        uid: user.uid,
        displayName,
        email: user.email || null,
        fecha,
        slot,
        createdAt: serverTimestamp(),
      });

      setDayReservation(slot);
      setReservasByDate(prev => ({ ...prev, [fecha]: true }));

      alert(`Reserva guardada para ${slot} el ${fecha}`);
    } catch (err) {
      console.error('Error al reservar:', err);
      alert('No se pudo guardar la reserva');
    }
  };

  // ==== Cancelar reserva del día ====
  const handleCancelReservation = async () => {
    const user = auth.currentUser;
    if (!user) return alert('Debes iniciar sesión');

    const fecha = formatDateLocal(selectedDate);

    try {
      const q = query(
        collection(db, 'reservas'),
        where('uid', '==', user.uid),
        where('fecha', '==', fecha)
      );
      const snap = await getDocs(q);
      if (snap.empty) {
        alert('No tienes reserva para esta fecha.');
        return;
      }

      // Eliminar todas las reservas de ese día (por seguridad)
      await Promise.all(snap.docs.map(d => deleteDoc(d.ref)));

      // Actualizar UI
      setDayReservation(null);
      setReservasByDate(prev => {
        const next = { ...prev };
        delete next[fecha];
        return next;
      });

      alert('Reserva cancelada.');
    } catch (err) {
      console.error('Error al cancelar la reserva:', err);
      alert('No se pudo cancelar la reserva.');
    }
  };

  // ==== Chart ====
  const chartData = {
    labels: ['Edad', 'Peso', 'Altura', 'Entren.', 'Tiempo'],
    datasets: [
      {
        label: 'Estadísticas',
        data: [
          Number(userStats.age || 0),
          parseFloat(userStats.weight || 0),
          parseFloat(userStats.height || 0),
          Number(userStats.workoutsCompleted || 0),
          parseFloat(userStats.avgWorkoutTime || 0),
        ],
        backgroundColor: '#8f5f3f',
        borderColor: '#e6b77d',
        borderWidth: 2,
        barThickness: 20,
      },
    ],
  };
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top', labels: { color: '#ffffff', font: { size: 14 } } },
      title: { display: true, text: 'Estadísticas', color: '#e6b77d', font: { size: 18 } },
    },
    scales: {
      y: { beginAtZero: true, ticks: { color: '#ffffff', font: { size: 12 } } },
      x: { ticks: { color: '#ffffff', font: { size: 12 } } },
    },
  };

  const fechaUI = formatDateLocal(selectedDate);
  const hasReservationToday = !!dayReservation;

  return (
    <div className="home-container">
      <div className="hero" />

      {/* Botón Cerrar Sesión */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 1.5rem' }}>
        <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
      </div>

      <h1 className="welcome-text">
        Bienvenido, <span className="user-name">{displayName}</span>
      </h1>

      <div className="main-content">
        {/* ===== Estadísticas ===== */}
        <section className="stats-section">
          <h2 className="section-title">Estadísticas del Usuario</h2>
          <div className="stats-list">
            <label>Nombre:
              <input
                type="text"
                value={userStats.name}
                onChange={(e) => setUserStats({ ...userStats, name: e.target.value })}
              />
            </label>
            <label>Carrera:
              <input
                type="text"
                value={userStats.career}
                onChange={(e) => setUserStats({ ...userStats, career: e.target.value })}
              />
            </label>
            <label>Edad:
              <input
                type="number"
                value={userStats.age}
                onChange={(e) => setUserStats({ ...userStats, age: e.target.value })}
              />
            </label>
            <label>Peso (kg):
              <input
                type="text"
                value={userStats.weight}
                onChange={(e) => setUserStats({ ...userStats, weight: e.target.value })}
              />
            </label>
            <label>Altura (m):
              <input
                type="text"
                value={userStats.height}
                onChange={(e) => setUserStats({ ...userStats, height: e.target.value })}
              />
            </label>
            <label>Entrenamientos Completados:
              <input
                type="number"
                value={userStats.workoutsCompleted}
                onChange={(e) => setUserStats({ ...userStats, workoutsCompleted: e.target.value })}
              />
            </label>
            <label>Tiempo Promedio de Entrenamiento (min):
              <input
                type="text"
                value={userStats.avgWorkoutTime}
                onChange={(e) => setUserStats({ ...userStats, avgWorkoutTime: e.target.value })}
              />
            </label>
            <button onClick={handleSaveStats}>Guardar</button>
          </div>

          <div className="chart-container">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </section>

        {/* ===== Calendario ===== */}
        <section className="column calendar-section">
          <h2 className="section-title">Calendario</h2>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="custom-calendar"
            tileClassName={({ date, view }) => {
              if (view !== 'month') return null;
              const key = formatDateLocal(date);
              return reservasByDate[key] ? 'calendar-has-reserva' : null;
            }}
            tileContent={({ date, view }) => {
              if (view !== 'month') return null;
              const key = formatDateLocal(date);
              if (!reservasByDate[key]) return null;
              return <span className="calendar-dot" />;
            }}
            tileDisabled={({ date, view }) => view === 'month' && isPastDate(date)}
          />
        </section>

        {/* ===== Cupos ===== */}
        <section className="column slots-section">
          <h2 className="section-title">Cupos Disponibles</h2>

          <div style={{ width: '100%' }}>
            <input
              type="date"
              value={fechaUI}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              min={todayLocalISO}
              style={{ width: '100%' }}
            />

            {hasReservationToday && (
              <div className="reservation-banner">
                <span>Reserva para el <strong>{fechaUI}</strong>: <strong>{dayReservation}</strong></span>
                <button className="btn-cancel" onClick={handleCancelReservation}>
                  Cancelar reserva
                </button>
              </div>
            )}
          </div>

          <ul className="slots-list">
            {!isPastDate(selectedDate) && availableSlots.length > 0 ? (
              availableSlots.map((slot) => {
                const isSelected = dayReservation === slot;
                return (
                  <li key={slot}>
                    <span className={isSelected ? 'slot-selected' : ''}>{slot}</span>
                    <button
                      className={isSelected ? 'btn-selected' : ''}
                      onClick={() => handleReserve(slot)}
                      disabled={hasReservationToday && !isSelected}
                    >
                      {isSelected ? 'Reservado' : 'Reservar'}
                    </button>
                  </li>
                );
              })
            ) : (
              <li>{isPastDate(selectedDate) ? 'Selecciona una fecha futura' : 'No hay horarios disponibles'}</li>
            )}
          </ul>
        </section>
      </div>

      <div className="facilities-section">
        <h2 className="section-title">Contamos con:</h2>
        <div className="facilities-images">
          <div className="facility-item">
            <img src="/public/imagenes/equipo-nivel.webp" alt="Equipamiento de primer nivel" />
            <p>Equipamiento de primer nivel</p>
          </div>
          <div className="facility-item">
            <img src="/public/imagenes/sala-clases.webp" alt="Sala de Clases Grupales" />
            <p>Sala de Clases Grupales</p>
          </div>
          <div className="facility-item">
            <img src="/public/imagenes/peso2.avif" alt="Peso Integrado" />
            <p>Peso Integrado</p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <p>&copy; 2025 Polygym</p>
        <p>Contacto: info@polygym.com | +1-123-456-7890</p>
        <p>Horario: Lunes-Viernes, 8:00 AM - 6:00 PM</p>
      </footer>
    </div>
  );
}

export default Home;
