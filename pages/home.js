import Head from 'next/head'
import {useState, useEffect} from "react";
import {BsSearch} from "react-icons/bs";
import Weather from '@/pages/hava/[city]';
import Spinner from "../public/spinner.gif";
import React from 'react'
import { Analytics } from '@vercel/analytics/react';
import { useRouter, Router } from "next/router";
import { NextSeo } from 'next-seo';
import {TbRosette} from "react-icons/tb";
import App from "@/components/Weather3";
import Logo from "@/public/logo4x.png"
import Image from 'next/image'


const Home = ({children, Cardd = true, iFrame = true}) => {

  const [city, setCity] = useState('')
  const [weather, setWeather] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();


    return (
        <div>
          <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
            <link rel='icon' href='/favicon.ico'/>
          </Head>
          <nav className=" bg-gradient-to-b from-gray-800 to-gray-600">
            <div className="flex justify-start py-8">
              <button type="button"
                      className="ml-4 lg:hidden md:hidden relative inline-flex items-center justify-start rounded-md pr-8 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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

              <div className='mx-auto'>
                {/*<a href="#"*/}
                {/*   className="bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium "*/}
                {/*   aria-current="page"*/}
                {/*>15 Günlük</a>*/}
                {/*/!*<a href="#"*!/*/}
                {/*/!*   className="whitespace-nowrap text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium">10 Günlük</a>*!/*/}
                {/*<a href="#"*/}
                {/*   className="whitespace-nowrap text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"*/}
                {/*>Bugün</a>*/}
              </div>
              <Image className="h-8 w-8 mr-4"
                   src={Logo}
                   alt="Your Company"/>
            </div>
            <div className="flex lg:px-4 sm:px-6">
              <div className="relative flex h-16 items-center ">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                </div>
              </div>
            </div>
            <div className='py-12 px-4 mx-auto'>
              <h1 className='font-bold text-4xl text-center text-gray-200'>15 günlük hava durumu tahminlerini ve yağış
                haritalarını keşfet</h1>
            </div>

            <div className={'relative flex justify-between items-center m-auto p-12 text-white z-10'}>
              <form onSubmit={(e)=> {
                e.preventDefault()
                router.push(`/hava/${city}`)
              }}
                    className={'flex justify-between w-[80%] lg:w-[40%] items-center m-auto p-1 bg-transparent border-2 border-gray-400 text-white rounded-2xl'}>
                <div>
                  <input
                      onChange={(e) => setCity(e.target.value)}
                      className={' bg-transparent border-none text-gray-200 focus:outline-none text-sm'}
                      type="text"
                      placeholder="Şehir ara"/>
                </div>
                <button type="submit" >
                  <BsSearch size={20}/>
                </button>
              </form>
            </div>
            {Cardd && (
              <App/>
            )}
            <div>{children}</div>
            {/*City*/}
            <div className='lg:mx-auto md:mx-auto  overflow-x-auto justify-around container'>
              {weather.data && <Weather data={weather}/>}

            </div>
            {iFrame && (
            <div className='flex justify-center max-w-screen w-4/5 mx-auto'>
              <iframe width="650" height="450"
                      src="https://embed.windy.com/embed2.html?lat=39.675&lon=33.658&detailLat=40.290&detailLon=29.070&width=650&height=450&zoom=6&level=surface&overlay=wind&product=ecmwf&menu=&message=&marker=&calendar=12&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
                      title="sıcaklık, nem, rüzgar yönü ve şiddeti, basınç, bulut hareketleri, yağış ihtimali ve benzer verileri gösteren etkileşimli embed harita"
                      frameBorder="0"></iframe>
            </div>
                )}
          </nav>
          <div>
          </div>
          <Analytics/>
        </div>
    );
  }


export default Home;