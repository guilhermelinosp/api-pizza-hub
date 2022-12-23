import { hash } from 'bcryptjs'
import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import path from 'path'
import { IUser } from '../models/IUser'
import Mail from '../../../shared/utils/mail'
import { ISignUp } from '../interfaces'

export class SignUpService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ name, email, password }: ISignUp): Promise<IUser> {
		const userCheckEmail = await this.prismaorm.user.findFirst({
			where: {
				email
			}
		})

		if (userCheckEmail != null) {
			throw new InternalApiError('Email address already used.')
		}

		const user = await this.prismaorm.user.create({
			data: {
				name,
				email,
				password: await hash(password, 8)
			}
		})

		const template = path.resolve(__dirname + '../../../../shared/utils/views/signUp.hbs')

		await Mail.sendMail({
			to: {
				name: user.name,
				email: user.email
			},
			subject: 'Sign Up',
			template: {
				file: template,
				variables: {
					name: user.name
				}
			}
		})

		return user
	}
}
