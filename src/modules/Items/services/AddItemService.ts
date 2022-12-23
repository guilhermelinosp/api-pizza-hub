import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { ICreateItem } from '../interfaces'
import { IItems } from '../models/IItems'

export class AddItemService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ order_id, product_id, amount }: ICreateItem): Promise<IItems> {
		const orderCheck = await this.prismaorm.order.findUnique({
			where: { id: order_id }
		})

		if (orderCheck == null) {
			throw new InternalApiError('Order not found')
		}

		const productCheck = await this.prismaorm.product.findUnique({
			where: { id: product_id }
		})

		if (productCheck == null) {
			throw new InternalApiError('Product not found')
		}

		const items = await this.prismaorm.item.create({
			data: {
				order_id,
				product_id,
				amount
			}
		})

		return items
	}
}
