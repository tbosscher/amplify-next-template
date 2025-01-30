import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'workshift-docs',
  access: (allow) => ({
    'WorkShift Files/*': [
      allow.authenticated.to(['read', 'write', 'delete'])
    ]
  }),
  versioned: true // Enable versioning for the S3 bucket
});