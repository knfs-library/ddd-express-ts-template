import { UUID } from "crypto";

import {
	AdminApproveRequestEvent,
	AdminApproveRequestMessage,
} from "../events/AdminApprovedRequest.event";
import {
	RegisterRequestedJoinTeamEvent,
	RegisterRequestedJoinTeamMessage,
} from "../events/RegisterRequestedJoinTeam.event";
import { Entity, EntityDTO } from "../../../../shared/domain/entity.abs";

export interface RequestDTO extends EntityDTO {
	registerId: UUID
	teamId: UUID
	state: number
}

export class Request extends Entity<RequestDTO> {
	public events = {
		created: {
			event: AdminApproveRequestEvent,
			msg: AdminApproveRequestMessage
		},
		approved: {
			event: RegisterRequestedJoinTeamEvent,
			msg: RegisterRequestedJoinTeamMessage
		}
	}

	public registerId: UUID
	public teamId: UUID
	public state: number

	constructor(
		id: UUID,
		registerId: UUID,
		teamId: UUID,
		state: number
	) {
		super(id);
		this.registerId = registerId
		this.teamId = teamId
		this.state = state
	}

	dto() {
		return {
			id: this.id,
			registerId: this.registerId,
			teamId: this.teamId,
			state: this.state
		}
	}
}