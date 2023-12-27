const Person = ({ person, number, deleteThis,id }) => {
  return (
    <li>{person} {number}
      <button type="button" onClick={() => deleteThis(id)}>
        delete
      </button>
    </li>
  )
}

export default Person