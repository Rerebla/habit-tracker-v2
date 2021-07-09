import "reflect-metadata";
import { createConnection } from "typeorm";
import express from 'express';
import { User } from './entity/User';
import { Entry, helpMaterial } from './entity/Entry';
const app = express();
const port = 8080;

app.get("/entry", async (req, res) => {
    const authorization = req.headers.authorization;
    const user = await User.findOne({ token: authorization }, { relations: ["entries"] });
    if (!user) {
        res.sendStatus(403);
        return;
    }
    if (user.entries.length <= 0) {
        res.status(200).send("No entries");
        return;
    }
    res.status(200).send(user.entries);
});
app.get("/entry/:id", async (req, res) => {
    const authorization = req.headers.authorization;
    const user = await User.findOne({ token: authorization }, { relations: ["entries"] });
    if (!user) {
        res.sendStatus(403);
        return;
    }
    const id = parseInt(req.params.id);
    const entry = await Entry.findOne({ id: id });
    res.status(200).send(entry.date);
});
app.post("/entry", async (req, res) => {
    const authorization = req.headers.authorization;
    const user = await User.findOne({ token: authorization }, { relations: ["entries"] });
    if (!user) {
        res.sendStatus(403);
        return;
    }
    const entry = new Entry();
    entry.user = user;
    entry.helpMaterial = helpMaterial.audio;
    await entry.save();
    console.log(entry.helpMaterial);
    res.status(200).send("ID:" + entry.id);
});

app.delete("/entry", async (req, res) => {
    const authorization = req.headers.authorization;
    const user = await User.findOne({ token: authorization }, { relations: ["entries"] });
    if (!user) {
        res.sendStatus(403);
        return;
    }
    if (user.entries.length <= 0) {
        res.status(200).send("No entries left");
        return;
    }
    const maxID = user.entries.reduce((a, b) => a.id > b.id ? a : b).id;
    Entry.delete({ id: maxID });

    res.status(200).send(user.entries.filter((entry) => entry.id !== maxID));
});

app.listen(port, async () => {
    console.log("Express server ready");
    console.log("Listening on port: ", port);
    await createConnection();
});
