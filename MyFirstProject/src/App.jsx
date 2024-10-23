import {useEffect, useState} from "react";

function App() {
    const [advice, setAdvice] = useState("");
    const [clickCount, setClickCount] = useState(0)

    async function getAdvice() {
        const res = await fetch("https://api.adviceslip.com/advice")
        const data = await res.json()
        setAdvice(data.slip.advice)
        setClickCount(count => count + 1)
    }

    useEffect(function() {
        getAdvice()
    },[])

    return (
        <div>
            <h1>{advice}</h1>
            <button onClick={getAdvice}>Get Advice!</button>
            <ClickCount clickCount = {clickCount}/>
        </div>
    )
}

function ClickCount(props) {
    return (
        <p>Kamu Telah Menekan Tombol Sebanyak {props.clickCount} Kali</p>
    )
}

export default App
