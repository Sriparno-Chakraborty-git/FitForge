import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';
import { User, Target, Weight, Ruler, ChevronRight, LogOut } from 'lucide-react';

const Profile = () => {
    const { user, updateProfile, logout, theme, toggleTheme } = useApp();
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState(user);

    const handleSave = () => {
        updateProfile(formData);
        setEditing(false);
    };

    const sections = [
        { icon: <Weight size={20} />, label: 'Goal', value: user.goal, key: 'goal', options: ['Weight Loss', 'Muscle Gain', 'Strength', 'General Fitness'] },
        { icon: <Target size={20} />, label: 'Fitness Level', value: user.fitnessLevel, key: 'fitnessLevel', options: ['Beginner', 'Intermediate', 'Advanced'] },
        { icon: <Ruler size={20} />, label: 'Height (cm)', value: user.height, key: 'height', type: 'number' },
        { icon: <Weight size={20} />, label: 'Weight (kg)', value: user.weight, key: 'weight', type: 'number' },
    ];

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fade-in">
            <h1 style={{ marginBottom: '1.5rem' }}>Profile</h1>

            <div className="glass card" style={{ alignItems: 'center', marginBottom: '1.5rem', padding: '2rem 1.5rem' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: 'white' }}>
                    <User size={40} />
                </div>
                <h3>{user.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Member since April 2026</p>
            </div>

            <div className="glass card" style={{ gap: '1rem' }}>
                {sections.map(s => (
                    <div key={s.key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--glass-border)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <div style={{ color: 'var(--primary-color)' }}>{s.icon}</div>
                            <div>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{s.label}</p>
                                {editing ? (
                                    s.options ? (
                                        <select 
                                            value={formData[s.key]} 
                                            onChange={(e) => setFormData({...formData, [s.key]: e.target.value})}
                                            style={{ background: 'var(--surface-color)', color: 'white', border: 'none', padding: '2px 5px', borderRadius: '4px' }}
                                        >
                                            {s.options.map(o => <option key={o} value={o}>{o}</option>)}
                                        </select>
                                    ) : (
                                        <input 
                                            type={s.type} 
                                            value={formData[s.key]} 
                                            onChange={(e) => setFormData({...formData, [s.key]: e.target.value})}
                                            style={{ background: 'var(--surface-color)', color: 'white', border: 'none', width: '60px', borderRadius: '4px', padding: '2px 5px' }}
                                        />
                                    )
                                ) : (
                                    <p style={{ fontWeight: '500' }}>{s.value}</p>
                                )}
                            </div>
                        </div>
                        {!editing && <ChevronRight size={18} color="var(--text-secondary)" />}
                    </div>
                ))}
                
                <button 
                    className="btn-primary" 
                    style={{ marginTop: '1rem' }}
                    onClick={() => editing ? handleSave() : setEditing(true)}
                >
                    {editing ? 'Save Changes' : 'Edit Profile'}
                </button>
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div className="glass card" style={{ padding: '1rem', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} onClick={toggleTheme}>
                    <span>Appearance</span>
                    <span style={{ color: 'var(--primary-color)', fontWeight: '600' }}>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                </div>
                
                <button 
                    onClick={logout}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: 'var(--accent-color)', padding: '1rem' }}
                >
                    <LogOut size={20} />
                    Log Out
                </button>
            </div>
        </motion.div>
    );
};

export default Profile;
