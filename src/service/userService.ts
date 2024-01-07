import {IUser, User} from "../model/user";
import {UserRoleEnum} from "../enum/UserRoleEnum";
import {ICommunity} from "../model/community";

export async function addUser(name: string, email: string) : Promise<IUser> {
    const user = new User({
        name,
        role: UserRoleEnum.SUPER_MODERATOR,
        email,
        image: "https://www.gravatar.com/avatar/0",
        country: "USA",
        communities: []
    });

    return await user.save();
}

export async function getUserById(id: string) : Promise<IUser | null> {
    return await User.findById(id);
}

export async function getAllModerators() : Promise<IUser[]> {
    //TODO: Cache this response
    return await User.find({role: {$in: [UserRoleEnum.MODERATOR, UserRoleEnum.SUPER_MODERATOR]}});
}