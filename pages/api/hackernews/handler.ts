import {NextApiRequest, NextApiResponse} from "next";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponse,
) {
    const resp = await fetch("https://hacker-news.firebaseio.com/v0/topstories.json",{ cache: 'no-store' })
    const data = await resp.json();

    const res: any[] = [];
    for (const id of data) {
        const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`,{ cache: 'no-store' })
        const itemData = await response.json();
        if (itemData.title.substring('nextjs')) {
            res.push(itemData)
        }
    }

    response.status(200).json({
        body: res,
        query: request.query,
        cookies: request.cookies,
    });
}