import { sql } from "@vercel/postgres";
async function getData() {
    // const { rows } = await sql`SELECT * from Hackernews_Topstories`;
    return [
        {
            "by" : "lonelyasacloud",
            "descendants" : 213,
            "id" : 35960018,
            "kids" : [ 35960400, 35960949, 35960156, 35962365, 35960576, 35960190, 35962292, 35962021, 35961278, 35960285, 35960332, 35961876, 35962258, 35962353, 35961886, 35960652, 35961729, 35960759, 35961269, 35960870, 35961945, 35960577, 35961404, 35960291, 35960473, 35960382, 35961095, 35961445, 35961228, 35961200, 35960270 ],
            "score" : 400,
            "time" : 1684234367,
            "title" : "Widely used chemical strongly linked to Parkinson’s disease",
            "type" : "story",
            "url" : "https://www.science.org/content/article/widely-used-chemical-strongly-linked-parkinson-s-disease"
        }
    ]
}
export const HackerNewsFeed = async () => {
    const data = await getData();

    return <section style={{backgroundColor: 'white', padding: '0 30px 30px 30px'}}>
        <h1>Hacker News feed</h1>
        <hr className="solid"/>
        {data.map((feed)=> {
            return <article key={feed.id}>
                <h2 style={{fontSize: '1.1rem'}}><a style={{textDecoration: 'underline', color: '#0070f3'}} target={"_blank"} href={feed.url}>{feed.title}</a></h2>
                <p style={{fontSize: '0.8rem'}}>By <span>{feed.by}</span> | {new Date(Number(feed.time)*1000).toISOString()} | <a href={`https://news.ycombinator.com/item?id=${feed.id}`} target={"_blank"} style={{textDecoration: 'underline'}}>{feed.descendants} Comments</a></p>
            </article>
        })}
    </section>
}