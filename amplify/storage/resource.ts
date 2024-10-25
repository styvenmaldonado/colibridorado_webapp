import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'BucketcolibriDorado',
  isDefault: true, // identify your default storage bucket (required)
});