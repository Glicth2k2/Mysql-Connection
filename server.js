const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', 
    password: 'Manojkh#2002',  
    database: 'userdb'
});


db.connect((err) => {
    if (err) {
        console.error('Could not connect to the database:', err);
        process.exit(1);
    }
    console.log('Connected to the database');
});


app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

   
    db.query('SELECT * FROM users WHERE username = ? OR email = ?', [username, email], (err, results) => {
        if (results.length > 0) {
            res.send('Username or email already exists. Please choose a different one.');
        } else {
            
            bcrypt.hash(password, 10, (err, hashedPassword) => {
                if (err) {
                    res.send('Error hashing the password');
                    return;
                } 
                db.query('INSERT INTO users (username, email, password) VALUES (?, ?, ?)', [username, email, hashedPassword], (err) => {
                    if (err) {
                        res.send('Error registering the user');
                        console.error(err);
                    } else {
                        res.send(`Registration successful! Welcome, ${username}`);
                    }
                });
            });
        }
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            res.send('Error during login');
            return;
        }

        if (results.length === 0) {
            res.send('Invalid username or password');
        } else {
            const user = results[0];

            bcrypt.compare(password, user.password, (err, match) => {
                if (match) {
                    res.send(`Login successful! Welcome back, ${user.username}`);
                } else {
                    res.send('Invalid username or password');
                }
            });
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
