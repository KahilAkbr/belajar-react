import "./App.css"
import {useState} from "react";

const faqs = [
    {
        title: "Where are these chairs assembled?",
        text:
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
    },
    {
        title: "How long do I have to return my chair?",
        text:
            "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
    },
    {
        title: "Do you ship to countries outside the EU?",
        text:
            "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
    }
];

function App() {
    return (
        <>
            <div>
                <Accordion/>
            </div>
        </>
    );
}

function Accordion() {
    const [currentOpen, setCurrentOpen] = useState(null)

    return (
        <>
            <div className={`accordion`}>
                {faqs.map((faq,index) => (
                    <AccordionItem
                        currentOpen={currentOpen}
                        onOpen={setCurrentOpen}
                        title={faq.title}
                        text={faq.text}
                        num={index + 1}
                        key={faq.title} />
                ))}
            </div>
        </>

    );
}

function AccordionItem({num, title, text, currentOpen, onOpen}) {
    const isOpen = num === currentOpen

    function handleOpen() {
        onOpen(isOpen ? null : num)
    }

    return (
        <>
            <div className={`item ${isOpen ? `open` : ``}`} onClick={handleOpen}>
                <p className={`number`}>{num <= 9 ? `0${num}` : num} </p>
                <p className={`title`}>{title}</p>
                <p className={`icon`}>{isOpen ? `-` : `+`}</p>
                {isOpen && (
                    <div className={`content-box`}>
                        {text}
                    </div>
                )}
            </div>
        </>
    )
}

export default App
