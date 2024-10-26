import {useEffect, useState} from "react";
import searchResponseScheme from "./response/SearchResponse.js";
import movieDetailSchema from "./response/MovieDetailResponse.js";
import StarRating from "./StarRating.jsx";

const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

function NavBar ({children}) {
    return(
        <>
            <nav className="nav-bar">
                <Logo/>
                {children}
            </nav>
        </>
    )
}

function Logo() {
    return(
        <>
            <div className="logo">
                <span role="img">🍿</span>
                <h1>usePopcorn</h1>
            </div>
        </>
    )
}

function NumResults({movies}) {
    return(
        <>
            <p className="num-results">
                Found <strong>{movies.length}</strong> results
            </p>
        </>
    )
}

function Search({query, setQuery}) {
    return (
        <>
        <input
                className="search"
                type="text"
                placeholder="Search movies..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
        </>
    )
}

function Main({children}) {
    return (
        <>
            <main className="main">
                {children}
            </main>
        </>
    )
}

function Box({children}) {
    const [isOpen, setIsOpen] = useState(true);

    return(
        <>
            <div className="box">
                <button
                    className="btn-toggle"
                    onClick={() => setIsOpen((open) => !open)}
                >
                    {isOpen ? "–" : "+"}
                </button>
                {isOpen && children}
            </div>
        </>
    )
}

function MovieList({movies, onSelectedMovie}) {
    return(
        <>
            <ul className="list list-movies">
                {movies?.map((movie) => (
                    <Movie movie={movie} key={movie.imdbID} onMovieSelected={onSelectedMovie}/>
                ))}
            </ul>
        </>
    )
}

function Movie({movie, onMovieSelected}) {
    // console.log(movie)
    return(
        <>
            <li key={movie.imdbID} onClick={()=>onMovieSelected(movie)}>
                <img src={movie.Poster} alt={`${movie.Title} poster`}/>
                <h3>{movie.Title}</h3>
                <div>
                    <p>
                        <span>🗓</span>
                        <span>{movie.Year}</span>
                    </p>
                </div>
            </li>
        </>
    )
}

// function WatchedBox() {
//     const [watched, setWatched] = useState(tempWatchedData);
//     const [isOpen2, setIsOpen2] = useState(true);
//     return (
//         <>
//             <div className="box">
//                 <button
//                     className="btn-toggle"
//                     onClick={() => setIsOpen2((open) => !open)}
//                 >
//                     {isOpen2 ? "–" : "+"}
//                 </button>
//                 {isOpen2 && (
//                     <>
//                         <WatchedSummary watched={watched}/>
//                         <WatchedMovieList watched={watched}/>
//                     </>
//                 )}
//             </div>
//         </>
//     )
// }

function WatchedSummary({watched}) {
    const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
    const avgUserRating = average(watched.map((movie) => movie.userRating));
    const avgRuntime = average(watched.map((movie) => movie.runtime));

    return(
        <>
            <div className="summary">
                <h2>Movies you watched</h2>
                <div>
                    <p>
                        <span>#️⃣</span>
                        <span>{watched.length} movies</span>
                    </p>
                    <p>
                        <span>⭐️</span>
                        <span>{avgImdbRating.toFixed(2)}</span>
                    </p>
                    <p>
                        <span>🌟</span>
                        <span>{avgUserRating.toFixed(2)}</span>
                    </p>
                    <p>
                        <span>⏳</span>
                        <span>{avgRuntime} min</span>
                    </p>
                </div>
            </div>
        </>
    )
}

function WatchedMovieList({watched, onWatchDeleted}) {
    return(
        <>
            <ul className="list">
                {watched.map((movie) => (
                    <WatchedMovie movie={movie} key={movie.imdbID} onWatchDeleted={onWatchDeleted}/>
                ))}
            </ul>
        </>
    )
}

function Loader() {
    return (
        <p className={`loader`}>
            Loading...
        </p>
    )
}

function ErrorMessage({message}) {
    return (
        <p className={`error`}>
            <span>Error</span> {message}
        </p>
    )
}

function WatchedMovie({movie, onWatchDeleted}) {
    return(
        <>
            <li key={movie.imdbID}>
                <img src={movie.poster} alt={`${movie.title} poster`}/>
                <h3>{movie.title}</h3>
                <div>
                    <p>
                        <span>⭐️</span>
                        <span>{movie.imdbRating}</span>
                    </p>
                    <p>
                        <span>🌟</span>
                        <span>{movie.userRating}</span>
                    </p>
                    <p>
                        <span>⏳</span>
                        <span>{movie.runtime} min</span>
                    </p>

                    <button onClick={()=>onWatchDeleted(movie.imdbID)} className={`btn-delete`}>❌</button>
                </div>
            </li>
        </>
    )
}

