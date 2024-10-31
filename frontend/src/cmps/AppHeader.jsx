import { useState } from "react"
import { useNavigate } from "react-router"
import { Link, NavLink } from "react-router-dom"

import { userService } from './../services/user.service.js'

import { UserMsg } from './UserMsg.jsx';
import { LoginSignup } from './LoginSignup.jsx';

export function AppHeader() {

    const [user, setUser] = useState(userService.getLoggedinUser())
    const navigate = useNavigate()

    async function onLogout() {
        try {
            await userService.logout()
            setUser(null)
            navigate('/')
        } catch (err) {
            console.log('problem logging out - err:', err)
        }
    }

    return (
        <header>
            <UserMsg />

            <h1>Bugs are Forever</h1>
            <nav>
                <NavLink to='/'>Home</NavLink> 
                <NavLink to='/bug'>Bugs</NavLink>
                <NavLink to='/about'>About</NavLink>

                {user && user.isAdmin && <NavLink to='/admin'>Admin</NavLink>}
            </nav>
            
            <GreetUser
                user={user}
                onLogout={onLogout}
                setUser={setUser} />
        </header>
    )
}

function GreetUser({ user, onLogout, setUser }) {
    if (!user) return <LoginSignup setUser={setUser} />
    console.log(user)

    return <div className="greet-user">
        <NavLink to="/user">{user.fullname}</NavLink>
        <button onClick={onLogout}>Logout</button>
    </div>
}
