import React, { useContext } from 'react'
import { UserContext } from '../Context/AuthContext'

export default function Dashboard() {

  const { user, logoutUser } = useContext(UserContext);

  return (
    <div className="p-6">

        <h2 className="text-2xl font-bold">
            Welcome {user?.email || "User"}
        </h2>

        <button
            onClick={logoutUser}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
            Logout
        </button>

    </div>
  )
}
