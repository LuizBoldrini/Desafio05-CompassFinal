class InvalidField extends Error {
	constructor(campo) {
		super();
		this.name = "InvalidField";
		this.status = 400;
		this.message = [
			{
				message: this.name, 
				details: [{	message: `O campo: ${campo} precisa ser valido para fazer alteração de cadrasto`}]}];
	}
}

module.exports = InvalidField;