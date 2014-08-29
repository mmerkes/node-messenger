#Note to Contributors

##Contribution Requirements

1. All contributions must include unit and integration tests
2. All tests must pass before pull request is made
3. Linter must be clean

##Conventions

1. Use 2 space tabs
2. Always use === over ==, with rare exceptions
3. Use self-explanatory variable names, i.e. 'p' is bad, 'param' is good, 'parameter' is best
4. Always use 'use strict' at the top of each file

#The Plan

##The Big Goal

Developers should be able to fire up a server, with a simple config file, and be able to register devices, create message schemas, and automate sending out push notifications to any type of device.

##Bare Requirements

1. Users can register and unregister devices
2. Users can define and use schema as templates
3. Users can send messages to iOS and Android devices
4. Users can deploy the server themselves with limited configuration
5. A basic iOS and Android app that users can use for testing that notifications are working
6. Basic security like an API key

##Best Practice Requirements

1. All code is reviewed by someone other than the committer
2. All code is linted and unit and integration tested, and only code that passes all tests is merged
3. Use continuous deployment
4. Use semantic versioning

##Additional Requirements

1. Include a deployment script (i.e. Chef or Ansible) that allows for easy deployments
2. Increased security - https, etc.
3. Route to interface with APNS feedback service
4. Route to provide analytics/statistics on notifications
5. Complex APNS and GCM error handling
6. Sending notifications in batches?
7. Cache templates
8. Build web interface
9. Allow for mass notifications
10. Include a detailed list of error cases, what caused them, and how to fix them