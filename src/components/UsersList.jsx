import React from 'react'


const UsersList = ({user, deleteUser, setObjectUpdate, setIsShowForm, reset}) => {

    const upDateUser = () => {
        setIsShowForm(true)
        const obj = {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            birthday: user.birthday,
            password: user.password
        }
        reset(obj)
        setObjectUpdate(user)
    }


  return (
    <article className='carduser'>
        <h2 className='name'>{user.first_name} {user.last_name} </h2>
        <p className='email'>{user.email}</p>
        <p className='birthday'> <i class="fa-solid fa-cake-candles"></i>{user.birthday}</p>
        <hr className='card'/>
        <div className='buttons'>
            <button className='trash' onClick={() => deleteUser(user.id)} ><i class="fa-solid fa-trash-can"></i></button>
            <button className='pencil' onClick={upDateUser} ><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
    </article>
  )
}

export default UsersList