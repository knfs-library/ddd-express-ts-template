
import { UUID } from "crypto";

type EntityDTO = {
	id: UUID;
};

abstract class Entity<T extends EntityDTO> {
	public events: any = {}
	constructor(
		public id: UUID
	) {
	}

	abstract dto(): T;

	public publishEvent(eventName: string, data: any) {
		const msgType = this.events[eventName].msg
		const msg = new msgType(data)
		const eventType = this.events[eventName].event
		const event = new eventType(msg)
		event.publish()
	}
}

export {
	Entity,
	EntityDTO
}