import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { isLogin } from "~/libs/isLogin";

Amplify.configure(outputs);

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (await isLogin()) {
    return navigateTo("/");
  }
});