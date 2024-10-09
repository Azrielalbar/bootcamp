import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Logika pengiriman formulir atau panggilan API bisa ditambahkan di sini
        console.log('Form submitted:', formData);
    };

    return (
        <div>
            <nav style={styles.nav}>
                <ul style={styles.navList}>
                    <li style={styles.navItem}><a href="index.html" style={styles.navLink}>Home</a></li>
                    <li style={styles.navItem}><a href="about.html" style={styles.navLink}>About</a></li>
                    <li style={styles.navItem}><a href="contact.html" style={styles.navLink}>Contact</a></li>
                </ul>
            </nav>

            <section style={styles.section}>
                <h1>Contact Us</h1>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div>
                        <label style={styles.label}>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            style={styles.input}
                            required
                        />
                    </div>
                    <div>
                        <label style={styles.label}>Message:</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            style={styles.textarea}
                            required
                        />
                    </div>
                    <button type="submit" style={styles.button}>Send</button>
                </form>
            </section>
        </div>
    );
};

const styles = {
    nav: {
        backgroundColor: '#333',
        padding: '10px',
    },
    navList: {
        listStyleType: 'none',
        display: 'flex',
        justifyContent: 'flex-end',
        padding: 0,
    },
    navItem: {
        marginLeft: '15px',
    },
    navLink: {
        color: 'white',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
    section: {
        padding: '20px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '400px',
        margin: '0 auto',
    },
    label: {
        margin: '10px 0 5px',
    },
    input: {
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    textarea: {
        padding: '10px',
        marginBottom: '15px',
        borderRadius: '4px',
        border: '1px solid #ccc',
    },
    button: {
        padding: '10px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    }
};

export default Contact;
