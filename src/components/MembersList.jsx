import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api/v1/members';

const MembersList = () => {
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(API_URL);
            setMembers(response.data.result);
            setError(null);
        } catch (err) {
            setError('Erreur lors du chargement des membres');
            console.error('Erreur:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce membre ?')) {
            try {
                await axios.delete(`${API_URL}/${id}`);
                fetchMembers(); // Recharger la liste
            } catch (err) {
                setError('Erreur lors de la suppression');
            }
        }
    };

    if (loading) return <div style={styles.center}>Chargement...</div>;
    if (error) return <div style={styles.error}>{error}</div>;

    return (
        <div style={styles.container}>
            <h2>Liste des Membres</h2>
            <button 
                onClick={() => navigate('/add')}
                style={styles.addButton}
            >
                ➕ Ajouter un membre
            </button>
            
            <div style={styles.grid}>
                {members.map(member => (
                    <div key={member.id} style={styles.card}>
                        <h3>{member.name}</h3>
                        <p>📧 {member.email}</p>
                        <p>🆔 ID: {member.id}</p>
                        <div style={styles.actions}>
                            <button 
                                onClick={() => navigate(`/edit/${member.id}`)}
                                style={styles.editButton}
                            >
                                ✏️ Modifier
                            </button>
                            <button 
                                onClick={() => handleDelete(member.id)}
                                style={styles.deleteButton}
                            >
                                🗑️ Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
    },
    center: {
        textAlign: 'center',
        padding: '2rem',
        fontSize: '1.2rem'
    },
    error: {
        color: 'red',
        textAlign: 'center',
        padding: '2rem'
    },
    addButton: {
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        marginBottom: '20px',
        fontSize: '1rem'
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '20px'
    },
    card: {
        border: '1px solid #ddd',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    actions: {
        display: 'flex',
        gap: '10px',
        marginTop: '15px'
    },
    editButton: {
        backgroundColor: '#f39c12',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer'
    },
    deleteButton: {
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer'
    }
};

export default MembersList;