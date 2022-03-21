export const getUsers = () => {
    return fetch("http://localhost:8000/users", {
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}

export const getSingleUser = (id) => {
    return fetch(`http://localhost:8000/users/${id}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}

export const getCurrentUser = () => {
    return fetch(`http://localhost:8000/users/current`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}

export const updateUserInstitution = (institutionId, id) => {
    return fetch(`http://localhost:8000/users/${id}/link`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        },
        body: JSON.stringify(institutionId)
    })
        .then(getUsers)
}

export const updateUserField = (fieldId, id) => {
    return fetch(`http://localhost:8000/users/${id}/assign`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        },
        body: JSON.stringify(fieldId)
    })
        .then(getUsers)
}

export const getUsersByInstitution = (institutionId) => {
    return fetch(`http://localhost:8000/users?institution_id=${institutionId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}