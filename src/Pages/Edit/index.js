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

    const [loading, setLoading] = useState(true)
    const [people, setPeople] = useState('')
    const [index, setIndex] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birth, setBirth] = useState('')

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
                        />
                        <TextField 
                        label={'Email:'}
                        value={email}
                        />
                        <TextField 
                        label={'Birth date:'}
                        value={birth}
                        />
                    </div>
                    <div className='options'>
                        <button className='action__button'>Edit</button>
                        <button className='action__button delete'>Delete</button>
                    </div>
                </div>
            </div>
        )
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