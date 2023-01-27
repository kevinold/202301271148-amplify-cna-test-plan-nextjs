import AWS from "aws-sdk";
import { createCognitoUser, getCognitoUser } from "./cognitoUtils";
import users from "../cypress/fixtures/users.json";

const awsConfig = require("../aws-exports").default;
const { aws_project_region } = awsConfig;

AWS.config.update({ region: aws_project_region });

users.forEach(async ({ username, email }) => {
  console.log("User: ", username, " ", email);

  let errorCode = "";

  await getCognitoUser({
    Username: username,
  })
    .then((userObj) => {
      console.log("User exists", userObj);
    })
    .catch((error) => {
      console.log("error", error);
      errorCode = error.code;
    });

  if (errorCode === "UserNotFoundException") {
    await createCognitoUser({
      Username: username,
      Email: email,
    })
      .then((user: any) => {
        console.log("User created", user);
      })
      .catch((error: Error) => {
        console.log("error", error);
      });
  }
});
