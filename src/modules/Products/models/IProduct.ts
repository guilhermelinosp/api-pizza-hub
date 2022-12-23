import { IItems } from '../../Items/models/IItems'

export interface IProduct {
	id: string
	name: string
	price: number
	createdAt?: Date
	updatedAt?: Date
	category_id: string
	OrderItem?: IItems[]
}
