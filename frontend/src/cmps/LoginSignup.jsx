import { useState } from 'react'

import { showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'

import { LoginForm } from './LoginForm.jsx'

export function LoginSignup({ setUser }) {
	const [isSignup, setIsSignUp] = useState(false)

	function onSubmit(credentials) {
		isSignup ? signup(credentials) : login(credentials)
	}

	async function login(credentials) {
		try {
			const user = await userService.login(credentials)
			setUser(user)
		} catch (err) {
			showErrorMsg('Oops try again')
		}
	}

	async function signup(credentials) {
		try {
			const signedUser = await userService.signup(credentials)
			setUser(signedUser)
		} catch {
			showErrorMsg('Oops try again')
		}
	}

	return (
		<div className="login-page">
			<LoginForm onSubmit={onSubmit} isSignup={isSignup} />
			<div className="btns">
				<a href="#" onClick={() => setIsSignUp(!isSignup)}>
					{isSignup ? 'Already a member? Login' : 'New user? Signup here'}
				</a>
			</div>
		</div>
	)
}
