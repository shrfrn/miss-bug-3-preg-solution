import React, { useState, useEffect } from 'react'

import { BugList } from "../cmps/BugList.jsx"
import { bugService } from "../services/bug.service.js"
import { userService } from "../services/user.service.js"

export function UserProfile() {

    const [user, setUser] = useState(userService.getLoggedinUser())
    const [bugsToShow, setBugsToShow] = useState([])

    useEffect(() => {
        loadUserBugs()
    }, [])

    async function loadUserBugs() {
        try {
            const bugs = await bugService.query({ ownerId: user._id })
            setBugsToShow(bugs)
        } catch (err) {
            console.log('err:', err)
        }
    }

    // Can implement full crudl on bugs here~

    return <section className="user-profile">
        <h1>Hello {user.username}</h1>

        <hr />
        <p>Your bugs!</p>
        <BugList bugs={bugsToShow} />
        <pre>
            {JSON.stringify(bugsToShow, null, 2)}
        </pre>

        <hr />
    </section>
}