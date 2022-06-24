class BadRequest extends Error {
  constructor(campos) {
    super();
    (this.name = 'BadRequest'), (this.description = `${campos}`);
  }
}

module.exports = BadRequest;
