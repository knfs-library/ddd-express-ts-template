import { RegisterRequestedJoinTeamMessage } from "@/contexts/register/domain/events/RegisterRequestedJoinTeam.event";

export function notifyRequestJoinTeam(msg: RegisterRequestedJoinTeamMessage) {
	console.log("------------request successful-------------------")
	console.log(msg)
}
