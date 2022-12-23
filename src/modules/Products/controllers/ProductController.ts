import { Request, Response } from 'express'
import { CreateProductService } from '../services/CreateProductService'
import { DeleteProductService } from '../services/DeleteProductService'
import { ReadProductService } from '../services/ReadProductService'
import { ReadByCategoryProductService } from '../services/ReadByCategoryProductService'
import { UpdateProductService } from '../services/UpdateProductService'
import { ReadByIDProductService } from '../services/ReadByIDProductService'

export class ProductController {
	public async create(req: Request, res: Response): Promise<Response> {
		try {
			const { name, price, category_id } = req.body
			const createProductService = new CreateProductService()
			const products = await createProductService.execute({ name, price, category_id })
			return res.status(201).json(products)
		} catch (err) {
			return res.status(400).json(err as string)
		}
	}

	public async read(_req: Request, res: Response): Promise<Response> {
		try {
			const readProductService = new ReadProductService()
			const products = await readProductService.execute()
			return res.status(200).json(products)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async readbyid(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params
			const readByIDProductService = new ReadByIDProductService()
			const products = await readByIDProductService.execute({ id })
			return res.status(200).json(products)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async readbycategory(req: Request, res: Response): Promise<Response> {
		try {
			const { category_id } = req.query as { category_id: string }
			const readByCategoryProductService = new ReadByCategoryProductService()
			const products = await readByCategoryProductService.execute({ category_id })
			return res.status(200).json(products)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params
			const { name, price, category_id } = req.body
			const updateProductService = new UpdateProductService()
			const products = await updateProductService.execute({
				id,
				name,
				price,
				category_id
			})
			return res.status(200).json(products)
		} catch (err) {
			return res.status(400).json(err as string)
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params
			const deleteProductService = new DeleteProductService()
			await deleteProductService.execute({ id })
			return res.status(200).json({})
		} catch (err) {
			return res.status(400).json(err)
		}
	}
}
