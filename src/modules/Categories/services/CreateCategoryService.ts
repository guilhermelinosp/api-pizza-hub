import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { ICreateCategory } from '../interfaces'
import { ICategory } from '../models/ICategory'
export class CreateCategoryService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ name }: ICreateCategory): Promise<ICategory> {
		const categoryCheck = await this.prismaorm.category.findFirst({
			where: {
				name
			}
		})

		if (categoryCheck != null) {
			throw new InternalApiError('Category already exists.')
		}

		const categories = await this.prismaorm.category.create({
			data: {
				name
			}
		})

		return categories
	}
}
