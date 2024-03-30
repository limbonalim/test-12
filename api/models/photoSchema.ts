import { Schema, model } from 'mongoose';
import { IPhotoFields, IPhotoModel } from '../types';

const photoSchema = new Schema<IPhotoFields, IPhotoModel, unknown>({
	author: {
		type: Schema.Types.ObjectId,
		required: true,
	},
	title: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});

const Photo = model<IPhotoFields, IPhotoModel>('photo', photoSchema);

export default Photo;