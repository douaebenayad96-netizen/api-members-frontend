import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav style={styles.navbar}>
            <h2 style={styles.logo}>📋 Gestion des Membres</h2>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>Liste</Link>
                <Link to="/add" style={styles.link}>Ajouter</Link>
            </div>
        </nav>
    );
};

const styles = {
    navbar: {
        backgroundColor: '#2c3e50',
        padding: '1rem 2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: 'white'
    },
    logo: {
        margin: 0
    },
    links: {
        display: 'flex',
        gap: '20px'
    },
    link: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1.1rem'
    }
};

export default Navbar;