import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

const Profile = () => {
    let {user, logoutUser} = useContext(AuthContext)
  return (
    <div>
        {user && <p>Hello {user.username}</p>}
        <button onClick={logoutUser} >
            Logout
        </button>
    </div>
  )
}

export default Profile