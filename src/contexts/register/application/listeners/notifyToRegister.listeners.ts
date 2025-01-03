import { AdminApproveRequestMessage } from "@/contexts/register/domain/events/AdminApprovedRequest.event";

export function notifyApprovedRequestJoinTeam(msg: AdminApproveRequestMessage) {
	console.log("------------approve successful-------------------")
	console.log(msg)
}
