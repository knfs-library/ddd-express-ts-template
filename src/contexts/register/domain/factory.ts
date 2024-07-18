import { Register } from "./entities/Register";
import { Admin } from "./entities/Admin"
import { Request } from "./entities/Request";
import { Team } from "./entities/Team";
import Address from "./value-objects/Address";

import FactoryInterface from "../../../shared/domain/factory.itf";

import { User } from "../../../shared/infrastructure/persistence/ORMs/User";
import { Team as TeamORM } from "../../../shared/infrastructure/persistence/ORMs/Team";
import { Request as RequestORM } from "../../../shared/infrastructure/persistence/ORMs/Request";

import { RegisterAggregate, TeamAggregate, RequestAggregate } from "./aggregate";
import { RequestState, RequestStateCode, RequestStateString } from "./value-objects/RequestState";

export class Factory implements FactoryInterface {
	static initRegister(data: User): Register {
		const address = new Address(
			data.profile.address.address,
			data.profile.address.ward,
			data.profile.address.district,
			data.profile.address.city,
			data.profile.address.country,
		)
		return new Register(
			data.id,
			data.profile.firstName,
			data.profile.lastName, data.profile.birthday,
			address.toString()
		)
	}

	static initRegisterAggregate(data: User): RegisterAggregate {
		const address = new Address(
			data.profile.address.address,
			data.profile.address.ward,
			data.profile.address.district,
			data.profile.address.city,
			data.profile.address.country,
		)

		return new RegisterAggregate(
			data.id,
			data.profile.firstName,
			data.profile.lastName,
			data.profile.birthday,
			address
		)
	}

	static initAdmin(data: User): Admin {
		return new Admin(
			data.id,
			data.profile.firstName,
			data.profile.lastName,)
	}

	static initTeam(data: TeamORM, memberCount: number) {
		return new Team(
			data.id,
			data.admin.id,
			data.name,
			memberCount,
			data.description
		)
	}

	static initTeamAggregate(data: TeamORM, memberCount: number) {
		const admin = new Admin(
			data.admin.id,
			data.admin.profile.firstName,
			data.admin.profile.lastName
		)
		return new TeamAggregate(
			data.id,
			admin,
			data.name,
			memberCount,
			data.description
		)
	}

	static initRequest(data: RequestORM) {
		return new Request(
			data.id,
			data.registerId,
			data.teamId,
			data.state
		)
	}

	static initRequestAggregate(data: RequestORM, memberCount: number) {
		const register = Factory.initRegisterAggregate(
			data.register
		)
		const team = Factory.initTeamAggregate(
			data.team,
			memberCount
		)
		let state: RequestState | null = null
		switch (data.state) {
			case (RequestStateCode.Pending):
				state = new RequestState(RequestStateCode.Pending, RequestStateString.Pending)
				break
			case (RequestStateCode.Approved):
				state = new RequestState(RequestStateCode.Approved, RequestStateString.Approved)
				break;
		}

		return new RequestAggregate(
			data.id,
			register,
			team,
			state
		)
	}

	static initAddress(
		address: string,
		warn: string,
		district: string,
		city: string,
		country: string
	) {
		return new Address(address, warn, district, city, country)
	}
}