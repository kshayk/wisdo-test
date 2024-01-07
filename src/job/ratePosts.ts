import {mongoConnect, mongoDisconnect} from "../database/mongo";
import {ratePosts} from "../service/feedService";
import * as dotenv from 'dotenv';

dotenv.config();

mongoConnect().then(() => {
    ratePosts().then(() => {
        console.log("Finished rating posts")
        mongoDisconnect().then(() => {
            console.log("Disconnected from mongo");
            return;
        });
    });
});