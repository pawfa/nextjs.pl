import { sql } from "@vercel/postgres";
import {format} from 'date-fns';

async function getData() {
    const { rows } = await sql`SELECT * from hackernews_newstories`;
    return rows
}
export const HackerNewsFeed = async () => {
    const data = await getData();

    return <section style={{backgroundColor: 'white', padding: '0 30px 30px 30px'}}>
        <h1>Hacker News feed</h1>
        <hr className="solid"/>
        {data.map((feed)=> {
            return <article key={feed.id}>
                <h2 style={{fontSize: '1.1rem'}}><a style={{textDecoration: 'underline', color: '#0070f3'}} target={"_blank"} href={feed.url}>{feed.title}</a></h2>
                <p style={{fontSize: '0.8rem'}}>By <span>{feed.by}</span> | {format(new Date(Number(feed.time)*1000), 'H:mm EEEE LLLL L, y')} | <a href={`https://news.ycombinator.com/item?id=${feed.id}`} target={"_blank"} style={{textDecoration: 'underline'}}>{feed.descendants} Comments</a></p>
            </article>
        })}
    </section>
}