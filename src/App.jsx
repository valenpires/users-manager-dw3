import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { UserProvider } from './UserContext'
import UserList from './UserList'
import UserDetails from './UserDetails'
import UserForm from './UserForm'
import UserEdit from './UserEdit'
import UserDelete from './UserDelete'

const App = () => {
  const addUser = async newUser => {
    try {
      const response = await fetch(
        'https://67252e25c39fedae05b426fe.mockapi.io/users',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(newUser)
        }
      )
      if (response.ok) {
        const data = await response.json()
        setUsers([...users, data])
      } else {
        console.error('Error al agregar usuario')
      }
    } catch (error) {
      console.error('Error en la solicitud: ', error)
    }
  }

  return (
    <>
      {/* <nav class='navbar navbar-expand-lg bg-primary' data-bs-theme='dark'>
        <div class='container-fluid'>
          <a class='navbar-brand' href='#'>
            Users Manager
          </a>
        </div>
      </nav>
      <UserForm addUser={addUser} />
      <UserList users={users} /> */}

      <UserProvider>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/create'>Crear Usuario</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path='/' element={<UserList users={users} />} />
            <Route path='/users/:id' element={<UserDetails />} />
            <Route path='/create' element={<UserForm addUser={addUser} />} />
            <Route path='/edit/:id' element={<UserEdit />} />
            <Route path='/delete/:id' element={<UserDelete />} />
          </Routes>
        </Router>
      </UserProvider>
    </>
  )
}

export default App
