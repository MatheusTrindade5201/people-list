import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import Header from '../../Components/Header'
import TextField from '../../Components/TextField'
import './Edit.css'

const Edit = () => {

    const {id} = useParams()

    const [isLogged, setIsLogged] = useState(sessionStorage.getItem('@AuthFirebase:user'))
    const singOut = () => {
        sessionStorage.removeItem('@AuthFirebase:user');
        setIsLogged(sessionStorage.getItem('@AuthFirebase:user'))
    }

    const deletePeople = async () =>{
        await fetch (`https://63471b7bdb76843976a667ae.mockapi.io/peoples/${id}`, {
            method:'DELETE'
        })
        .then(
            setDeleted(true)
        )
    }

    const editPeople = async () => {
        const data = {
            name: name,
            email: email,
            birthDate: birth
        }
        await fetch (`https://63471b7bdb76843976a667ae.mockapi.io/peoples/${id}`, {
            method:'PUT',
            headers: {
                'Content-type': 'application/json'
              },
            body: JSON.stringify({
                name: name,
                email: email,
                birthDate: birth
            })
        })
        .then(
            setEdited(true)
        )
    }

    const [loading, setLoading] = useState(true)
    const [people, setPeople] = useState('')
    const [index, setIndex] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birth, setBirth] = useState('')
    const [deleted, setDeleted] = useState(false)
    const [edited, setEdited] = useState(false)

    const getPeople = async () => {
        try {
            const data = await fetch(`https://63471b7bdb76843976a667ae.mockapi.io/peoples/${id}`)
            const json = await data.json()
            setPeople(json)
            setBirth(json.birthDate)
            setEmail(json.email)
            setIndex(json.id)
            setName(json.name)
            console.log(json);
        } catch (error) {
            console.log(error.message);
        }
    }
    
    useEffect(() => {
        getPeople()
    }, [loading])


    if (!!isLogged) {
        if (loading) {
            <div>
                <Header 
                function={singOut}
                />
                <NavLink className='return__button' to={'/Home'}>Return</NavLink>
                <p>Loading...</p>
            </div>
        }
        if(deleted){
            return(
                <div className='sign'>
                    <div className='user__message'>
                    <h1 className='user__message-text'>Deleted with success</h1>
                    <NavLink className='return__button' to={'/Home'}>Home</NavLink>
                    </div>
                </div>
                )
        }else if(edited){
            return(
                <div className='sign'>
                    <div className='user__message'>
                    <h1 className='user__message-text'>Edited with success</h1>
                    <NavLink className='return__button' to={'/Home'}>Home</NavLink>
                    </div>
                </div>
                )
        }
        else{
            return (
                <div>
                    <Header 
                    function={singOut}
                    />
                    <NavLink className='return__button' to={'/Home'}>Return</NavLink>
                <div className='page'>
                        <div className='page__infos'>
                            
                            <TextField 
                            label={'Id:'}
                            readOnly={true}
                            value={index}
                            />
                            <TextField 
                            label={'Name:'}
                            value={name}
                            onTyped={value => setName(value)}
                            />
                            <TextField 
                            label={'Email:'}
                            value={email}
                            onTyped={value => setEmail(value)}
                            />
                            <TextField 
                            label={'Birth date:'}
                            value={birth}
                            onTyped={value => setBirth(value)}
                            />
                        </div>
                        <div className='options'>
                            <button onClick={editPeople} className='action__button'>Edit</button>
                            <button onClick={deletePeople} className='action__button delete'>Delete</button>
                        </div>
                    </div>
                </div>
            )
        }
    }else {
        return(
        <div className='sign'>
            <div className='user__message'>
            <h1 className='user__message-text'>You are no longer signed In!</h1>
            <NavLink className='return__button' to={'/'}>Sing In</NavLink>
            </div>
        </div>
        )
     
    }
}

export default Edit