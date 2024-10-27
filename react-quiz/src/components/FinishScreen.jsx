function FinishScreen({points, totalPoints, highScore, dispatch}) {
    const percentage = points / totalPoints * 100;
    return(
        <>
            <p className={`result`}>
                You scored <strong>{points}</strong> out of {totalPoints} ({percentage}%)
            </p>
            <p className={`highscore`}>Highscore: {highScore} points</p>

            <button
                className={`btn btn-ui`}
                onClick={() => dispatch({type: 'restart'})}
            >
                Restart Quiz
            </button>
        </>
    )
}

export default FinishScreen;