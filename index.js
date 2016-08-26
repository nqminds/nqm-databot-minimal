// Load the nqm input module for receiving input from the process host.
var input = require("nqm-process-utils").input;

// Load the nqm output module for communicating progress and info back to the process host.
var output = require("nqm-process-utils").output;

// debug output serves no function other than diagnostic 
output.debug("starting");

// Read any data passed from the process host. Specify we're expecting JSON data.
input.read("json", function(err, inputObj) {
  if (err) {
    output.error("failed to read input: %s", err.message);
    // Exit code non-zero => error
    process.exit(1);
  }
  output.debug("got input: %j", inputObj);

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
      output.error("ERROR %s", "- sample error");
      output.debug("DEBUG - sample debug");
      output.result(inputObj.taskId);

      // Exit code 0 => finished with no errors.
      process.exit(0);
    }
  }, 2500);  
});
