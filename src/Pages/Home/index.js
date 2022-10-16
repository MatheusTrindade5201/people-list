import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Header from '../../Components/Header'
import './Home.css'

const Home = () => {
    const [isLogged, setIsLogged] = useState(sessionStorage.getItem('@AuthFirebase:user'))
    const singOut = () => {
        sessionStorage.removeItem('@AuthFirebase:user');
        setIsLogged(sessionStorage.getItem('@AuthFirebase:user'))
    }
    if (!!isLogged) {
        return (
            <Header 
            function={singOut}
            />
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