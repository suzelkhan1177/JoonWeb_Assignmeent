const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root123',
    database: 'jooncorporation_assignment'
  });
  
  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to the MySQL database');
  });


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