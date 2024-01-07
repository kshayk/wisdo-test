import mongoose, {Schema} from "mongoose";
import {Community} from "./community";
import {PostStatusEnum} from "../enum/PostStatusEnum";
import {User} from "./user";

type PostStatus = PostStatusEnum.PENDING_APPROVAL | PostStatusEnum.APPROVED;

export interface IPost extends mongoose.Document {
    title: string;
    summary: string;
    body: string;
    author: mongoose.Types.ObjectId | typeof User;
    community: mongoose.Types.ObjectId | typeof Community;
    likes: number;
    status: PostStatus;
    rating: number;

}

const PostSchema = new mongoose.Schema<IPost>(
    {
        title: String,
        summary: String,
        body: String,
        author: { type: Schema.Types.ObjectId, ref: 'User' },
        community: { type: Schema.Types.ObjectId, ref: 'Community' },
        likes: Number,
        status: Number,
        rating: {type: Number, default: 0}
    },
    { timestamps: true },
);

export const Post = mongoose.model<IPost>("Post", PostSchema);