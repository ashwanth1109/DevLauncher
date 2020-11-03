# DevLauncher chrome extension

[Link to 5k-responsetek gitpod-test PR](https://github.com/trilogy-group/5k-response-tek/pull/242)
[Link to gitpod.yml file](https://github.com/trilogy-group/5k-response-tek/blob/gitpod-test/.gitpod.yml)
[Link to .gitpod.Dockerfile](https://github.com/trilogy-group/5k-response-tek/blob/gitpod-test/.gitpod.Dockerfile)
[Link to npm scripts implementation](https://github.com/trilogy-group/5k-response-tek/blob/gitpod-test/scripts/cli.ts)

Note: The 5k-responsetek project has been put on hold at the time of hackathon submission.
All the cloudformation stacks (incl. bootstrap stack) have been cleaned up and unfortunately the environments are not in deployable state at the moment.
This means that the extension cannot deploy and is not demoable right now. But the gitpod changes on 5k-responsetek repo and the current repo show how this works.
And the demo was recorded at a time when the environments were in deployable state.

# Milestone Map

## Milestone 0: Extension, Desktop App POC tests

### Rationale:

Explore how to create chrome extension and electron apps to understand the scope of which ideas are achievable
(Feasibility Study (macro) for the project)

### Implementation Details:

Created a POC for:

1. Chrome extension setup with popup window written with parcel + react

Take advantage of faster deployment (50-60%) in cloud IDE over local.
Per software capability, we tend to deploy our CDK changes a few times.
This results in time wasted waiting on deployments to complete since each deployment can take 15-20 mins.

2. Electron wrapper for DevSpaces Workspace (idea is low impact - so scrapped)

## Milestone 1: DevSpaces Session Management from extension + Quick set config via extension

### Feasibility Study:

`https://trilogy.devspaces.com/` communicates via websocket within the same origin.
I could not find any public API to be able to create + manage an auth session,
and therefore control configuration via extension
This means any configuration that is set, must be done via the DevSpaces domain.

### Alternate solution:

Add quick access buttons to open `https://trilogy.devspaces.com/settings/` and `https://trilogy.devspaces.com/` in new window on click.
User will have to configure settings on the domain.

### Benefit:

Adds a tiny benefit of not looking up the URL, but its not super impactful

## Milestone 2: Multiple env management UI

### Feasibility Study:

Material-UI based mini-dashboard for managing deploy & env settings. Nothing too complex. Feasible.

### Implementation Details:

Available Options: deploy, start, clean, seed, destroy, test

### Benefit:

Gives you more control over the kind of configuration/deployment you need for that particular branch or commit.

## Milestone 3: Deploy mode

### Feasibility Study:

Unfortunately, gitpod does not support multiple gitpod configurations as far as I know.
Example: `gitpod.deploy-only.yml`, `gitpod.destroy-deploy.yml`

### Alternate solution:

Pass env variables via the DevSpaces URL (env name + deploy mode config).
There is a limitation with env vars (passed via URL) that only two env vars are taken from the url (not sure why)
To bypass this limitation we pass two vars `env` and `mode` where `mode` encodes all the options as a string with 1's and 0's
where 1's represent the option set to true and 0's represent the option set to false
Use these variables to help control the kind of setup that needs to be done inside our cli tool instead
by piping the passed in env variables via the npm script.

### Implementation Details:

Example URL - `https://trilogy.devspaces.com/#env=ash1,mode=111111/https://github.com/trilogy-group/5k-response-tek/tree/gitpod-test`

### Benefits:

Maps deploy mode options from Milestone 2 to actual deployment configuration in gitpod.yml -> cli.ts
Same benefit as Milestone 2.

### Example Scenarios where deploy options are useful:

- I know the code is not in deployable state. Does not make sense to execute any run scripts. I make the necessary change, push the changes and only then launch a new workspace from latest commit in deploy mode (executing run scripts).
- I have a lot of setup (or data) associated with my users. Cleaning and reseeding my database will result in the loss of this setup. Execute only env deployment
- My CDK has had resources change that requires destroying and redeploying my env from scratch. Enable destroy and deploy before opening my workspace.
- Need to fix breaking test. No need to deploy or start frontend app in this situation

## Milestone 4: Fleeting lambda logger (for all lambdas in current env) -

### Feasibility Study:

The most straightforward approach is to use AWS access key and secret to access the cloudwatch logs but its not a safe approach. It is possible to use cognito to fetch lambda logs instead. This is the chosen approach.

### Implementation Details

We create a cognito user pool & identity pool with a cognito user.
We then authenticate this user in the extension and then exchange the accessToken for temporary AWS credentials (with restricted role permissions) in order to fetch the lambda logs. Once these are fetched, we dump them as stringified text on a new window (not saved anywhere, hence fleeting)

### Rationale:

- Backend changes (compute: lambda) is the most frequent reason for redeploying an environment
- On average, capability development involves checking 2-3 lambda logs several times while debugging
- This is time-consuming - open aws console -> lambdas section -> filter by your env -> open specific lambda -> open latest log stream -> checkout latest log events
- This is error-prone -> I have accidentally opened someone else's lambda logs (by looking at function name) and wondered why my changes are not working for 10-15 mins for no reason
- This is resource-consuming (for browser) when you keep several tabs open while making lambda changes to constantly check lambdas and adds to chrome clutter

### Benefits:

- Automatically filter lambda logs for YOUR env and fetch only the LAST log stream by default at the click of a button
- Last log stream is the one that is relevant in 90+% cases since we want to look at the latest logs to identify the latest failure
- Considering the ephemeral nature of the workspace, we can launch workspace, check logs in extension, make changes, close workspace and launch a new one. This makes development seamless and everything can be done from one point

## Milestone 5: Lambda select component

### Feasibility Study:

We need a simple material select component in UI. Nothing too complex. Should be feasible.

### Rationale:

Give user the flexibility to choose which lambda they are interested in rather than showing everything.

### Implementation Details:

We already have all the log groups fetched for a particular env.
We need to use those as options to the material component.

## Milestone 6: Ephemeral log window

### Feasibility Study:

It's possible to dump html content into a tab in chrome with no major setup required.

### Implementation Details:

Open a newWindow `window.open()` and write content on to it `window.document.write(htmlContent)`

### Benefit:

DevSpaces workspace is ephemeral and fleeting. An opened workspace might get shut in a few minutes.
With this approach, we can quickly lookup logs (not even saved anywhere, so no fuss), make changes to our repo, close workspace and launch a new one, all from just one chrome tab (goodbye clutter).

Accessing relevant logs takes 2-3 seconds to fetch via the extension as opposed to 2-3 mins (easy) via AWS console.
(I'm not even kidding).
Also, this is per lookup, which means this grows exponentially based on the number of times you check your logs.
Which is several times per feature.
Furthermore, since only current env logs are only fetched, approach is not prone to error of looking at wrong env's logs.

## Milestone 7: Env-Branch Info Tracker (High level)

### Feasibility Study:

We need some form of mapping between which branch is deployed to which env.
We can pass the branch via env vars in the context URL.
Store this information on lambda env variables.

### Rationale:

This information can be useful to understand what kind of deploy mode options must be set.
We can set the options accordingly when creating a new workspace from a different branch.
This would depend on the differences between the two branches being compared.

### Benefits:

When working with more than one env, you tend to lose track of which branch is associated with which env.
This especially happens when you come back after a break. This can sometimes mean, you deploy the env for no reason.
With the extension tracking this information for you, you know exactly what needs to be done to setup your env.
No wasteful step needs to be taken.

## Milestone 8: Event history tracker (Low level)

### Rationale:

More detailed breakdown helps the user understand further the kind of deployment that's necessary.
This information can also be useful for debugging purposes in case something goes wrong.

### Feasibility Study:

Since this is meant to be a more detailed log, we are looking to store the latest commit as opposed to the branch name because more commits can be pushed.

The long-term solution would be to

- authenticate user with github account
- use auth token to call api.github to fetch the latest commit hash for branch

The alternative quick approach used now is to:

- use content scripts to lookup the DOM for element with classes "f6 link-gray text-mono ml-2 d-none d-lg-inline"
- While there is only one element that matches this lookup, the problem with this approach is that github can change the classes applied
- Furthermore, with content scripts, we need to set up an interval that polls for whether the element is loaded in case it is not loaded at the time of query (not ideal)

We are currently maintaining a max of 5 events per env in history

### Benefits:

When deploying and maintaining more than one env, you tend to lose track of which branch is on what env.
Having this information means we can be more efficient about the kind of deploy options we set.
