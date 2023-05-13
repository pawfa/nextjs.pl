import { sql } from "@vercel/postgres";
async function getData() {
    const { rows } = await sql`SELECT * from Hackernews_Topstories`;
    return rows
}
export const HackerNewsFeed = async () => {
    const data = await getData();

    return <div>
        {data.map((feed)=> {
            return <div>{feed.title}</div>
        })}
    </div>
}