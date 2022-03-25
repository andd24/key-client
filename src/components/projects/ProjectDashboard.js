import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { getCompletedProjectsByUser, getProjects, getProjectsByUser } from "./ProjectManager"
import { getCurrentUser } from "../users/UserManager"
import { Project } from "./Project"


export const ProjectDashboard = () => {
    const [user, setUser] = useState({})
    const [projects, setProjects] = useState([])
    const [completed, setCompleted] = useState([])

    useEffect(() => {
        getCurrentUser().then(setUser)
    }, [])

    //first fetch fails, second one succeeds
    //user object not being returned fast enough
    useEffect(() => {
        getProjectsByUser(user.user?.id).then(p => setProjects(p))
        getCompletedProjectsByUser(user.user?.id).then(setCompleted)
    }, [user])

    return (
        <>
         <div className="container m-6 p-6 has-background-link-light">
        <div className="box">
            <div className="title is-2">Your Projects</div>
            <button className="button mb-5"><Link to="/projects/new">Start a new project</Link></button>
            <div className="box">
                <div className="title is-4">In progress</div>
                {projects.map((project) => {
                    if (project.public != true) {
                        return (
                            <><Link to={`/projects/${project.id}`}><Project project={project} /></Link>
                            {/* // <div><Link to={`/projects/${project.id}`}>{project.title}</Link></div> */}
                            </>
                        )
                    }
                }
                 )}
            </div>
            <div className="box">
                <div className="title is-4">Complete</div>
                {projects.map((project) => {
                    if (project.public === true) {
                        return (
                          <><Link to={`/projects/${project.id}`}><Project project={project} /></Link>
                            {/* // <div><Link to={`/projects/${project.id}`}>{project.title}</Link></div> */}
                            </>
                        )
                    }
                }
                 )}
            </div>
        </div>
        </div>
        </>
    )
}