import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getCompletedInterviewsByProject } from "../interviews/InterviewManager"

export const ProjectInterviews = ({projectId}) => {
    const [interviews, setInterviews] = useState([])

    useEffect(() => {
        getCompletedInterviewsByProject(projectId).then(setInterviews)
    }, [projectId])

    return (
        <>
        <div className="title is-4">Interviews</div>
        {
            interviews.map((interview) => {
                return <div><Link to={`/interviews/${interview.id}/view`}>{interview.subject}</Link></div>
            })
        }
        </>
    )
}