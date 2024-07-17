
export default class Address {
	public readonly address: string;
	public readonly warn: string;
	public readonly district: string;
	public readonly city: string;
	public readonly country: string;

	constructor(
		address: string,
		warn: string,
		district: string,
		city: string,
		country: string
	) {
		this.address = address;
		this.warn = warn;
		this.district = district;
		this.city = city;
		this.country = country;
	}

	public toString() {
		return `${this.address}, ${this.warn}, ${this.district}, ${this.city}, ${this.country}`
	}
}
