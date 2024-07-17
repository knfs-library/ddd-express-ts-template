import { UUID } from "crypto";

import {
	AdminApproveRequestEvent,
	AdminApproveRequestMessage,
} from "../events/AdminApprovedRequest.event";
import {
	RegisterRequestedJoinTeamEvent,
	RegisterRequestedJoinTeamMessage,
} from "../events/RegisterRequestedJoinTeam.event";
import { RequestState, RequestStateCode, RequestStateString } from "../value-objects/RequestState";
import { Team } from "./Team";
import { Register } from "./Register";
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

	public register: Register
	public team: Team
	public state: RequestState

	constructor(
		id: UUID,
		register: Register,
		team: Team,
	) {
		super(id);
		this.register = register
		this.team = team
		this.state = new RequestState(RequestStateCode.Pending, RequestStateString.Pending)
	}

	approved(adminId: UUID): boolean {
		if (adminId === this.team.admin.id) {
			this.state = new RequestState(RequestStateCode.Approved, RequestStateString.Approved)
			return true
		} else {
			return false
		}
	}

	dto() {
		return {
			id: this.id,
			registerId: this.register.id,
			teamId: this.team.id,
			state: this.state.getStateCode()
		}
	}
}