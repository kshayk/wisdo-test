import mongoose from "mongoose";

export interface ICommunity extends mongoose.Document {
    title: string;
    image: string;
    memberCount: number;
}

export const CommunitySchema = new mongoose.Schema<ICommunity>(
    {
        title: String,
        image: String,
        memberCount: Number,
    },
    { timestamps: true },
);

export const Community = mongoose.model<ICommunity>("Community", CommunitySchema);