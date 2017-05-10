var should = require("chai").should();
describe("gitstatus", function() {
  var gitstatus = require("../src/gitstatus");
  it("gitstatus should be an object", function() {
    gitstatus.should.be.an("object");
  });
});
