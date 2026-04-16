import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, CheckCircle, Activity } from 'lucide-react';

const Stats = () => {
    const { history, user } = useApp();
    
    const weeklyProgress = history.length;
    const streak = history.length > 0 ? history.length : 0; // Simplified for demo
    
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fade-in">
            <h1 style={{ marginBottom: '1.5rem' }}>Your Progress</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                <div className="glass card" style={{ padding: '1.25rem' }}>
                    <div style={{ color: 'var(--success-color)', marginBottom: '0.5rem' }}><CheckCircle size={24} /></div>
                    <h2 style={{ fontSize: '1.5rem' }}>{weeklyProgress}</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Workouts Done</p>
                </div>
                <div className="glass card" style={{ padding: '1.25rem' }}>
                    <div style={{ color: 'var(--accent-color)', marginBottom: '0.5rem' }}><Activity size={24} /></div>
                    <h2 style={{ fontSize: '1.5rem' }}>{streak}</h2>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Day Streak 🔥</p>
                </div>
            </div>

            <div className="glass card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <TrendingUp size={20} color="var(--primary-color)" />
                    Body Weight (kg)
                </h3>
                <div style={{ height: '150px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '1rem 0', gap: '5px' }}>
                    {[68, 69, 68.5, 69.2, 70, user.weight].map((w, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                            <div style={{ 
                                width: '100%', 
                                height: `${(w/100) * 100}%`, 
                                background: i === 5 ? 'var(--primary-color)' : 'var(--surface-color)', 
                                borderRadius: '4px',
                                transition: 'height 1s ease'
                            }}></div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>W{i+1}</span>
                        </div>
                    ))}
                </div>
            </div>

            <h3 style={{ marginBottom: '1rem' }}>Activity History</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {history.length > 0 ? history.slice().reverse().map((entry, i) => (
                    <div key={i} className="glass card" style={{ padding: '1rem', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h4 style={{ fontSize: '0.9rem' }}>{entry.workoutName}</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{new Date(entry.date).toLocaleDateString()}</p>
                        </div>
                        <CheckCircle size={20} color="var(--success-color)" />
                    </div>
                )) : (
                    <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>No activity recorded yet. Start your first workout!</p>
                )}
            </div>
        </motion.div>
    );
};

export default Stats;
