class NameErro extends Error {
	constructor() {
		super();
		this.name = "NameErro",
		this.description = "The name provided must be longer than 4 characters";
	}
}

module.exports = NameErro;