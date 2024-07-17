import { UUID } from "crypto";

import { Admin } from "./Admin";
import { Entity, EntityDTO } from "../../../../shared/domain/entity.abs";

export interface TeamDTO extends EntityDTO {
	adminId: UUID
	name: string
	memberCount: number
	description: string | null
}

export class Team extends Entity<TeamDTO> {
	public admin: Admin
	public name: string
	public memberCount: number = 1
	public description: string | null

	constructor(
		id: UUID,
		name: string,
		admin: Admin,
		memberCount: number,
		description: string | null = ''
	) {
		super(id);
		this.admin = admin
		this.name = name
		this.memberCount = memberCount
		this.description = description
	}

	dto() {
		return {
			id: this.id,
			name: this.name,
			adminId: this.admin.id,
			memberCount: this.memberCount,
			description: this.description
		}
	}
}