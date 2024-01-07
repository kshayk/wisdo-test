import {Request, Response} from "express";
import {
    addCommunity,
    addPost,
    addUserToCommunity,
    getCommunityById,
    isUserInCommunity
} from "../service/communityService";
import {getUserById} from "../service/userService";

export async function addNewCommunity(req : Request, res: Response) : Promise<void> {
    const {title, image} = req.body;

    if (!title || !image) {
        res.status(400).send("Missing required body parameters");
        return;
    }

    if (title.length > 60) {
        res.status(400).send("Title cannot be longer than 60 characters");
        return;
    }

    let newCommunity;
    try {
        newCommunity = await addCommunity(title, image);
    } catch (e) {
        res.status(500).send("Error adding community");
        return;
    }

    res.send({
        success: true,
        communityId: newCommunity._id
    });
}

export async function addUser(req : Request, res: Response) : Promise<void> {
    const {userId, communityId} = req.body;

    if (!userId || !communityId) {
        res.status(400).send("Missing required body parameters");
        return;
    }

    try {
        await addUserToCommunity(userId, communityId);
    } catch (e) {
        res.status(500).send("Error adding user to communities");
        return;
    }

    res.send({
        success: true
    });
}

export async function addNewPost(req : Request, res: Response) : Promise<void> {
    const {title, body, userId, communityId} = req.body;
    let summary = req.body.summary;

    if (!title || !body || !communityId) {
        res.status(400).send("Missing required body parameters");
        return;
    }

    if (title.length > 60) {
        res.status(400).send("Title cannot be longer than 60 characters");
        return;
    }

    if (summary && summary.length > 150) {
        res.status(400).send("Summary cannot be longer than 150 characters");
        return;
    }

    if (!summary) {
        summary = body.split(" ").slice(0, 100).join(" ");
    }

    let community;
    try {
        community = await getCommunityById(communityId);
    } catch (e) {
        res.status(500).send("Error getting community");
        return;
    }

    if (!community) {
        res.status(404).send("Community not found");
        return;
    }

    let user;
    try {
        user = await getUserById(userId);
    } catch (e) {
        res.status(500).send("Error getting user");
        return;
    }

    if (!user) {
        res.status(403).send("User does not exist");
        return;
    }

    if (!isUserInCommunity(user, community)) {
        res.status(403).send("User is not in community");
        return;
    }

    let post;
    try {
        post = await addPost(title, summary, body, userId, communityId);
    } catch (e) {
        res.status(500).send("Error adding post");
        return;
    }

    res.send({
        success: true,
        postId: post._id
    });
}