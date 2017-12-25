const winston = require('winston');

const isWin = /^win/.test(process.platform);

module.exports = function getLogger(module) {
  const path = module.filename
    .split(isWin ? '\\' : '/')
    .slice(-2)
    .join(isWin ? '\\' : '/');

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        colorize: true,
        level: 'debug',
        label: path,
      }),
      new winston.transports.File({
        filename: 'log.log',
      }),
    ],
  });
};
