export interface IMyError {
	message: string;
}

export interface ValidationError {
	errors: {
		[key: string]: {
			name: string;
			message: string;
		};
	};
	message: string;
	name: string;
	_message: string;
}

export interface IRegisterForm {
	email: string;
	password: string;
	displayName: string;
}

export interface ILoginForm {
	email: string;
	password: string;
}

export interface IUser {
	_id: string;
	email: string;
	displayName: string;
	avatar: string;
	role: string;
	token: string;
}

export type UserMutation = Pick<IUser, '_id' | 'displayName'>;

export interface IPhoto {
	_id: string;
	author: UserMutation;
	title: string;
	image: string;
}
