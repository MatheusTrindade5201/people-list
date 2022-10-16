import Form from '../../Components/Form'
import './Login.css'

const Login = () => {
    return (
        <div className='sign'>
            <Form 
            form_type={'Sign In'}
            action={'Sign In'}
            route={'/Register'}
            route_text={'I do not have an account'}
            />
        </div>
    )
}

export default Login