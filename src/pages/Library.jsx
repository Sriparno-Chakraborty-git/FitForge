import React, { useState } from 'react';
import { Search, Filter, Play } from 'lucide-react';
import { EXERCISES } from '../utils/workoutEngine';
import { motion } from 'framer-motion';

const Library = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('All');

    const filtered = EXERCISES.filter(ex => 
        (filter === 'All' || ex.category === filter) &&
        ex.name.toLowerCase().includes(search.toLowerCase())
    );

    const categories = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core', 'Cardio'];

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="fade-in">
            <h1 style={{ marginBottom: '1.5rem' }}>Exercise Library</h1>

            <div style={{ position: 'relative', marginBottom: '1rem' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input 
                    type="text" 
                    placeholder="Search exercises..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ width: '100%', background: 'var(--surface-color)', border: '1px solid var(--glass-border)', padding: '0.8rem 1rem 0.8rem 3rem', borderRadius: '1rem', color: 'white' }}
                />
            </div>

            <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '1rem', marginBottom: '1rem' }}>
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setFilter(cat)}
                        style={{ 
                            padding: '0.5rem 1rem', 
                            borderRadius: '2rem', 
                            background: filter === cat ? 'var(--primary-color)' : 'var(--surface-color)',
                            color: 'white',
                            whiteSpace: 'nowrap',
                            fontSize: '0.85rem'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {filtered.map(ex => (
                    <div key={ex.id} className="glass card" style={{ padding: '1rem', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ width: '50px', height: '50px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Play size={20} color="var(--primary-color)" />
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '1rem' }}>{ex.name}</h4>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{ex.category} • {ex.difficulty}</p>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default Library;
