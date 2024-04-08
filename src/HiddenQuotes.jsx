const HiddenQuotes = (props) => {
    const {
        getAllQuotes,
        hide,
        setHide
    } = props;
    
    let listOfQuotes = [];

    console.log(5555555555, props.getAllQuotes());

    return (
        <div
        className="hidden"
        >
            {hide ?
            <button
            className="quotesDisplay"
            onClick={() => {
                listOfQuotes = getAllQuotes();
                console.log(5698713, listOfQuotes);
                setHide((prev) => !prev)
            }}
            >Show Quotes</button> :
            <>
                {listOfQuotes}
                <button
                className="quotesDisplay"
                onClick={() => setHide((prev) => !prev)}
                >Hide Quotes</button>
            </>
            }
        </div>
    )
}

export default HiddenQuotes;