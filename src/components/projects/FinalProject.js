import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { ProjectInterviews } from "./ProjectInterviews"
import { getSingleProject } from "./ProjectManager"


export const FinalProject = () => {
    const { projectId } = useParams()
    const [project, setProject] = useState({})

    useEffect(() => {
        getSingleProject(projectId).then(setProject)
    }, [projectId])

    return (
        <>
        <div className="box">
            <div className="card">
                <div className="card-header">
                    <div className="card-title">
                        <div className="title is-3">{project.title}</div>
                        <div className="title is-5">by {project.user?.user?.first_name} {project.user?.user?.last_name}</div>
                    </div>
                </div>
                <div className="card-image">
                    <img src={project.imgurl} />
                </div>
                <div className="card-content">
                    <div className="title is-5">{project.description}</div>
                    <div>
                        <ProjectInterviews projectId={projectId} />
                    </div>
                    <div className="title is-4 my-5">In conclusion</div>
                    <div className="title is-6">{project.conclusions}</div>
                </div>
            </div>    
        </div>
        </>
    )
}