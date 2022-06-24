const BadRequest = require("../erros/BadRequest");

function isFilial(reqBody) {
	const { address } = reqBody;
	let count = 0;

	address.forEach((element) => {
		if (!element.isFilial) count += 1;
	});
	if (count !== 1) throw new BadRequest("There can only be one IsFilial with false");
}

module.exports = isFilial;
