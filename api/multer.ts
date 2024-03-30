import multer from 'multer';
import path from 'path';
import { promises as fs } from 'fs';
import { randomUUID } from 'crypto';
import config from '../../spotify/api/config';

const imageStorage = multer.diskStorage({
	destination: async (_r, _f, cb) => {
		const destDir = path.join(config.publicPath, 'images');
		await fs.mkdir(destDir, { recursive: true });
		cb(null, destDir);
	},
	filename(_r, file, cb) {
		const extension = path.extname(file.originalname);
		cb(null, randomUUID() + extension);
	},
});

export const imagesUpload = multer({ storage: imageStorage });
