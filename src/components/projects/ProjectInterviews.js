import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCompletedInterviewsByProject } from "../interviews/InterviewManager"
import "./Project.css"

export const ProjectInterviews = ({projectId}) => {
    const [interviews, setInterviews] = useState([])

    useEffect(() => {
        getCompletedInterviewsByProject(projectId).then(setInterviews)
    }, [projectId])

    return (
        <>
        <h2>Interviews</h2>
        {
            interviews.map((interview) => {
                return <div><Link to={`/interviews/${interview.id}/view`}>{interview.subject}</Link></div>
            })
        }
        </>
    )
}