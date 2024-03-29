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

// Create a Sequelize instance
const sequelize = new Sequelize(
  'saved_quotes',
  'root',
  MYSQL_PW,
  {
    dialect: 'mysql'
  }
)

const {
  DataTypes,
  Op
} = Sequelize

// Check connection with db
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

// This is a Table (Or Model)
const SavedQuotes = sequelize.define('quotes', {
  quote_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  quote: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
  },
});

// This synchronizes the tables made with existing tables in MySQL
// ? Might want to change "force" to "alter"
SavedQuotes.sync({ alter: true }).then(() => {
  console.log('Quotes table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World');
});

// Create a route to get all users
app.get('/quotes', async (req, res) => {
  const quotes = await SavedQuotes.findAll();
  res.json(quotes);
});

// Create a route to create a new user
app.post('/testquotes', async (req, res) => {
  const quotes = await SavedQuotes.create({
    quote: "Don't quote me boi. I aint said shit",
    author: "Eazy E"
  }).then(() => {
    console.log('Quoted Eazy E')
  }).catch((err) => {

    console.error('8=D',err)
  });
  console.log('123456798',quotes)
  res.send(quotes);
});

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

app.get('/test', (req, res) => {
  res.send(`Hi! I'm the test route`)
})

app.listen(8080, () => {
  console.log('Listening on port 8080');
})