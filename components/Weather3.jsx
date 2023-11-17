import React, {useEffect, useState} from "react";
import {Card, CardHeader, CardBody, CardFooter, Button, divider} from "@nextui-org/react";
import Home from '../pages/home';
import axios from "axios";
import cloud from "../icons/cloud.png";
import fewcloud from "../icons/mostly_sunny.png"
import midcloud from "../icons/partly_sunny.png"
import sun from "../icons/sunny.png";
import snow from "../icons/snowflake.png"
import lightrain from "../icons/partly_sunny_rain.png"
import moderaterain from "../icons/rain_cloud.png"
import heavyrain from "../icons/thunder_cloud_and_rain.png"
import Image from "next/image";
import Link from 'next/link'

export default function App() {
    const [weatherData1, setWeatherData1] = useState(null);
    const [weatherData2, setWeatherData2] = useState(null);
    const [weatherData3, setWeatherData3] = useState(null);
    const [weatherData4, setWeatherData4] = useState(null);
    const [weatherData5, setWeatherData5] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const [response1Data, response2Data, response3Data, response4Data, response5Data] = await
                    Promise.all([
                axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=41.0091982&lon=28.9662187&units=metric&cnt=16&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`),
                axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=39.9334&lon=32.8597&units=metric&cnt=16&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`),
                axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=38.4192&lon=27.1287&units=metric&cnt=16&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`),
                axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=40.1826&lon=29.0669&units=metric&cnt=16&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`),
                axios.get(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=36.8969&lon=30.7133&units=metric&cnt=16&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`),
                ]);
                setWeatherData1(response1Data.data);
                setWeatherData2(response2Data.data);
                setWeatherData3(response3Data.data);
                setWeatherData4(response4Data.data);
                setWeatherData5(response5Data.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchWeatherData();
    }, []);

    const dt = weatherData1?.list[0]?.dt;
    const options = {month: 'short', weekday: 'short', day: 'numeric'};
    const date = dt ? new Date(dt * 1000).toLocaleDateString('tr-TR', options): '';


    return (
        <div className="space-y-6">
        <Card isFooterBlurred
              className="bg-gray-600 rounded-xl mx-auto w-[80%] h-[200px] col-span-12 sm:col-span-5">
            <CardHeader className=" flex absolute z-10 p-6 items-start">
                <div>
                    <div>
                        <h4 className="text-white font-medium text-3xl">Istanbul</h4>
                        <p className="text-xs text-white/60 uppercase font-bold">{date && date}</p>
                    </div>
                    <div className="flex space-x-8 pt-6">
                        <div>
                            <p className="text-xs text-white/60 uppercase font-medium">GÜN:</p>
                            <p className="text-xl text-white/60 uppercase font-bold">{weatherData1 && Math.trunc(weatherData1.list[0].temp.max)}<span
                                className='text-xs align-text-top'>°C</span></p>
                        </div>
                        <div>
                            <p className="text-xs text-white/60 uppercase font-medium">GECE:</p>
                            <p className="text-xl text-white/60 uppercase font-bold">{weatherData1 && Math.trunc(weatherData1.list[0].temp.min)}<span
                                className='text-xs align-text-top'>°C</span></p>
                        </div>
                    </div>
                </div>
                    {weatherData1 &&
                    <div className="mx-auto my-auto max-w-[62px]">
                        {weatherData1.list[0].weather[0].description === "sky is clear" &&
                            <Image src={sun} alt='sun-icon'/>
                            || weatherData1.list[0].weather[0].description === "rain and snow" && <Image src={snow} alt='snow-icon'/> || weatherData1.list[0].weather[0].description  === "light rain" &&
                            <Image src={lightrain}
                                   alt='rain-cloud-sun-icon'/>
                                   || weatherData1.list[0].weather[0].description === "moderate rain" &&
                            <Image src={moderaterain}
                                   alt='rain-cloud-icon'/> || weatherData1.list[0].weather[0].description === "heavy intensity rain" &&
                            <Image src={heavyrain}
                                   alt='rain-cloud-icon'/> || weatherData1.list[0].weather[0].description === "overcast clouds" &&
                            <Image src={cloud} alt="cloud-sun"/> || weatherData1.list[0].weather[0].description === "broken clouds" &&
                            <Image src={midcloud}
                                   alt="cloud-sun"/> || weatherData1.list[0].weather[0].description === "scattered clouds" &&
                            <Image src={fewcloud} alt="sun"/> || weatherData1.list[0].weather[0].description === "few clouds" &&
                            <Image src={fewcloud} alt="sun-cloud-icon"/> || weatherData1.list[0].weather[0].description === "light snow" &&
                            <Image  src={snow} alt="snow-icon"/> || weatherData1.list[0].weather[0].description === "rain and snow" &&
                            <Image  src={snow} alt="snow-icon"/> || weatherData1.list[0].weather[0].description === "Snow" &&
                            <Image className="w-3/4" src={snow} alt="snow-icon"/>
                            }
                    </div>}
            </CardHeader>
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-0 border-zinc-100/50 z-10 justify-between">
                <div>
                    <p className="text-white/80 text-sm pl-6">Yağmur ihtimali %80</p>
                </div>
                <Link href="/hava/istanbul">
                    <Button className="text-sm text-white/80 bg-black/40 rounded p-1 m-2 mr-6" >
                        15 Günlük
                    </Button>
                </Link>
            </CardFooter>
        </Card>
            <Card isFooterBlurred className="bg-gray-600 rounded-xl mx-auto w-[80%] h-[200px] col-span-12 sm:col-span-5">
                <CardHeader className=" flex absolute z-10 p-6 items-start">
                    <div>
                        <div>
                            <h4 className="text-white font-medium text-3xl">Ankara</h4>
                            <p className="text-xs text-white/60 uppercase font-bold">{date && date}</p>
                        </div>
                        <div className="flex space-x-8 pt-6">
                            <div>
                                <p className="text-xs text-white/60 uppercase font-medium">GÜN:</p>
                                <p className="text-xl text-white/60 uppercase font-bold">{weatherData2 && Math.trunc(weatherData2.list[0].temp.max)}<span
                                    className='text-xs align-text-top'>°C</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-white/60 uppercase font-medium">GECE:</p>
                                <p className="text-xl text-white/60 uppercase font-bold">{weatherData2 && Math.trunc(weatherData2.list[0].temp.min)}<span
                                    className='text-xs align-text-top'>°C</span></p>
                            </div>
                        </div>
                    </div>
                    {weatherData2 &&
                    <div className="mx-auto my-auto max-w-[62px]">
                        { weatherData2.list[1].weather[0].description === "sky is clear" &&
                            <Image src={sun} alt='sun-icon'/> || weatherData2.list[1].weather[0].description === "rain and snow" && <Image src={snow} alt='snow-icon'/> || weatherData2.list[1].weather[0].description  === "light rain" &&
                            <Image src={lightrain}
                                   alt='rain-cloud-sun-icon'/> || weatherData2.list[1].weather[0].description === "moderate rain" &&
                            <Image src={moderaterain}
                                   alt='rain-cloud-icon'/> || weatherData2.list[1].weather[0].description === "heavy intensity rain" &&
                            <Image src={heavyrain}
                                   alt='rain-cloud-icon'/> || weatherData2.list[1].weather[0].description === "overcast clouds" &&
                            <Image src={cloud} alt="cloud-sun"/> || weatherData2.list[1].weather[0].description === "broken clouds" &&
                            <Image src={midcloud}
                                   alt="cloud-sun"/> || weatherData2.list[1].weather[0].description === "scattered clouds" &&
                            <Image src={fewcloud} alt="sun"/> || weatherData2.list[1].weather[0].description === "few clouds" &&
                            <Image src={fewcloud} alt="sun-cloud-icon"/> || weatherData2.list[1].weather[0].description === "light snow" &&
                            <Image  src={snow} alt="snow-icon"/> || weatherData2.list[1].weather[0].description === "rain and snow" &&
                            <Image  src={snow} alt="snow-icon"/> || weatherData2.list[1].weather[0].description === "Snow" &&
                            <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                    </div>}
                </CardHeader>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-0 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-white/80 text-sm pl-6">Yağmur ihtimali %80</p>
                    </div>
                    <Link href="/hava/ankara">
                    <Button className="text-sm text-white/80 bg-black/40 rounded p-1 m-2 mr-6" >
                        15 Günlük
                    </Button>
                    </Link>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="bg-gray-600 rounded-xl mx-auto w-[80%] h-[200px] col-span-12 sm:col-span-5">
                <CardHeader className=" flex absolute z-10 p-6 items-start">
                    <div>
                        <div>
                            <h4 className="text-white font-medium text-3xl">Izmir</h4>
                            <p className="text-xs text-white/60 uppercase font-bold">{date && date}</p>
                        </div>
                        <div className="flex space-x-8 pt-6">
                            <div>
                                <p className="text-xs text-white/60 uppercase font-medium">GÜN:</p>
                                <p className="text-xl text-white/60 uppercase font-bold">{weatherData3 && Math.trunc(weatherData3.list[0].temp.max)}<span
                                    className='text-xs align-text-top'>°C</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-white/60 uppercase font-medium">GECE:</p>
                                <p className="text-xl text-white/60 uppercase font-bold">{weatherData3 && Math.trunc(weatherData3.list[0].temp.min)}<span
                                    className='text-xs align-text-top'>°C</span></p>
                            </div>
                        </div>
                    </div>
                    {weatherData3 &&
                        <div className="mx-auto my-auto max-w-[62px]">
                            { weatherData3.list[1].weather[0].description === "sky is clear" &&
                                <Image src={sun} alt='sun-icon'/> || weatherData3.list[1].weather[0].description === "rain and snow" && <Image src={snow} alt='snow-icon'/> || weatherData3.list[1].weather[0].description  === "light rain" &&
                                <Image src={lightrain}
                                       alt='rain-cloud-sun-icon'/> || weatherData3.list[1].weather[0].description === "moderate rain" &&
                                <Image src={moderaterain}
                                       alt='rain-cloud-icon'/> || weatherData3.list[1].weather[0].description === "heavy intensity rain" &&
                                <Image src={heavyrain}
                                       alt='rain-cloud-icon'/> || weatherData3.list[1].weather[0].description === "overcast clouds" &&
                                <Image src={cloud} alt="cloud-sun"/> || weatherData3.list[1].weather[0].description === "broken clouds" &&
                                <Image src={midcloud}
                                       alt="cloud-sun"/> || weatherData3.list[1].weather[0].description === "scattered clouds" &&
                                <Image src={fewcloud} alt="sun"/> || weatherData3.list[1].weather[0].description === "few clouds" &&
                                <Image src={fewcloud} alt="sun-cloud-icon"/> || weatherData3.list[1].weather[0].description === "light snow" &&
                                <Image  src={snow} alt="snow-icon"/> || weatherData3.list[1].weather[0].description === "rain and snow" &&
                                <Image  src={snow} alt="snow-icon"/> || weatherData3.list[1].weather[0].description === "Snow" &&
                                <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                        </div>}
                </CardHeader>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-0 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-white/80 text-sm pl-6">Yağmur ihtimali %80</p>
                    </div>
                    <Link href="/hava/izmir">
                        <Button className="text-sm text-white/80 bg-black/40 rounded p-1 m-2 mr-6" >
                            15 Günlük
                        </Button>
                    </Link>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="bg-gray-600 rounded-xl mx-auto w-[80%] h-[200px] col-span-12 sm:col-span-5">
                <CardHeader className=" flex absolute z-10 p-6 items-start">
                    <div>
                        <div>
                            <h4 className="text-white font-medium text-3xl">Bursa</h4>
                            <p className="text-xs text-white/60 uppercase font-bold">{date && date}</p>
                        </div>
                        <div className="flex space-x-8 pt-6">
                            <div>
                                <p className="text-xs text-white/60 uppercase font-medium">GÜN:</p>
                                <p className="text-xl text-white/60 uppercase font-bold">{weatherData4 && Math.trunc(weatherData4.list[0].temp.max)}<span
                                    className='text-xs align-text-top'>°C</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-white/60 uppercase font-medium">GECE:</p>
                                <p className="text-xl text-white/60 uppercase font-bold">{weatherData4 && Math.trunc(weatherData4.list[0].temp.min)}<span
                                    className='text-xs align-text-top'>°C</span></p>
                            </div>
                        </div>
                    </div>
                    {weatherData4 &&
                        <div className="mx-auto my-auto max-w-[62px]">
                            {weatherData4.list[1].weather[0].description === "sky is clear" &&
                                <Image src={sun} alt='sun-icon'/> || weatherData4.list[1].weather[0].description === "rain and snow" && <Image src={snow} alt='snow-icon'/> || weatherData4.list[1].weather[0].description  === "light rain" &&
                                <Image src={lightrain}
                                       alt='rain-cloud-sun-icon'/> || weatherData4.list[1].weather[0].description === "moderate rain" &&
                                <Image src={moderaterain}
                                       alt='rain-cloud-icon'/> || weatherData4.list[1].weather[0].description === "heavy intensity rain" &&
                                <Image src={heavyrain}
                                       alt='rain-cloud-icon'/> || weatherData4.list[1].weather[0].description === "overcast clouds" &&
                                <Image src={cloud} alt="cloud-sun"/> || weatherData4.list[1].weather[0].description === "broken clouds" &&
                                <Image src={midcloud}
                                       alt="cloud-sun"/> || weatherData4.list[1].weather[0].description === "scattered clouds" &&
                                <Image src={fewcloud} alt="sun"/> || weatherData4.list[1].weather[0].description === "few clouds" &&
                                <Image src={fewcloud} alt="sun-cloud-icon"/> || weatherData4.list[1].weather[0].description === "light snow" &&
                                <Image  src={snow} alt="snow-icon"/> || weatherData4.list[1].weather[0].description === "rain and snow" &&
                                <Image  src={snow} alt="snow-icon"/> || weatherData4.list[1].weather[0].description === "Snow" &&
                                <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                        </div>}
                </CardHeader>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-0 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-white/80 text-sm pl-6">Yağmur ihtimali %80</p>
                    </div>
                    <Link href="/hava/bursa">
                    <Button className="text-sm text-white/80 bg-black/40 rounded p-1 m-2 mr-6" >
                        15 Günlük
                    </Button>
                    </Link>
                </CardFooter>
            </Card>
            <Card isFooterBlurred className="bg-gray-600 rounded-xl mx-auto w-[80%] h-[200px] col-span-12 sm:col-span-5">
                <CardHeader className=" flex absolute z-10 p-6 items-start">
                    <div>
                        <div>
                            <h4 className="text-white font-medium text-3xl">Antalya</h4>
                            <p className="text-xs text-white/60 uppercase font-bold">{date && date}</p>
                        </div>
                        <div className="flex space-x-8 pt-6">
                            <div>
                                <p className="text-xs text-white/60 uppercase font-medium">GÜN:</p>
                                <p className="text-xl text-white/60 uppercase font-bold">{weatherData5 && Math.trunc(weatherData5.list[0].temp.max)}<span
                                    className='text-xs align-text-top'>°C</span></p>
                            </div>
                            <div>
                                <p className="text-xs text-white/60 uppercase font-medium">GECE:</p>
                                <p className="text-xl text-white/60 uppercase font-bold">{weatherData5 && Math.trunc(weatherData5.list[0].temp.min)}<span
                                    className='text-xs align-text-top'>°C</span></p>
                            </div>
                        </div>
                    </div>
                    {weatherData5 &&
                        <div className="mx-auto my-auto max-w-[62px]">
                            { weatherData5.list[1].weather[0].description === "sky is clear" &&
                                <Image src={sun} alt='sun-icon'/> || weatherData5.list[1].weather[0].description === "rain and snow" && <Image src={snow} alt='snow-icon'/> || weatherData5.list[1].weather[0].description  === "light rain" &&
                                <Image src={lightrain}
                                       alt='rain-cloud-sun-icon'/> || weatherData5.list[1].weather[0].description === "moderate rain" &&
                                <Image src={moderaterain}
                                       alt='rain-cloud-icon'/> || weatherData5.list[1].weather[0].description === "heavy intensity rain" &&
                                <Image src={heavyrain}
                                       alt='rain-cloud-icon'/> || weatherData5.list[1].weather[0].description === "overcast clouds" &&
                                <Image src={cloud} alt="cloud-sun"/> || weatherData5.list[1].weather[0].description === "broken clouds" &&
                                <Image src={midcloud}
                                       alt="cloud-sun"/> || weatherData5.list[1].weather[0].description === "scattered clouds" &&
                                <Image src={fewcloud} alt="sun"/> || weatherData5.list[1].weather[0].description === "few clouds" &&
                                <Image src={fewcloud} alt="sun-cloud-icon"/> || weatherData5.list[1].weather[0].description === "light snow" &&
                                <Image  src={snow} alt="snow-icon"/> || weatherData5.list[1].weather[0].description === "rain and snow" &&
                                <Image  src={snow} alt="snow-icon"/> || weatherData5.list[1].weather[0].description === "Snow" &&
                                <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                        </div>}
                </CardHeader>
                <CardFooter className="absolute bg-white/30 bottom-0 border-t-0 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-white/80 text-sm pl-6">Yağmur ihtimali %80</p>
                    </div>
                    <Link href="/hava/antalya">
                    <Button className="text-sm text-white/80 bg-black/40 rounded p-1 m-2 mr-6" >
                        15 Günlük
                    </Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>

    );
}
