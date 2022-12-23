import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { ISendOrder } from '../interfaces'
import { IOrder } from '../models/IOrder'

export class SendOrderService {
	constructor(private readonly prismaorm = PrismaORM) {}
	public async execute({ id }: ISendOrder): Promise<IOrder> {
		const orderCheck = await this.prismaorm.order.findUnique({
			where: { id }
		})

		if (orderCheck == null) {
			throw new InternalApiError('Order not found')
		}

		const orders = await this.prismaorm.order.update({
			where: { id },
			data: {
				draft: false
			}
		})

		return orders
	}
}
