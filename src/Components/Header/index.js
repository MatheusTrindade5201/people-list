import './Header.css'

const Header = (props) => {
    
    return (
        <div className='header'>
            <h1 className='header__title'>People List</h1>
            <button onClick={props.function} className='header__signOut'>Sing Out</button>
        </div>

    )
}

export default Header