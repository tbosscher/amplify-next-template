import { defineAuth } from "@aws-amplify/backend";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  signupAttributes: {
    username: true,
    email: true,
    phone_number: true,
  },
  signInAliases: {
    email: true,
  },
  // Ensure there are no syntax or type errors
});