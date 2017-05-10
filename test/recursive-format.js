var should = require("chai").should();
describe("recursive-format", function() {
  var format = require("../src/recursive-format");
  it("format should be a function", function() {
    format.should.be.a("function");
  });
});
