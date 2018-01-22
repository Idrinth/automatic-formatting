var should = require("chai").should();
var expect = require("chai").expect;
describe("app-config", function() {
  var config = require("../src/app-config");
  it("config should be an object", function() {
    config.should.be.an("object");
  });
  describe("app-config.user", function() {
    it("app-config should have a property user", function() {
      expect(config).to.have.property("user");
    });
    it("app-config.user should be an object", function() {
      config.user.should.be.an("object");
    });
    describe("app-config.user.login", function() {
      it("app-config.user should have a property login", function() {
        expect(config.user).to.have.property("login");
      });
      it("app-config.user.login should be a string", function() {
        config.user.login.should.be.a("string");
      });
    });
    describe("app-config.user.password", function() {
      it("app-config.user should have a property password", function() {
        expect(config.user).to.have.property("password");
      });
      it("app-config.user.password should be a string", function() {
        config.user.password.should.be.a("string");
      });
    });
    describe("app-config.user.name", function() {
      it("app-config.user should have a property name", function() {
        expect(config.user).to.have.property("name");
      });
      it("app-config.user.name should be a string", function() {
        config.user.name.should.be.a("string");
      });
    });
    describe("app-config.user.email", function() {
      it("app-config.user should have a property email", function() {
        expect(config.user).to.have.property("email");
      });
      it("app-config.user.email should be a string", function() {
        config.user.email.should.be.a("string");
      });
    });
  });
  describe("app-config.port", function() {
    it("app-config should have a property port", function() {
      expect(config).to.have.property("port");
    });
    it("app-config.port should be a number", function() {
      config.port.should.be.a("number");
    });
  });
  describe("app-config.frequency", function() {
    it("app-config should have a property frequency", function() {
      expect(config).to.have.property("frequency");
    });
    it("app-config.frequency should be a number", function() {
      config.frequency.should.be.a("number");
    });
  });
  describe("app-config.prettier", function() {
    it("app-config should have a property prettier", function() {
      expect(config).to.have.property("prettier");
    });
    it("app-config.prettier should be an object", function() {
      config.prettier.should.be.an("object");
    });
  });
  describe("app-config.debug", function() {
    it("app-config should have a property debug", function() {
      expect(config).to.have.property("debug");
    });
    it("app-config.debug should be a boolean", function() {
      config.debug.should.be.an("boolean");
    });
  });
  describe("app-config.file", function() {
    it("app-config should have a property file", function() {
      expect(config).to.have.property("file");
    });
    it("app-config.file should be an object", function() {
      config.file.should.be.an("object");
    });
  });
  describe("app-config.directory", function() {
    it("app-config should have a property directory", function() {
      expect(config).to.have.property("directory");
    });
    it("app-config.directory should be an object", function() {
      config.directory.should.be.an("object");
    });
  });
});
