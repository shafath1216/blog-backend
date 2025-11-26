import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    user: 'ghost_admin',
    host: '192.168.0.120',
    database: 'ghost_blog',
    password: 'ghost',
    port: 5432,
});

pool.connect()
    .then(() => {
        console.log('Connected to the database successfully!');
        pool.end();
    })
    .catch((err) => {
        console.error('Failed to connect to the database:', err.message);
    });