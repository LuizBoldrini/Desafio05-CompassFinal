class UniqueError extends Error {
	constructor(campos) {
		super();
		this.name = "UniqueError";
		this.description = `"${campos}" are already in use, please provide another`;
	}
}

module.exports = UniqueError;