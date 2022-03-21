import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Link, useHistory } from "react-router-dom"
import { getCompletedInterviewsByProject, getInterviewsByProject } from "../interviews/InterviewManager"
import { addConclusions, deleteProject, getSingleProject, publishProject, unPublishProject } from "./ProjectManager"

export const ProjectDetails = () => {
    const history = useHistory()
    const { projectId } = useParams()
    const [project, setProject] = useState({})
    const [interviews, setInterviews] = useState([])
    const [completedInterviews, setCompletedInterviews] = useState([])
    const [conclusions, setConclusions] = useState("")

    useEffect(() => {
        getSingleProject(projectId).then(p => setProject(p))
        getInterviewsByProject(projectId).then(i => setInterviews(i))
        getCompletedInterviewsByProject(projectId).then(c => setCompletedInterviews(c))
    }, [projectId])

    
    //add logic for if completed interviews by project >= 1 && complete != null, then display publish button
    const publishButton = () => {
        if (completedInterviews.length >= 1 && project.conclusions != "") {
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
    }



    return (
        <section className="message is-info m-5">
        <h1>{project.title}</h1>
        <div>
            <img src={project.imgurl}></img>
        </div>
        <div>{project.description}</div>
        <Link to={`/projects/new_interview/${project.id}`}><button>Plan an interview</button></Link>
        <h2>Planned Interviews</h2>
        {
        interviews.map(interview => {
            if (interview.complete === false) {
                return <div><Link to={`/interviews/${interview.id}`}>{interview.scheduled_date}</Link></div>
            }
        })
    }
        <h2>Completed Interviews</h2>
        {
        interviews.map(interview => {
            if (interview.complete === true) {
                return <div><Link to={`/interview/${interview.id}`}>{interview.collection_date}</Link></div>
            }
        })
    }
        { project.conclusions === "" 
        ? <form>
        <h3>Conclusions</h3>
        <label className="label"></label>
            <input
                type="textarea"
                placeholder="conclusions"
                className="input"
                required autoFocus
                onChange={
                    (evt) => {
                        const copy = evt.target.value
                        setConclusions(copy)
                    }
                } />
        <button onClick={() => { addConclusions(conclusions, projectId) }}>Save</button>
        </form>
        : <div>Conclusions: {project.conclusions}</div>
        }
        
        {publishButton()}
        <button className="button mr-3 my-3" onClick={() => {
                    deleteProject(project.id)
                        .then(setProject)
                        .then(() => {history.push("/projects")})
                }}>Delete Project</button>
        </section>
    )
}