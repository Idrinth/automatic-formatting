var should = require("chai").should();
describe("branch-config", function() {
  var config = require("../src/branch-config");
  it("config should be a function", function() {
    config.should.be.a("function");
  });
});
