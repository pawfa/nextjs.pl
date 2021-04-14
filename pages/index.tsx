import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { GetServerSideProps } from 'next';

const intl = new Intl.DateTimeFormat('pl-PL', {
  year: 'numeric', month: 'numeric', day: 'numeric',
  hour: 'numeric', minute: 'numeric', second: 'numeric',
  hour12: false,
});

export default function Home({tag_name, published_at}) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Nextjs.pl</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Witaj na <a href="https://nextjs.org">Nextjs.pl!</a>
        </h1>

        <div className={styles.grid}>
          <p>Bieżaca wersja Next.js to</p> <h3 className={styles.tag_name}>{tag_name}</h3> wydana <p className={styles.published_at}>{intl.format(new Date(published_at))}</p>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://api.github.com/repos/vercel/next.js/releases/latest")
  const { tag_name, published_at } = await response.json()

  return {
    props: {tag_name, published_at},
  }
}
