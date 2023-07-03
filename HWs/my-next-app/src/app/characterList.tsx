"use client";
import { Welcome } from '@/types';
import { Pagination } from '@mui/material';
import Head from 'next/head';
import Image from 'next/image'
import React from 'react';

export default async function CharacterList({ page }: { page: number }) {
    const data = await getData(page);

    return (
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
    )
}

async function getData(pageNum: number): Promise<Welcome> {
    const res = await fetch(`https://rickandmortyapi.com/api/character?page=${pageNum}`);
    return res.json();
};