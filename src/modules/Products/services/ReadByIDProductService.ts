import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IReadByIDProduct } from '../interfaces'
import { IProduct } from '../models/IProduct'

export class ReadByIDProductService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ id }: IReadByIDProduct): Promise<IProduct> {
		const productCheck = await this.prismaorm.product.findUnique({
			where: { id }
		})

		if (productCheck == null) {
			throw new InternalApiError('Product not found')
		}

		return productCheck
	}
}
