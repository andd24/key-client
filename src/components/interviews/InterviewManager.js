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