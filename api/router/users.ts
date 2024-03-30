import { Router } from 'express';
import mongoose from 'mongoose';
import { OAuth2Client } from 'google-auth-library';
import User from '../models/usersSchema';
import config from '../config';

const usersRouter = Router();
const client = new OAuth2Client(config.google);

usersRouter.post('/', async (req, res, next) => {
	try {
		if (!req.body.email && !req.body.password) {
			return res
				.status(400)
				.send({ message: 'email and password should be in request' });
		}

		const user = new User({
			email: req.body.email,
			password: req.body.password,
			displayName: req.body.displayName,
		});
		user.generateToken();
		await user.save();
		return res.send(user);
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.status(422).send(e);
		}

		next(e);
	}
});

usersRouter.post('/google', async (req, res, next) => {
	try {
		const ticket = await client.verifyIdToken({
			idToken: req.body.credential,
			audience: config.google.clientId,
		});

		const payload = ticket.getPayload();

		if (!payload) {
			return res.status(400).send({ message: 'Google login error!' });
		}

		const email = payload['email'];
		const id = payload['sub'];
		const displayName = payload['name'];
		const avatar = payload['picture'];

		if (!email) {
			return res
				.status(400)
				.send({ message: 'Not enough user data to continue' });
		}

		let user = await User.findOne({ googleID: id });

		if (!user) {
			user = new User({
				email: email,
				password: crypto.randomUUID(),
				googleID: id,
				displayName,
				avatar,
			});
		}

		user.generateToken();
		await user.save();

		return res.send(user);
	} catch (e) {
		if (e instanceof mongoose.Error.ValidationError) {
			return res.status(422).send(e);
		}
		next(e);
	}
});

usersRouter.post('/sessions', async (req, res, next) => {
	try {
		if (req.body.email && req.body.password) {
			const user = await User.findOne({ email: req.body.email });

			if (!user) {
				return res
					.status(422)
					.send({ message: 'Username and/or password not found!' });
			}
			const isMatch = await user.checkPassword(req.body.password);

			if (!isMatch) {
				return res
					.status(422)
					.send({ message: 'Username and/or password not found!' });
			}

			user.generateToken();
			await user.save();

			return res.send(user);
		}

		return res
			.status(400)
			.send({ message: 'username and password should be in request' });
	} catch (e) {
		next(e);
	}
});

usersRouter.delete('/sessions', async (req, res, next) => {
	try {
		const headerValue = req.get('Authorization');
		const success = { message: 'Success' };

		if (!headerValue) return res.send(success);

		const [_bearer, token] = headerValue ? headerValue.split(' ') : '';

		if (!token) return res.send(success);

		const user = await User.findOne({ token });

		if (!user) return res.send(success);

		user.generateToken();

		user.save();
		return res.send(success);
	} catch (e) {
		next(e);
	}
});

export default usersRouter;
