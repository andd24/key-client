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
    }, [projectId])

//not refreshing questions array on submit 
    const submitNewQuestion = (evt) => {
        evt.preventDefault()
        const newQuestionObject = {
            project: projectId,
            question: newQuestion
        }

        createQuestion(newQuestionObject)
            .then(() => {setNewQuestion("")})
        getQuestionsByProject(projectId).then(q => setQuestions(q))
    }
    
    const removeQuestion = (questionId) => {
        deleteQuestion(questionId)
        .then(setQuestions)
    }

    return (
        <>
        <h3>Add new Question</h3>
        <form>
                <div className="field my-5">
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
                <button className="button is-link my-5 has-text-weight-bold" onClick={submitNewQuestion}>Add question</button>
                <button onClick={() => {history.push(`/projects/${projectId}`)}}>Cancel</button>
            </form>
            <h3>Delete Questions</h3>
            {
                questions.map((question) => {
                    return <>
                    <div>{question.question}</div>
                    <button onClick={() => {removeQuestion(question.id)}}>Delete Question</button>
                    </>
                })
            }
        </>
    )
}       