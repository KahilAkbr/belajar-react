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
            {/*<Steps/>*/}
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
                            <StepMessage step={step}>
                                <div>{messages[step - 1]}</div>
                            </StepMessage>
                            <div className={`buttons`}>
                                <Button
                                    textColor={`#fff`}
                                    backgroundColor={`#7950f2`}
                                    onClick={handlePrevious}>
                                    <span>👈</span> Previous
                                </Button>
                                <Button
                                    textColor={`#fff`}
                                    backgroundColor={`#7950f2`}
                                    onClick={handleNext}>
                                    Next <span>👉</span>
                                </Button>
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    )
}

function StepMessage({step, children}) {
    return (
        <>
            <div className={`message`}>
                <h3>Step {step}</h3>
                {children}
            </div>
        </>
    )
}

function Button({textColor, backgroundColor, onClick, children}) {
    return (
        <button style={{backgroundColor: backgroundColor, color: textColor}} onClick={onClick}>
            {children}
        </button>
    )
}

export default App
