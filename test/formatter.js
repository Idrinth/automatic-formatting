var should = require('chai').should();
describe('formatter', function() {
  var formatter = require('../src/formatter');
  it('formatter should be a function', function() {
    formatter.should.be.a('function');
  });
});
