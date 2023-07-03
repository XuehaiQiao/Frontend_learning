"use client";
import { Welcome } from '@/types';
import { Pagination } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image'
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<Welcome | null>(null);

  const fetchData = async () => {
    setLoading(true);
    const result = await getData(page);
    console.log(result)
    setData(result);
    setLoading(false);
    console.log(loading);
  };

  useEffect(() => {
    console.log("reload1");
    fetchData();
  }, [page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return <> {loading ? <div>Loading...</div> :
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className='character-items'>
        {data?.results.map(character => {
          return <div className='character' key={character.id}>
            {character.name}
            <Image
              src={character.image}
              alt={character.name}
              width="200"
              height="200"
            />
          </div>
        })}
      </div>

      <Pagination
        onChange={handleChange}
        count={data ? data.info.pages : 1}
        page={page}
        color="primary" />
    </div>

  }
  </>



}

async function getData(pageNum: number): Promise<Welcome> {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=${pageNum}`);
  return res.json();
};