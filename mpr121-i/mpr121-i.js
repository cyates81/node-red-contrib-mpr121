module.exports = function(RED) {
	var Mpr121 = require('mpr121.js');
	const adaMPR121 = require('adafruit-mpr121');

	function Mpr121InterruptNode(config) {
		RED.nodes.createNode(this, config);
		var node = this;

		this.pinTouched = function(pin) {
			var msg = {
				payload : {
					type : "touch",
					pin : pin
				}
			}
			var msgs = new Array(12);
			msgs[pin] = msg;

			node.send(msgs);
		};

		this.pinReleased = function(pin) {
			var msg = {
				payload : {
					type : "release",
					pin : pin
				}
			}
			var msgs = new Array(12);
			msgs[pin] = msg;

			node.send(msgs);
		};

		this.status({
			fill : "red",
			shape : "ring",
			text : "disconnected"
		});

		// Address, I2c Bus, Gipio interrupt
		if (config.adafruit) {
			this.mod = new adaMPR121(config.address, 1);
			// listen for touch events
			this.mod.on('touch', (pin) => this.pinTouched(pin));

			// listen for release events
			this.mod.on('release', (pin) => this.pinReleased(pin));
		} else {
			this.mod = new Mpr121(config.address, config.i2cbus);

			this.mod.onTouch = function(pin) {
				this.pinTouched(pin);
			}

			this.mod.onRelease = function(pin) {
				this.pinReleased(pin);
			}

			this.mod.startInterrupt(config.gpio);
		}

		this.status({
			fill : "green",
			shape : "dot",
			text : "connected"
		});
	}
	RED.nodes.registerType("mpr121-i", Mpr121InterruptNode);
}