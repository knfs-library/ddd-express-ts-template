import { Event, EventMessage } from "@/shared/domain/event.abs";
import { notifyRequestJoinTeam } from "../../application/listeners/notifyToAdmin.listeners";

export class RegisterRequestedJoinTeamMessage extends EventMessage<Object> {
	public eventType: string = 'updated'
	public eventName: string = 'admin-approved-request'
	public eventTarget: string = 'request';
}

export class RegisterRequestedJoinTeamEvent extends Event<RegisterRequestedJoinTeamMessage> {
	public listeners: Array<Function> = [
		notifyRequestJoinTeam
	]
	constructor(public msg: RegisterRequestedJoinTeamMessage) {
		super(msg)
	}
}