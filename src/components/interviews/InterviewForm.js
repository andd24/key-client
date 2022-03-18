import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { getFields } from "../fields/FieldManager"
import { createInterview } from "./InterviewManager"
import { createProject } from "../projects/ProjectManager"

export const InterviewForm = () => {
    const history = useHistory()
    const { projectId } = useParams()
    const [interview, setInterview] = useState({
        project: projectId,
        subject: "",
        location: "",
        scheduled_date: ""
    })

    const submitNewInterview = (evt) => {
        evt.preventDefault()
        const newInterview = {
            project: parseInt(projectId),
            subject: interview.subject,
            location: interview.location,
            scheduled_date: interview.scheduled_date
        }

        createInterview(newInterview)
            .then(() => {history.push(`/projects/${projectId}`)})
            
    }

    const cancelNewInterview = (evt) => {
        evt.preventDefault()
        history.push(`/projects/${projectId}`)
    }

    return (
        <div className="container m-6 p-6 has-background-link-light">
            <h1 className="title is-3">Set up an Interview</h1>
            <form >
                <h3>Details</h3>
                <div className="field my-5">
                    <label className="label">Subject</label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder="subject name"
                            className="input"
                            required autoFocus
                            onChange={
                                (evt) => {
                                    const copy = { ...interview }
                                    copy.subject = evt.target.value
                                    setInterview(copy)
                                }
                            } />
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Proposed Location </label>
                    <div className="control">
                        <input
                            type="text"
                            className="input"
                            placeholder="location" 
                            onChange={
                                (evt) => {
                                    const copy = { ...interview }
                                    copy.location = evt.target.value
                                    setInterview(copy)
                                }
                            } />
                    </div>
                </div>
                <div className="field my-5">
                    <label className="label">Proposed Date</label>
                    <div className="control">
                        <textarea
                            className="textarea"
                            placeholder="scheduled date" 
                            onChange={
                                (evt) => {
                                    const copy = { ...interview }
                                    copy.scheduled_date = evt.target.value
                                    setInterview(copy)
                                }
                            } ></textarea>
                    </div>
                </div>
                <h3>Questions</h3>
                <div>
                    <button className="button is-link my-5 has-text-weight-bold" onClick={submitNewInterview}>Submit</button>
                </div>
                <div>
                    <button className="button is-link my-5 has-text-weight-bold" onClick={cancelNewInterview}>Cancel</button>
                </div>
            </form>
        </div>
    )
}