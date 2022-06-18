const moment = require("moment");

const validaData = () => moment().subtract(18, "years").format("MM/DD/YYYY");

module.exports = validaData;