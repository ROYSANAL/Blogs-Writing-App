import config from "../config/config";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(config.appwriteUrl)
      .setProject(config.appwriteProjectId);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      //jis din bhi services change krni hongi, bss constructor aur yahan
      //  pe changes kr denge aur ho gya
      //createAccount function aur uske params same rhnge simple!
      //this is called abstraction!

      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //call another method to login
        //or we can handle it in frontend that new account has been created now
        // go to login page or redirect hijm forcefully

        return this.login({ email, password });
      } else return userAccount;
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
      throw error;
    }
  }
  async getCurrentUser() {
    try {
      const result = await this.account.get();
      return result;
    } catch (error) {
      console.log("Appwrite Service : getCurrentUser : Error", error);

      throw error;
    }
    return null;
  }
  async logout() {
    try {
      await this.account.deleteSessions();
      //await this.account.deleteSession('current');
    } catch (error) {
      console.log("Appwrite Service: Error :", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
