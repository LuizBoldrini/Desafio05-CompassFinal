class EnumErro extends Error {
	constructor(campos) {
		super();
		this.name = "EnumErro";
		this.description = `This field can only be filled in with: "${campos}"`;}

}

module.exports = EnumErro;