import './People.css'

const People = (props) => {

    return (
        <div className="people" >
            <table className='people__table'>
                <thead className='prople__row'>
                    <tr>
                        <th className='prople__header'>Id</th>
                        <th className='prople__header'>Name</th>
                        <th className='prople__header'>Email</th>
                        <th className='prople__header'>Birth Date</th>
                        <th className='prople__header'>Options</th>
                    </tr>
                </thead>
                <tbody>
                    {props.rows}
                </tbody>
            </table>
            
        </div>
    )
}

export default People