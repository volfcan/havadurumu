import React from "react";
import Image from "next/image";

const Weather = ({data}) => {
console.log(data)
    return (
        <div className={'relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-gray-300 z-10 '}>
            {/*Top*/}
            <div className={'relative flex justify-between pt-12'}>
                <div className={'flex flex-col items-center'}>
                    <Image
                        src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                        alt='/'
                        width={100}
                        height={100}
                        />
                    <p className={'text-2xl'}>{data.weather[0].main}</p>
                </div>
                <p className={'text-9xl'}>{data.main.temp.toFixed(0)}&#176;</p>
            </div>
            {/*Bottom*/}

            <div className={'bg-black/20 relative p-8 rounded-md'}>
                <p className={'text-2xl text-center pb-6'}>{data.name} hava durumu </p>
                <div className={'flex justify-between text-center'}>
                    <div>
                        <p className='font-bold text-2xl'>{data.main.feels_like.toFixed(0)}&#176;</p>
                        <p>Hissedilen</p>
                    </div>
                                        <div>
                        <p className='font-bold text-2xl'>{data.main.humidity}%</p>
                        <p>Nem</p>
                    </div>
                                        <div>
                        <p className='font-bold text-2xl'>{data.wind.speed.toFixed(0)}</p>
                         <p>Rüzgar</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather