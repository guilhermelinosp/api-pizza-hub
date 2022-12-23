import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IItems } from '../models/IItems'

export class ReadItemService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute(): Promise<IItems[]> {
		const itemCheck = await this.prismaorm.item.findMany()

		if (itemCheck === null) {
			throw new InternalApiError('Categories not found')
		}

		if (itemCheck.length === 0) {
			throw new InternalApiError('Categories not found')
		}

		return itemCheck
	}
}
