export const getFields = () => {
    return fetch("http://localhost:8000/fields", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("key_token")}`
        }
    })
        .then(res => res.json())
}