import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { AuthManager } from "~/libs/AuthManager";

Amplify.configure(outputs);

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (await AuthManager.isUserAuthenticated()) {
    return navigateTo("/");
  }
});
