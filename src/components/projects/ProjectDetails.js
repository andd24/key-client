import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, useHistory } from "react-router-dom"
import { getInterviews } from "../interviews/InterviewManager"
import { deleteProject, getSingleProject } from "./ProjectManager"

export const ProjectDetails = () => {
    const history = useHistory()
    const { projectId } = useParams()
    const [project, setProject] = useState({})
    const [interviews, setInterviews] = useState([])

    useEffect(() => {
        getSingleProject(projectId).then(p => setProject(p))
        getInterviews().then(i => setInterviews(i))
    }, [projectId])

    return (
        <section className="message is-info m-5">
        <h1>{project.title}</h1>
        <div>
            <img src={project.imgurl}></img>
        </div>
        <div>{project.description}</div>
        <Link to={`/projects/new_interview/${project.id}`}><button>Plan an interview</button></Link>
        <h2>Planned Interviews</h2>
        {interviews.map((interview) => {
            return (
                <div>{interview.scheduled_date}</div>
            )
        } 
            )}

        <button className="button mr-3 my-3" onClick={() => {
                    deleteProject(project.id)
                        .then(setProject)
                        .then(() => {history.push("/projects")})
                }}>Delete Project</button>

        </section>
    )
}