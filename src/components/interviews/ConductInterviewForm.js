import { useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { addAnswer, getInterviewQuestions, completeInterview } from "./InterviewManager"

export const ConductInterviewForm = () => {
    const [interviewQuestions, setInterviewQuestions] = useState([])
    const [answer, setAnswer] = useState("")
    const { interviewId } = useParams()
    const history = useHistory()

    useEffect(() => {
        getInterviewQuestions().then(setInterviewQuestions)
    }, [interviewId])

    const finishInterview = () => {
        completeInterview(interviewId)
        .then(history.push(`/interviews/${interviewId}`))
    }

    return (
        <>
        <h1>Conduct Interview</h1>
        {interviewQuestions.map(interviewQuestion => {
            return (
                <>
                <div>{interviewQuestion.question.question}</div>
                { interviewQuestion.answer === "" 
                    ? <form>
                    <label className="label"></label>
                    <input
                        type="textarea"
                        placeholder="answer"
                        className="input"
                        onChange={
                            (evt) => {
                                const copy = evt.target.value
                                setAnswer(copy)
                            }
                        } />
                    <button onClick={() => { addAnswer(answer, interviewQuestion.id) }}>Save</button>
                    </form>
                    : <div>{interviewQuestion.answer}</div>
                }
                
                </>
            )
        })
        }
        <button onClick={finishInterview}>Done</button>
        </>
    )
}