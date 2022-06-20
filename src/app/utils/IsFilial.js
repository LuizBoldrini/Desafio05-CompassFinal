const IsFilialError = require("../erros/IsFilialError");

function isFilial(reqBody) {
	const { address } = reqBody;
	let count = 0;

	address.forEach((element) => {
		if (!element.isFilial) count += 1;
	});
	if (count !== 1) throw new IsFilialError;
}

module.exports = isFilial;
