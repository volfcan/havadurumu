import React from "react";
import Image from "next/image";
import rain from "../icons/partly_sunny_rain.png";
import cloud from "../icons/cloud.png";
import fewcloud from "../icons/mostly_sunny.png"
import midcloud from "../icons/partly_sunny.png"
import sun from "../icons/sunny.png";
import snow from "../icons/snowflake.png"
import lightrain from "../icons/partly_sunny_rain.png"
import moderaterain from "../icons/rain_cloud.png"
import heavyrain from "../icons/thunder_cloud_and_rain.png"
// Rain, Clouds, Snow

const Weather = ({data}) => {
// console.log(data)
    const dates = [];
    for (let i = 0; i < 16; i++) {
        const dt = data.data.list[i].dt;
        const options = {month: 'short', weekday: 'short', day:'numeric'};
        const date = new Date(dt * 1000).toLocaleDateString('tr-TR', options);
        dates.push(date);
    }

    const tempday = [];
    for (let i = 0; i < 16; i++) {
        const temp = Math.trunc(data.data.list[i].temp.max);
        tempday.push(temp);
        
    }

    const tempnight = [];
    for (let i = 0; i <16; i++) {
        const temp = Math.trunc(data.data.list[i].temp.min);
        tempnight.push(temp);
    }

    const conditions = [];
    for (let i = 0; i < 16; i++) {
        const condition = data.data.list[i].weather[0].main;
        conditions.push(condition);
    }

    const description = [];
    for (let i = 0; i < 16; i++) {
        const desc = data.data.list[i].weather[0].description;
        description.push(desc)
    }

    // const dt1 = data.data.list[0].dt;
    // const date1 = new Date(dt1 * 1000).toLocaleDateString();


    return (
        <div>
            <div className={"relative shadow-md sm:rounded-lg"}>
                <table className={"w-full text-sm text-left text-gray-500 dark:text-gray-400"}>
                    <thead className={"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"}>
                    <tr>
                        <th scope="col" className={"px-6 py-3"}>Tarih</th>
                        <th scope="col" className={"px-6 py-3"}>Hava</th>
                        <th scope="col" className={"px-6 py-3"}>En yuksek</th>
                        <th scope="col" className="px-6 py-3">En dusuk</th>
                        <th scope="col" className="px-6 py-3">Aksiyon</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr className={"bg-white border-b dark:bg-gray-900 dark:border-gray-700"}>
                            <th scope={"row"} className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{dates[0]}</th>
                            <td
                                className="w-24 px-6 py-4">
                                {description[0] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[0] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[0] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[0] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[0] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[0] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[0] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[0] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[0] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                            </td>
                            <td className={"px-6 py-4"}><span className="font-medium text-2xl">{tempday[0]}</span><span className="align-top">&deg;C</span></td>
                            <td className={"px-6 py-4"}><span className="font-medium text-2xl">{tempnight[0]}</span><span className="align-top">&deg;C</span></td>
                            <td className={"px-6 py-4"}><a href="#" className={"font-medium text-blue-600 dark:text-blue-500 hover:underline"}>Saatlik</a></td>
                        </tr>
                        <tr className={"border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                            <th scope="row" className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{dates[1]}</th>
                            <td className={"px-6 py-4"}>{description[1] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[1] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[1] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[1] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[1] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[1] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[1] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[1] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[1] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className={"px-6 py-4"}><span className="font-medium text-2xl">{tempday[1]}</span><span className="align-top">&deg;C</span></td>
                            <td className={"px-6 py-4"}><span className="font-medium text-2xl">{tempnight[1]}</span><span className="align-top">&deg;C</span></td>
                            <td className={"px-6 py-4"}><a href="#" className={"font-medium text-blue-600 dark:text-blue-500 hover:underline"}>Saatlik</a></td>
                        </tr>
                        <tr className={"bg-white border-b dark:bg-gray-900 dark:border-gray-700"}>
                            <th scope={"row"} className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{dates[2]}</th>
                            <td className={"py-4 px-6"}>{description[2] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[2] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[2] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[2] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[2] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[2] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[2] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[2] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[2] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className={"py-4 px-6"}><span className="font-medium text-2xl">{tempday[2]}</span><span className="align-top">&deg;C</span></td>
                            <td className={"py-4 px-6"}><span className="font-medium text-2xl">{tempnight[2]}</span><span className="align-top">&deg;C</span></td>
                            <td className={"py-4 px-6"}><a href="#" className={"font-medium text-blue-600 dark:text-blue-500 hover:underline"}>Saatlik</a></td>
                        </tr>
                        <tr className={"border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                            <th scope={"col"} className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{dates[3]}</th>
                            <td className={"px-6 py-4"}>{description[3] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[3] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[3] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[3] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[3] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[3] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[3] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[3] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[3] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className={"px-6 py-4"}><span className="font-medium text-2xl">{tempday[3]}<span/><span className='align-top'>&deg;C</span></span></td>
                            <td className={"px-6 py-4"}><span className="font-medium text-2xl">{tempnight[3]}</span><span className="align-top">&deg;C</span></td>
                            <td className={"px-6 py-4"}><a href="#" className={"font-medium text-blue-600 dark:text-blue-500 hover:underline"}>Saatlik</a></td>
                        </tr>
                        <tr className={"bg-white border-b dark:bg-gray-900 dark:border-gray-700"}>
                            <th scope={"col"} className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{dates[4]}</th>
                            <td className={"px-6 py-4"}>{description[4] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[4] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[4] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[4] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[4] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[4] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[4] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[4] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[4] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className={"px-6 py-4"}><span className="font-medium text-2xl">{tempday[4]}</span><span className="align-top">&deg;C</span></td>
                            <td className={"px-6 py-4"}><span className="font-medium text-2xl">{tempnight[4]}</span><span className="align-top">&deg;C</span></td>
                            <td className={"px-6 py-4"}><a href="#" className={"font-medium text-blue-600 dark:text-blue-500 hover:underline"}>Saatlik</a></td>
                        </tr>
                        <tr className={"border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                            <th scope={"col"} className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{dates[5]}</th>
                            <td className={"px-6 py-4"}>{description[5] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[5] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[5] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[5] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[5] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[5] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[5] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[5] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[5] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                            </td>
                            <td className={"px-6 py-4"}><span className="font-meidum text-2xl">{tempday[5]}</span><span className="align-top">&deg;C</span></td>
                            <td className={"px-6 py-4"}><span className="font-medium text-2xl">{tempnight[5]}</span><span className="align-top">&deg;C</span></td>
                            <td className={"px-6 py-4"}><a href="#" className={"font-medium text-blue-600 dark:text-blue-500 hover:underline"}>Saatlik</a></td>
                        </tr>
                        <tr className={"dark:border-gray-700 bg-white border-b dark:bg-gray-900"}>
                            <th className={"px-6 py-4 dark:text-white"}>{dates[6]}</th>
                            <td className={"px-6 py-4"}>
                                {description[6] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[6] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[6] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[6] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[6] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[6] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[6] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[6] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[6] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                            </td>
                            <td className={"px-6 py-4"}><span className="font-medium text-2xl">{tempday[6]}</span><span className="align-top">&deg;C</span></td>
                            <td className={"px-6 py-4"}><span className="font-medium text-2xl">{tempnight[6]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><a href="#" className={"font-medium text-blue-600 dark:text-blue-500 hover:underline"}>Saatlik</a></td>
                        </tr>
                        <tr className={"border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700"}>
                            <th scope={"col"} className={"px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"}>{dates[7]}</th>
                            <td className={"px-6 py-4"}>{description[7] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[7] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[7] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[7] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[7] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[7] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[7] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[7] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[7] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempday[7]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempnight[7]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><a href="#" className={"font-medium text-blue-600"}>Saatlik</a></td>
                        </tr>
                        <tr className="dark:bg-gray-900 dark:border-gray-700 bg-white border-b dark:bg-gray-900">
                            <th scope="col" className="px-6 py-4 dark:text-white">{dates[8]}</th>
                            <td className={"px-6 py-4"}>{description[8] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[8] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[8] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[8] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[8] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[8] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[8] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[8] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[8] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempday[8]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempnight[8]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><a href="#" className="font-medium text-blue-500 hover:underline">Saatlik</a></td>
                        </tr>
                        <tr className="dark:bg-gray-800 border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <th className="px-6 py-4 font-medium text-gray-900 dark:text-white">{dates[9]}</th>
                            <td className={"px-6 py-4"}>{description[9] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[9] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[9] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[9] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[9] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[9] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[9] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[9] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[9] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempday[9]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempnight[9]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><a href="#" className="font-medium text-blue-500 hover:underline">Saatlik</a></td>
                        </tr>
                        <tr className="dark:bg-gray-900 dark:border-gray-700 bg-white border-b dark:bg-gray-900">
                            <th scope="col" className="px-6 py-4 dark:text-white">{dates[10]}</th>
                            <td className={"px-6 py-4"}>{description[10] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[10] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[10] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[10] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[10] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[10] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[10] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[10] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[10] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempday[10]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempnight[10]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><a href="#" className="font-medium text-blue-500 hover:underline">Saatlik</a></td>
                        </tr>
                        <tr className="dark:bg-gray-800 border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <th className="px-6 py-4 dark:text-white">{dates[11]}</th>
                            <td className={"px-6 py-4"}>{description[11] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[11] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[11] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[11] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[11] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[11] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[11] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[11] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[11] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempday[11]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempnight[11]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><a href="#" className="font-medium text-blue-500 hover:underline">Saatlik</a></td>
                        </tr>
                        <tr className="dark:bg-gray-900 dark:border-gray-700 bg-white border-b dark:bg-gray-900">
                            <th scope="col" className="px-6 py-4 dark:text-white">{dates[12]}</th>
                            <td className={"px-6 py-4"}>{description[12] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[12] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[12] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[12] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[12] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[12] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[12] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[12] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[12] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempday[12]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempnight[12]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><a href="#" className="font-medium text-blue-500 hover:underline">Saatlik</a></td>
                        </tr>
                        <tr className="dark:bg-gray-800 border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <th scope="col" className="px-6 py-4 dark:text-white">{dates[13]}</th>
                            <td className={"px-6 py-4"}>{description[1] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[13] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[13] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[13] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[13] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[13] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[1] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[13] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[13] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempday[13]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempnight[13]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><a href="#" className="font-medium text-blue-500 hover:underline">Saatlik</a></td>
                        </tr>
                        <tr className="dark:bg-gray-900 dark:border-gray-700 bg-white border-b dark:bg-gray-900">
                            <th scope="col" className="px-6 py-4 dark:text-white">{dates[14]}</th>
                            <td className={"px-6 py-4"}>{description[14] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[14] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[14] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[1] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[14] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[14] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[14] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[14] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[14] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempday[14]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempnight[14]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><a href="#" className="font-medium text-blue-500 hover:underline">Saatlik</a></td>
                        </tr>
                        <tr className="dark:bg-gray-800 border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                            <th scope="col" className="px-6 py-4 dark:text-white">{dates[15]}</th>
                            <td className={"px-6 py-4"}>{description[15] === "sky is clear" && <Image src={sun} alt='sun-icon'/> || description[15] === "light rain" && <Image src={lightrain} alt='rain-cloud-sun-icon'/> || description[15] === "moderate rain" && <Image src={moderaterain} alt='rain-cloud-icon'/> || description[15] === "heavy intensity rain" && <Image src={heavyrain} alt='rain-cloud-icon'/> || description[15] === "overcast clouds" && <Image src={cloud} alt="cloud-sun"/> || description[1] === "broken clouds" && <Image src={midcloud} alt="cloud-sun"/> || description[15] === "scattered clouds" && <Image src={fewcloud} alt="sun"/> || description[15] === "few clouds" && <Image src={fewcloud} alt="sun-cloud-icon"/> ||  description[15] === "Snow" && <Image className="w-3/4" src={snow} alt="snow-icon"/>}</td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempday[15]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><span className="font-medium text-2xl">{tempnight[15]}</span><span className="align-top">&deg;C</span></td>
                            <td className="px-6 py-4"><a href="#" className="font-medium text-blue-500 hover:underline">Saatlik</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
        // )
        // <div className={'relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-gray-300 z-10 '}>
        //     {/*-----------------------*/}
        //     {/*Top*/}
        //     {/*-----------------------*/}
        //     <div className={'relative flex justify-between pt-12'}>
        //         <div className={'flex flex-col items-center'}>
        //             <Image
        //                 src={`https://openweathermap.org/img/wn/${data.data.list[0].weather[0].icon}@2x.png`}
        //                 alt='/'
        //                 width={100}
        //                 height={100}
        //                 />
        //             <p className={'text-2xl'}>{data.data.list[0].temp.day}</p>
        //         </div>
        //         {/*<p className={'text-9xl'}>{data.main.temp.toFixed(0)}&#176;</p>*/}
        //     </div>
        //     {/*-----------------------*/}
        //             {/*Bottom*/}
        //     {/*-----------------------*/}
        //     {/*<div className={'bg-black/20 relative p-8 rounded-md'}>*/}
        //     {/*    <p className={'text-2xl text-center pb-6'}>{data.name} hava durumu </p>*/}
        //     {/*    <div className={'flex justify-between text-center'}>*/}
        //     {/*        <div>*/}
        //     {/*            <p className='font-bold text-2xl'>{data.main.feels_like.toFixed(0)}&#176;</p>*/}
        //     {/*            <p>Hissedilen</p>*/}
        //     {/*        </div>*/}
        //     {/*                            <div>*/}
        //     {/*            <p className='font-bold text-2xl'>{data.main.humidity}%</p>*/}
        //     {/*            <p>Nem</p>*/}
        //     {/*        </div>*/}
        //     {/*                            <div>*/}
        //     {/*            <p className='font-bold text-2xl'>{data.wind.speed.toFixed(0)}</p>*/}
        //     {/*             <p>Rüzgar</p>*/}
        //     {/*        </div>*/}
        //     {/*    </div>*/}
        //     {/*</div>*/}
        // </div>
    // )
}

export default Weather