import { useState } from "react"
import { useParams, Link, useHistory } from "react-router-dom"
import { createQuestion } from "./QuestionManager"

export const QuestionForm = () => {
    const [newQuestion, setNewQuestion] = useState("")
    const { projectId } = useParams()
    const history = useHistory()
    
    const submitNewQuestion = (evt) => {
        evt.preventDefault()
        const newQuestionObject = {
            project: projectId,
            question: newQuestion
        }

        createQuestion(newQuestionObject)
            .then(() => {setNewQuestion("")})
            
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
            <h3>Edit or Delete Questions</h3>
            
        </>
    )
}       