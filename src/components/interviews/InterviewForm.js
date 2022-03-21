import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useHistory } from "react-router-dom"
import { getFields } from "../fields/FieldManager"
import { createInterview } from "./InterviewManager"
import { createProject } from "../projects/ProjectManager"
import { createQuestion, searchQuestions } from "../questions/QuestionManager"

export const InterviewForm = () => {
    const history = useHistory()
    const { projectId } = useParams()
    const [questions, setQuestions] = useState([])
    const [newQuestion, setNewQuestion] = useState("")
    const [search, setSearch] = useState("")
    const [interview, setInterview] = useState({
        project: projectId,
        subject: "",
        location: "",
        scheduled_date: "",
        questionIds: new Set()
    })

    useEffect(() => {
        if (search !== "") {
            searchQuestions(search)
                .then(setQuestions)
        }
    }, [search])

    const submitNewQuestion = (evt) => {
        evt.preventDefault()
        const newQuestionObject = {
            question: newQuestion
        }

        createQuestion(newQuestionObject)
            .then(() => {setNewQuestion("")})
            
    }

    const submitNewInterview = (evt) => {
        evt.preventDefault()
        const newInterview = {
            project: parseInt(projectId),
            subject: interview.subject,
            location: interview.location,
            scheduled_date: interview.scheduled_date,
            questions: Array.from(interview.questionIds)
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
                <button>Add Questions</button>
                <h3>Questions</h3>
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
                })}
                <form>
                <div className="field my-5">
                    <label className="label">Add new question</label>
                    <div className="control">
                        <input
                            type="text"
                            placeholder="type new question here"
                            className="input"
                            value={newQuestion}
                            required autoFocus
                            onChange={
                                (evt) => {
                                    const copy = evt.target.value
                                    setNewQuestion(copy)
                                }
                            } />
                    </div>
                </div>
                <button className="button is-link my-5 has-text-weight-bold" onClick={submitNewQuestion}>Add question</button>
                </form>
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