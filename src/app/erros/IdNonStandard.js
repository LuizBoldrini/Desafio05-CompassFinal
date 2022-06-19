class IdNonStandard extends Error {
	constructor(campos) {
		super();
		this.name = "IdNonStandard";
		this.description = `"${campos}" does not follow the pattern used by the database`;
	}
}

module.exports = IdNonStandard;