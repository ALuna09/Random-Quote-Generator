import express from 'express';
import Sequelize from "sequelize";
import cors from 'cors';
import { createClient } from 'pexels';
import 'dotenv/config';

// Environment Variables
const {
  VITE_API_KEY, 
  IMG_API_KEY,
  MYSQL_PW
} = process.env;

const app = express();
const imgClient = createClient(IMG_API_KEY);

// Create a Sequelize instance of our db (saved_quotes)
const sequelize = new Sequelize(
  'saved_quotes',
  'root',
  MYSQL_PW,
  {
    dialect: 'mysql'
  }
)

const {
  DataTypes
} = Sequelize

// Check connection with db
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

// We are creating this Table (Or Model), and naming it 'quotes' in MySQL and 'SavedQuotes' in the file
const SavedQuotes = sequelize.define('quotes', {
  quote_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quote: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
  },
});

// This synchronizes the tables made with existing tables in MySQL
SavedQuotes.sync({ alter: true }).then(() => {
  console.log('Quotes table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Create a route to get all quotes
app.get('/savedquotes/all', (req, res) => {
  const quotes = SavedQuotes.findAll();
  res.json(quotes);
});

// Create a route to create a new quote record
app.post('/savedquotes', (req, res) => {
  console.log('REQ ====================>', req.body);
  const quotes = SavedQuotes.create({
    quote: req.body.quote,
    author: req.body.author
  }).then(() => {
    console.log('Quoted', 'someone')
    res.send(quotes);
  }).catch((err) => {
    console.error(`We couldn't save your quote`, err)
  });
});

// -------------------------API calls-------------------------
app.get('/quote', (req, res) => {
  fetch(`https://api.api-ninjas.com/v1/quotes`, {
    method: 'GET',
    mode: 'cors',
    contentType: 'application/json',
    headers: { 'X-Api-Key': VITE_API_KEY }
  })
  .then(res => res.json())
  .then(data => {
    res.send(data)
  })
  .catch(err => console.error(err))
})

app.get('/images', (req, res) => {
  imgClient.photos.search({ query: 'Space', per_page: 80 }).then(photos => {
    res.send(photos);
  });
})

// ------------Quick test route------------
app.get('/test', (req, res) => {
  res.send(`Hi! I'm the test route`)
})

// App listening on port
app.listen(8080, () => {
  console.log('Listening on port 8080');
})