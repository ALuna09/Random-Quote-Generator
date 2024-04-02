import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [quote, setQuote] = useState(`To Quote or Not to Quote...`);
  const [author, setAuthor] = useState(`Somebody`);

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

  const getImage = () => {
    fetch(`http://localhost:8080/images`)
    .then(res => res.json())
    .then(data => {
      let element = document.getElementById('body');
      element.style.backgroundImage = `url(${data.photos[Math.floor(Math.random() * 80)].src.original})`;
    })
    .catch(err => console.error(err))
  }

  const saveQuote = async () => {
    let payload = {
      quote,
      author
    };

    let postData = new FormData();
    postData.append('json', JSON.stringify(payload));

    await fetch(`http://localhost:8080/savedquotes`,{ 
      method: `POST`,
      // headers: {
      //   // 'Accept': 'application/json',
      //   'Content-Type': 'application/json'
      // },
      body: JSON.stringify(postData)
    })
    .then(res => {
      console.log(12345, res.json());
      return res.json();
    })
    .then(data => {
      console.log('My Data from the POST request', data);
      res.send(data);
    })
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
    </>
    )
}
  
export default App
