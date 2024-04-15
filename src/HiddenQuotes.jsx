const HiddenQuotes = (props) => {
    const {
        getAllQuotes,
        hide,
        setHide,
        list
    } = props;

    const deleteQuotes = () => {
        fetch(`http://localhost:8080/savedquotes/deleteall`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res);
            res.json()
        })
        .then(data => {console.log(data)})
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
                        setHide((prev) => !prev)
                    }}
                >Show Quotes</button>
            </span>
            :
            <>
                <span
                className="quotesDisplay">
                    <button
                        onClick={() => setHide((prev) => !prev)}
                    >Hide Quotes</button>
                </span>
                {list}
                <button
                    onClick={deleteQuotes}
                >Unsave All</button>
            </>}
        </>
    )
}

export default HiddenQuotes;