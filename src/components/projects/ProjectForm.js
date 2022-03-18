import { useEffect, useRef, useState } from "react"
import { useHistory } from "react-router-dom"
import { getFields } from "../fields/FieldManager"
import { createProject } from "./ProjectManager"

export const ProjectForm = () => {
    const history = useHistory()
    const [fields, setFields] = useState([])
    const [project, setProject] = useState({
        fieldId: 0,
        title: "",
        imgurl: "",
        description: ""
    })

    useEffect(
        () => {
            getFields().then(setFields)
        },
        []
    )

    const submitNewProject = (evt) => {
        evt.preventDefault()
        const newProject = {
            field: parseInt(project.fieldId),
            title: project.title,
            imgurl: project.imgurl,
            description: project.description
        }

        createProject(newProject)
            .then(() => {history.push("/projects")})
            
    }

    return (
        <div className="container m-6 p-6 has-background-link-light">
            <h1 className="title is-3">Create a Project</h1>
            <form >
                <div className="field my-5">
                    <label className="label">Title </label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder="Title"
                            className="input"
                            required autoFocus
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
                                onChange={
                                    (evt) => {
                                        const copy = { ...project }
                                        copy.fieldId = evt.target.value
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
                <div>
                    <button className="button is-link my-5 has-text-weight-bold" onClick={submitNewProject}>Submit</button>
                </div>
            </form>
        </div>
    )
}