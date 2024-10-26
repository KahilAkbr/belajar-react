import {useState} from "react";
import PropTypes from "prop-types";

TextExpander.propTypes = {
    collapsedNumWords: PropTypes.number,
    expandButtonText: PropTypes.string,
    collapseButtonText: PropTypes.string,
    buttonColor: PropTypes.string,
    expanded: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
}

export default function App() {
    return (
        <div>
            <TextExpander>
                Space travel is the ultimate adventure! Imagine soaring past the stars
                and exploring new worlds. Its the stuff of dreams and science fiction,
                but believe it or not, space travel is a real thing. Humans and robots
                are constantly venturing out into the cosmos to uncover its secrets and
                push the boundaries of whats possible.
            </TextExpander>

            <TextExpander
                collapsedNumWords={20}
                expandButtonText="Show text"
                collapseButtonText="Collapse text"
                buttonColor="#ff6622"
            >
                Space travel requires some seriously amazing technology and
                collaboration between countries, private companies, and international
                space organizations. And while its not always easy (or cheap), the
                results are out of this world. Think about the first time humans stepped
                foot on the moon or when rovers were sent to roam around on Mars.
            </TextExpander>

            <TextExpander expanded={true} className="box">
                Space missions have given us incredible insights into our universe and
                have inspired future generations to keep reaching for the stars. Space
                travel is a pretty cool thing to think about. Who knows what well
                discover next!
            </TextExpander>
        </div>
    );
}

function TextExpander({
    collapsedNumWords = 10,
    expandButtonText = "Show More",
    collapseButtonText = "Show Less",
    buttonColor = 'white',
    expanded = false,
    className = "",
    children
}) {
    const [isExpanded, setIsExpanded] = useState(expanded);

    const displayText = isExpanded ? children : `${children.split(' ').slice(0, collapsedNumWords).join(' ')}...`;

    return (
        <>
            <div className={className} onClick={()=>setIsExpanded(!isExpanded)}>
                {isExpanded ? (
                    <>
                        <span>{displayText}</span>
                        <button style={{backgroundColor: buttonColor}}>{collapseButtonText}</button>
                    </>
                ) : (
                    <>
                        <span>{displayText}</span>
                        <button style={{backgroundColor: buttonColor}}>{expandButtonText}</button>
                    </>
                )}
            </div>

        </>
    );
}
