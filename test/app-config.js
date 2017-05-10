var should = require('chai').should();
var expect = require('chai').expect;
describe('app-config', function() {
  var config = require('../src/app-config');
  it('config should be an object', function() {
    config.should.be.an('object');
  });
  describe('app-config.user', function() {
    it('app-config should have a property user', function() {
      expect(config).to.have.property('user');
    });
    it('app-config.user should be an object', function() {
      (config.user).should.be.an('object');
    });
    describe('app-config.user.login', function() {
      it('app-config.user should have a property login', function() {
        expect(config.user).to.have.property('login');
      });
      it('app-config.user.login should be a string', function() {
        (config.user.login).should.be.a('string');
      });
    });
    describe('app-config.user.password', function() {
      it('app-config.user should have a property password', function() {
        expect(config.user).to.have.property('password');
      });
      it('app-config.user.password should be a string', function() {
        (config.user.password).should.be.a('string');
      });
    });
    describe('app-config.user.name', function() {
      it('app-config.user should have a property name', function() {
        expect(config.user).to.have.property('name');
      });
      it('app-config.user.name should be a string', function() {
        (config.user.name).should.be.a('string');
      });
    });
    describe('app-config.user.email', function() {
      it('app-config.user should have a property email', function() {
        expect(config.user).to.have.property('email');
      });
      it('app-config.user.email should be a string', function() {
        (config.user.email).should.be.a('string');
      });
    });
  });
});
