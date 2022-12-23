import { Request, Response } from 'express'
import { CreateOrderService } from '../services/CreateOrderService'
import { DeleteOrderService } from '../services/DeleteOrderService'
import { FinishOrderService } from '../services/FinishOrderService'
import { ReadOrderService } from '../services/ReadOrderService'
import { SendOrderService } from '../services/SendOrderService'
import { ReadAllOrderService } from '../services/ReadAllOrderService'
import { ReadFinishOrderService } from '../services/ReadFinishOrderService'

export class OrderController {
	public async create(req: Request, res: Response): Promise<Response> {
		try {
			const { table } = req.body
			const createOrderService = new CreateOrderService()
			const orders = await createOrderService.execute({ table })
			return res.status(201).json(orders)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async read(_req: Request, res: Response): Promise<Response> {
		try {
			const readAllOrderService = new ReadAllOrderService()
			const orders = await readAllOrderService.execute()
			return res.status(200).json(orders)
		} catch (err) {
			return res.status(400).json(err as string)
		}
	}

	public async readprogress(_req: Request, res: Response): Promise<Response> {
		try {
			const readOrderService = new ReadOrderService()
			const orders = await readOrderService.execute()
			return res.status(200).json(orders)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async readfinalized(_req: Request, res: Response): Promise<Response> {
		try {
			const readFinishOrderService = new ReadFinishOrderService()
			const orders = await readFinishOrderService.execute()
			return res.status(200).json(orders)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async send(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params
			const sendOrderService = new SendOrderService()
			const orders = await sendOrderService.execute({ id })
			return res.status(200).json(orders)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async finish(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params
			const finishOrderService = new FinishOrderService()
			const orders = await finishOrderService.execute({ id })
			return res.status(200).json(orders)
		} catch (err) {
			return res.status(400).json(err)
		}
	}

	public async delete(req: Request, res: Response): Promise<Response> {
		try {
			const { id } = req.params
			const deleteOrderService = new DeleteOrderService()
			await deleteOrderService.execute({ id })
			return res.status(200).json({})
		} catch (err) {
			return res.status(400).json(err)
		}
	}
}
