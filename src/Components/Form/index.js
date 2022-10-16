import { NavLink } from 'react-router-dom'
import './Form.css'

const Form = (props) => {
    return (
        <form className='form'>
            <h1 className='form__title'>{props.form_type}</h1>
            <label className='form__label'>Email:
                <input onChange={event => props.typingEmail(event.target.value)} className='form__input-field' placeholder='Type your email' />
            </label>
            <label className='form__label'>Password:
                <input onChange={event => props.typingPassword(event.target.value)} className='form__input-field' placeholder='Type your password' type={'password'} />
            </label>
            <button type='submit' onClick={props.button_function} className='form__button'>{props.action}</button>
            <NavLink className={'form__route'} to={props.route}>{props.route_text}</NavLink>
            {props.error}
        </form>
    )
}

export default Form