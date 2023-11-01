
// import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import Head from 'next/head'
import {useState, useEffect} from "react";
import {BsSearch} from "react-icons/bs";
import Weather from '../components/Weather';
import Spinner from "../public/spinner.gif";
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { useMediaQuery } from "react-responsive";
import React from 'react'


// import {data} from "autoprefixer";
// require('dotenv').config();
// import { Inter as FontSans} from "next/font/google"
// import {SelectGroup} from "@radix-ui/react-select";


// const inter = Inter({ subsets: ['latin'] })


export default function Home() {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);



  const fetchWeather = async (e) => {
          e.preventDefault()
      // setLoading(true)
          const axiosRequest = require('axios');
          try {
              const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
              const response = await axiosRequest.get(url);
              const url2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&cnt=16&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
              const response2 = await axiosRequest.get(url2);
              // setWeather(response2.data[0])
              setWeather(response2)

              for (let i = 0; i <= 16; i++) {
                console.log(response2.data.list[i])
                console.log(response2.data.city.name)
              }

          } catch (error) {
              console.error(error)
          }

        }


  if (loading){
      return <Spinner/>
  } else {

  return (
      <div>
        <Head>
          <title>Weather Next App</title>
          <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
          <link rel={'icon'} href={"/favicon.ico"}/>
        </Head>
          <nav className="bg-gray-800">
              <div className="flex lg:px-4 sm:px-6">
                  <div className="relative flex h-16 items-center ">
                        <div className="">
                              <img className="flex justify-between h-8 w-auto"
                                   src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                   alt="Your Company"/>
                          </div>

                      <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                      </div>
                      <div className="items-center justify-center sm:items-stretch sm:justify-end">
                          <div className="sm:ml-6 sm:block justify-center">
                              <div className="flex-auto space-x-4 justify-between">
                                  <a href="#"
                                     className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium "
                                     aria-current="page">15 Günlük</a>
                                  {/*<a href="#"*/}
                                  {/*   className="whitespace-nowrap text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">10 Günlük</a>*/}
                                  <a href="#"
                                     className="whitespace-nowrap text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">Bugün</a>
                                <button type="button"
                                  className="lg:hidden md:hidden relative inline-flex items-center justify-start rounded-md pr-8 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                  aria-controls="mobile-menu" aria-expanded="false">
                              <span className="absolute -inset-0.5"></span>
                              <span className="sr-only">Open main menu</span>
                              <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                   stroke="currentColor" aria-hidden="true">
                                  <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>
                              </svg>
                              <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                   stroke="currentColor" aria-hidden="true">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                              </svg>
                          </button>
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
               <div className={'relative flex justify-between items-center max-w-[500px] w-full m-auto p-4 pb-4 text-white z-10'}>
                          <form onSubmit={fetchWeather} className={'flex justify-between w-full items-center m-auto p-1 bg-transparent border-2 border-gray-400 text-white rounded-2xl'}>
                              <div>
                                  <input
                                      onChange={(e) => setCity(e.target.value)}
                                         className={'bg-transparent border-none text-gray-600 focus:outline-none text-sm'}
                                         type="text"
                                         placeholder="Şehir ara"/>
                              </div>
                              <button onClick={fetchWeather}>
                                  <BsSearch size={20}/>
                              </button>
                          </form>
                      </div>
              {/*<div className="sm:hidden" id="mobile-menu">*/}
              {/*    <div className="space-y-1 px-2 pb-3 pt-2">*/}
              {/*        <a href="#" className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"*/}
              {/*           aria-current="page">Dashboard</a>*/}
              {/*        <a href="#"*/}
              {/*           className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Team</a>*/}
              {/*        <a href="#"*/}
              {/*           className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Projects</a>*/}
              {/*        <a href="#"*/}
              {/*           className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium">Calendar</a>*/}
              {/*    </div>*/}
              {/*</div>*/}
          </nav>
          {/*Weather*/}
          <div className='lg:mx-auto md:mx-auto  overflow-x-auto justify-around container'>
            {weather.data && <Weather  data={weather} /> }
          </div>
          <div>
            <div className=''>
              <iframe width="650" height="450"
                      src="https://embed.windy.com/embed2.html?lat=39.675&lon=33.658&detailLat=40.290&detailLon=29.070&width=650&height=450&zoom=6&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=12&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
                      frameBorder="0"></iframe>
            </div>
          </div>
      </div>
  );
  }
}
