import React, { useContext } from 'react'
import { UserContext } from '../Context/AuthContext';
import { NavLink } from 'react-router';

export default function SideBar() {
    const { user, logoutUser } = useContext(UserContext);
    const activeClass = " bg-amber-500 text-white p-1 text-center rounded-full font-semibold";
    return (
        <div className="w-64 bg-white shadow-lg text-center p-6 flex flex-col gap-4">
            <div className='flex flex-col items-center gap-4'>

                <img className='w-12 h-12 flex items-center justify-center rounded-full' 
                src="https://imgs.search.brave.com/OpbbSPZD14-aVE7MlUQDBUBAPlpS04udkFCBMt7jnDo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMjE5/MjIyMjExMi92ZWN0/b3IvcHJvZmlsZS1h/dmF0YXItb2YtYmVh/cmQtbWFuLXdlYXJp/bmctc3VuZ2xhc3Nl/cy5qcGc_cz02MTJ4/NjEyJnc9MCZrPTIw/JmM9ODJldmhBR0hK/VHJhNmtqbFdORHdk/b21xR3VtVWpKb3Fx/dUdKbWJZQ0M1QT0" alt="" />

                <p className="text-sm text-gray-600">
                    {user?.email}
                </p>
            </div>

            <NavLink to="/dashboard" end className={({ isActive }) => {
                return isActive ? activeClass : "hover:text-amber-500"
            }}>
                Dashboard
            </NavLink>

            <NavLink to="/dashboard/expenses" className={({ isActive }) => {
                return isActive ? activeClass : "hover:text-amber-500"
            }}>
                Expenses
            </NavLink>

            <NavLink to="/dashboard/budget" className={({ isActive }) => {
                return isActive ? activeClass : "hover:text-amber-500"
            }}>
                Budget
            </NavLink>

            <NavLink to="/dashboard/analytics" className={({ isActive }) => {
                return isActive ? activeClass : "hover:text-amber-500"
            }}>
                Analytics
            </NavLink>

            <NavLink to="/dashboard/settings" className={({ isActive }) => {
                return isActive ? activeClass : "hover:text-amber-500"
            }}>
                Settings
            </NavLink>

            <button
                onClick={logoutUser}
                className="bg-red-500 text-white p-2 rounded-lg mt-auto hover:cursor-pointer"
            >
                Logout
            </button>

        </div>
    )
}
