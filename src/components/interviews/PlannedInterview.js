import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, useHistory } from "react-router-dom"
import { getQuestions } from "../questions/QuestionManager"
import { deleteInterview, getSingleInterview } from "./InterviewManager"

export const PlannedInterview = () => {
    const history = useHistory()
    const { interviewId } = useParams()
    const [interview, setInterview] = useState({})
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        getSingleInterview(interviewId).then(i => setInterview(i))
        getQuestions().then(q => setQuestions(q))
    }, [interviewId])

    return (
        <section className="message is-light m-6   ">
            <div className="message-header">
                <div className="title is-3">{interview.subject} @ {interview.location}</div>
                <button className="delete mr-3 my-3" onClick={() => {
                    deleteInterview(interview.id)
                        .then(setInterview)
                        .then(() => {history.push(`/projects/${interview.project?.id}`)})
                }}>Delete Interview</button>
            </div> 
            <div className="message-body">
                <div className="title is-4">Scheduled date: {interview.scheduled_date}</div>
                {interview.questions?.map((question) => {
                    return (
                        <div className="title is-6 m-3">{question.question}</div>
                )})}
                <div className="title is-5 mt-5">Notes: {interview.notes} </div>
                <button className="button"><Link to={`/interviews/${interviewId}/edit`}>Edit Interview</Link></button>

                <button className="button"><Link to={`/interviews/${interviewId}/conduct`}>CONDUCT INTERVIEW</Link></button>
                <button className="button" onClick={() => history.push(`/projects/${interview.project.id}`)}>Back to Project</button>
            </div>
        </section>
    )   
}