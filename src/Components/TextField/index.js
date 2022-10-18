import './TextField.css'

const TextField = (props) => {
    return (
        <label className='text__field-label'>{props.label}
        <input readOnly={props.readOnly} className='text__field' value={props.value} onChange={(event) => props.onTyped(event.target.value)} />
        </label>
    )
}

export default TextField