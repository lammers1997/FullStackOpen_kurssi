import Person from './Person'

const Persons = ({ persons, showFilter, deleteThis }) => {
    return (
        <ul>
            {
                persons
                    .filter((person) =>
                        person.name.toLowerCase().includes(showFilter.toLowerCase())
                    )
                    .map((person) => (
                        <Person key={person.name} person={person.name} number={person.number} deleteThis={deleteThis} id={person.id}/>
                    ))
            }
        </ul>
    )
}

export default Persons

