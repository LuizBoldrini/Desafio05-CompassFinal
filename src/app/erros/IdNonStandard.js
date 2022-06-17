class IdNonStandard extends Error {
	constructor() {
		super();
		this.name = "IdNonStandard";
		this.status = 400;
		this.message = [
			{
				message: this.name, 
				details: [{	message: "This Id does not follow the pattern used by the database"}]}];
	}
}

module.exports = IdNonStandard;