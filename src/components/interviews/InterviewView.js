import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getInterviewQuestionsByInterview, getSingleInterview } from "./InterviewManager"

export const InterviewView = () => {
    const [interviewquestions, setInterviewQuestions] = useState([])
    const [interview, setInterview] = useState({})
    const { interviewId } = useParams()

    useEffect(() => {
        getSingleInterview(interviewId).then(setInterview)
        getInterviewQuestionsByInterview(interviewId).then(questions => setInterviewQuestions(questions))
    }, [interviewId])

    return (
        <>
        <div className="container m-6 p-6 has-background-link-light">


        </div>
        <h3>Interview with {interview.subject}</h3>
        <h4>{interview.location} on {interview.collection_date}</h4>
        {interviewquestions.map((iq) => {
            return <>
            <div>{iq.question?.question}</div>
            {iq.answer 
            ? <div>{iq.answer}</div>
            : <div>not answered</div>
            }
            
            </>

        })}
                {/* <div>
            <button><Link to={`/projects/${interview.project?.id}`}>Back to project</Link></button>
        </div> */}
        </>
    )
}