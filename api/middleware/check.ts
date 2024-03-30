import type { Request, Response, NextFunction } from 'express';
import type { HydratedDocument } from 'mongoose';
import User from '../models/usersSchema';
import type { IUserFields } from '../types';

export interface RequestWithUser extends Request {
	user?: HydratedDocument<IUserFields>;
}

const check = async (
	req: RequestWithUser,
	res: Response,
	next: NextFunction,
) => {
	const headerValue = req.get('Authorization');
	let user;

	const [_bearer, token] = headerValue ? headerValue.split(' ') : '';

	if (token) {
		user = await User.findOne({ token });
	}

	if (!user) {
		return next();
	}
	req.user = user;
	next();
};

export default check;
