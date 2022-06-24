const moment = require('moment');

const CalcFinalValue = (data_start, data_end, daily_value) => {
  const totalValue = moment(data_end, 'DD/MM/YYYY').diff(moment(data_start, 'DD/MM/YYYY'), 'days');
  return daily_value * totalValue;
};

module.exports = CalcFinalValue;
