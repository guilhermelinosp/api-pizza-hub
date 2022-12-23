import { PrismaORM } from '../../../shared/prisma'
import { InternalApiError } from '../../../shared/utils/errors/InternalApiError'
import { IReadByCategory } from '../interfaces'
import { IProduct } from '../models/IProduct'

export class ReadByCategoryProductService {
	constructor(private readonly prismaorm = PrismaORM) {}

	public async execute({ category_id }: IReadByCategory): Promise<IProduct[]> {
		const productCheck = await this.prismaorm.product.findMany({
			where: {
				category_id
			}
		})

		if (productCheck === null) {
			throw new InternalApiError('Products not found')
		}

		return productCheck
	}
}
