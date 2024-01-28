import styles from "../styles/Home.module.css";
import {HackerNewsFeed} from "./components/HackerNews/HackerNewsFeed";
import {RedditNewsFeed} from "./components/RedditNewsFeed/RedditNewsFeed";

interface IndexProps {
    tagName: string
    publishedDate: string
}

export default async function Page() {
    return (
        <div className={styles.container}>
            <div className={styles.layout}>
            {/* @ts-expect-error Async Server Component */}
            <HackerNewsFeed/>
            </div>
        </div>
    );
}

const intl = new Intl.DateTimeFormat('pl-PL', {
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false,
});

async function fetchReleaseInfo(): Promise<IndexProps> {
    const response = await fetch("https://api.github.com/repos/vercel/next.js/releases/latest",{ cache: 'no-store' })
    const {tag_name, published_at} = await response.json();
    // console.log("Published at: " + published_at);
    const publishedDate = intl.format(new Date(published_at));

    return {
        tagName: tag_name,
        publishedDate
    }
}