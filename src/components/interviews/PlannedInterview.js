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
        <section className="message is-info m-5">
        <h1>{interview.scheduled_date}</h1>
        {/* <div>
            <img src={project.imgurl}></img>
        </div> */}
        <div>{interview.subject} @ {interview.location}</div>
        {interview.questions?.map((question) => {
            return (
                <div>{question.question}</div>
        )})}

        <button className="button mr-3 my-3" onClick={() => {
                    deleteInterview(interview.id)
                        .then(setInterview)
                        .then(() => {history.push(`/projects/${interview.project?.id}`)})
                }}>Delete Interview</button>

        </section>
    )
}