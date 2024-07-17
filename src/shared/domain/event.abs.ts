import { randomUUID, UUID } from "crypto"

export abstract class EventMessage<K> {
	public id: UUID = randomUUID()
	public eventName: string = ''
	public eventType: string = ''
	public eventTarget: string = ''
	public eventPayload: K | Array<K> | null
	public eventCreated: Date = new Date
	constructor(eventPayload: K | Array<K> | null) {
		this.eventPayload = eventPayload;
	}
}

export abstract class Event<T extends EventMessage<Object | null>> {
	public listeners: Array<Function> = []
	constructor(public msg: T) {}

	public publish() {
		for (const listen of this.listeners) {
			listen(this.msg)
		}
	}
}