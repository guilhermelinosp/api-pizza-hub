import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IReadByIDCategory } from '../interfaces'
import { ICategory } from '../models/ICategory'

export class ReadByIDCategoryService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ id }: IReadByIDCategory): Promise<ICategory> {
		const categoryCheck = await this.prismaorm.category.findUnique({
			where: { id }
		})

		if (categoryCheck == null) {
			throw new InternalApiError('Category not found')
		}

		return categoryCheck
	}
}
