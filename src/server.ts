import express from "express";
import { Response, Request, NextFunction } from "express";
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import {mongoConnect} from "./database/mongo";
import {addNewPost} from "./controller/comunityController";
import {addCommunity, addPost, addUserToCommunity} from "./service/communityService";
import {addUser, getUserById} from "./service/userService";
import {IUser, User} from "./model/user";
import {ICommunity} from "./model/community";
import {addWatchlistWord, getWatchlistWords} from "./service/watchlistWordService";
import {getFeed} from "./service/feedService";

const jsonParser = bodyParser.json();

dotenv.config();

const app = express();

app.use(jsonParser);

app.use(async (req: Request, res: Response, next: NextFunction) => {
    // grab authorization from request header
    const authorization = req.headers.authorization;

    // check if authorization is undefined

    // verify the jwt token from authorization string

        // return 401 if token is not verified

    // add the user data to the request object
    next();
});

app.use(async (req: Request, res: Response, next: NextFunction) => {
    await mongoConnect();
    next();
});

app.post("/add-post", async (req: Request, res: Response) => {
    await addNewPost(req, res);
});

app.get('/feed', async (req: Request, res: Response) => {
    let user;
    try {
        user = await User.findById(req.body.userId);
    } catch(e) {
        const errorMessage = "Failed to fetch the user";
        console.error(errorMessage, e);
        res.status(500).send(errorMessage);
        return
    }

    if (!user) {
        res.status(404).send("User not found");
        return;
    }

    let feed;
    try {
        feed = await getFeed(user);
    } catch(e) {
        const errorMessage = "Failed to fetch the feed";
        console.error(errorMessage, e);
        res.status(500).send(errorMessage);
    }

    return res.send(feed);
});

/***************** Test endpoints for setup - in actual production this should not be here *****************/
app.post("/add-test-watchlist-word", async (req: Request, res: Response) => {
    const word = req.body.word;
    if (!word) {
        res.status(400).send("Missing required body parameters");
        return;
    }

    try {
        await addWatchlistWord(word);
    } catch (e) {
        const errorMessage = "Error adding watchlist word";
        console.error(errorMessage, e);
        res.status(500).send(errorMessage);
        return;
    }

    res.send({
        success: true
    });
});

app.get('/watchlist-words', async (req: Request, res: Response) => {
    const words = await getWatchlistWords();
    res.send(words);
});

app.post("/add-test-data", async (req: Request, res: Response) => {
    let user : IUser;
    let community : ICommunity
    try {
        [community, user] = await Promise.all([
            addCommunity("Test Community", "https://www.google.com"),
            addUser("Test User", "test@test.com")
        ]);
    } catch (e) {
        const errorMessage = "Error adding test data";
        console.error(errorMessage, e);
        res.status(500).send(errorMessage);
        return;
    }

    try {
        await addUserToCommunity(user._id, community._id);
    } catch (e) {
        const errorMessage = "Error adding user to community";
        console.error(errorMessage, e);
        res.status(500).send(errorMessage);
        return;
    }

    const updatedUser = await getUserById(user._id);

    res.send({
        success: true,
        user: updatedUser,
    });
});

app.listen(8080, () => {
    console.log("Server listening on port 8080");
});