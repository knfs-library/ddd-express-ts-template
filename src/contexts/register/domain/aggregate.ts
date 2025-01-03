import { Request } from "./entities/Request";
import { Team } from "./entities/Team";
import { Register } from "./entities/Register";
import { Admin } from "./entities/Admin";
import Address from "./value-objects/Address";
import { RequestState, RequestStateCode, RequestStateString } from "./value-objects/RequestState";

import { UUID } from "crypto";

class RequestAggregate extends Request {
	public team: Team | TeamAggregate
	public register: Register | RegisterAggregate
	public stateObj: RequestState
	constructor(
		id: UUID,
		register: Register | RegisterAggregate,
		team: Team | TeamAggregate,
		stateObj: RequestState | null,
	) {
		if (null === stateObj ) {
			stateObj = new RequestState(RequestStateCode.Pending, RequestStateString.Pending)
		}
		super(
			id,
			register.id,
			team.id,
			stateObj.getStateCode()
		)
		this.stateObj = stateObj;
		this.team = team
		this.register = register
	}

	approved(adminId: UUID) {
		if (adminId !== this.team.adminId) {
			return false
		}
		this.stateObj = new RequestState(RequestStateCode.Approved, RequestStateString.Approved)
		this.state = this.stateObj.getStateCode()

		return true
	}
}

class TeamAggregate extends Team {
	public admin: Admin

	constructor(
		id: UUID,
		admin: Admin,
		name: string,
		memberCount: number,
		description: string | null | undefined
	) {
		super(
			id,
			admin.id,
			name,
			memberCount,
			description
		)
		this.admin = admin
	}
}

class RegisterAggregate extends Register {
	public addressObj: Address

	constructor(
		id: UUID,
		firstName: string,
		lastName: string,
		birthday: Date,
		addressObj: Address
	) {
		super(
			id,
			firstName,
			lastName,
			birthday,
			addressObj.toString()
		)
		this.addressObj = addressObj
	}
}

export {
	RequestAggregate,
	TeamAggregate,
	RegisterAggregate
}