import { UUID } from "crypto";
import RegisterRepository from "../../infrastructure/persistence/repositories/register.repo";
import TeamRepository from "../../infrastructure/persistence/repositories/team.repo";
import RequestRepository from "../../infrastructure/persistence/repositories/request.repo";
import { Team } from "../entities/Team";
import { Register } from "../entities/Register";
import { Request } from "../entities/Request";

export default class RegisterService {
	constructor(
		private readonly registerRepository: RegisterRepository,
		private readonly teamRepository: TeamRepository,
		private readonly requestRepository: RequestRepository
	) {
	}

	async createRequest(
		registerId: UUID,
		teamId: UUID
	): Promise<Request | boolean> {
		const register: Register | null = await this.registerRepository.findById(registerId)
		const team: Team | null = await this.teamRepository.findById(teamId)
		if (!team || !register) {
			throw new Error('data invalid!')
		}

		if (team.memberCount > 10) {
			throw new Error('Team is full!')
		}

		const request: Request | boolean = await this.requestRepository.create(register, team)

		if (!request) {
			throw new Error('Request fail!')
		}

		//@ts-ignore
		request.publishEvent('created', request.dto())


		return request
	}

	async approveRequest(
		requestId: UUID,
		adminId: UUID
	) {
		const request = await this.requestRepository.findById(requestId)

		if (!request) {
			throw new Error('Request invalid!')
		}

		const approvedRequest = request?.approved(adminId)

		if (!approvedRequest) {
			throw new Error("Admin invalid")
		}

		const updateState = await this.requestRepository.updateState(request)

		if (updateState[0] === 0) {
			throw new Error("Approve fail!")
		}

		request.publishEvent('approved', request.dto())

		return request.dto()
	}
}
