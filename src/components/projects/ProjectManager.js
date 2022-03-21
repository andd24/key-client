export const getProjects = () => {
    return fetch("http://localhost:8000/projects", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}
export const getSingleProject = (id) => {
    return fetch(`http://localhost:8000/projects/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}

export const createProject = (project) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        },
        body: JSON.stringify(project)
    }
    return fetch(`http://localhost:8000/projects`, fetchOptions)
        .then(res => res.json())
}

export const updateProject = (project, id) => {
    return fetch(`http://localhost:8000/projects/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        },
        body: JSON.stringify(project)
    })
        .then(getProjects)
}

export const getProjectsByField = (fieldId) => {
    return fetch(`http://localhost:8000/projects?field_id=${fieldId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}

export const getProjectsByUser = (userId) => {
    return fetch(`http://localhost:8000/projects?user_id=${userId}`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}

export const deleteProject = projectId => {
    return fetch(`http://localhost:8000/projects/${projectId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    }).then(getProjects)
}

export const publishProject = (id) => {
    return fetch(`http://localhost:8000/projects/${id}/publish`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
}

export const unPublishProject = (id) => {
    return fetch(`http://localhost:8000/projects/${id}/unpublish`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(getSingleProject(id))
}

export const getPublishedProjects= () => {
    return fetch(`http://localhost:8000/posts?published=True`, {
        headers: {
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}