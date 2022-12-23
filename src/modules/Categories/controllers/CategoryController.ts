import { Request, Response } from 'express'
import { CreateCategoryService } from '../services/CreateCategoryService'
import { DeleteCategoryService } from '../services/DeleteCategoryService'
import { ReadCategoryService } from '../services/ReadCategoryService'
import { ReadByIDCategoryService } from '../services/ReadByIDCategoryService'
import { UpdateCategoryService } from '../services/UpdateCategoryService'

export class CategoryController {
	public async create(req: Request, res: Response): Promise<Response> {
		try {
			const { name } = req.body
			const createCategoryService = new CreateCategoryService()
			const categories = await createCategoryService.execute({ name })
			return res.status(201).json(categories)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async read(_req: Request, res: Response): Promise<Response> {
		try {
			const readCategoryService = new ReadCategoryService()
			const categories = await readCategoryService.execute()
			return res.status(200).json(categories)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async readbyid(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params
			const readByIDCategoryService = new ReadByIDCategoryService()
			const categories = await readByIDCategoryService.execute({ id })
			return res.status(200).json(categories)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async update(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params
			const { name } = req.body
			const updateCategoryService = new UpdateCategoryService()
			const categories = await updateCategoryService.execute({ id, name })
			return res.status(200).json(categories)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params
			const deleteCategoryService = new DeleteCategoryService()
			await deleteCategoryService.execute({ id })
			return res.status(200).json({})
		} catch (err) {
			return res.status(400).json(err)
		}
	}
}
