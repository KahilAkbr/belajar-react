import {useState} from "react";

function App() {
    return (
    <>
      <div>
        <Counter/>
      </div>
    </>
    )
}

function Counter() {
    const [step, setStep] = useState(1);
    const [count, setCount] = useState(0);

    // function increaseStep() {
    //     setStep((step) => step + 1);
    // }
    // function decreaseStep() {
    //     if(step > 1) setStep((step) => step - 1);
    // }

    function increaseCount() {
        setCount((count) => count + step);
    }
    function decreaseCount() {
        if(count > 0) setCount((count) => {
            if (count - step < 0) return 0;
            return count - step;
        });
    }

    function handleReset() {
        setStep(1)
        setCount(0);
    }

    return(
        <div style={{display : 'flex', justifyContent:'center', alignItems: 'center', flexDirection : 'column'}}>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                <input
                    type={`range`}
                    min={1}
                    max={10}
                    value={step}
                    onChange={(e) => {setStep(Number(e.target.value))}}
                />
                <p>{step}</p>
            </div>

            {/*<div className={`stepCounter`} style={{display : "flex", flexDirection : "row", marginBottom:"10px"}} >*/}
            {/*    <button onClick={decreaseStep}>Kurang</button>*/}
            {/*    <div style={{margin : "12px"}}>Step : {step}</div>*/}
            {/*    <button onClick={increaseStep}>Tambah</button>*/}
            {/*</div>*/}

            <div className={`dayCounter`} style={{display : "flex", flexDirection : "row"}}>
                <button onClick={decreaseCount}>Kurang</button>
                <input
                    type={`text`}
                    value={count}
                    onChange={(e) => {setCount(Number(e.target.value))}}
                />
                {/*<div style={{margin: "12px"}}>Count : {count}</div>*/}
                <button onClick={increaseCount}>Tambah</button>
            </div>
            <DateComponent count={count} />

            <button onClick={handleReset}>Reset</button>
        </div>
    )
}

function DateComponent({count}) {
    return (
        <>
            <div>
                {
                    count === 0 ? (
                            <p>
                                Today is {new Date().toDateString()}
                            </p>
                        ) :
                        <p>
                            {count} days from today is {new Date(new Date().setDate(new Date().getDate() + count)).toDateString()}
                        </p>
                }
            </div>
        </>
    )
}

export default App
