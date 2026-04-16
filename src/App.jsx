import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Home, Dumbbell, TrendingUp, Settings, User as UserIcon, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import Library from './pages/Library';
import Profile from './pages/Profile';
import Stats from './pages/Stats';

// Pages - moved to separate files
const Dashboard = () => {
    const { user, workoutPlan, completeWorkout } = useApp();
    const today = new Date().getDay(); // 0 is Sunday
    const todayWorkout = workoutPlan ? workoutPlan[today === 0 ? 6 : today - 1] : null;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fade-in">
            <header style={{ marginBottom: '2rem' }}>
                <h1 style={{ fontSize: '2rem' }}>Forge Ahead, {user?.name}</h1>
                <p style={{ color: 'var(--text-secondary)' }}>Today is {todayWorkout?.name || 'Rest Day'}</p>
            </header>

            <div className="glass card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Dumbbell size={20} color="var(--primary-color)" />
                    Today's Routine
                </h3>
                {todayWorkout?.exercises.length > 0 ? (
                    <ul style={{ listStyle: 'none' }}>
                        {todayWorkout.exercises.map((ex, i) => (
                            <li key={i} style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between' }}>
                                <span>{ex.name}</span>
                                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{ex.sets}x{ex.reps}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: 'var(--text-secondary)' }}>It's a rest day. Recharge for tomorrow!</p>
                )}
                {todayWorkout?.exercises.length > 0 && (
                    <button 
                        className="btn-primary" 
                        style={{ marginTop: '1.5rem' }}
                        onClick={() => completeWorkout(todayWorkout.day)}
                    >
                        Mark as Completed
                    </button>
                )}
            </div>

            <div className="glass card">
                <h3 style={{ marginBottom: '1rem' }}>Streaks 🔥</h3>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'space-between' }}>
                    {[1, 2, 3, 4, 5, 6, 7].map(d => (
                        <div key={d} style={{ width: '35px', height: '35px', borderRadius: '50%', background: 'var(--surface-color)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>
                            {d}
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

const Auth = () => {
    const { login } = useApp();
    const [name, setName] = React.useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        login({ name, fitnessLevel: 'Beginner', goal: 'General Fitness', age: 25, weight: 70, height: 175 });
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: '80vh' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>FitForge</h1>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: '2.5rem' }}>Build your legacy.</p>
            <form onSubmit={handleSubmit} className="glass card">
                <input 
                    type="text" 
                    placeholder="Enter your name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', padding: '1rem', borderRadius: '1rem', color: 'white', marginBottom: '1rem' }}
                    required
                />
                <button type="submit" className="btn-primary">Get Started</button>
            </form>
        </div>
    );
};

const Layout = ({ children }) => {
    const location = useLocation();
    const navItems = [
        { icon: <Home size={24} />, path: '/', label: 'Home' },
        { icon: <Dumbbell size={24} />, path: '/library', label: 'Library' },
        { icon: <TrendingUp size={24} />, path: '/stats', label: 'Stats' },
        { icon: <UserIcon size={24} />, path: '/profile', label: 'Profile' }
    ];

    return (
        <div className="container">
            <main style={{ paddingTop: '2rem', paddingBottom: '6rem' }}>
                {children}
            </main>

            <nav className="glass" style={{ position: 'fixed', bottom: '1.5rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-around', padding: '1rem', borderRadius: '2rem' }}>
                {navItems.map(item => (
                    <Link key={item.path} to={item.path} style={{ color: location.pathname === item.path ? 'var(--primary-color)' : 'var(--text-secondary)', transition: 'color 0.2s' }}>
                        {item.icon}
                    </Link>
                ))}
            </nav>
        </div>
    );
};

const App = () => {
  return (
    <Router>
      <AppProvider>
        <AppContent />
      </AppProvider>
    </Router>
  );
};

const AppContent = () => {
    const { user } = useApp();
    
    if (!user) return <div className="container"><Auth /></div>;

    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/library" element={<Library />} />
                <Route path="/stats" element={<Stats />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Layout>
    );
}

export default App;
