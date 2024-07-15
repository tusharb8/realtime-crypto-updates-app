"use client";
import { addCoinHistory, getCurrencyHistory, selectCurrency, selectCurrencyStatus } from '@/lib/features/currency/currencySlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react'


interface InputProps {
    coinName: string
}
const CurrencyTable = () => {

    const dispatch = useAppDispatch();
    const currency = useAppSelector(selectCurrency);
    const currencyStatus = useAppSelector(selectCurrencyStatus);


    useEffect(() => {
        console.log("currency", currency)
    }, [currency])


    return (
        <>
            <div className='flex justify-between'>
            <div className='w-1/5 m-1 rounded-lg bg-green-300 text-center text-xl font-bold'>Sr No</div>
                <div className='w-1/5 m-1 rounded-lg bg-green-300 text-center text-xl font-bold'>Coin Name</div>
                <div className='w-1/5 m-1 rounded-lg bg-green-300 text-center text-xl font-bold'>Time(hh:mm:ss:ms)</div>
                <div className='w-1/5 m-1 rounded-lg bg-green-300 text-center text-xl font-bold'>Type</div>
                <div className='w-1/5 m-1 rounded-lg bg-green-300 text-center text-xl font-bold'>Rate USD</div>
            </div>
            {currency.data.map((entry, i) => {
                return <div key={entry._id} className='flex justify-between'>
                    <div className='w-1/4 mt-1 mr-1 rounded-sm bg-purple-200 text-center'>{i+1}</div>
                    <div className='w-1/4 mt-1 mr-1 rounded-sm bg-purple-200 text-center'>{entry.coinName}</div>
                    <div className='w-1/4 mt-1 mr-1 rounded-sm bg-purple-200 text-center'>{dayjs(entry.createdAt).format('HH:mm:ss:SSS')}</div>
                    <div className='w-1/4 mt-1 mr-1 rounded-sm bg-purple-200 text-center'>{entry.type}</div>
                    <div className='w-1/4 mt-1 mr-1 rounded-sm bg-purple-200 text-center'>{entry.rateUsd}</div>
                </div>
            })}
        </>
    )
}

export default CurrencyTable