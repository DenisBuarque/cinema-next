import Head from 'next/head'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Home({list}) {

    const [searchText, setSearchText] = useState('');
    const [movieList, setMovieList] = useState([]);
    
    const handleSearch = async () => {
        if(searchText !== ''){
            const result = await fetch(`http://localhost:3000/api/search?q=${searchText}`);
            const json = await result.json();
            setMovieList(json.list);
        }
    }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Busca de Filmes
        </h1>

        <input type="text" value={searchText} onChange={e => setSearchText(e.target.value)} />
        <button onClick={handleSearch}>Buscar</button>

        <ul>
        {movieList.map(item => (
            <li key={item.id}>
                <a href={`/movie/${item.id}`}>
                <>
                    <img src={`https://image.tmdb.org/t/p/original${item.poster_path}`} width="150" alt={item.title} /><br/>
                    {item.title}
                </>
                </a>
            </li> 
        ))}
        </ul>

      </main>

      

    </div>
  )
}