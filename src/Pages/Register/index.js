import Form from '../../Components/Form'
import './Register.css'

const Register = () => {
    return (
        <div className='sign'>
            <Form 
            form_type={'Sign Up'}
            action={'Sign Up'}
            route={'/'}
            route_text={'I already have an account'}
            />
        </div>
    )
}

export default Register