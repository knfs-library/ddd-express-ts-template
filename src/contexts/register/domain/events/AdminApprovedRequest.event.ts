import { Event, EventMessage } from "../../../../shared/domain/event.abs";
import { notifyApprovedRequestJoinTeam } from "../../application/listeners/notifyToRegister.listeners";

export class AdminApproveRequestMessage extends EventMessage<Object> {
	public eventType: string = 'updated'
	public eventName: string = 'admin-approved-request'
	public eventTarget: string = 'request';
}

export class AdminApproveRequestEvent extends Event<AdminApproveRequestMessage> {
	public listeners: Array<Function> = [
		notifyApprovedRequestJoinTeam
	]
	constructor(public msg: AdminApproveRequestMessage) {
		super(msg)
	}
}