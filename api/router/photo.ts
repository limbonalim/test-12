import { Router } from 'express';
import check, { RequestWithUser } from '../middleware/check';
import Photo from '../models/photoSchema';
import auth from '../middleware/auth';
import { imagesUpload } from '../multer';
import { Types } from 'mongoose';
import { Roles } from '../models/usersSchema';

const photoRouter = Router();

photoRouter.get('/', check, async (req: RequestWithUser, res, next) => {
	try {
		const result = await Photo.find();
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

		const deletedItem = await Photo.deleteOne({ _id: id, author: user });
		return res.send(deletedItem);
	} catch (e) {
		next(e);
	}
});

export default photoRouter;
