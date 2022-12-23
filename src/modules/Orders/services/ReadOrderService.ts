import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IOrder } from '../models/IOrder'

export class ReadOrderService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute(): Promise<IOrder[]> {
		const orderCheck = await this.prismaorm.order.findMany({
			where: {
				draft: false,
				status: false
			},

			orderBy: {
				createdAt: 'desc'
			}
		})

		if (orderCheck === null) {
			throw new InternalApiError('Orders not found')
		}

		return orderCheck
	}
}
