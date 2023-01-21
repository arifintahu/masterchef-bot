import * as puppeteer from "puppeteer";
import { parse } from "csv-parse";
import * as fs from "fs";
import * as path from "path";
import {
    goBirthdayPartyPuppeteer,
} from "./actions/event";

type User = {
    username: string;
    password: string;
}

const inviteLink = "https://ninneko.com/1stbirthdayparty?shareCode=fc98ec242d51f46a35427d08b146f09bd5d8d29c"; //SunEater2

function readData(start: number, end: number): Promise<User[]> {
    return new Promise((resolve, reject) => {
        const users: User[] = [];
        fs.createReadStream(path.join(__dirname, "../data/user.csv"))
            .pipe(parse({
                delimiter: ",",
                from_line: start,
                to_line: end,
                columns: ["username", "password"],
            }))
            .on("data", function (row: User) {
                users.push(row);
            })
            .on("end", function () {
                resolve(users);
            })
            .on("error", function (error) {
                reject(error);
            });
    });
}

async function main(start: number, end: number) {
    console.time("Total");
    const users = await readData(start, end);
    
    for (const user of users) {
        console.time(`${user.username}`);
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(inviteLink);

        const result = await goBirthdayPartyPuppeteer(page, user.username, user.password);
        
        console.log("user: %s - %s", user.username, result);
        console.timeEnd(`${user.username}`);
        console.log("\n");
    }

    console.timeEnd("Total");
    process.exit();
}

main(2, 3);
