import { Client, Account } from 'appwrite';

// Initialize the Appwrite client
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
    // .setSelfSigned(true); // Enable this if using self-signed certificates

export const account = new Account(client);

export const login = () => {
    return account.createOAuth2Session(
        'github',
        `${window.location.origin}/auth/callback`,  // Dynamic callback URL
        `${window.location.origin}/auth/failure`,   // Dynamic failure URL
        ['read:user', 'user:email']
    );
};

export const getCurrentUser = async () => {
    try {
        // First check if we have a valid session
        const session = await account.getSession('current');
        if (!session) {
            console.log('No active session found');
            return null;
        }
        
        // If we have a session, get the user data
        const user = await account.get();
        console.log('Active user found:', user);
        return user;
    } catch (error) {
        if (error?.code === 401) {
            console.log('Session expired or invalid');
        } else {
            console.error('Error getting current user:', error);
        }
        return null;
    }
};

export const logout = async () => {
    try {
        await account.deleteSession('current');
        return true;
    } catch (error) {
        console.error('Logout error:', error);
        return false;
    }
}; 