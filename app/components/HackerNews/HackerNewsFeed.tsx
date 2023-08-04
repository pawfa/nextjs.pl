import { sql } from "@vercel/postgres";

async function getData() {
    const { rows } = await sql`SELECT * from hackernews_next_stories`;
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
                <p style={{fontSize: '0.8rem'}}><span>{feed.author}</span> | {feed.date} | <a href={`https://news.ycombinator.com/${feed.itemidurl}`} target={"_blank"} style={{textDecoration: 'underline'}}>{feed.comments ? feed.comments : '0 comments'}</a></p>
            </article>
        })}
    </section>
}