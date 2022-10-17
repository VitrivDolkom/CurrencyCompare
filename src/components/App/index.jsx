import { createContext, useEffect, useState } from "react";
import Block from "../Block";
import "./main.scss";
import "./style.scss";


const App = () => {
    const [currencies, setCur] = useState({});
    const [fromCurrency, setFromCurrency] = useState("USD");
    const [toCurrency, setToCurrency] = useState("EUR");
    const [fromPrice, setFromPrice] = useState("");
    const [toPrice, setToPrice] = useState("");

    const getCurrency = () => {
        fetch("https://cdn.cur.su/api/latest.json")
            .then((rowData) => rowData.json())
            .then((currencyList) => setCur(currencyList.rates));
    }



    const setPrice = (newValue, type) => {
        if (type === "from") {
            setFromPrice(newValue);
            countToValue(newValue);
        } else {
            setToPrice(newValue);
            countFromValue(newValue);
        }
    }
    const countToValue = (newValue = fromPrice) => {
        if (fromCurrency === toCurrency || newValue === "") {
            setToPrice(newValue);
            return;
        }
        let totalPrice = +newValue / currencies[fromCurrency] * currencies[toCurrency];
        setToPrice(totalPrice.toFixed(4));
    }

    const countFromValue = (newValue = toPrice) => {
        if (fromCurrency === toCurrency || newValue === "") {
            setFromPrice(newValue);
            return;
        }
        let totalPrice = +newValue / currencies[toCurrency] * currencies[fromCurrency];
        setFromPrice(totalPrice.toFixed(4));
    }

    useEffect(() => {
        countToValue();
    }, [fromCurrency]);

    useEffect(() => {
        countFromValue();
    }, [toCurrency])


    useEffect(() => {
        getCurrency();
    }, [])

    return (
        <div className="app">
            <Block current={fromCurrency}
                changeCurrency={(cur) => setFromCurrency(cur)}
                changeValue={(newValue) => setPrice(newValue, "from")}
                price={fromPrice}
                currency={fromCurrency} />
            <Block current={toCurrency}
                changeCurrency={(cur) => setToCurrency(cur)}
                price={toPrice}
                changeValue={(newValue) => setPrice(newValue, "to")}
                currency={toCurrency} />
        </div>
    );
}

export default App;