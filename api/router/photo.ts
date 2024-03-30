import { Router } from 'express';
import check, { RequestWithUser } from '../middleware/check';
import Photo from '../models/photoSchema';
import auth from '../middleware/auth';
import { imagesUpload } from '../multer';
import mongoose, { Types } from 'mongoose';
import { Roles } from '../models/usersSchema';

const photoRouter = Router();

photoRouter.get('/', check, async (req: RequestWithUser, res, next) => {
	try {
		const result = await Photo.find().populate('author', 'displayName');
		if (!result[0]) {
			return res.status(404).send('Not found!');
		}
		res.send(result);
	} catch (e) {
		next(e);
	}
});

photoRouter.get('/user/:id', check, async (req: RequestWithUser, res, next) => {
	try {
		let author;
		try {
			author = new Types.ObjectId(req.params.id as string);
		} catch {
			return res.status(404).send({ message: 'Wrong ObjectId!' });
		}
        
		const result = await Photo.find({ author });
		if (!result[0]) {
			return res.status(404).send('Not found!');
		}
		res.send(result);
	} catch (e) {
		next(e);
	}
});

photoRouter.post(
	'/',
	auth,
	imagesUpload.single('image'),
	async (req: RequestWithUser, res, next) => {
		try {
			const author = req.user;

			const post = new Photo({
				author,
				title: req.body.title,
				image: req.file ? `/images/${req.file.filename}` : '',
			});

			await post.save();
			res.status(201).send(post);
		} catch (e) {
			if (e instanceof mongoose.Error.ValidationError) {
				return res.status(422).send(e);
			}
			next(e);
		}
	},
);

photoRouter.delete('/:id', auth, async (req: RequestWithUser, res, next) => {
	try {
		const user = req.user;
		let id;
		try {
			id = new Types.ObjectId(req.params.id as string);
		} catch {
			return res.status(404).send({ message: 'Wrong ObjectId!' });
		}

		if (user?.role === Roles.admin) {
			await Photo.deleteOne({ _id: id });
			return res.send({ message: 'Document was deleted!' });
		}

		const item = await Photo.deleteOne({ _id: id, author: user });
		if (item.deletedCount === 1) {
			return res.send({ message: 'seccsess' });
		}

		return res.status(400).send({ message: 'something wrong' });
	} catch (e) {
		next(e);
	}
});

export default photoRouter;
