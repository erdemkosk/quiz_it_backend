/* eslint-disable no-useless-constructor */
const EventEmitter = require('events');

class GeneralEvent extends EventEmitter {
  triger({ params }) {
    this.emit('triger', params);
  }
}

class EmailEvent extends GeneralEvent {}

module.exports = {
  EmailEvent,
};
