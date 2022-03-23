import { useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { getSingleProject } from "./ProjectManager"
import "./Project.css"

export const Project = ({project}) => {


    return (
        <>
        <h3><Link to={`/projects/${project.id}/full`}>{project.title}</Link></h3>
        <img src={project.imgurl} />
        <div>{project.description}</div>
        <div></div>
        </>
    )
}