import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost', // AWS RDS의 경우 RDS 엔드포인트로 변경
    user: 'root',
    password: 'root',
    database: 'idol',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
})

export default pool
