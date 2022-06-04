class InvalidField extends Error {
	constructor(campo) {
		super();
		this.name = "InvalidField";
		this.status = 400;
		this.message = [
			{
				message: this.name, 
				details: [{	message: `The field: ${campo} must comply with the defined validations`}]}];
	}
}

module.exports = InvalidField;