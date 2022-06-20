class IsFilialError extends Error {
	constructor() {
		super();
		this.name = "IsFilialError",
		this.description = "There can only be one IsFilial with false";
	}
}

module.exports = IsFilialError;