
enum RequestStateCode {
	Pending = 0,
	Approved = 1,
}

enum RequestStateString {
	Pending = 'pending',
	Approved = 'approved',
}

class RequestState {
	public readonly stateCode: RequestStateCode | number ;
	public readonly stateString: RequestStateString | string;

	constructor(
		stateCode: RequestStateCode,
		stateString: RequestStateString,
	) {
		this.stateCode = stateCode
		this.stateString = stateString
	}

	getStateCode(): number {
		return this.stateCode
	}

	getStateString(): string {
		return this.stateString
	}
}

export {
	RequestStateCode,
	RequestStateString,
	RequestState
}

