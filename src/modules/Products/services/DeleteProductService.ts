import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IDeleteProduct } from '../interfaces'

export class DeleteProductService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ id }: IDeleteProduct): Promise<void> {
		const productCheck = await this.prismaorm.product.findUnique({
			where: { id }
		})

		if (productCheck == null) {
			throw new InternalApiError('Product not found')
		}

		await this.prismaorm.product.delete({
			where: { id }
		})
	}
}
