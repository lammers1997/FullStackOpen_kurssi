import Table from 'react-bootstrap/Table'

import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <Table striped hover variant="secondary">
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
export default Users
