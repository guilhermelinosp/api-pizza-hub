import { Request, Response } from 'express'
import { AddItemService } from '../services/AddItemService'
import { DeleteItemService } from '../services/DeleteItemService'
import { DetailItemService } from '../services/ReadbyOrderItemService'
import { ReadItemService } from '../services/ReadItemService'

export class ItemController {
	public async read(_req: Request, res: Response): Promise<Response> {
		try {
			const readItemService = new ReadItemService()
			const orders = await readItemService.execute()
			return res.status(200).json(orders)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async readbyorder(req: Request, res: Response): Promise<Response> {
		try {
			const { order_id } = req.query as { order_id: string }
			const detailItemService = new DetailItemService()
			const orders = await detailItemService.execute({ order_id })
			return res.status(200).json(orders)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async add(req: Request, res: Response): Promise<Response> {
		try {
			const { order_id, product_id, amount } = req.body
			const addItemService = new AddItemService()
			const orderItems = await addItemService.execute({ order_id, product_id, amount })
			return res.status(201).json(orderItems)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params
			const deleteItemService = new DeleteItemService()
			await deleteItemService.execute({ id })
			return res.status(204).json({})
		} catch (err) {
			return res.status(400).json(err as string)
		}
	}
}
