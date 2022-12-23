import { PrismaORM } from '../../../shared/prisma'
import { IDetailItem } from '../interfaces'
import { IItems } from '../models/IItems'

export class DetailItemService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ order_id }: IDetailItem): Promise<IItems[]> {
		const itemsCheck = await this.prismaorm.item.findMany({
			where: {
				order_id
			},
			include: {
				order: true,
				product: true
			}
		})

		return itemsCheck
	}
}
