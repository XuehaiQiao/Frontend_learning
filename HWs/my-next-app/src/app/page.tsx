"use client";
import { Welcome } from '@/types';
import { Pagination } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image'
import React from 'react';

export default async function Page() {
  const [page, setPage] = React.useState(1);
  console.log("rerender");
  const data = await getData(page);
  
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <div>
      <Head>
        <title>Create Next App</title>
      </Head>
      <div className='character-items'>
      {data.results.map(character => {
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
        count={data.info.pages}
        page={page}
        color="primary" />
    </div>
  )
}

async function getData(pageNum: number): Promise<Welcome> {
  const res = await fetch(`https://rickandmortyapi.com/api/character?page=${pageNum}`);
  return res.json();
};