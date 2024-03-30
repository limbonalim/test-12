import express, { json } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import config from './config';
import usersRouter from './router/users';
import photoRouter from './router/photo';

const app = express();

app.use(json());
app.use(express.static('public'));
app.use(cors());

app.use('/users', usersRouter);
app.use('/photo', photoRouter);


const run = async () => {
	await mongoose.connect(config.mongoose);

	app.listen(config.port, () => {
		console.log(`Server started on ${config.port} port!`);
	});

	process.on('exit', () => {
		mongoose.disconnect();
	});
};

void run();
