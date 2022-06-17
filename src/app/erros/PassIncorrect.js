class PassIncorrect extends Error {
	constructor() {
		super();
		this.name = "PassIncorrect";
		this.description = "This password is incorrect";
	}
}

module.exports = PassIncorrect;