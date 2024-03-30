import * as path from 'path';
import { config as envConfig } from 'dotenv';

envConfig();
const rootPath = __dirname;

interface IAuthConfig {
	clientId: string;
	clientSecret: string;
}

interface IConfig {
	rootPath: string;
	publicPath: string;
	mongoose: string;
	port: number;
	google: IAuthConfig;
}

const config: IConfig = {
	rootPath,
	publicPath: path.join(rootPath, 'public'),
	mongoose: 'mongodb://localhost/spotify',
	port: 8000,
	google: {
		clientId: process.env['GOOGLE_CLIENT_ID'] as string,
		clientSecret: process.env['GOOGLE_CLIENT_SECRET'] as string,
	},
};

export default config;
