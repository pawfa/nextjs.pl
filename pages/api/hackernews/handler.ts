import {NextApiRequest, NextApiResponse} from "next";
import {db} from "@vercel/postgres";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    const resp = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json",{ cache: 'no-store' })
    const data = await resp.json();

    const feeds: any[] = [];
    for (const id of data) {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`,{ cache: 'no-store' })
        const itemData = await response.json();
        if (itemData.title.match(/next[.]?js/gi)) {
            feeds.push(itemData)
        }
    }

    const client = await db.connect();
    for (const feed of feeds) {
        await client.sql`INSERT INTO hackernews_newstories (by,descendants,id,kids,score,time,title,type,url) VALUES (${feed.by}, ${feed.descendants}, ${feed.id}, ${feed.kids}, ${feed.score}, ${feed.time}, ${feed.title}, ${feed.type}, ${feed.url});`;
    }

    response.status(200).json({
        body: feeds.length,
    });
}