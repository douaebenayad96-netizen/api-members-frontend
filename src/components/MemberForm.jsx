import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8081/api/v1/members';

const MemberForm = () => {
    const [formData, setFormData] = useState({
        id: '',
        name: '',
        email: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    useEffect(() => {
        if (isEditMode) {
            fetchMember();
        }
    }, [id]);

    const fetchMember = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/${id}`);
            setFormData(response.data.result);
        } catch (err) {
            setError('Erreur lors du chargement du membre');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            if (isEditMode) {
                await axios.put(`${API_URL}/${id}`, {
                    name: formData.name,
                    email: formData.email
                });
                alert('Membre modifié avec succès !');
            } else {
                await axios.post(API_URL, {
                    id: parseInt(formData.id),
                    name: formData.name,
                    email: formData.email
                });
                alert('Membre ajouté avec succès !');
            }
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Une erreur est survenue');
        } finally {
            setLoading(false);
        }
    };

    if (loading && isEditMode) return <div style={styles.center}>Chargement...</div>;

    return (
        <div style={styles.container}>
            <h2>{isEditMode ? 'Modifier le membre' : 'Ajouter un membre'}</h2>
            
            {error && <div style={styles.error}>{error}</div>}
            
            <form onSubmit={handleSubmit} style={styles.form}>
                {!isEditMode && (
                    <div style={styles.formGroup}>
                        <label>ID :</label>
                        <input
                            type="number"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            required
                            style={styles.input}
                            placeholder="Entrez l'ID"
                        />
                    </div>
                )}
                
                <div style={styles.formGroup}>
                    <label>Nom :</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        placeholder="Entrez le nom"
                    />
                </div>
                
                <div style={styles.formGroup}>
                    <label>Email :</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                        placeholder="Entrez l'email"
                    />
                </div>
                
                <div style={styles.buttons}>
                    <button 
                        type="submit" 
                        disabled={loading}
                        style={styles.submitButton}
                    >
                        {loading ? 'En cours...' : (isEditMode ? 'Modifier' : 'Ajouter')}
                    </button>
                    
                    <button 
                        type="button" 
                        onClick={() => navigate('/')}
                        style={styles.cancelButton}
                    >
                        Annuler
                    </button>
                </div>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '500px',
        margin: '2rem auto',
        padding: '2rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
    center: {
        textAlign: 'center',
        padding: '2rem'
    },
    error: {
        color: 'red',
        marginBottom: '1rem',
        padding: '10px',
        backgroundColor: '#ffebee',
        borderRadius: '4px'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem'
    },
    formGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
    },
    input: {
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '4px',
        fontSize: '1rem'
    },
    buttons: {
        display: 'flex',
        gap: '1rem',
        marginTop: '1rem'
    },
    submitButton: {
        flex: 1,
        padding: '12px',
        backgroundColor: '#2ecc71',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem'
    },
    cancelButton: {
        flex: 1,
        padding: '12px',
        backgroundColor: '#95a5a6',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1rem'
    }
};

export default MemberForm;