function MovieDetails({selectedMovieId, onCloseMovie, onAddWatched, watched}) {
    const [movie, setMovie] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [userRating, setUserRating] = useState('')

    const isMovieInWatched = watched.some(
        (watchedMovie) => watchedMovie.imdbID === selectedMovieId
    );

    const watchedUserRating = watched.find((movie) => movie.imdbID === selectedMovieId)?.userRating

    const {
        Title : title,
        Year : year,
        Poster : poster,
        imdbRating,
        Plot : plot,
        Released : released,
        Runtime : runtime,
        Actors : actors,
        Director : director,
        Genre : genre,
    } = movie

    useEffect(() => {
        const callback  = (e) => {
            if (e.key === 'Escape') {
                onCloseMovie()
            }
        }
        document.addEventListener('keydown', callback)

        return() => {
            document.removeEventListener('keydown', callback)
        }
    }, [onCloseMovie]);

    useEffect(() => {
        if(!title) return
        document.title = `Movie ${title}`;

        return () => {
            document.title = `Use Popcorn`;
        }
    }, [title]);

    useEffect(()=> {
        async function getMovieDetails() {
            try {
                setIsLoading(true)
                const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedMovieId}`)

                if(!res.ok) throw new Error("Something went wrong")

                const data =  await res.json();
                setMovie(data)
                // setError("")
            } catch (err) {
                // if(err.name !== "AbortError") setError
                console.log(err.message)
            } finally {
                setIsLoading(false)
            }
        }
        getMovieDetails()
    },[selectedMovieId])

    function handleAdd() {
        const newMovie = {
            imdbID : selectedMovieId,
            title,
            poster,
            imdbRating : Number(imdbRating),
            runtime : Number(runtime.split(" ").at(0)),
            userRating : userRating
        }

        onAddWatched(newMovie)
        onCloseMovie()
    }

    return(
        <>
            <div className={`details`}>
                {isLoading ? <Loader/> : (
                    <>
                        <header>
                            <button className={`btn-back`} onClick={onCloseMovie}>&larr;</button>
                            <img src={poster}/>
                            <div className={`details-overview`}>
                                <h2>{title}</h2>
                                <p>genre</p>
                                <p>
                                    <span>⭐</span>
                                    {imdbRating} IMDB Rating
                                </p>
                            </div>
                        </header>
                        <section>
                            <div className={`rating`}>
                                {isMovieInWatched ? <p>You rated this movie {watchedUserRating}</p> : (
                                    <>
                                        <StarRating maxRating={10} size={24} defaultRating={0}
                                                    key={movie.imdbID} onSetRating={setUserRating}/>
                                        {userRating > 0 &&
                                            <button className={`btn-add`} onClick={handleAdd}>Add to List</button>}
                                    </>

                                )}


                            </div>

                            <p><em>{plot}</em></p>
                            <p>Starring {actors}</p>
                            <p>Directed by {director}</p>
                        </section>
                    </>
                )}
            </div>
        </>
    )
}

const KEY = `f278511`

export default function App() {
    const [movies, setMovies] = useState([]);
    const [watched, setWatched] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [query, setQuery] = useState("marvel");
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")

    function handleSelectMovie(movie) {
        setSelectedMovie(selectedMovie => (movie === selectedMovie ? null : movie))
    }

    function handleCloseMovie() {
        setSelectedMovie(null)
    }

    function handleAddWatch(movie) {
        setWatched((watched) => [...watched, movie])

        // localStorage.setItem("watched", JSON.stringify([...watched, movie]))
    }

    function handleDeleteWatched(id) {
        setWatched((watched) => watched.filter(movie => movie.imdbID !== id))
    }

    useEffect(() => {
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
        handleCloseMovie()
        fetchMovies()

        return () => {
            abortController.abort()
        }
    },[query])

    return (
        <>
            <NavBar>
                <Search query={query} setQuery={setQuery}/>
                <NumResults movies={movies}/>
            </NavBar>
            <Main>
                <Box>
                    {/*{isLoading ? <Loader/> : <MovieList movies={movies}/>}*/}
                    {isLoading && <Loader/>}
                    {!isLoading && !error && <MovieList movies={movies} onSelectedMovie={handleSelectMovie}/>}
                    {error && <ErrorMessage message={error}/> }
                </Box>
                <Box>
                    {selectedMovie ? (
                            <MovieDetails selectedMovieId={selectedMovie.imdbID} onCloseMovie={handleCloseMovie}
                            onAddWatched={handleAddWatch} watched={watched}/>
                        ) : (
                            <>
                                <WatchedSummary watched={watched}/>
                                <WatchedMovieList watched={watched} movie={selectedMovie} onWatchDeleted={handleDeleteWatched}/>
                            </>
                        )
                    }
                </Box>
            </Main>
        </>
    )
}
