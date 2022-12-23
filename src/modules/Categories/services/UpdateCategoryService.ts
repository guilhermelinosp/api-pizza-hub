import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IUpdateCategory } from '../interfaces'
import { ICategory } from '../models/ICategory'
export class UpdateCategoryService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ id, name }: IUpdateCategory): Promise<ICategory> {
		const categoryCheck = await this.prismaorm.category.findUnique({
			where: {
				id
			}
		})

		if (categoryCheck == null) {
			throw new InternalApiError('Category not found')
		}

		if (categoryCheck.name === name) {
			throw new InternalApiError('There is already one category with this name.')
		}

		const categories = await this.prismaorm.category.update({
			where: {
				id
			},
			data: {
				name
			}
		})

		return categories
	}
}
