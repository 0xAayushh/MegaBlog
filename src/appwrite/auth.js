import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            }
            throw new Error("Account creation failed");
        } catch (error) {
            throw new Error(`Account creation failed: ${error.message}`);
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw new Error(`Login failed: ${error.message}`);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // Return null only if unauthorized (no user logged in)
            if (error.code === 401 || error.type === 'authorization_invalid') {
                return null;
            }
            // Re-throw other errors (network, server, etc.)
            throw new Error(`Failed to get current user: ${error.message}`);
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite logout error:", error);
            throw new Error(`Logout failed: ${error.message}`);
        }
    }
}

const authService = new AuthService();

export default authService;