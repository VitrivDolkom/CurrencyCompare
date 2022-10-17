import mostPopularCurrencies from "../../data/mostPopular";
import "./style.scss";

const Block = ({ price, current, changeValue, changeCurrency }) => {

    return (
        <div className="block">
            <ul>
                {mostPopularCurrencies.map((currency) => {
                    return <li onClick={() => changeCurrency(currency)}
                        className={currency === current ? "active" : ""} key={currency}>{currency}</li>;
                })}
                {/* <li>
                    <svg height="50px" viewBox="0 0 50 50" width="50px">
                        <rect fill="none" height="50" width="50" />
                        <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
                    </svg>
                </li> */}
            </ul>
            <input
                type="text"
                value={price}
                placeholder={""} 
                onChange={(e) => changeValue(e.target.value)} 
                />
        </div>
    );
}

export default Block;