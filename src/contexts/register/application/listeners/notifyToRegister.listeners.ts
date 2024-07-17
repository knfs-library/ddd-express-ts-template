import { AdminApproveRequestMessage } from "../../domain/events/AdminApprovedRequest.event";

export function notifyApprovedRequestJoinTeam(msg: AdminApproveRequestMessage) {
	console.log("------------approve successful-------------------")
	console.log(msg)
}
