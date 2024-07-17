import RegisterService from "../../domain/services/register.service";
import RegisterRepository from "../../infrastructure/persistence/repositories/register.repo";
import TeamRepository from "../../infrastructure/persistence/repositories/team.repo";
import RequestRepository from "../../infrastructure/persistence/repositories/request.repo";
import { UUID } from "crypto";

const registerService = new RegisterService(
	new RegisterRepository(),
	new TeamRepository(),
	new RequestRepository()
)

export default async function (requestId: UUID, adminId: UUID) {
	return await registerService.approveRequest(requestId, adminId)
}