import { Request, Response } from "express";
import { db } from "../db";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

const logIn = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await db.one(`SELECT * FROM users WHERE username = $1`, username);
    
    if (user && user.password === password) {
        const payload = { id: user.id, username };
        const { SECRET = ""} = process.env;
        const token = jwt.sign(payload, SECRET);

        await db.none(`UPDATE users SET token = $2 WHERE id = $1`, [user.id, token]);
        res.status(200).json({ id: user.id, username, token });
    } else {
        res.status(401).json({ msg: "Invalid credentials!" });
    }
}

const signUp = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await db.oneOrNone(`SELECT * FROM users WHERE username = $1`, username);

    if (user) {
        res.status(409).json({ msg: "Username already exists!" });
    } else {
        const { id } = await db.none(`INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id`, [username, password]);
        res.status(201).json({id, msg: "User created successfully!" });
    }
}

const logOut = async (req: Request, res: Response) => {
    const user: any = req.user;
    await db.none(`UPDATE users SET token = $2 WHERE id = $1`, [user?.id, null]);
    res.status(200).json({ msg: "User logged out successfully!" });
}

export { logIn, signUp, logOut };