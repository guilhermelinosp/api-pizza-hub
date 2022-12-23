import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IDeleteCategory } from '../interfaces'

export class DeleteCategoryService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ id }: IDeleteCategory): Promise<void> {
		const categoryCheck = await this.prismaorm.category.findUnique({
			where: { id }
		})

		if (categoryCheck == null) {
			throw new InternalApiError('Category not found')
		}

		await this.prismaorm.category.delete({
			where: { id }
		})
	}
}
