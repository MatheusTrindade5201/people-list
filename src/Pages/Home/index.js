import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../Components/Header'
import People from '../../Components/People'
import './Home.css'

const Home = () => {
    const [isLogged, setIsLogged] = useState(sessionStorage.getItem('@AuthFirebase:user'))
    const singOut = () => {
        sessionStorage.removeItem('@AuthFirebase:user');
        setIsLogged(sessionStorage.getItem('@AuthFirebase:user'))
    }

    const [loading, setLoading] = useState(true)
    const [people, setPeople] = useState([])

    const getPeople = async () => {
        try {
            const data = await fetch('https://63471b7bdb76843976a667ae.mockapi.io/peoples')
            const json = await data.json()
            setPeople(json)
            setLoading(false)
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
                <p>Loading...</p>
            </div>
        }
        return (
            <div>
                <Header 
                function={singOut}
                />
                <div className='home__table'>
                    <People 
                    rows={people.map(people => <tr key={people.id} className='prople__row'>
                    <th className='prople__iten'>{people.name}</th>
                    <th className='prople__iten'>{people.email}</th>
                    <th className='prople__iten'>{people.birthDate}</th>
                    <th className='prople__iten'><NavLink className='people__edit' to={`/Edit/${people.id}`} >Edit</NavLink></th>
                    </tr>)}/>
                    <NavLink className='add__button' to={'/Add'}>Add</NavLink>
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

export default Home