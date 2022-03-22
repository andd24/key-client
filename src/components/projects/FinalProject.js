import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { getSingleProject } from "./ProjectManager"

export const FinalProject = () => {
    const { projectId } = useParams()
    const [project, setProject] = useState({})

    useEffect(() => {
        getSingleProject(projectId).then(p => setProject(p))
    }, [projectId])

    return (
        <>
        <h1>{project.title}</h1>
        <h3>by {project.user.user.firstName}</h3>
        <img src={project.imgurl} />
        <div>{project.description}</div>
        <div></div>
        </>
    )
}