class NotFound extends Error {
  constructor(campos) {
    super();
    (this.name = 'NotFound'), (this.description = `"${campos}" not found`);
  }
}

module.exports = NotFound;
