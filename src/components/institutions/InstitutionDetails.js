import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
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
           <div className="container m-6 p-6 has-background-link-light">
        <div className="box">
            <div className="card m-6">
                <div className="card-header">
                    <div className="card-header-icon">
                        <a href={institution.link}><img src={institution.imgurl} height="70px" width="70px"/></a>
                    </div>
                    <div className="card-header-title">
                        <div className="title is-4">{institution.name}</div>
                    </div>
                </div>
                <div className="card-content">
                    <div className="title is-6">{institution.description}</div>
                </div>
            </div>
            <div className="card m-6">
                <div className="card-header">
                    <div className="card-header-icon">
                        <img src="/Key (1).png" height="70px" width="70px"/>
                    </div>
                    <div className="card-header-title">
                        <div className="title is-4">Affiliated Key Users</div>
                    </div>
                </div>
                <div className="card-content">
                    {userInstitutions.map((user) => {
                        return (
                            <div className="title is-6">{user.user?.first_name} {user.user?.last_name}</div>
                        )
                    })}
                </div>
            </div>
        </div>
        </div>

        </>
    )
}