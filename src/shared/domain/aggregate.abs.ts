import { Entity, EntityDTO } from './entity.abs';

export abstract class Aggregate<T extends Entity<EntityDTO> | K extends Aggregate <M extends Entity<EntityDTO>>> {
	constructor(
		protected entity: T,
	) { }

	public getEntity(): T {
		return this.entity;
	}
}
