import { auth } from '../../Auth/AuthConfig';
import Form from '../../Components/Form'
import './Login.css'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const signIn = () => {
        signInWithEmailAndPassword(email, password)
    }

    if (error) {
        return (
            <div className='sign'>
            <Form 
            form_type={'Sign In'}
            action={'Sign In'}
            route={'/Register'}
            route_text={'I do not have an account'}
            typingEmail={value => setEmail(value)}
            typingPassword={value => setPassword(value)}
            button_function={signIn}
            error={<p className='form__error'>{error.message}</p>}
            />
        </div>
        );
      }
      if (loading) {
        return <p>Loading...</p>;
      }
      if (user) {
        sessionStorage.setItem('@AuthFirebase:user', JSON.stringify(user))
        return (
        <Navigate to={'/Home'} />
        );
      }

    return (
        <div className='sign'>
            <Form 
            form_type={'Sign In'}
            action={'Sign In'}
            route={'/Register'}
            route_text={'I do not have an account'}
            typingEmail={value => setEmail(value)}
            typingPassword={value => setPassword(value)}
            button_function={signIn}
            />
        </div>
    )
}

export default Login