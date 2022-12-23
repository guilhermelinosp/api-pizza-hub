import { IItems } from '../../Items/models/IItems'

export interface IOrder {
	id: string
	table: number
	status: boolean
	draft: boolean
	createdAt?: Date
	updatedAt?: Date
	OrderItem?: IItems[]
}
