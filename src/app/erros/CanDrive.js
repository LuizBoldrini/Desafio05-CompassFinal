class CanDrive extends Error {
	constructor() {
		super();
		this.name = "CanDrive";
		this.description = "This user cannot drive, please select an id of a user who can drive";}

}

module.exports = CanDrive;