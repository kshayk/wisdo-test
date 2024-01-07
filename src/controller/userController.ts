import {Request, Response} from "express";
import {addCommunity} from "../service/communityService";
import {addUser} from "../service/userService";

export async function addNewUser(req : Request, res: Response) : Promise<void> {
    const {name, email} = req.body;

    if (!name || !email) {
        res.status(400).send("Missing required body parameters");
        return;
    }

    const newUser = await addUser(name, email);
    res.send(newUser._id);
}