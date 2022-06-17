class NameErro extends Error {
	constructor() {
		super();
		this.name = "NameErro",
		this.status = 400;
		this.message = [
			{
				message: this.name, 
				details: [{	message: "The name provided must be longer than 4 characters"}]}];
	}
}

module.exports = NameErro;