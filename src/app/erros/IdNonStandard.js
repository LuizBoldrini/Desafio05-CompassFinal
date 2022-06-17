class IdNonStandard extends Error {
	constructor() {
		super();
		this.name = "IdNonStandard";
		this.description = "This Id does not follow the pattern used by the database";
	}
}

module.exports = IdNonStandard;