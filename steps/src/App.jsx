import {useState} from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

function App() {
    return (
        <>
            <Steps/>
            <Steps/>
        </>
    )
}

function Steps() {
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    function handleNext() {
        if (step < messages.length) setStep((step) => step + 1)
    }

    function handlePrevious() {
        if (step > 1) setStep((step) => step - 1)
    }

    function handleClose() {
        setIsOpen((isOpen) => !isOpen);
        // isOpen ? setIsOpen(false) : setIsOpen(true);
    }

    return (
        <>
            <div>
                <button className={`close`} onClick={handleClose}>&times;</button>
                { isOpen &&
                    (
                        <div className={`steps`}>
                            <div className={`numbers`}>
                                <div className={step === 1 ? `active` : ``}>1</div>
                                <div className={step === 2 ? `active` : ``}>2</div>
                                <div className={step === 3 ? `active` : ``}>3</div>
                            </div>

                            <p className={`message`}>
                                Step {step} : {messages[step - 1]}
                            </p>

                            <div className={`buttons`}>
                                <button style={{backgroundColor: "#7950f2", color: "#fff"}}
                                        onClick={handlePrevious}>Previous
                                </button>
                                <button style={{backgroundColor: "#7950f2", color: "#fff"}} onClick={handleNext}>Next
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default App
