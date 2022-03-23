import { useEffect, useRef, useState } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { getInterviewQuestionsByInterview, getSingleInterview, updateInterview } from "./InterviewManager"
import { getQuestionsByProject, searchQuestions } from "../questions/QuestionManager"

export const EditInterviewForm = () => {
    const history = useHistory()
    const { interviewId } = useParams()
    const [search, setSearch] = useState("")
    const [storedInterview, setStoredInterview] = useState({})
    const [projectId, setProjectId] = useState("")
    const [interview, setInterview] = useState({
        project: 0,
        subject: "",
        location: "",
        scheduled_date: "",
        questions: new Set(),
        notes: ""
    })
    const [questions, setQuestions] = useState([])


    useEffect(() => {
        
        getSingleInterview(interviewId).then((newInterview) => {
            setInterview({
                project: newInterview.project.id,
                subject: newInterview.subject,
                location: newInterview.location,
                scheduled_date: newInterview.scheduled_date,
                questions: new Set(newInterview.questions.map(question => question.id)),
                notes: newInterview.notes
            })
        })
    }, [interviewId])



    const editInterview = (evt) => {
        evt.preventDefault()
        const updatedInterview = {
            project: interview.project,
            subject: interview.subject,
            location: interview.location,
            scheduled_date: interview.scheduled_date,
            questions: Array.from(interview.questions),
            notes: interview.notes
        }

        updateInterview(updatedInterview, interviewId)
            .then(() => {history.push(`/interviews/${interviewId}`)})
            
    }

    const cancelEdit = (evt) => {
        evt.preventDefault()
        history.push(`/interviews/${interviewId}`)
    }

    return (
        <div className="container m-6 p-6 has-background-link-light">
            <h1 className="title is-3">Edit Interview</h1>
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
                            value={interview.subject}
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
                            value={interview.location}
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
                            value={interview.scheduled_date}
                            onChange={
                                (evt) => {
                                    const copy = { ...interview }
                                    copy.scheduled_date = evt.target.value
                                    setInterview(copy)
                                }
                            } ></textarea>
                    </div>
                </div>
                {/* <h3>Questions</h3>
                <div>Search  questions:</div>
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
                {questions.map((question) => {
                    return ( <div key={`question--${question.id}`} className="control my-2">
                    <label className="checkbox has-text-weight-medium">
                        <input
                            type="checkbox"
                            className="mr-2"
                            name="question"
                            value={question.id}
                            checked={interview.questions.has(question.id) ? true : false}
                            onChange={(evt) => {
                                const copy = { ...interview }
                                copy.questions.has(parseInt(evt.target.value))
                                    ? copy.questions.delete(parseInt(evt.target.value))
                                    : copy.questions.add(parseInt(evt.target.value))
                                setInterview(copy)
                            }} />
                        {question.question}
                    </label>
                </div>
                    )
                })} */}
                <h3>Notes</h3>
                <label className="label"></label>
                    <div className="control">
                        <input
                            type="textarea"
                            className="input"
                            placeholder="notes" 
                            value={interview.notes}
                            onChange={
                                (evt) => {
                                    const copy = { ...interview }
                                    copy.notes = evt.target.value
                                    setInterview(copy)
                                }
                            } />
                    </div>
                <div>
                    <button className="button is-link my-5 has-text-weight-bold" onClick={editInterview}>Save</button>
                </div>
                <div>
                    <button className="button is-link my-5 has-text-weight-bold" onClick={cancelEdit}>Cancel</button>
                </div>
            </form>
        </div>
    )
}