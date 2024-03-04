import { useState } from 'react'
import './App.css'
import cors from "cors";

const {VITE_API_KEY} = import.meta.env;
const categories = [
`age`,
`alone`,
`amazing`,
`anger`,
`architecture`,
`art`,
`attitude`,
`beauty`,
`best`,
`birthday`,
`business`,
`car`,
`change`,
`communication`,
`computers`,
`cool`,
`courage`,
`dad`,
`dating`,
`death`,
`design`,
`dreams`,
`education`,
`environmental`,
`equality`,
`experience`,
`failure`,
`faith`,
`family`,
`famous`,
`fear`,
`fitness`,
`food`,
`forgiveness`,
`freedom`,
`friendship`,
`funny`,
`future`,
`god`,
`good`,
`government`,
`graduation`,
`great`,
`happiness`,
`health`,
`history`,
`home`,
`hope`,
`humor`,
`imagination`,
`inspirational`,
`intelligence`,
`jealousy`,
`knowledge`,
`leadership`,
`learning`,
`legal`,
`life`,
`love`,
`marriage`,
`medical`,
`men`,
`mom`,
`money`,
`morning`,
`movies`,
`success`,
];

function App() {
  const [quote, setQuote] = useState(`To Quote or Not to Quote...`);
  const [category, setCategory] = useState(categories[Math.floor(Math.random() * categories.length)]);
  const [author, setAuthor] = useState(`Somebody`);

  const getQuote = () => {
    fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      method: 'GET',
      mode: 'cors',
      contentType: 'application/json',
      headers: { 'X-Api-Key': VITE_API_KEY }
    })
      .then(res => res.json())
      .then(data => {
        setQuote(data[0].quote)
        setAuthor(data[0].author)
        // console.log('Succ Key',API_KEY);
      })
      .catch(err => {
        console.error(err)
        // console.log('Err Key',API_KEY);
      })
  }

  return (
    <div>
      <h1>Hello!</h1>
      <p>{quote}</p>
      <p>- {author}</p>
      <button
       onClick={getQuote}
      >New Quote</button>
    </div>
    )
  }
  
export default App