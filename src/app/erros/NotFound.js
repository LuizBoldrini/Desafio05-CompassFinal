class NotFound extends Error {
	constructor(campos) {
		super();
		this.name = "NotFound";
		this.status = 404;
		this.message = [
			{
				message: this.name, 
				details: [{	message: `This ${campos} not found`}]}];
	}
}

module.exports = NotFound;