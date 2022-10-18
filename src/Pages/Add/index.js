import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../../Components/Header';
import TextField from '../../Components/TextField';
import './Add.css'

const Add = () => {

    const [isLogged, setIsLogged] = useState(sessionStorage.getItem('@AuthFirebase:user'))
    const singOut = () => {
        sessionStorage.removeItem('@AuthFirebase:user');
        setIsLogged(sessionStorage.getItem('@AuthFirebase:user'))
    }

    const [loading, setLoading] = useState(false)
    const [people, setPeople] = useState('')
    const [index, setIndex] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [birth, setBirth] = useState('')
    const [added, setAdded] = useState(false)
    const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/)
    const birthRegex = new RegExp(/(\d{2})[-.\/](\d{2})[-.\/](\d{4})/) 


    const addPeople = async () => {
        if(name.length > 2 && emailRegex.test(email) && birthRegex.test(birth)){
        setLoading(true)
        await fetch('https://63471b7bdb76843976a667ae.mockapi.io/peoples',{
            method:'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                birthDate: birth
            }) 
        })
        setAdded(true)    
    }else{
        alert("Dados invalidos!  \n Nome: Pelo menos 2 caracteres. \n Email: email@domain.com. \n Birth Date: dd/mm/yyyy")
    }
    }

    if (!!isLogged) {
        if(added){
            return(
                <div className='sign'>
                    <div className='user__message'>
                    <h1 className='user__message-text'>Added with success</h1>
                    <NavLink className='return__button' to={'/Home'}>Home</NavLink>
                    </div>
                </div>
                )
        }else{
            if(loading){
                return(
                    <div className='sign'>
                    <div className='user__message'>
                    <h1 className='user__message-text'>Loading..</h1>
                    </div>
                </div>
                )   
            }else{
        return (
                <div>
                    <Header 
                    function={singOut}
                    />
                    <NavLink className='return__button' to={'/Home'}>Return</NavLink>
                <div className='page'>
                        <div className='page__infos'>
                            
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
                            <button onClick={addPeople} className='action__button'>Add</button>
                        </div>
                    </div>
                </div>
            )
        }}
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

export default Add