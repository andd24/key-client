import { useEffect, useState } from "react"
import { useParams, Link, useHistory } from "react-router-dom"
import { createQuestion, deleteQuestion, getQuestionsByProject } from "./QuestionManager"

export const QuestionForm = () => {
    const [newQuestion, setNewQuestion] = useState("")
    const { projectId } = useParams()
    const [questions, setQuestions] = useState([])
    const history = useHistory()

    useEffect(() => {
        getQuestionsByProject(projectId).then(setQuestions)
    }, [questions.length])

    const submitNewQuestion = (evt) => {
        evt.preventDefault()
        const newQuestionObject = {
            project: projectId,
            question: newQuestion
        }

        createQuestion(newQuestionObject)
        .then(getQuestionsByProject(projectId)).then(setQuestions)
        .then(setNewQuestion(""))
    }
    
    const removeQuestion = (questionId) => {
        deleteQuestion(questionId)
        .then(getQuestionsByProject(projectId)).then(setQuestions)
    }

    return (
        <>
        <div className="container m-6 p-6 has-background-link-light">
            <div className="card m-5">
                <div className="card-title">
                    <div className="title is-2 m-3">Manage questions for your interviews</div>
                </div>
                <div className="card-content">
                    <form>
                            <div className="field my-1">
                                <label className="label"></label>
                                <div className="control">
                                    <input
                                        type="text"
                                        placeholder="type new question here"
                                        className="input"
                                        value={newQuestion}
                                        onChange={
                                            (evt) => {
                                                const copy = evt.target.value
                                                setNewQuestion(copy)
                                            }
                                        } />
                                </div>
                            </div>
                            <button className="button my-2 has-text-weight-bold" onClick={submitNewQuestion}>Add question</button>
                            <button className="button   my-2 ml-2 has-text-weight-bold" onClick={() => {history.push(`/projects/${projectId}`)}}>Cancel</button>
                        </form>
                    <div className="title is-4">Questions</div>
                    <div>
                        {
                            questions.map((question) => {
                                return <>
                                <div><button className="delete is-medium mr-2" onClick={() => {removeQuestion(question.id)}}>Delete</button>{question.question}</div>
                                
                                </>
                            })
                        }
                    </div>
                </div>
                <div className="card-footer">
                    <button className="button"><Link to={`/projects/${projectId}`}>Back to project</Link></button>
                </div>
            </div>
        </div>
        </>
    )
}       