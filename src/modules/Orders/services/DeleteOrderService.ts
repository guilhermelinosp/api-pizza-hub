import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IDeleteOrder } from '../interfaces'

export class DeleteOrderService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ id }: IDeleteOrder): Promise<void> {
		const orderCheck = await this.prismaorm.order.findUnique({
			where: { id }
		})

		if (orderCheck == null) {
			throw new InternalApiError('Order not found')
		}

		await this.prismaorm.order.delete({
			where: { id }
		})
	}
}
