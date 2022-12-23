import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { ICategory } from '../models/ICategory'
export class ReadCategoryService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute(): Promise<ICategory[]> {
		const categoryCheck = await this.prismaorm.category.findMany()

		if (categoryCheck === null) {
			throw new InternalApiError('Categories not found')
		}

		if (categoryCheck.length === 0) {
			throw new InternalApiError('Categories not found')
		}

		return categoryCheck
	}
}
