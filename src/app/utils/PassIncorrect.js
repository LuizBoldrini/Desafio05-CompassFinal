class PassIncorrect extends Error {
	constructor() {
		super();
		this.name = "PassIncorrect";
		this.status = 404;
		this.message = [
			{
				message: this.name, 
				details: [{	message: "This password is incorrect"}]}];
	}
}

module.exports = PassIncorrect;