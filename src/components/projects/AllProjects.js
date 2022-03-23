import React, { useState, useEffect } from "react"
import { getProjects, getProjectsByUser, getPublishedProjects } from "./ProjectManager"
import { getCurrentUser } from "../users/UserManager"
import { Project } from "./Project"
import { ProjectFilters } from "./ProjectFilters"
import "./Project.css"

export const AllProjects = () => {
    const [projects, setProjects] = useState([])

    useEffect(() => {
        getPublishedProjects().then(p => setProjects(p))
    }, [])

    return (
        <>
        <h1>Browse Published Projects</h1>
        <ProjectFilters setProjects={setProjects} />
        {projects.map((project) => {
                  return  <Project project={project} />
        })
        }
        </>
    )
}