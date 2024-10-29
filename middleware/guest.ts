import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { isUserAuthenticated } from "~/libs/AuthManager";

Amplify.configure(outputs);

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (await isUserAuthenticated()) {
    return navigateTo("/");
  }
});
