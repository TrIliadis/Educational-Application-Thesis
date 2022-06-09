// extend Error class to include error messsage and status code
class ExpressError extends Error {
  constructor(message, code) {
    super();
    this.message = message;
    this.code = code;
  }
}

module.exports = ExpressError;
