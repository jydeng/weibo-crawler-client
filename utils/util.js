const guid = require('guid');
const moment = require('moment');
const logger = require('../logger');
const infologger = logger.logger('default');
const errlogger = logger.logger('error');

function getGuid() {
  return guid.raw();
}

function now() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

function threeMonthBefore(){
  return moment().add(-3, 'M').format('YYYY-MM-DD 00:00:00');
}

function sleep(time) {
  new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

function log(msg, type = 'debug') {
  switch (type) {
    case 'error':
      errlogger.error(msg);
      break;
    default:
      infologger.info(msg);
      break;
  }
}

module.exports = {
  sleep: sleep,
  guid: getGuid,
  now: now,
  log: log,
  threeMonthBefore:threeMonthBefore
};
