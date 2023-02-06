// declarations
require('dotenv').config()
const {ENVIROMENT, PORT} = process.env;
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();

// routes import
const dogRoutes = require('./routes/dogRoutes');

// middleware setup
app.use(morgan(ENVIROMENT));
app.use(bodyParser.json());

app.use('/dogs', dogRoutes);


app.get('/', (req, res) => {
	res.json({greetings: 'hello world'});
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));