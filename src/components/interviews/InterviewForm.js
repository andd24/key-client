import { useEffect, useRef, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { createInterview } from "./InterviewManager"
import { createQuestion, searchQuestions, getQuestionsByProject } from "../questions/QuestionManager"

export const InterviewForm = () => {
    const history = useHistory()
    const { projectId } = useParams()
    const [questions, setQuestions] = useState([])
    const [search, setSearch] = useState("")
    const [interview, setInterview] = useState({
        project: projectId,
        subject: "",
        location: "",
        scheduled_date: "",
        questionIds: new Set(),
        notes: ""
    })

    useEffect(() => {
        if (search !== "") {
            searchQuestions(search, projectId)
                .then(setQuestions)
        }
        else {
            getQuestionsByProject(projectId).then(setQuestions)
        }
    }, [search])

    const submitNewInterview = (evt) => {
        evt.preventDefault()
        const newInterview = {
            project: parseInt(projectId),
            subject: interview.subject,
            location: interview.location,
            scheduled_date: interview.scheduled_date,
            questions: Array.from(interview.questionIds),
            notes: interview.notes
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
                <h3>Questions</h3>
                { questions.length > 0
                ? <><div>Search  questions:</div>
                <div className="panel-block">
                        <input className="input" type="text"
                            placeholder="Start typing question here"
                            name="search"
                            onKeyUp={
                                (event) => {
                                    const copy = event.target.value
                                    setSearch(copy)
                                }
                            } />
                </div>
                { questions.map((question) => {
                    return ( <div key={`question--${question.id}`} className="control my-2">
                    <label className="checkbox has-text-weight-medium">
                        <input
                            type="checkbox"
                            className="mr-2"
                            name="question"
                            value={question.id}
                            onChange={(evt) => {
                                const copy = { ...interview }
                                copy.questionIds.has(parseInt(evt.target.value))
                                    ? copy.questionIds.delete(parseInt(evt.target.value))
                                    : copy.questionIds.add(parseInt(evt.target.value))
                                setInterview(copy)
                            }} />
                        {question.question}
                    </label>
                </div>
                    )
                })} </>
                : ""
            }
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
                        <input
                            type="date"
                            className="date"
                            placeholder="scheduled date" 
                            onChange={
                                (evt) => {
                                    const copy = { ...interview }
                                    copy.scheduled_date = evt.target.value
                                    setInterview(copy)
                                }
                            } ></input>
                    </div>
                </div>
                <div>
                <label className="label">Notes </label>
                    <div className="control">
                        <input
                            type="textarea"
                            className="input"
                            placeholder="notes" 
                            onChange={
                                (evt) => {
                                    const copy = { ...interview }
                                    copy.notes = evt.target.value
                                    setInterview(copy)
                                }
                            } />
                    </div>
                </div>
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