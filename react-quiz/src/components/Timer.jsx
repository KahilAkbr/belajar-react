import {useEffect} from "react";

function Timer({dispatch, timeRemainging}) {
    useEffect(() => {
        const id = () => {
            setInterval(() => {
                dispatch({type : "timer"});
            }, 1000)
        }
        id()
        return() => clearInterval(id)

    }, [dispatch]);

    return(
        <>
            <div className={`timer`}>
                {timeRemainging}
            </div>
        </>
    )
}

export default Timer;