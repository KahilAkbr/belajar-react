// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import {useEffect, useState} from "react";

export default function App() {
    const [query, setQuery] = useState('');
    const [currentCurrency, setCurrentCurrency] = useState('USD');
    const [convertCurrency, setConvertCurrency] = useState('EUR');
    const [currency, setCurrency] = useState('')

    useEffect(() => {
        const controller = new AbortController();

        async function loadCurrency() {
            try {
                if(!query) return
                if(currentCurrency === convertCurrency) {
                    return setCurrency(()=>query)
                }
                const res = await fetch(`https://api.frankfurter.app/latest?amount=${query}&from=${currentCurrency}&to=${convertCurrency}`,
                    {signal : controller.signal})
                const data = await res.json();
                const convertedCurreny = Object.entries(data.rates)[0][1]
                setCurrency(()=>convertedCurreny.toString())
            } catch (e) {
                if (e.name !== 'AbortError') console.error(e.message);
            }

        }

        loadCurrency()

        return () => {
            controller.abort()
        }
    }, [query, currentCurrency, convertCurrency]);

    return (
        <div>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
            <select value={currentCurrency} onChange={(e) => setCurrentCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <select value={convertCurrency} onChange={(e) => setConvertCurrency(e.target.value)}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CAD">CAD</option>
                <option value="INR">INR</option>
            </select>
            <p>OUTPUT {currency}</p>
        </div>
    );
}
