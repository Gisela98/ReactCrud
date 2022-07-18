import UsersForm from "./components/UsersForm"
import UsersList from "./components/UsersList"
import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import "./App.css"
import React from "react"
import { useForm } from 'react-hook-form';


function App() {

  const {register, handleSubmit, reset} = useForm()
  const [users, setUsers] = useState()
  const [isShowForm, setIsShowForm] = useState(false)
  const [objectUpdate, setObjectUpdate] = useState()

  const URL = "https://users-crud1.herokuapp.com"

  const getAllUsers = () => {
    axios.get(`${URL}/${"users"}/`)
      .then(({data}) => setUsers(data))
      .catch(error => console.log(error))
  }

  useEffect (() => {
    getAllUsers()
  }, [])

  console.log(users);

  const createNewUser = newUser => {
    axios.post ("https://users-crud1.herokuapp.com/users/", newUser)
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
      .finally(() => getAllUsers())
  }

  const deleteUser = id => {
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
      .then(res => console.log(res.data))
      .catch(error => console.log(error))
      .finally(() => getAllUsers())
  }

  const upDatePartialUser = (id, upDateUser) => {
    axios.patch(`https://users-crud1.herokuapp.com/users/${id}/`, upDateUser)
      .then(res => {
        console.log(res.data);
        setObjectUpdate()
        setIsShowForm(false)
      })
      .catch(error => console.log(error))
      .finally(() => getAllUsers())
  }

  const showForm = () => {
    const obj = {
      first_name: '',
      last_name: '',
      email: '',
      birthday: '',
      password: ''
    }
    reset(obj)
    setIsShowForm(!isShowForm)
  }

  return (
    <div className='user'>
      <div className='container'>
        <p>New users</p>
        <hr/>
      </div>
      <div className='principaldiv'>
        <div className='column1'>
          {
            isShowForm && <UsersForm
              createNewUser={createNewUser}
              upDatePartialUser={upDatePartialUser}
              objectUpdate={objectUpdate}
              register={register}
              handleSubmit={handleSubmit}
              reset={reset}
            />
          }
          <button className='createbutton' onClick={showForm} >
            {isShowForm ? 'Hide Form' : 'Create User'}
          </button>
        </div>
        <div className="App">
          {
            users?.map(user => (
              <UsersList
                key={user.id}
                user={user}
                deleteUser={deleteUser}
                setObjectUpdate={setObjectUpdate}
                setIsShowForm={setIsShowForm}
                reset={reset}
              />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default App