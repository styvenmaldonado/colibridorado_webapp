import { getCurrentUser } from "aws-amplify/auth";

export class AuthManager {
  static async isUserAuthenticated(){
 try {
    await getCurrentUser();
    return true;
  } catch (error) {
    return false;
  }
  }
}

