import { Model } from 'mongoose';

export interface IUserFields {
	displayName: string;
	email: string;
	avatar?: string;
	password: string;
	role: string;
	googleID?: string;
	token: string;
}

export interface IUserMethods {
	checkPassword(password: string): Promise<boolean>;
	generateToken(): void;
}

export type IUserModel = Model<IUserFields, unknown, IUserMethods>;

export interface IPhotoFields {
	author: Schema.Types.ObjectId;
	title: string;
	image: string;
}

export type IPhotoModel = Model<IPhotoFields, unknown, unknown>;