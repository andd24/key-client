import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { getCurrentUser } from "../users/UserManager"
import { getSingleProject } from "./ProjectManager"


export const Project = ({project}) => {
    const [user, setUser] = useState({})
    useEffect(() => {
        getCurrentUser().then(setUser)
    }, [])

    return (
        <>
        <div class="box">
            <article class="media">
                <div class="media-left">
                    <figure class="image is-64x64">
                        <img src={project.imgurl} alt="Image" />
                    </figure>
                </div>
                <div class="media-content">
                    <div class="content">
                        <p>
                        <strong>{project.title}</strong> <small>{project.user?.user?.first_name} {project.user?.user?.last_name}</small> <small></small>
                        <br />
                        {project.description}
                        </p>
                    </div>
                </div>
            </article>
        </div>
        {/* <div className="box">
        { project.user?.user?.id === user.id
        ? <Link classname="title is-3" to={`/projects/${project.id}`} >{project.title}</Link>
        :<Link className="title is-3" to={`/projects/${project.id}/full`}>{project.title}</Link>
        }
        <img src={project.imgurl} />
        <div>{project.description}</div>
        </div> */}
        </>
    )
}