// Load the nqm output module for communicating progress and info back to the process host.
var output = require("nqm-process-utils").output;

// INFO output serves no function other than diagnostic 
output.debug("starting");

process.stdin.setEncoding('utf8');

var inputData = "";
process.stdin.on('data', function (chunk) {
  output.debug("input chunk: " + chunk);
  inputData += chunk;
});

process.stdin.on('end', function () {
  output.debug("got inputs: " + inputData);
  
  var inputObj = JSON.parse(inputData);
  output.result( inputObj.taskId);

  // PROGRESS output is mandatory, to inform the host of progress.
  output.progress(0);

  // Simulate a process that has 10 steps.
  var counter = 0;
  setInterval(function() {
    output.debug("tick");
    counter += 10;

    // Update the progress count at the host.
    output.progress(counter);

    if (counter === 100) {
      output.error("tock");
      output.debug("complete");

      // Exit code 0 => finished with no errors.
      process.exit(0);
    }
  }, 2500);  
});

output.debug("reading input");
process.stdin.resume();
