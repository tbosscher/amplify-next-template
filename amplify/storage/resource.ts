import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'workshiftdocs',
  access: (allow) => ({
    'workshiftdocs/*': [
      allow.authenticated.to(['read', 'write', 'delete']),
    ],
  }),
});