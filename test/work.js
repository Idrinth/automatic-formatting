var should = require('chai').should();
describe('work', function() {
  var work = require('../src/work');
  it('work should be an function', function() {
    work.should.be.a('function');
  });
});
