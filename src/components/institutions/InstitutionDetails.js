import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getUsersByInstitution } from "../users/UserManager"
import { getSingleInstitution } from "./InstitutionManager"

export const InstitutionDetails = () => {
    const { institutionId } = useParams()
    const [ institution, setInstitution ] = useState({})
    const [ userInstitutions, setUserInstitutions ] = useState([])
    
    useEffect(() => {
        getSingleInstitution(institutionId).then(i => setInstitution(i))
        getUsersByInstitution(institutionId).then(u => setUserInstitutions(u))
    }, [institutionId])

    return (
        <>
        <h1>{institution.name}</h1>
        <img src={institution.imgurl} />
        <div>{institution.description}</div>
        <h2>Affiliated Key Users</h2>
        {userInstitutions.map((user) => {
            return (
                <div>{user.user?.first_name} {user.user?.last_name}</div>
            )
        })}
        </>
    )
}