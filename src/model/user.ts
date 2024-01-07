import mongoose, {Schema} from "mongoose";
import {UserRoleEnum} from "../enum/UserRoleEnum";

type UserRole = UserRoleEnum.SUPER_MODERATOR | UserRoleEnum.MODERATOR;

export interface IUser extends mongoose.Document {
    name: string;
    role: UserRole;
    email?: string;
    image?: string;
    country: string;
    communities: mongoose.Types.ObjectId[];
}

const UserSchema = new mongoose.Schema<IUser>(
    {
        name: {type: String, required: true},
        role: {type: Number, required: true},
        email: {type: String},
        image: {type: String},
        country: {type: String, required: true},
        communities: [{ type: Schema.Types.ObjectId, ref: 'Community' }]
    },
    {timestamps: true},
);

export const User = mongoose.model<IUser>("User", UserSchema);