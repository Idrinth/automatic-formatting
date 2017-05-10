var should = require('chai').should();
describe('taskmaster', function() {
  var taskmaster = require('../src/taskmaster');
  it('taskmaster should be an object', function() {
    taskmaster.should.be.an('object');
  });
});
