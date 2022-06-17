class InvalidField extends Error {
	constructor(campo) {
		super();
		this.name = "InvalidField";
		this.description = `The field: "${campo}" must comply with the defined validations`;
	}
}

module.exports = InvalidField;