import { Request, Response } from 'express'
import { SignInService } from '../services/SignInService'
import { SignUpService } from '../services/SignUpService'

export class UserController {
	public async signup(req: Request, res: Response): Promise<Response> {
		try {
			const { name, email, password } = req.body
			const signUpService = new SignUpService()
			const user = await signUpService.execute({ name, email, password })
			return res.status(201).json(user)
		} catch (err) {
			console.log(err)
			return res.status(400).json(err)
		}
	}

	public async signin(req: Request, res: Response): Promise<Response> {
		try {
			const { email, password } = req.body
			const signInService = new SignInService()
			const user = await signInService.execute({ email, password })
			return res.status(200).json(user)
		} catch (err) {
			console.log(err)
			return res.status(400).json(err)
		}
	}
}
