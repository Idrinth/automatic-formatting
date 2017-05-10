var should = require("chai").should();
var expect = require("chai").expect;
describe("gitstatus", function() {
  var gitstatus = require("../src/gitstatus");
  it("gitstatus should be an object", function() {
    gitstatus.should.be.an("object");
  });
  describe("gitstatus.failure", function() {
    it("gitstatus should have a property failure", function() {
      expect(gitstatus).to.have.property("failure");
    });
    it("gitstatus.failure should be a function", function() {
      gitstatus.failure.should.be.a("function");
    });
  });
  describe("gitstatus.success", function() {
    it("gitstatus should have a property success", function() {
      expect(gitstatus).to.have.property("success");
    });
    it("taskmaster.success should be a function", function() {
      gitstatus.success.should.be.a("function");
    });
  });
  describe("gitstatus.pending", function() {
    it("gitstatus should have a property pending", function() {
      expect(gitstatus).to.have.property("pending");
    });
    it("gitstatus.pending should be a function", function() {
      gitstatus.pending.should.be.a("function");
    });
  });
});
