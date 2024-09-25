const StockView = ({ stock }) => {
    if (!stock) {
        return(
            <div>Loading</div>)
    }

    return (
        <>
        <div>
            <h1><strong>Ticker: </strong>{stock.results[0].T}</h1>
          <p><strong>Open:</strong> {stock.results[0].o}</p>
          <p><strong>High:</strong> {stock.results[0].h}</p>
          <p><strong>Low:</strong> {stock.results[0].l}</p>
          <p><strong>Close:</strong> {stock.results[0].c}</p>
          <p><strong>Volume:</strong> {stock.results[0].v}</p>
          <p><strong>VWAP:</strong> {stock.results[0].vw}</p>
          <p><strong>Transactions:</strong> {stock.results[0].n}</p>
        </div>
        </>
    )
}

export default StockView;