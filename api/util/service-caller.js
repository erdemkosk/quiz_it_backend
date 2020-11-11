const axios = require('axios');
const logger = require('../plugin/logger');

exports.request = (url, data = {}, params = {}, headers = {}, timeout = 10000) => {
  const start = new Date();

  logger.info('service caller request', {
    url,
    start,
    data,
    params,
    headers,
    timeout,
  });

  return axios({
    url,
    data,
    params,
    headers,
    timeout,
    validateStatus: () => true,
  }).then((response) => {
    const elapsed = (+new Date()) - (+start);

    logger.info('service caller response', {
      url,
      start,
      elapsed,
      status: response.status,
    });

    if (response.status === 200) {
      return response.data;
    }

    if (response.data.code) {
      throw new Error();
    }

    throw new Error();
  });
};
