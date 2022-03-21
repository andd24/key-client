import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, useHistory } from "react-router-dom"
import { getInterviewsByProject } from "../interviews/InterviewManager"
import { deleteProject, getSingleProject, publishProject, unPublishProject } from "./ProjectManager"

export const ProjectDetails = () => {
    const history = useHistory()
    const { projectId } = useParams()
    const [project, setProject] = useState({})
    const [interviews, setInterviews] = useState([])

    useEffect(() => {
        getSingleProject(projectId).then(p => setProject(p))
        getInterviewsByProject(projectId).then(i => setInterviews(i))
    }, [projectId])

    
    //add logic for if completed interviews by project >= 1 && complete != null, then display publish button
    const publishButton = () => {
            if (project.public === false) {
            return <button type="submit" onClick={() => {
                publishProject(project.id)
                    .then(getSingleProject(projectId)).then(setProject)
                    .then(history.push(`/projects`))
            }
                } className="button mr-3 mt-3">
                Publish
            </button>
        } else if (project.public === true) {
            return <button type="submit"
                onClick={() => {
                    unPublishProject(project.id)
                    .then(getSingleProject(projectId)).then(setProject)
                    .then(history.push(`/projects`))
                }}
                className="button mr-3 mt-3">
                Unpublish
            </button>
        }
    }

    return (
        <section className="message is-info m-5">
        {publishButton()}
        <h1>{project.title}</h1>
        <div>
            <img src={project.imgurl}></img>
        </div>
        <div>{project.description}</div>
        <Link to={`/projects/new_interview/${project.id}`}><button>Plan an interview</button></Link>
        <h2>Planned Interviews</h2>
        {interviews.map((interview) => {
            return (
                <div><Link to={`/interview/${interview.id}`}>{interview.scheduled_date}</Link></div>
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