import { UUID, randomUUID } from "crypto";

import { Register } from "./entities/Register";
import { Admin } from "./entities/Admin"
import { Request } from "./entities/Request";
import { Team } from "./entities/Team";
import Address from "./value-objects/Address";

import FactoryInterface from "../../../shared/domain/factory.itf";

class Factory implements FactoryInterface {
	static initRegister(
		id: UUID | null = null,
		firstName: string,
		lastName: string,
		birthday: Date,
		address: Address
	) {
		if (null === id) {
			id = randomUUID()
		}
		return new Register(id, firstName, lastName, birthday, address)
	}

	static initAdmin(
		id: UUID | null = null,
		firstName: string,
		lastName: string,
	) {
		if (null === id) {
			id = randomUUID()
		}
		return new Admin(id, firstName, lastName)
	}

	static initTeam(
		id: UUID | null = null,
		admin: Admin,
		name: string, 
		memberCount: number,
		description: string | null
	) {
		if (null === id) {
			id = randomUUID()
		}
		return new Team(id, name, admin, memberCount, description)
	}

	static initRequest(
		id: UUID | null = null,
		register: Register,
		team: Team
	) {
		if (null === id) {
			id = randomUUID()
		}
		return new Request(id, register, team)
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

export default Factory