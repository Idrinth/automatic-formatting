var should = require('chai').should();
var expect = require('chai').expect;
describe('taskmaster', function() {
  var taskmaster = require('../src/taskmaster');
  it('taskmaster should be an object', function() {
    taskmaster.should.be.an('object');
  });
    describe('taskmaster.tasks', function() {
      it('taskmaster should have a property tasks', function() {
        expect(taskmaster).to.have.property('tasks');
      });
        it('taskmaster.tasks should be an object', function() {
          (taskmaster.tasks).should.be.an('object');
        });
    });
    describe('taskmaster.inPr', function() {
      it('taskmaster should have a property inPr', function() {
        expect(taskmaster).to.have.property('inPr');
      });
        it('taskmaster.inPr should be an object', function() {
          (taskmaster.inPr).should.be.an('object');
        });
    });
    describe('taskmaster.active', function() {
      it('taskmaster should have a property active', function() {
        expect(taskmaster).to.have.property('active');
      });
        it('taskmaster.active should be an object', function() {
          (taskmaster.active).should.be.an('object');
        });
    });
    describe('taskmaster.toAdd', function() {
      it('taskmaster should have a property toAdd', function() {
        expect(taskmaster).to.have.property('toAdd');
      });
        it('taskmaster.toAdd should be an Array', function() {
          (taskmaster.toAdd).should.be.instanceof(Array);
        });
    });
    describe('taskmaster.add', function() {
      it('taskmaster should have a property add', function() {
        expect(taskmaster).to.have.property('add');
      });
        it('taskmaster.add should be a function', function() {
          (taskmaster.add).should.be.a('function');
        });
    });
    describe('taskmaster.remove', function() {
      it('taskmaster should have a property remove', function() {
        expect(taskmaster).to.have.property('remove');
      });
        it('taskmaster.remove should be a function', function() {
          (taskmaster.remove).should.be.a('function');
        });
    });
    describe('taskmaster.run', function() {
      it('taskmaster should have a property run', function() {
        expect(taskmaster).to.have.property('run');
      });
        it('taskmaster.run should be a function', function() {
          (taskmaster.run).should.be.a('function');
        });
    });
});
