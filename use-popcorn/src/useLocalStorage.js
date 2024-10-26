import {useEffect, useState} from "react";

function useLocalStorage(initialState, key) {
    const [value, setValue] = useState(() => {
        const storedValue = localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : initialState
    });

    useEffect(() => {
        localStorage.setItem("watched", JSON.stringify(value))
    }, [value, key]);

    return [value, setValue]
}

export { useLocalStorage };