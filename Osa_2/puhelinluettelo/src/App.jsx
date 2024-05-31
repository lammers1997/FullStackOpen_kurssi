import { useState, useEffect } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFilter, setShowFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  //Retrieve data from database to render it in the browser
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  //Change person's number
  const changeNumber = (person, newNumber) => {

    const changedNumber = { ...person, number: newNumber }

    personService
      .changeNumber(changedNumber.id, changedNumber)
      .then(returnedPerson => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
        setNotificationMessage(
          `${returnedPerson.name}'s number successfully changed`
        )
        setTimeout(() => {
          setNotificationMessage(null)
        }, 6000)
      })
      .catch(error => {
        setErrorMessage(error.response.data.error)
        setTimeout(() => {
          setErrorMessage(null)
        }, 6000)
      })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    const person = persons.find(p => p.id === id)
    const ifDelete = window.confirm(`Delete ${person.name}?`)
    if (!ifDelete) {     //client does not want to delete person
      console.log("Delete cancelled")
      return

    } else { //client wants to delete person
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          setNotificationMessage(
            `${person.name} deleted successfully.`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 6000)
        })
        .catch(() => {
          setErrorMessage(
            `Information of ${person.name} has already been removed from server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 6000)
        })
    }

  }

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    const findIfExists = persons.some(person => person.name === nameObject.name);
    //Check if person actually exists
    if (findIfExists) {
      const ifChange = window.confirm(`${nameObject.name} is already added to phonebook, replace the old number with a new one?`)
      //Person exists. Change only number
      if (ifChange) {
        const person = persons.find(p => p.name === nameObject.name)

        changeNumber(person, newNumber)
        return
      }
      //Do nothing if client does not want to change number
      else {
        return //End function, so that no duplicates is accepted
      }

      //Add new person
    } else {

      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setNotificationMessage(
            `Added ${newName}`
          )
          setTimeout(() => {
            setNotificationMessage(null)
          }, 6000)
        })
        .catch(error => {
          setErrorMessage(error.response.data.error)
          
        setTimeout(() => {
          setErrorMessage(null)
        }, 6000)
        })     
      
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setShowFilter(event.target.value)
  }
  return (
    <div>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />

      <h2>Phonebook</h2>
      <Filter showFilter={showFilter}
        handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <h3>Numbers</h3>
      <Persons persons={persons}
        showFilter={showFilter}
        deleteThis={deletePerson}
      />
    </div>
  )

}

export default App