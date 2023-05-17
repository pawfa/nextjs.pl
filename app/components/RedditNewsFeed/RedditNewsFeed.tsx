import {Fragment} from "react";
import {format} from "date-fns";
async function getData() {
    const response = await fetch("https://www.reddit.com/r/nextjs/new.json?sort=new",{ cache: 'no-store' })
    const {data} = await response.json();

    return data.children
}
export const RedditNewsFeed = async () => {
    const data = await getData();

    return <section style={{backgroundColor: 'white', padding: '0 30px 30px 30px'}}>
        <h1>Reddit News feed</h1>
        <hr className="solid"/>
        {data.map((feed)=> {
            const post = feed.data;

            return <Fragment key={post.id}>
                <article>
                    <h2 style={{fontSize: '1.1rem'}}><a style={{textDecoration: 'underline', color: '#0070f3'}} target={"_blank"} href={post.url}>{post.title}</a></h2>
                    <p style={{fontSize: '0.8rem'}}>By <span>{post.author}</span> | {format(new Date(Number(post.created)*1000), 'H:mm EEEE LLLL L, y')} | <a
                    href={`https://reddit.com${post.permalink}`}
                    target={"_blank"}
                    style={{textDecoration: 'underline'}}>{post.num_comments} Comments</a></p>
                </article>
                <hr style={{borderTop: '1px'}}/>
            </Fragment>
        })}
    </section>
}