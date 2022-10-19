import { useState } from 'react'
import { auth } from '../../Auth/AuthConfig';
import Form from '../../Components/Form'
import './Register.css'
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { NavLink } from 'react-router-dom';

const Register = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const signUp = () => {
        createUserWithEmailAndPassword(email, password)
    }

    if (error) {
        return (
            <div className='sign'>
            <Form 
            form_type={'Sign Up'}
            action={'Sign Up'}
            route={'/'}
            route_text={'I already have an account'}
            typingEmail={value => setEmail(value)}
            typingPassword={value => setPassword(value)}
            button_function={signUp}
            error={<p className='form__error'>{error.message}</p>}
            />
        </div>
        );
      }
      if (loading) {
        return <p>Loading...</p>;
      }
      if (user) {
        return (
            <div className='sign'>
                <div className='user__message'>
                <h1 className='user__message-text'>User registered with success!</h1>
                <NavLink className='home__button' to={'/'}>Sing In</NavLink>
                </div>
             </div>
        );
      }

    return (
        <div className='sign'>
            <Form 
            form_type={'Sign Up'}
            action={'Sign Up'}
            route={'/'}
            route_text={'I already have an account'}
            typingEmail={value => setEmail(value)}
            typingPassword={value => setPassword(value)}
            button_function={signUp}
            />
        </div>
    )
}

export default Register
