var should = require("should");
var helper = require("node-red-node-test-helper");
var irqNode = require("../mpr121-p/mpr121-p");

helper.init(require.resolve('node-red'));

describe('node-red-contrib-mpr121', function () {

  afterEach(function () {
    helper.unload();
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "mpr121-p", name: "test name" }];
    helper.load(irqNode, flow, function () {
      var n1 = helper.getNode("n1");
      // n1.should.have.property('name', 'test name');
      console.dir(n1);
      done();
    });
  });

  // it('should make payload lower case', function (done) {
  //   var flow = [{ id: "n1", type: "mpr121-i", name: "test name",wires:[["n2"]] },
  //   { id: "n2", type: "helper" }];
  //   helper.load(lowerNode, flow, function () {
  //     var n2 = helper.getNode("n2");
  //     var n1 = helper.getNode("n1");
  //     n2.on("input", function (msg) {
  //       msg.should.have.property('payload', 'uppercase');
  //       done();
  //     });
  //     n1.receive({ payload: "UpperCase" });
  //   });
  // });
});