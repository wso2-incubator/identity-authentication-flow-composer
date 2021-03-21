# Introduction

- WSO2 Identity Server currently supports script-based adaptive authentication, which allows users to use a script(Javascript) to set up appropriate
  authentication factors depending on the required scenario.
- Authentication Flow Composer is a UI-based tool to design and configure the authentication flows through the UI itself for the WSO2 Identity Server.
- This approach allows users to define the authentication flows without any prior syntax knowledge. This will enhance the overall developer experience.
- The tool at the background should generate or modify the authentication script which is currently being used and should do vice versa and update UI
  based flow if the script is updated directly.

### Objectives
- Making Authentication Flow more clear to the end user (developer/admin).
- One to one synchronizing between script, and the design (Get more power on low code).
- Getting more support to the script by adding intellisense support.
- Modularize to make it integratable with multiple platforms.
