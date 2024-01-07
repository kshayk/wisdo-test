import {Community, ICommunity} from "../model/community";
import {IUser, User} from "../model/user";
import {IPost, Post} from "../model/post";
import {PostStatusEnum} from "../enum/PostStatusEnum";
import {getWatchlistWords} from "./watchlistWordService";
import {sendEmail} from "./alertService";
import {getAllModerators} from "./userService";

export async function addCommunity(title: string, image: string) : Promise<ICommunity> {
    const community = new Community({
        title,
        image,
        memberCount: 0
    });

    return await community.save();
}

export async function getCommunityById(id: string) : Promise<ICommunity | null> {
    return await Community.findById(id);
}

export async function addUserToCommunity(userId: string, communityID: string) : Promise<void> {
    const community : ICommunity | null = await Community.findById(communityID);
    if (!community) {
        throw new Error("Community not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    user.communities.push(community._id);

    community.memberCount++;

    await user.save();
    await community.save();
}

export function isUserInCommunity(user: IUser, community: ICommunity): boolean {
    return user.communities.includes(community._id);
}

export async function addPost(title: string, summary: string, body: string, author: IUser, community: ICommunity) : Promise<IPost> {
    const fullPostText = `${title} ${summary} ${body}`;
    const shouldAlert = await isPostContainWatchlistWords(fullPostText);

    const newPost = new Post({
        title,
        summary,
        body,
        author: author,
        community: community,
        likes: 0,
        status: PostStatusEnum.PENDING_APPROVAL
    });

    const post = await newPost.save();

    if (shouldAlert) {
        await alertModerators(fullPostText, post._id);
    }

    return post;
}

export async function isPostContainWatchlistWords(postText: string) : Promise<boolean> {
    const watchlistWords = await getWatchlistWords();
    const postWords = postText.split(" ");

    return postWords.some(word => watchlistWords.includes(word));
}

async function alertModerators(message: string, postID: string) : Promise<void> {
    const moderators = await getAllModerators();

    if (moderators.length) {
        const moderatorEmails : string[] = [];
        moderators.forEach(moderator => { if (moderator.email) { moderatorEmails.push(moderator.email) }});
        await sendEmail(moderatorEmails, "New Post Alert", `The post ${postID} contains watchlist words`)
    }
}