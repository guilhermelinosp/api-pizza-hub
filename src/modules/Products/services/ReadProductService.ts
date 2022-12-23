import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IProduct } from '../models/IProduct'

export class ReadProductService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute(): Promise<IProduct[]> {
		const productCheck = await this.prismaorm.product.findMany()

		if (productCheck === null) {
			throw new InternalApiError('Products not found')
		}

		if (productCheck.length === 0) {
			throw new InternalApiError('Products not found')
		}

		return productCheck
	}
}
