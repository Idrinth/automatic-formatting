var should = require('chai').should();
describe('setup', function() {
  var setup = require('../src/setup');
  it('setup should be a function', function() {
    setup.should.be.a('function');
  });
});
