import { UUID } from "crypto";

import { Entity, EntityDTO } from "../../../../shared/domain/entity.abs";

export interface TeamDTO extends EntityDTO {
	adminId: UUID
	name: string
	memberCount: number
	description: string | null
}

export class Team extends Entity<TeamDTO> {
	public adminId: UUID
	public name: string
	public memberCount: number = 1
	public description: string | null | undefined

	constructor(
		id: UUID,
		adminId: UUID,
		name: string,
		memberCount: number,
		description: string | null | undefined
	) {
		super(id);
		this.adminId = adminId
		this.name = name
		this.memberCount = memberCount
		this.description = description
	}

	dto() {
		return {
			id: this.id,
			name: this.name,
			adminId: this.adminId,
			memberCount: this.memberCount,
			description: this.description ?? ''
		}
	}
}