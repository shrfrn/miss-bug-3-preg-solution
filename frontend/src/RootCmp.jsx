import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { AppHeader } from './cmps/AppHeader.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'

import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { BugIndex } from './pages/BugIndex.jsx'
import { BugDetails } from './pages/BugDetails.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
import { AdminDashboard } from './pages/AdminDashboard.jsx'

export function RootCmp() {

    return (
        <Router>
            <AppHeader />
            <main>
                <Routes>
                    <Route element={<HomePage />} path="/"></Route>
                    <Route element={<BugIndex />} path="/bug"></Route>
                    <Route element={<BugDetails />} path="/bug/:bugId"></Route>
                    <Route element={<AboutUs />} path="/about"></Route>
                    <Route element={<UserProfile />} path="/user"></Route>
                    <Route element={
                        <RouteGuard>
                            <AdminDashboard />
                        </RouteGuard>
                    } path="/admin"></Route>
                </Routes>
            </main>
            <AppFooter />
        </Router>
    )
}

function RouteGuard({ children }) {
    const loggedinUser = userService.getLoggedinUser()

    function isAllowed() {
        return loggedinUser?.isAdmin
    }

    if (!isAllowed()) return <Navigate to="/" />
    return children
}