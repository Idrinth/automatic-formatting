var should = require("chai").should();
describe("if-debug", function() {
  var debug = require("../src/if-debug");
  it("debug should be a function", function() {
    debug.should.be.a("function");
  });
});
