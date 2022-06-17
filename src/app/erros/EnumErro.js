class EnumErro extends Error {
	constructor(campos) {
		super();
		this.name = "EnumErro";
		this.status = 400;
		this.message = [
			{
				message: this.name, 
				details: [{	message: `This field can only be filled in with: ${campos}`}]}];
	}
}

module.exports = EnumErro;