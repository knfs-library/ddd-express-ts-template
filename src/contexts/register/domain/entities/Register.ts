import { UUID } from "crypto";

import Address from "../value-objects/Address";
import { Entity, EntityDTO } from "../../../../shared/domain/entity.abs";

export interface RegisterDTO extends EntityDTO {
	firstName: string
	lastName: string
	birthday: Date
	address: string
}

export class Register extends Entity<RegisterDTO> {
	public firstName: string
	public lastName: string
	public birthday: Date
	public address: string

	constructor(
		id: UUID,
		firstName: string,
		lastName: string,
		birthday: Date,
		address: string,
	) {
		super(id);
		this.firstName = firstName
		this.lastName = lastName
		this.birthday = birthday
		this.address = address
	}
	
	dto() {
		return {
			...this,
			address: this.address
		}
	}
}