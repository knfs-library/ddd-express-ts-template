import { RegisterRequestedJoinTeamMessage } from "../../domain/events/RegisterRequestedJoinTeam.event";

export function notifyRequestJoinTeam(msg: RegisterRequestedJoinTeamMessage) {
	console.log("------------request successful-------------------")
	console.log(msg)
}
