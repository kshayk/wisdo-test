import {IPost, Post} from "../model/post";
import {IUser} from "../model/user";

export async function getFeed(user: IUser) : Promise<IPost[]> {
    // TODO: Not in requirements - but we should also only show approved posts
    const posts = await Post.find({community: {$in: user.communities}}, null, {sort: {rating: -1}}).populate('author','country');

    if (posts.length === 0) {
        return [];
    }

    const userCountry = user.country;
    posts.sort((a, b) => {
        // @ts-ignore
        const aCountry = a.author.country;
        // @ts-ignore
        const bCountry = b.author.country;
        if (aCountry === userCountry && bCountry !== userCountry) {
            return -1;
        } else if (aCountry !== userCountry && bCountry === userCountry) {
            return 1;
        } else {
            return 0;
        }
    });

    return posts;
}

export async function ratePosts() {
    const posts = await Post.find();

    posts.map(post => {
        const rating = rateAlgo(post.likes, post.body.length);

        Post.updateOne({ _id: post._id }, { rating: rating });
    });
}

export function rateAlgo(likes: number, bodyLength: number) : number {
    // TODO: The body length divider should be configurable based on the average body length of posts
    return Math.round(Math.floor(likes * 0.8 + (bodyLength/100) * 0.2));
}