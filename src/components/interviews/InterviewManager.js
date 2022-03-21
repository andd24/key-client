export const getInterviews = () => {
    return fetch("http://localhost:8000/interviews", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}
export const getSingleInterview = (id) => {
    return fetch(`http://localhost:8000/interviews/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}

export const createInterview = (interview) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        },
        body: JSON.stringify(interview)
    }
    return fetch(`http://localhost:8000/interviews`, fetchOptions)
        .then(res => res.json())
}

export const updateInterview = (interview, id) => {
    return fetch(`http://localhost:8000/interviews/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        },
        body: JSON.stringify(interview)
    })
        .then(getInterviews)
}

export const deleteInterview = interviewId => {
    return fetch(`http://localhost:8000/interviews/${interviewId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    }).then(getInterviews)
}

export const getInterviewsByProject = (projectId) => {
    return fetch(`http://localhost:8000/interviews?project_id=${projectId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}

export const getInterviewQuestions = () => {
    return fetch("http://localhost:8000/interviewquestions", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}

export const addAnswer = (answer, id) => {
    return fetch(`http://localhost:8000/interviewquestions/${id}/answer`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        },
        body: JSON.stringify(answer)
    })
        .then(getInterviewQuestions)
}

export const completeInterview = (id) => {
    return fetch(`http://localhost:8000/interviews/${id}/complete`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
}

export const getCompletedInterviewsByProject = (projectId) => {
    return fetch(`http://localhost:8000/interviews?project_id=${projectId}&complete=True`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}