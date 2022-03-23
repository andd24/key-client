import { useEffect, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { addAnswer, getInterviewQuestions, completeInterview, getInterviewQuestionsByInterview, getSingleInterview, addNotes, updateInterview } from "./InterviewManager"

export const ConductInterviewForm = () => {
    const [interviewQuestions, setInterviewQuestions] = useState([])
    const [answer, setAnswer] = useState("")
    const { interviewId } = useParams()
    const history = useHistory()
    const [storedInterview, setStoredInterview] = useState({})
    const [interview, setInterview] = useState({
        project: 0,
        subject: "",
        location: "",
        scheduled_date: "",
        questions: new Set(),
        notes: ""
    })

    useEffect(() => {
        getSingleInterview(interviewId).then(setStoredInterview)
        getInterviewQuestionsByInterview(interviewId).then(setInterviewQuestions)
        getSingleInterview(interviewId).then((newInterview) => {
            setInterview({
                project: newInterview.project.id,
                subject: newInterview.subject,
                location: newInterview.location,
                scheduled_date: newInterview.scheduled_date,
                questions: new Set(newInterview.questions.map(question => question.id)),
                notes: newInterview.notes
            })})
    }, [interviewId])

    const finishInterview = () => {
        // evt.preventDefault()
        const updatedInterview = {
            project: interview.project,
            subject: interview.subject,
            location: interview.location,
            scheduled_date: interview.scheduled_date,
            questions: Array.from(interview.questions),
            notes: interview.notes
        }

        updateInterview(updatedInterview, interviewId)
        completeInterview(interviewId)
        .then(history.push(`/projects/${interview.project}`))
    }

    return (
        <>
        <h1>Conduct Interview</h1>
        {interviewQuestions.map(interviewQuestion => {
            return ( 
                // <Link to={`/interviews/conduct/${interviewQuestion.id}`}>Start </Link>
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
        <h4>Notes</h4>
                <label className="label"></label>
                    <div className="control">
                        <input
                            type="textarea"
                            className="input"
                            placeholder="notes" 
                            value={interview.notes}
                            onChange={
                                (evt) => {
                                    const copy = { ...interview }
                                    copy.notes = evt.target.value
                                    setInterview(copy)
                                }
                            } />
                    </div>
        <button onClick={finishInterview}>Conclude Interview</button>
        </>
    )
}

// { interview.notes === ""
// ? <form> <label className="label"></label>
//     <input
//         type="textarea"
//         placeholder="notes"
//         className="input"
//         required autoFocus
//         onChange={
//             (evt) => {
//                 const copy = evt.target.value
//                 setNote(copy)
//             }
//         } />
// <button onClick={() => { addNotes(note, interviewId) }}>Save</button>
// </form>
// : <div>{interview.notes}</div>
//     }