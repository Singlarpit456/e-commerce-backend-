
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const path = require('path');

const User = require('./models/User'); // Importing the User model

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('\Users\agraw\Documents\shop\backend'));
app.use(express.static("public"));
// app.use(express.static("backend"));

mongoose.connect('mongodb://localhost:27017/Database', { useNewUrlParser: true, useUnifiedTopology: true }); // Adding useNewUrlParser and useUnifiedTopology options
var db = mongoose.connection;
db.on('error', (err) => console.error("Error in connecting to db:", err)); // Logging the error
db.once('open', () => console.log("Connected to db"));

// Route for handling signup
app.post("/sign_up", async (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    try {
        const user = await User.findOne({ email: email });

        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = new User({
            name: name,
            email: email,
            password: password
        });

        await newUser.save();

        // Redirect to index.html after successful signup
        return res.redirect('/login.html');
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});



app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        // Check if the user exists in the database
        const users = await User.findOne({ email: email });

        if (!users) {
            // User not found
            return res.status(404).json({ message: "User not found" });
        }

        // password is correct
        if (password !== users.password) {
            // Incorrect password
            return res.status(401).json({ message: "Incorrect password" });
        }

        
        // return res.status(200).json({ message: "Login successful" });
        res.redirect('index.html');
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});


app.listen(2000, () => {
    console.log('Server is running on http://localhost:2000');
});
