const express = require('express');
const connectDB = require('./config/db');
const app = express();
const path = require('path');

//Connect Database
connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.json({ msg: 'Welcome to the Contact App API' }));
const PORT = process.env.PORT || 5000;

const cors = require("cors");
// app.use(cors());
app.use("*", cors({
  origin: true,
  credentials: true
}));

//Define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/contacts', require('./routes/contacts'));
 
//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder 
  app.use(express.static('client/build'));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}

app.listen(PORT, () => console.log(`Server start on port ${PORT}`));
