import mongoose from 'mongoose';
import config from './config';
import User, { Roles } from './models/usersSchema';
import Photo from './models/photoSchema';

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

	const models = [User, Photo];

	for (const model of models) {
		await dropCollection(db, model.collection.collectionName);
	}

	const [admin, user, someUser] = await User.create(
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
		{
			email: 'User@2',
			password: '123321',
			displayName: 'SuperUser2',
			token: crypto.randomUUID(),
			role: Roles.user,
		},
	);

	await Photo.create(
		{
			author: admin,
			title: 'someTitle',
			image: '/fixtures/file.avif',
		},
		{
			author: admin,
			title: 'someTitleAdmin',
			image: '/fixtures/1.webp',
		},
		{
			author: someUser,
			title: 'someTitle',
			image: '/fixtures/2.webp',
		},
		{
			author: someUser,
			title: 'someTitle',
			image: '/fixtures/file.avif',
		},
		{
			author: user,
			title: 'someTitle',
			image: '/fixtures/avatar-icon-2.png',
		},
		{
			author: user,
			title: 'someTitle',
			image: '/fixtures/avatar-icon-1.png',
		},
		{
			author: admin,
			title: 'someTitle',
			image: '/fixtures/defalt.png',
		},
	);

	await db.close();
};

void run();
