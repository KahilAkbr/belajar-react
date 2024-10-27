import DateCounter from "./DateCounter.jsx";
import Header from "./Header.jsx";
import Content from "./Content.jsx";
import {useEffect, useReducer} from "react";
import Loader from "./Loader.jsx";
import Error from "./Error.jsx";
import StartScreen from "./StartScreen.jsx";
import Question from "./Question.jsx";
import NextButton from "./NextButton.jsx";
import Progress from "./Progress.jsx";
import FinishScreen from "./FinishScreen.jsx";
import Footer from "./Footer.jsx";
import Timer from "./Timer.jsx";

const initialState = {
    questions: [],
    status: 'loading', //loading, error, ready, active, finished
    currentQuestionIndex: 0,
    answer: null,
    points: 0,
    highScore : 0,
    timeRemaining: 300
}

const reducer = (state, action) =>{
    switch (action.type) {
        case 'dataReceived':
            return {
                ...state,
                questions: action.payload,
                status: 'ready',
            }

        case 'dataFailed':
            return {
                ...state,
                status: 'error',
            }

        case 'start' :
            return {
                ...state,
                status: 'active',
            }

        case 'newAnswer' : {
            const question = state.questions.at(state.currentQuestionIndex)

            return {
                ...state,
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points : state.points
            }
        }

        case 'nextQuestion' : {
            return {
                ...state,
                currentQuestionIndex : state.currentQuestionIndex + 1,
                answer: null
            }
        }

        case 'finish' : {
            return {
                ...state,
                status : "finished",
                highScore: state.points > state.highScore ? state.points : state.highScore
            }
        }

        case 'restart' : {
            return {
                ...initialState,
                questions: state.questions,
                status: 'ready',
                highScore: state.highScore
            }
        }

        case 'timer' : {
            return {
                ...state,
                timeRemaining: state.timeRemaining - 1,
                status : state.timeRemaining === 0 ? 'finished' : state.status
            }
        }

        default:
            throw new Error("Unknown action")
    }
}

function App() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const {questions, status, currentQuestionIndex, answer, points, highScore, timeRemaining} = state

    const numQuestions = questions.length
    const totalPoints = questions.reduce((acc, question) => acc + question.points, 0);

    useEffect(() => {
        async function getData() {
            try{
                const res = await fetch("http://localhost:8000/questions")
                const data = await res.json()
                dispatch({type:'dataReceived', payload: data})
            } catch (error) {
                console.log(error)
                dispatch({type:'dataFailed'})
            }
        }
        getData()
    }, []);
    return(
        <>
            <div className={`app`}>
                <Header/>
                <Content>
                    {status === 'loading' && <Loader/>}
                    {status === 'error' && <Error/>}
                    {status === 'ready' && (
                        <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
                    )}
                    {status === 'active' && (
                        <>
                            <Progress index={currentQuestionIndex} numQuestions={numQuestions} points={points} totalPoints={totalPoints} answer={answer}/>
                            <Question question={questions[currentQuestionIndex]} dispatch={dispatch} answer={answer}/>
                            <Footer>
                                <Timer dispatch={dispatch} timeRemainging={timeRemaining}/>
                                <NextButton dispatch={dispatch} answer={answer} index={currentQuestionIndex} numQuestions={numQuestions}/>
                            </Footer>
                        </>
                    )}
                    {status === 'finished' && (
                        <>
                            <FinishScreen points={points} totalPoints={totalPoints} highScore={highScore} dispatch={dispatch}/>
                        </>
                    )}
                </Content>
            </div>
        </>
    )
}

export default App
