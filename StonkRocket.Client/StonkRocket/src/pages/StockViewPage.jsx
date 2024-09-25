import SearchComponent from "../components/SearchComponent"
import StockView from "../components/StockView"

const stockViewPage = () => {
    const [stonk, setStonk] = useState();

    return(
        <div>
            <SearchComponent />
            <StockView />
        </div>
    )
}