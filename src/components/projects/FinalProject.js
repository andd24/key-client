import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProjectInterviews } from "./ProjectInterviews"
import { getSingleProject } from "./ProjectManager"
import "./Project.css"

export const FinalProject = () => {
    const { projectId } = useParams()
    const [project, setProject] = useState({})

    useEffect(() => {
        getSingleProject(projectId).then(setProject)
    }, [projectId])

    return (
        <>
        <h3>{project.title}</h3>
        <h4>by {project.user?.user?.first_name} {project.user?.user?.last_name}</h4>
        <img src={project.imgurl} />
        <div>{project.description}</div>
        <div>
            <ProjectInterviews projectId={projectId} />
        </div>
        <h5>In conclusion</h5>
        <div>{project.conclusions}</div>
        </>
    )
}