// Load the nqm input module for receiving input from the process host.
var input = require("nqm-databot-utils").input;

// Load the nqm output module for communicating progress and info back to the process host.
var output = require("nqm-databot-utils").output;

// debug output is sent to the TDX when the databot completes. 
output.debug("starting");

// Read any data passed from the process host. Specify we're expecting JSON data.
input.read("json", function(err, inputArgs) {
  if (err) {
    // Errors are transmitted to the TDX.
    output.error("failed to read input: %s", err.message);
    // Exit code non-zero => tells the TDX this databot failed.
    process.exit(1);
  }

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
      // Result output is sent to the TDX when the databot completes.
      output.result({answer: 42});

      // Exit code 0 => finished with no errors.
      process.exit(0);
    }
  }, 2500);  
});
