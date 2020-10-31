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

### Alternate solution:

Open `https://trilogy.devspaces.com/settings/` in new window on click
User will have to configure settings on the domain.

### Benefit:

Adds a tiny benefit of not looking up

## Milestone 2: Multiple env management UI

### Feasibility Study:

Material-UI based mini-dashboard for managing deploy & env settings. Nothing too complex. Feasible.

### Implementation Details:

Available Options: install, deploy, start, clean, seed, destroy

### Benefit:

Gives you more control over the kind of configuration/deployment you need for that particular branch or commit.

## Milestone 3: Deploy mode

### Feasibility Study:

Unfortunately, gitpod does not support multiple gitpod configurations as far as I know.
Example: `gitpod.deploy-only.yml`, `gitpod.destroy-deploy.yml`

### Alternate solution:

Pass env variables via the DevSpaces URL (env name + deploy mode config).
Use these variables to help control the kind of setup that needs to be done inside our cli tool instead
by piping the passed in env variables via the npm script.

### Implementation Details:

[Example URL](https://trilogy.devspaces.com/#env=ash1,install=true,clean=true,deploy=true,start=true,seed=true,destroy=true/https://github.com/trilogy-group/5k-response-tek/tree/gitpod-test)

### Benefits:

Maps deploy mode options from Milestone 2 to actual deployment configuration in gitpod.yml -> cli.ts
Same benefit as Milestone 2.

### Example Scenarios:

- I know the code is not in deployable state. Does not make sense to execute any run scripts. I make the necessary change, push the changes and only then launch a new workspace from latest commit in deploy mode (executing run scripts).
- I have a lot of setup (or data) associated with my users. Cleaning and reseeding my database will result in the loss of this setup. Execute only env deployment
- My CDK has had resources change that requires destroying and redeploying my env from scratch. Enable destroy and deploy before opening my workspace.

## Brainstorm session notes:

Ways to procure lambda logs directly using aws cli
Extension to launch electron app from github
Gitpod launch buttons in README doc itself (no need to install extension)
Control over what config, I want to launch
Way to see logs from CloudWatch functions for my env directly
Buttons to run different scripts on an external IDE instead
Auto setup JetBrains IDE config (or have some config persistence)

Electron app
Is it possible to share workspaces with IDE?
Save config on s3 bucket and use it to set vscode, zsh aliases etc?
Open in github option -> maybe trigger to local IDE
Intermittent connectivity or accidentally close IDE -> go to list of workspaces -> open in same state
How is he showing side-by-side preview?
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
