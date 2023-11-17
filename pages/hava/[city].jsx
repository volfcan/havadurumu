import React, {useEffect, useState} from "react";
import Image from "next/image";
import cloud from "../../icons/cloud.png";
import fewcloud from "../../icons/mostly_sunny.png"
import midcloud from "../../icons/partly_sunny.png"
import sun from "../../icons/sunny.png";
import snow from "../../icons/snowflake.png"
import lightrain from "../../icons/partly_sunny_rain.png"
import moderaterain from "../../icons/rain_cloud.png"
import heavyrain from "../../icons/thunder_cloud_and_rain.png"
import {useRouter} from "next/router";
import Home from '../home'

import axiosRequest from "axios";



const Weather = ({data}) => {

    const router = useRouter();
    const {city} = router.query;
    const [weather,setWeather] = useState();
    const fetchWeather = async () => {
    const axiosRequest = require('axios');
    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      const response = await axiosRequest.get(url);
      const url2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&cnt=16&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      const response2 = await axiosRequest.get(url2);
      setWeather(response2.data)
      await router.push(`/hava/${city}`);
      console.log(response2)
    }
    catch (error) {
      console.error(error)
    }
  }
      useEffect(()=>{
          if(city) fetchWeather();
      },[city])

    let dates =[];
    let tempday = [];
    let tempnight = [];
    let conditions = [];
    let description = [];


    try {
            for (let i = 0; i < 16; i++) {
                const dt = weather.list[i].dt;
                const options = {month: 'short', weekday: 'short', day: 'numeric'};
                const date = new Date(dt * 1000).toLocaleDateString('tr-TR', options);
                dates.push(date);
            }

                for (let i = 0; i < 16; i++) {
                    const temp = Math.trunc(weather.list[i].temp.max);
                    tempday.push(temp);
                }


                for (let i = 0; i < 16; i++) {
                    const temp = Math.trunc(weather.list[i].temp.min);
                    tempnight.push(temp);
                }


            for (let i = 0; i < 16; i++) {
                const desc = weather.list[i].weather[0].description;
                description.push(desc)
            }

         }
         catch (error) {
        console.error(error)
        }


            let aciklama = description.map((desc) => {
                switch (desc) {
                    case "overcast clouds":
                        return "cok bulutlu";
                    case "broken clouds":
                        return "cok bulutlu";
                    case "scattered clouds":
                        return "az bulutlu";
                    case "few clouds":
                        return "az bulutlu";
                    case "heavy intensity rain":
                        return "çok yağmur";
                    case "moderate rain":
                        return "yağmurlu";
                    case "light rain":
                        return "az yağmur";
                    case "sky is clear":
                        return "güneşli";
                    case "rain and snow":
                        return "karlı";
                    default:
                        return desc;
                }
            });


            return (
                    <Home iFrame={true} Cardd={false} >
                <div>
                    {/*Mobile View*/}
                    <div className="grid grid-cols-1 p-4 sm:grid-cols-1 gap-4 max-w-screen md:w-[90%] md:mx-auto">
                        {/*<p className='text-xl text-gray-200 font-medium'><span className='font-medium text-xl'>{city}</span> hava durumu</p>*/}
                            <div className='text-white'>
                                <span className='text-white font-medium capitalize text-l'>{city} </span>hava durumu
                            </div>
                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow-custom">
                            <div className="flex">
                                <div className='w-[95px]'>
                                    <a className="text-gray-50 text-xs font-bold hover:underline">{dates[0]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[0] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[0] === "rain and snow" && <Image src={snow} alt='snow-icon'/> || description[0]  === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[0] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[0] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[0] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[0] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[0] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[0] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[0] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[0] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[0] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[0]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[0]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[0]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="text-gray-50 text-xs font-bold hover:underline">{dates[1]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[1] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[1] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[1] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[1] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[1] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[1] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[1] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[1] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[1] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[1] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[1] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[1]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[1]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[1]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4 text-gray-50 text-xs font-bold hover:underline">{dates[2]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[2] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[2] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[2] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[2] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[2] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[2] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[2] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[2] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[2] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[2] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[2] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[2]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[2]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[2]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4 text-gray-50 text-xs font-bold hover:underline">{dates[3]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[3] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[3] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[3] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[0] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[3] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[3] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[3] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[3] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[3] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[3] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[3] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[3]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[3]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[3]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4 text-gray-50 text-xs font-bold hover:underline">{dates[4]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[4] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[4] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[4] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[4] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[4] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[4] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[4] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[4] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[4] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[4] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[4] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[4]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[4]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[4]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4 text-gray-50 text-xs font-bold hover:underline">{dates[5]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[5] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[5] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[5] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[5] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[5] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[5] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[5] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[5] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[5] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[5] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[5] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[5]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[5]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[5]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4 text-gray-50 text-xs font-bold hover:underline">{dates[6]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[6] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[6] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[6] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[6] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[6] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[6] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[6] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[6] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[6] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[6] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[6] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[6]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[6]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[6]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4 text-gray-50 text-xs font-bold hover:underline">{dates[7]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[7] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[7] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[7] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[7] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[7] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[7] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[7] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[7] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[7] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[7] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[7] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[7]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[7]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[7]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="text-gray-50 text-xs font-bold hover:underline">{dates[8]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[8] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[8] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[8] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[8] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[8] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[8] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[8] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[8] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[8] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[8] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[8] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[8]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[8]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[8]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4  text-gray-50 text-xs font-bold hover:underline">{dates[9]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[9] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[9] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[9] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[9] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[9] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[9] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[9] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[9] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[9] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[9] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[9] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[9]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[9]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[9]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4 text-gray-50 text-xs font-bold hover:underline">{dates[10]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[10] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[10] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[10] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[10] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[10] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[10] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[10] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[10] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[10] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[10] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[10] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[10]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[10]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[10]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4 text-gray-50 text-xs font-bold hover:underline">{dates[11]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[11] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[11] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[11] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[11] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[11] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[11] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[0] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[11] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[11] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[11] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[11] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[11]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[11]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[11]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4 text-gray-50 text-xs font-bold hover:underline">{dates[12]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[12] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[12] === "rain and snow" && <Image src={snow} alt='snow-icon'/> || description[12] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[12] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[12] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[12] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[12] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[12] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[12] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[12] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[12] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[12] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[12]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[12]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[12]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4 text-gray-50 text-xs font-bold hover:underline">{dates[13]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[13] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[13] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[13] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[13] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[13] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[13] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[13] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[13] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[13] === "light snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[13] === "rain and snow" &&
                                        <Image  src={snow} alt="snow-icon"/> || description[13] === "snow" &&
                                        <Image  src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[13]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[13]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[13]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4 text-gray-50 text-xs font-bold hover:underline">{dates[14]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[14] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[14] === "rain and snow" && <Image src={snow} alt='snow-icon'/> || description[14] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[14] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[14] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[14] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[14] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[14] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[14] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[14] === "light snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/> || description[14] === "rain and snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/> || description[14] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[14]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[14]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[14]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow">
                            <div className="flex place-items-center justify-start">
                                <div className='w-[95px]'>
                                    <a className="pr-4 text-gray-50 text-xs font-bold hover:underline">{dates[15]}</a>
                                </div>
                                <div className="max-w-[24px]">
                                    {description[15] === "sky is clear" &&
                                        <Image src={sun} alt='sun-icon'/> || description[15] === "light rain" &&
                                        <Image src={lightrain}
                                               alt='rain-cloud-sun-icon'/> || description[15] === "moderate rain" &&
                                        <Image src={moderaterain}
                                               alt='rain-cloud-icon'/> || description[15] === "heavy intensity rain" &&
                                        <Image src={heavyrain}
                                               alt='rain-cloud-icon'/> || description[15] === "overcast clouds" &&
                                        <Image src={cloud} alt="cloud-sun"/> || description[15] === "broken clouds" &&
                                        <Image src={midcloud}
                                               alt="cloud-sun"/> || description[15] === "scattered clouds" &&
                                        <Image src={fewcloud} alt="sun"/> || description[15] === "few clouds" &&
                                        <Image src={fewcloud} alt="sun-cloud-icon"/> || description[15] === "light snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/> || description[15] === "rain and snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/> || description[15] === "Snow" &&
                                        <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                                </div>
                                <div className='pl-2 md:pl-12 md:whitespace-nowrap'>
                                    <span
                                        className="p-0.5 text-xs font-normal uppercase tracking-wider text-gray-800 bg-gray-200 rounded-lg bg-opacity-50">{aciklama[15]}
                                    </span>
                                </div>
                            </div>

                            <div>
                                <div className='grid grid-cols-2 space-x-2 gap-2'>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">Gün:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>{tempday[15]}<span
                                            className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="uppercase text-xs font-medium text-gray-400">
                                            gece:
                                        </div>
                                        <div className='font-medium text-md text-gray-200'>
                                            {tempnight[15]}<span className='text-xs align-text-top'>°C</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Home>
            );
        }


export default Weather