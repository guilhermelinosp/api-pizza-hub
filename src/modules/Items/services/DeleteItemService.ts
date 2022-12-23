import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IDeleteItem } from '../interfaces'

export class DeleteItemService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ id }: IDeleteItem): Promise<void> {
		const orderItemCheck = await this.prismaorm.item.findUnique({
			where: {
				id
			}
		})

		if (orderItemCheck == null) {
			throw new InternalApiError('Item not found')
		}

		await this.prismaorm.item.delete({
			where: { id }
		})
	}
}
