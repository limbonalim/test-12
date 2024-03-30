export const BASE_URL = 'http://localhost:8000';

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

export enum Roles {
	user = 'user',
	admin = 'admin',
}
