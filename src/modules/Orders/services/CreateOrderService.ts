import { PrismaORM } from '../../../shared/prisma'
import { ICreateOrder } from '../interfaces'
import { IOrder } from '../models/IOrder'

export class CreateOrderService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ table }: ICreateOrder): Promise<IOrder> {
		const orders = await this.prismaorm.order.create({
			data: {
				table
			}
		})

		return orders
	}
}
