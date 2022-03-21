import { useState, useEffect } from "react"
import { useParams, useHistory, Link } from "react-router-dom"
import { getFields } from "../fields/FieldManager"
import { getInstitutions } from "../institutions/InstitutionManager"
import { getCurrentUser, updateUserField, updateUserInstitution } from "./UserManager"

export const UserProfile = () => {
    const [field, setField] = useState("")
    const [institution, setInstitution] = useState("")
    const [fields, setFields] = useState([])
    const [institutions, setInstitutions] = useState([])
    const { userId } = useParams()
    const [currentUser, setCurrentUser] = useState({})
    const [institutionUsers, setInstitutionUsers] = useState([])
    const history = useHistory()

    useEffect(() => {
      if(localStorage.getItem('key_token')){
        getCurrentUser().then(setCurrentUser)
      }
    }, [])

    useEffect(() => {
        getFields().then(f => setFields(f))
        getInstitutions().then(i => setInstitutions(i))
    }, [userId])
    
    return (
        <>
        <h1>Your Profile</h1>
        <div>
        {
            (currentUser.institution) === null ?
            <>
            <div>Connect your profile to an institution</div>
            <form>
            <div>
                <label className="label"></label>
                <div className="control">
                    <div className="select">
                        <select
                            onChange={
                                (evt) => {
                                    const copy = evt.target.value
                                    setInstitution(copy)
                                }
                            }>
                            <option>Select an Institution</option>
                            {
                                institutions.map(institution => {
                                    return <option key={institution.id} value={institution.id}>{institution.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
            </div>
            <button onClick={() => {updateUserInstitution(parseInt(institution), currentUser.id)}}>Submit</button>
            </form>
            </>
            : <div>Affiliated Institution: <Link to={`/institutions/${currentUser.institution?.id}`}>{currentUser.institution?.name}</Link></div>
        }
        {
            (currentUser.field) === null ?
            <>
            <div>List your field of study</div>
            <form>
            <div className="field my-5">
            <label className="label"></label>
            <div className="control">
                <div className="select">
                    <select
                        onChange={
                            (evt) => {
                                const copy = evt.target.value
                                setField(copy)
                            }
                        }>
                        <option>Select a Field </option>
                        {
                            fields.map(field => {
                                return <option key={field.id} value={field.id}>{field.label}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        </div> 
        <button onClick={() => {updateUserField(parseInt(field), currentUser.id)}}>Submit</button>
        </form>
        </>
        : <div>Field of study: {currentUser.field?.label} </div>
        }
        </div>
        </>
    )
}