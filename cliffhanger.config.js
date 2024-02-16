const wokescript = require('./wokescript');
let colors = require('@colors/colors/safe');
const fs = require('fs');

let run = true;
let input;

module.exports = (cwd) => ({
  name: "WokeScript",
  version: "1.0",
  description: "The most woke JavaScript superset ever",
  flags: {
     transpile: {
      short: "-t",
      description: "Transpiles code",
      init: () => {
		run = false;
      },
    },
    input: {
      short: "-i",
      description: "Input file",
      required: true,
      amount_of_args: 1,
      init: (arg) => {
		input = arg;
        if (run) {
			wokescript.run(fs.readFileSync(arg).toString());
			return;
		}
      },
    },
	output: {
      short: "-o",
      description: "Output file",
      amount_of_args: 1,
      init: (arg) => {
		if (!run) {
			let file = fs.readFileSync(input).toString();
			let res = wokescript.transpile(file);
			fs.writeFileSync(arg, res);
			return;
		}
		console.log(colors.yellow("WARNING: -t flag not included, ignoring output"));
     },
    },
  },
});