import RegisterService from "@/contexts/register/domain/services/register.service";
import RegisterRepository from "@/contexts/register/infrastructure/persistence/repositories/register.repo";
import TeamRepository from "@/contexts/register/infrastructure/persistence/repositories/team.repo";
import RequestRepository from "@/contexts/register/infrastructure/persistence/repositories/request.repo";
import { UUID } from "crypto";

const registerService = new RegisterService(
	new RegisterRepository(),
	new TeamRepository(),
	new RequestRepository()
)

export default async function (registerId: UUID, teamId: UUID) {
	return await registerService.createRequest(registerId, teamId)
}