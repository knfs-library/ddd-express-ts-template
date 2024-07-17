import { UUID } from "crypto";
import { Entity, EntityDTO } from "../../../../shared/domain/entity.abs";

export interface AdminDTO extends EntityDTO {
	firstName: string
	lastName: string
}

export class Admin extends Entity<AdminDTO> {
	public firstName: string
	public lastName: string

	constructor(
		id: UUID,
		firstName: string,
		lastName: string,
	) {
		super(id);
		this.firstName = firstName
		this.lastName = lastName
	}

	dto() {
		return {
			...this,
		}
	}
}