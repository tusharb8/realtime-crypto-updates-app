"use client";
import { getCurrencyHistory, pushtoStart, selectCurrency, selectCurrencyStatus, setCoin } from '@/lib/features/currency/currencySlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React, { useEffect, useState } from 'react'
import CurrencyTable from '../CurrencyTable/CurrencyTable';
import { io } from 'socket.io-client';
import dayjs from 'dayjs';
import CurrencySelectPopup from '../Popup/CurrencySelectPopup';
const availableCoins = ["Ethereum", "Bitcoin", "Litecoin", "Dogecoin", "Bitcoin Cash", "Tether"].sort();

const availableCoinsId = {
    "Ethereum": "ethereum",
    "Bitcoin": "bitcoin",
    "Litecoin": "litecoin",
    "Dogecoin": "dogecoin",
    "Bitcoin Cash": "bitcoin-cash",
    "Tether": "tether"
}

const HomePage = () => {

    const [socket, setSocket] = useState(io("http://localhost:5001", {
        autoConnect: false,
        transports: ["websocket", "polling"],
    }))
    const [popupVisible, setPopupVisible] = useState(false)
    const dispatch = useAppDispatch();
    const currency = useAppSelector(selectCurrency);
    const currencyStatus = useAppSelector(selectCurrencyStatus);
    useEffect(() => {
        dispatch(getCurrencyHistory(currency.coinName))

        socket.emit("setCoinSelected", currency.coinName)
        console.log("setCoinSelected", currency.coinName)
    }, [currency.coinName])

    useEffect(() => {
        localStorage.setItem('appState', currency);
    }, [currency])

    useEffect(() => {

        socket.on("connect", () => {
            console.log("Connected web socket to backend");
            setTimeout(() => {
                socket.emit("setCoinSelected", currency.coinName);
            }, 500);
        })
        socket.on("coin-data-updated", (data) => {
            console.log("coin-data-updated", data);

            dispatch(pushtoStart(data))
        })
        socket.on("disconnect", () => {
            console.log("Connected web socket to backend");
        })
        socket.connect()

        return () => {
            socket.off("connect");
            socket.off("coin-data-updated");
            socket.off("disconnect");
            socket.disconnect()
            socket.close()
        }
    }, [socket])

    return (
        <div className='h-full w-full relative top-0 left-0'>
            <div className='border border-black w-full h-1/6 flex items-center justify-center text-5xl font-extrabold'>
                Real Time Crypto Currency updates (Date:{dayjs().format('YYYY-MM-DD')})
            </div>
            <div className='border border-black w-full h-5/6 flex flex-row justify-between items-center'>
                <div className='h-full w-1/5 flex flex-col items-center'>
                    {availableCoins.map((coin, i) => {
                        if (currency.coinName === availableCoinsId[coin]) {
                            return <div key={coin + i} className='rounded-2xl mt-1 bg-orange-200 w-full h-8 font-bold text-center text-2xl'>
                                {coin}
                            </div>
                        }
                        return <div key={coin + i} className='rounded-sm mt-1 bg-gray-300 w-full h-8 text-center  text-xl hover:cursor-pointer'
                            onClick={() => { dispatch(setCoin(availableCoinsId[coin])) }}>
                            {coin}
                        </div>
                    })}
                    <div className='mt-10 text-xl text-center font-bold'>You can change currency from above panel or select using below Button </div>
                    <button className='w-2/3 mt-14 text-2xl border-2 border-violet-800 bg-violet-200 rounded-lg hover:bg-violet-800 hover:text-white'
                    onClick={() => { setPopupVisible(true) }}>Change Currency</button>
                </div>
                <div className='border border-black h-full w-4/5'>
                    <CurrencyTable />
                </div>
            </div>
            {popupVisible ? <CurrencySelectPopup setModal={setPopupVisible} />:null}
        </div>
    )
}

export default HomePage