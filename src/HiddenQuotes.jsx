const HiddenQuotes = (props) => {
    const {
        getAllQuotes,
        hide,
        setHide,
        list,
        setList
    } = props;

    const deleteQuotes = () => {
        fetch(`http://localhost:8080/savedquotes/deleteall`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .catch(err => console.error(err))
    }
    
    const unsaveQuote = (quote) => {
        fetch(`http://localhost:8080/savedquotes/deleteone`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(quote)
        })
        .then(res => res.json())
        .catch(err => console.error(err))
    }

    return (
        <>
            {hide ?
            <span
            className="quotesDisplay">
                <button
                onClick={() => {
                    getAllQuotes();
                    setHide((prev) => !prev);
                }}>Show Quotes</button>
            </span>
            :
            <>
                <span
                className="quotesDisplay">
                    <button
                    onClick={() => setHide((prev) => !prev)}
                    >Hide Quotes</button>
                </span>
                {list.map(quoteObj => {
                    return (
                        <div
                        key={list.indexOf(quoteObj)}
                        className='hidden'>
                            <p>{quoteObj.quote}</p>
                            <p>- {quoteObj.author}</p>
                            <button
                            onClick={() => {
                                let newList = [...list];
                                newList.splice(list.indexOf(quoteObj), 1);
                                setList(newList);
                                unsaveQuote(quoteObj);
                            }}>Unsave</button>
                        </div>
                    )
                })}
                <div
                className='quotesDisplay'>
                    <button
                    onClick={() => {
                        setHide(true);
                        setList([]);
                        deleteQuotes();
                    }}>Unsave All</button>
                </div>
            </>}
        </>
    )
}

export default HiddenQuotes;