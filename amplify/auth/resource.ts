import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: true,
  },
  // Remove or disable guest access
  signupAttributes: {
    username: true,
    email: true,
    phone_number: true,
  },
  signInAliases: {
    email: true,
  },
  // Optionally, you can specify other configurations like MFA, password policies, etc.
});