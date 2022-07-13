class NoAuthorization extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoAuthorization';
    this.statusCode = 401;
  }
}

module.exports = { NoAuthorization };
