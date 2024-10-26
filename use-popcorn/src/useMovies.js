import {useEffect, useState} from "react";
import searchResponseScheme from "./response/SearchResponse.js";

const KEY = `f278511`

function useMovies (query) {
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        // callback?.()

        const abortController = new AbortController()
        async function fetchMovies() {
            try {
                setIsLoading(true);
                setError("")
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal : abortController.signal})
                const data =  await res.json();
                const parsedData = searchResponseScheme.safeParse(data)

                if(!res.ok) throw new Error("Something went wrong")
                // if(!parsedData.success) throw new Error("Movie Not Found!")
                if(!data.Search ? '' : data.Search)
                    setMovies(data.Search)
                setError("")
                // console.log(parsedData.data.Search)
            } catch (err) {
                console.log(err.message)
                err.name !== "AbortError" && setError(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        if(query.length < 3) {
            setMovies([])
            setError('')
            return
        }
        // handleCloseMovie()
        fetchMovies()

        return () => {
            abortController.abort()
        }
    },[query])

    return {movies, isLoading, error}
}

export {useMovies};