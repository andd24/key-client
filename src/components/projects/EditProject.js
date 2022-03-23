import { useEffect, useRef, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import { getFields } from "../fields/FieldManager"
import { createProject, getSingleProject, updateProject } from "./ProjectManager"
import "./Project.css"

export const EditProject = () => {
    const history = useHistory()
    const { projectId } = useParams()
    const [fields, setFields] = useState([])
    const [project, setProject] = useState({
        fieldId: 0,
        title: "",
        imgurl: "",
        description: "",
        conclusions: ""
    })

    useEffect(
        () => {
            getFields().then(setFields)
        },
        []
    )

    useEffect(() => {
        getSingleProject(projectId).then((newProject) => {
            setProject({
                field: newProject.field.id,
                title: newProject.title,
                imgurl: newProject.imgurl,
                description: newProject.description,
                conclusions: newProject.conclusions
            })
        })

    }, [projectId])

    const editProject = (evt) => {
        evt.preventDefault()
        const editedProject = {
            field: project.field,
            title: project.title,
            imgurl: project.imgurl,
            description: project.description,
            conclusions: project.conclusions
        }

        updateProject(editedProject, projectId)
            .then(() => {history.push(`/projects/${projectId}`)})
            
    }

    return (
        <div className="container m-6 p-6 has-background-link-light">
            <h1 className="title is-3">Edit Project</h1>
            <form >
                <div className="field my-5">
                    <label className="label">Title </label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder="Title"
                            className="input"
                            required autoFocus
                            value={project.title}
                            onChange={
                                (evt) => {
                                    const copy = { ...project }
                                    copy.title = evt.target.value
                                    setProject(copy)
                                }
                            } />
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Image URL </label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            value={project.imgurl}
                            placeholder="Image URL" onChange={
                                (evt) => {
                                    const copy = { ...project }
                                    copy.imgurl = evt.target.value
                                    setProject(copy)
                                }
                            } />
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Project Description </label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="description" 
                            value={project.description}
                            onChange={
                                (evt) => {
                                    const copy = { ...project }
                                    copy.description = evt.target.value
                                    setProject(copy)
                                }
                            } ></textarea>
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Field</label>
                    <div className="control">
                        <div className="select">
                            <select
                                value={project.field}
                                selected={project.field}
                                onChange={
                                    (evt) => {
                                        const copy = { ...project }
                                        copy.field = evt.target.value
                                        setProject(copy)
                                    }
                                }>
                                <option>Select a Field </option>
                                {
                                    fields.map(field => {
                                        return <option key={field.id} value={field.id}>{field.label}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Conclusion</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="conclusion" 
                            value={project.conclusions}
                            onChange={
                                (evt) => {
                                    const copy = { ...project }
                                    copy.conclusions = evt.target.value
                                    setProject(copy)
                                }
                            } ></textarea>
                    </div>
                </div>
                <div>
                    <button className="button is-link my-5 has-text-weight-bold" onClick={editProject}>Save</button>
                </div>
            </form>
        </div>
    )
}