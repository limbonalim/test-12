import mongoose from 'mongoose';
import config from './config';
import User, { Roles } from './models/usersSchema';

const dropCollection = async (
	db: mongoose.Connection,
	collectionName: string,
) => {
	try {
		await db.dropCollection(collectionName);
	} catch (e) {
		console.log(`Collection ${collectionName} was missing, skipping drop`);
	}
};

const run = async () => {
	await mongoose.connect(config.mongoose);
	const db = mongoose.connection;

	const models = [User];

	for (const model of models) {
		await dropCollection(db, model.collection.collectionName);
	}

	const [admin, user] = await User.create(
		{
			email: 'Admin',
			password: '123321',
			displayName: 'SuperAdmin',
			token: crypto.randomUUID(),
			role: Roles.admin,
		},
		{
			email: 'User',
			password: '123321',
			displayName: 'SuperUser',
			token: crypto.randomUUID(),
			role: Roles.user,
		},
	);

	await db.close();
};

void run();
