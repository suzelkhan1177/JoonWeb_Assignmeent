const mysql = require('mysql');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DATABASE,
  connectionLimit: 100,
});

db.on('error', (err) => {
  if (err.code === 'PROTOCOL_CONNECTION_LOST' ) {
    console.error('MySQLdb lost. Reconnecting...');
    handleReconnect();
  } else {
    throw err;
  }
});

// Establish the initialdb
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL Line -23:', err);

  } else {
    console.log('Connected to MySQL server');

  }
});

// Example reconnect logic
const handleReconnect = () => {
  db.end();

  db.connect((err) => {
    if (err) {
      console.error('Error reconnecting to MySQL Line - 37:', err);

    } else {
      console.log('Reconnected to MySQL server');
    }
  });
};

const createTables = () => {
  const userTableQuery = `
      CREATE TABLE User (
        id INT PRIMARY KEY AUTO_INCREMENT,
        profilepic VARCHAR(255),
        name VARCHAR(255),
        slug VARCHAR(255),
        created DATETIME,
        modified DATETIME
      )
    `;

  const blogTableQuery = `
    CREATE TABLE Blog (
      blogid INT PRIMARY KEY AUTO_INCREMENT,
      blogimage VARCHAR(255),
      blogtitle VARCHAR(255),
      blogslug VARCHAR(255),
      blogcontent TEXT,
      blogcreated DATETIME,
      blogmodified DATETIME,
      userId INT,
      FOREIGN KEY (userId) REFERENCES User(id)
    )
    `;

  db.query(userTableQuery, (error) => {
    if (error) {
      console.error('Table Already created');
    } else {
      console.log('User table created successfully.');
    }
  });

  db.query(blogTableQuery, (error) => {
    if (error) {
      console.error('Table Already created');
    } else {
      console.log('Blog table created successfully.');
    }
  });
};

createTables();


module.exports = db;