import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { parse } from 'node-html-parser';
import {db} from "@vercel/postgres";

export async function GET(request: NextRequest) {

    const respHTML = await fetch("https://news.ycombinator.com/from?site=nextjs.org",{ cache: 'no-store' })
    const html = await respHTML.text()

    const root = parse(html)
    const titleSpan = root.querySelectorAll('span[class="titleline"]')

    const titleData = titleSpan.map((span) => {
        const link = span.querySelector('> a');
        if (link) {
            return [link.getAttribute('href'), link.textContent]
        }
        return []
    })

    const subline = root.querySelectorAll('span[class="subline"]')
    const sublineData =subline.map((span) => {
        const points = span.querySelector('> span');
        const links = span.querySelectorAll('a');
        const arr = [points?.textContent, links[0].textContent, links[1].textContent, links[1].getAttribute('href')]

        links.length === 4 && arr.push(links[3].textContent);
        return arr
    })
    // console.log(points, author, date, id, comments);

    const feeds: any[] = [];

    for (let i = 0; i < titleData.length; i++) {
        feeds.push({
            url: titleData[i][0],
            title: titleData[i][1],
            points:sublineData[i][0],author: sublineData[i][1],
            date:sublineData[i][2],
            itemIdUrl:sublineData[i][3],
            comments: sublineData[i][4]
        })
    }

    const client = await db.connect();
    for (const feed of feeds) {
        await client.sql`INSERT INTO hackernews_next_stories
                             (url, title, author, points, date, itemIdUrl, comments)
                         SELECT ${feed.url}, ${feed.title}, ${feed.author}, ${feed.points}, ${feed.date}, ${feed.itemIdUrl}, ${feed.comments}
                         WHERE NOT EXISTS (SELECT itemIdUrl
                                           FROM hackernews_next_stories
                                           WHERE itemIdUrl = ${feed.itemIdUrl});`;
    }

    return NextResponse.json({
        body: feeds,
    });
}

