# DevSpaces

## Milestone 0: Extension, Desktop App POC tests

Create POC for:

1. Chrome extension setup with popup window written with parcel + react
2. Electron wrapper for DevSpaces Workspace

Objective: To understand the scope of what can be achieved (Feasibility Study)

## Milestone 1: Session Management + Quick set config via extension

### Feasibility Study:

`https://trilogy.devspaces.com/` communicates via websocket within the same origin.
I could not find any public API to be able to create + manage an auth session,
and therefore control configuration via extension
This means any configuration that is set, must be done via the DevSpaces domain.

### Alternative solution:

Open `https://trilogy.devspaces.com/settings/` in new window on click
User will have to configure settings on the domain.

### Benefit:

Adds a tiny benefit of not looking up

## Brainstorm session notes:

Ways to procure lambda logs directly using aws cli
Extension to launch electron app from github
Gitpod launch buttons in README doc itself (no need to install extension)
Control over what config, I want to launch
Way to see logs from CloudWatch functions for my env directly
Buttons to run different scripts on external IDE instead
Auto setup Jetbrains IDE config (or have some config persistence)

Electron app
Is it possible to share workspaces with IDE?
Save config on s3 bucket and use it to set vscode, zsh aliases etc?
Open in github option -> maybe trigger to local IDE
Intermittent connectivity or accidentally close IDE -> go to list of workspaces -> open in same state
How is he showing side by side preview?
Configuring different language version from your workspace images
ssh into your DevSpace -> Install chisel & dropbear ssh server on your client workstation
file transfers -> upload & download files from right click context menu
`gp init`
`gp url 8080`
`gp preview www.example.com`
`gp preview $(gp url 3000)`
`env | grep PUBLIC`
`env | grep GITPOD`

`gp env -e` => export env variable to a file

Open vsx registry
Gitpod supports encrypted environment variables that are user-specific
