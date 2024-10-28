import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { getCurrentUser } from "aws-amplify/auth";

Amplify.configure(outputs);

export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const isLogin = await getCurrentUser();
    if (!isLogin) {
      return navigateTo("/login");
    }
  } catch (error) {
    return navigateTo("/login");
  }
});
