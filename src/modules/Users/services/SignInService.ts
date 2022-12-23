import 'dotenv/config'
import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { ISignIn } from '../interfaces'
import Mail from '../../../shared/utils/mail'
import path from 'path'
import os from 'os'

import { IUser } from '../models/IUser'

interface IResponse {
	user: IUser
	token: string
}

export class SignInService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ email, password }: ISignIn): Promise<IResponse> {
		const userCheckEmail = await this.prismaorm.user.findFirst({
			where: {
				email
			}
		})

		if (userCheckEmail == null) {
			throw new InternalApiError('Incorrect email/password combination.')
		}

		const userCheckPassword = await compare(password, userCheckEmail.password)

		if (!userCheckPassword) {
			throw new InternalApiError('Incorrect email/password combination.')
		}

		const token = sign({}, process.env.JWT_SECRET as string, {
			subject: userCheckEmail.id,
			expiresIn: process.env.JWT_EXPIRES_IN as string
		})

		const ip = os.networkInterfaces().eth0?.[0].address

		const time = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })

		const template = path.resolve(__dirname + '../../../../shared/utils/views/signIn.hbs')

		await Mail.sendMail({
			to: {
				name: userCheckEmail.name,
				email: userCheckEmail.email
			},
			subject: 'Sign In',
			template: {
				file: template,
				variables: {
					name: userCheckEmail.name,
					ip: ip!,
					time
				}
			}
		})

		return {
			user: userCheckEmail,
			token
		}
	}
}
