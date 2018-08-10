var log4js = require('log4js');

log4js.configure({
  appenders: {
    stdout: {
      type: 'stdout'
    },
    error: {
      type: 'dateFile',
      filename: './logs/',
      pattern: 'error-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    },
    info: {
      type: 'dateFile',
      filename: './logs/',
      pattern: 'info-yyyy-MM-dd.log',
      alwaysIncludePattern: true
    }
  },
  replaceConsole: true,
  categories: {
    default: { appenders: ['stdout', 'info'], level: 'debug' },
    error: { appenders: ['stdout', 'error'], level: 'error' }
  }
});

exports.logger = function(name) {
  return log4js.getLogger(name || 'default');
};
