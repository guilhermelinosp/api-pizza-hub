import { Category } from '@prisma/client'

export interface ICategory extends Category {
	id: string
	name: string
	created_at?: Date
	updated_at?: Date
}
