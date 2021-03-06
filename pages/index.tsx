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
        <meta name="description" content="Nextjs.pl"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Witaj na <a href="https://nextjs.org">Nextjs.pl!</a>
        </h1>

        <div className={styles.grid}>
          <p>Bieżaca wersja Next.js to</p> <h2 className={styles.tag_name}>{tag_name}</h2> wydana <p className={styles.published_at}>{intl.format(new Date(published_at))}</p>
        </div>
      </main>
      <a href="https://github.com/pawfa" target="blank" rel="noopener noreferrer" className={styles.github_link}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 640"><title>Github logo</title><path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"/></svg></a>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("https://api.github.com/repos/vercel/next.js/releases/latest")
  const { tag_name, published_at } = await response.json();

  return {
    props: {tag_name, published_at},
  }
}
