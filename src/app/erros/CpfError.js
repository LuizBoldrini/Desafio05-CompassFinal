class CpfError extends Error {
	constructor(campos) {
		super();
		this.name = "CpfError";
		this.description = `"${campos}" is invalid`;}

}

module.exports = CpfError;