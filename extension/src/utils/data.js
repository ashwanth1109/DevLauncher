// TODO: this needs to be made dynamic
export const envList = ["ash1", "ash2"];
export const optionsList = [
  "deploy",
  "start",
  "clean",
  "seed",
  "destroy",
  "test",
];

export const region = "us-east-1";
export const lambdaLogGroupPrefix = "/aws/lambda/responsetek_";
export const identityPoolId = "us-east-1:6acdade6-3c69-4a58-84df-55fa2c691ae8";
export const userPoolLoginKey =
  "cognito-idp.us-east-1.amazonaws.com/us-east-1_Ker0E3FWJ";

export const getLambdaPrefix = (envName) =>
  `/aws/lambda/responsetek_${envName}_`;
