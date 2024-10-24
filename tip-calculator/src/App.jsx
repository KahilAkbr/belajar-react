import {useState} from "react";

function App() {
    const [bill, setBill] = useState(0)
    const [percentage1, setPercent1] = useState(0)
    const [percentage2, setPercent2] = useState(0)

    const tip = percentage1 / 100 * bill + percentage2 / 100 * bill

    function handleReset() {
        setBill(0)
        setPercent1(0)
        setPercent2(0)
    }

    return(
        <>
            <BillInput bill={bill} onChange={setBill}/>
            <SatisfiedPercentage percentage={percentage1} onSelect={setPercent1}>
                How did you like the service?
            </SatisfiedPercentage>
            <SatisfiedPercentage percentage={percentage2} onSelect={setPercent2}>
                How did your friend like the service?
            </SatisfiedPercentage>
            <Output bill={bill} tip={tip}/>
            <Reset onReset={handleReset}/>
        </>
    )
}

function BillInput({bill, onChange}) {
    return(
        <>
            <div style={{display : 'flex', flexDirection:'row'}}>
                <div>How much was the bill?</div>
                <input type={`text`} value={bill} onChange={e=> onChange(Number(e.target.value))}/>
            </div>
        </>
    )
}

function SatisfiedPercentage({children, percentage, onSelect}) {

    return (
        <div style={{display : 'flex', flexDirection:'row'}}>
            {children}
            <select value={percentage} onChange={e=> onSelect(Number(e.target.value))}>
                <option value="0">0%</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="20">20%</option>
            </select>
        </div>
    )
}

function Output({bill, tip}) {
    const total = bill + tip
    return (
        <>
            <div>
                You pay ${total} (${bill} + ${tip} tip)
            </div>
        </>
    )
}

function Reset({onReset}) {
    return (
        <>
            <button onClick={onReset}>Reset</button>
        </>
    )
}

export default App


