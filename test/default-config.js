var should = require("chai").should();
var expect = require("chai").expect;
describe("default-config", function() {
  var config = require("../src/default-config");
  it("config should be an object", function() {
    config.should.be.an("object");
  });
  describe("default-config.user", function() {
    it("default-config should have a property user", function() {
      expect(config).to.have.property("user");
    });
    it("default-config.user should be an object", function() {
      config.user.should.be.an("object");
    });
    describe("default-config.user.login", function() {
      it("app-config.user should have a property login", function() {
        expect(config.user).to.have.property("login");
      });
      it("default-config.user.login should be a string", function() {
        config.user.login.should.be.a("string");
      });
    });
    describe("default-config.user.password", function() {
      it("default-config.user should have a property password", function() {
        expect(config.user).to.have.property("password");
      });
      it("default-config.user.password should be a string", function() {
        config.user.password.should.be.a("string");
      });
    });
    describe("default-config.user.name", function() {
      it("default-config.user should have a property name", function() {
        expect(config.user).to.have.property("name");
      });
      it("default-config.user.name should be a string", function() {
        config.user.name.should.be.a("string");
      });
    });
    describe("default-config.user.email", function() {
      it("default-config.user should have a property email", function() {
        expect(config.user).to.have.property("email");
      });
      it("default-config.user.email should be a string", function() {
        config.user.email.should.be.a("string");
      });
    });
  });
  describe("default-config.port", function() {
    it("default-config should have a property port", function() {
      expect(config).to.have.property("port");
    });
    it("default-config.port should be a number", function() {
      config.port.should.be.a("number");
    });
  });
  describe("default-config.frequency", function() {
    it("default-config should have a property frequency", function() {
      expect(config).to.have.property("frequency");
    });
    it("default-config.frequency should be a number", function() {
      config.frequency.should.be.a("number");
    });
  });
  describe("default-config.prettier", function() {
    it("default-config should have a property prettier", function() {
      expect(config).to.have.property("prettier");
    });
    it("default-config.prettier should be an object", function() {
      config.prettier.should.be.an("object");
    });
  });
  describe("default-config.debug", function() {
    it("default-config should have a property debug", function() {
      expect(config).to.have.property("debug");
    });
    it("default-config.debug should be a boolean", function() {
      config.debug.should.be.an("boolean");
    });
  });
  describe("default-config.file", function() {
    it("default-config should have a property file", function() {
      expect(config).to.have.property("file");
    });
    it("default-config.file should be an object", function() {
      config.file.should.be.an("object");
    });
  });
  describe("default-config.directory", function() {
    it("default-config should have a property directory", function() {
      expect(config).to.have.property("directory");
    });
    it("default-config.directory should be an object", function() {
      config.directory.should.be.an("object");
    });
  });
});
