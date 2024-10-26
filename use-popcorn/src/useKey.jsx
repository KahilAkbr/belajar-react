import {useEffect} from "react";

function useKey (callbackFunction, key, action) {
    // callback?.()
    useEffect(() => {
        const callback  = (e) => {
            if (e.code.toLowerCase() === key.toLowerCase()) {
                console.log(e)
                console.log(key)
                callbackFunction()
            }
        }
        document.addEventListener(action, callback)

        return() => {
            document.removeEventListener(action, callback)
        }
    }, [callbackFunction, key, action]);

}

export {useKey}