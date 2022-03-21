export const getInstitutions = () => {
    return fetch("http://localhost:8000/institutions", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}
export const getSingleInstitution = (id) => {
    return fetch(`http://localhost:8000/institutions/${id}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}