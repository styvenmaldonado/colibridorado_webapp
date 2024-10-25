import { defineAuth } from '@aws-amplify/backend';

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
export const auth = defineAuth({
  loginWith: {
    email: {
      verificationEmailStyle: "CODE",
      verificationEmailSubject: "Bienvenido a Colibri Dorado",
      verificationEmailBody: (createCode) => `Use this code to confirm your account: ${createCode()}`
    },
  },
  userAttributes: {
    // specify a "birthdate" attribute
    givenName: {
      mutable:true,
      required:true
    },
    familyName: {
      mutable:true,
      required:true
    },
    birthdate: {
      mutable: true,
      required: false,
    },    
    phoneNumber: {
      mutable: true,
      required: false,
    }, 
    address: {
      mutable: true,
      required: false
    }, 
    "custom:tipo_documento": {
      dataType: "String",
      mutable: true,
      maxLen: 80,
      minLen: 1,
    },
    "custom:numero_documento": {
      dataType: "String",
      mutable: true,
      maxLen: 80,
      minLen: 1,
    },
    "custom:city": {
      dataType: "String",
      mutable: true,
      maxLen: 80,
      minLen: 1,
    },
    "custom:country": {
      dataType: "String",
      mutable: true,
      maxLen: 80,
      minLen: 1,
    },
  },
  groups: ["SUPERADMIN", "ADMIN"],
});
