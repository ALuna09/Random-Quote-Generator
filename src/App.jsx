import { useEffect, useState } from 'react'
import './App.css'
import HiddenQuotes from './HiddenQuotes';

function App() {
  const [quote, setQuote] = useState(`To Quote or Not to Quote...`);
  const [author, setAuthor] = useState(`Somebody`);
  const [hide, setHide] = useState(true);
  const [list, setList] = useState([]);

  const twitterHref = `https://twitter.com/intent/tweet?text=${'"' + quote + '"' + '  -' + author}`;
  
  const getQuote = () => {
    fetch(`http://localhost:8080/quote`)
    .then(res => res.json())
    .then(data => {
      setQuote(data[0].quote)
      setAuthor(data[0].author)
    })
    .catch(err => console.error(err))
  }

  const getAllQuotes = () => {
    fetch(`http://localhost:8080/savedquotes/all`)
    .then(res => res.json())
    .then(data => {
      let listOfQuotesAsHTML = data.map(
        (quoteObj) => {
          return (
            <div
            key={data.indexOf(quoteObj)}
            className='hidden'>
              <p>{quoteObj.quote}</p>
              <p>- {quoteObj.author}</p>
              <button
              onClick={unsaveQuote}>Unsave</button>
            </div>
          )
        }
      )
      setList(listOfQuotesAsHTML)
    })
    .catch(err => console.error(err))
  }

  const unsaveQuote = () => {
    fetch(`http://localhost:8080/savedquotes/deleteone`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        quote,
        author
      })
    })
    .then(res => {
      console.log('RES>>>>>>>>>>>', res);
      return res.json()
    })
    .then(data => {
      res.send(data)
      console.log(7777777777777, data)
    })
    .catch(err => console.error(err))
  }

  const getImage = () => {
    fetch(`http://localhost:8080/images`)
    .then(res => res.json())
    .then(data => {
      const randomPhotoURL = data.photos[Math.floor(Math.random() * 80)].src.original;
      const element = document.getElementById('body');
      element.style.backgroundImage = `url(${randomPhotoURL})`;
    })
    .catch(err => console.error(err))
  }

  const saveQuote = () => {
    // Options necessary to pass desired data to 
    fetch(`http://localhost:8080/savedquotes`,{ 
      method: `POST`,
      // Headers must be included for POST methods
      headers: {
        'Content-Type': 'application/json'
      },
      // Body content must be a JSON.stringified object
      body: JSON.stringify({
        quote,
        author
      })
    })
    .then(res => res.json())
    .catch(err => console.error(err));
  }

  useEffect(() => {
    getImage();
  }, [])
  
  return (
    <>
      <div
        className='quote'
      >
        <p>{quote}</p>
        <p>- {author}</p>
      </div>
      <div
      className='buttons'>
        <button
        onClick={() => {
          getQuote();
          getImage();
        }}
        className='newQuote'
        >New Quote</button>
        <button
          onClick={saveQuote}
        >Save</button>
        <a
        href={twitterHref}
        target="_blank">
          <button>𝕏</button>
        </a>
        <button
          onClick={() => navigator.clipboard.writeText(`${quote}\n- ${author}`)}
          className='copy'
        >Copy</button>
      </div>
      <HiddenQuotes 
      hide={hide}
      setHide={setHide}
      list={list}
      getAllQuotes={getAllQuotes}/>
    </>
  )
}
  
export default App
