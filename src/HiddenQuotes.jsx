const HiddenQuotes = (props) => {
    const {
        getAllQuotes,
        hide,
        setHide,
        list
    } = props;

    let quotesData;
    console.log(5555555555, list);

    return (
        <>
            {hide ?
            <button
            className="quotesDisplay"
            onClick={() => {
                quotesData = getAllQuotes();
                setHide((prev) => !prev)
            }}
            >Show Quotes</button> :
            <div
            className="hidden">
                {list}
                <button
                className="quotesDisplay"
                onClick={() => setHide((prev) => !prev)}
                >Hide Quotes</button>
            </div>
            }
        </>
    )
}

export default HiddenQuotes;