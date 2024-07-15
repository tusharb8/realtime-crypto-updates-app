import { selectCurrency, selectCurrencyStatus, setCoin } from '@/lib/features/currency/currencySlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import React from 'react'

interface InputProps {
    setModal: any
}
const availableCoins = ["Ethereum", "Bitcoin", "Litecoin", "Dogecoin", "Bitcoin Cash", "Tether"].sort();
const availableCoinsId = {
    "Ethereum": "ethereum",
    "Bitcoin": "bitcoin",
    "Litecoin": "litecoin",
    "Dogecoin": "dogecoin",
    "Bitcoin Cash": "bitcoin-cash",
    "Tether": "tether"
}
const CurrencySelectPopup = ({ setModal }: InputProps) => {
    const dispatch = useAppDispatch();
    const currency = useAppSelector(selectCurrency);
    const currencyStatus = useAppSelector(selectCurrencyStatus);
    const handleCurrencySelect = (currency: string) => {
    }

    return (
        <div className='w-full h-full absolute  bg-black/60 top-0 left-0 flex items-center justify-center'>
            <div className='h-full w-1/5 flex flex-col opacity-100'>
                {availableCoins.map((coin, i) => {
                    if (currency.coinName === availableCoinsId[coin]) {
                        return <div key={coin + i} className='rounded-2xl mt-1 bg-orange-200 w-full h-8 font-bold text-center text-2xl'>
                            {coin}
                        </div>
                    }
                    return <div key={coin + i} className='rounded-sm mt-1 bg-gray-300 w-full h-8 text-center  text-xl hover:cursor-pointer'
                        onClick={() => { dispatch(setCoin(availableCoinsId[coin])); setModal(false)}}>
                {coin}
            </div>
                })}
        </div>
        </div >
    )
}

export default CurrencySelectPopup