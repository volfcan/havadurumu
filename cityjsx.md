const Weather = ({data}) => {
    const router = useRouter();
    const {city} = router.query;
    const [weather,setWeather] = useState();
    const fetchWeather = async () => {
    const axiosRequest = require('axios');
    try {
      const url = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      // console.log(url)
      const response = await axiosRequest.get(url);
      const url2 = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${response.data[0].lat}&lon=${response.data[0].lon}&units=metric&cnt=16&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;
      const response2 = await axiosRequest.get(url2);
      setWeather(response2.data)
      await router.push(`/hava/${city}`);
      console.log(data)

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
    let aciklama = [];

    try {
        if (data && data.data && data.data.list){
            let city = data.data.city.name;
            // console.log(city)
            for (let i = 0; i < 16; i++) {
                const dt = data.data.list[i].dt;
                const options = {month: 'short', weekday: 'short', day: 'numeric'};
                const date = new Date(dt * 1000).toLocaleDateString('tr-TR', options);
                dates.push(date);
            }



                for (let i = 0; i < 16; i++) {
                    const temp = Math.trunc(data.data.list[i].temp.max);
                    tempday.push(temp);
                }


                for (let i = 0; i < 16; i++) {
                    const temp = Math.trunc(data.data.list[i].temp.min);
                    tempnight.push(temp);
                }

                for (let i = 0; i < 16; i++) {
                    const condition = data.data.list[i].weather[0].main;
                    conditions.push(condition);
                }





            for (let i = 0; i < 16; i++) {
                const desc = data.data.list[i].weather[0].description;
                description.push(desc)
            }

            const aciklama = description.map((desc) => {
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
                    default:
                        return desc;
                }
            });
    }
    } catch (error) {
        console.error(error)
    }

    return (

        <div className="flex bg-gray-700 items-center justify-between p-2 rounded-lg shadow-custom">
                        <div className="flex">
                            <div className='w-[95px]'>
                                <a className="text-gray-50 text-xs font-bold hover:underline">{dates[0]}</a>
                            </div>
                            <div className="max-w-[24px]">
                                {description[0] === "sky is clear" &&
                                    <Image src={sun} alt='sun-icon'/> || description[0] === "light rain" &&
                                    <Image src={lightrain}
                                           alt='rain-cloud-sun-icon'/> || description[0] === "moderate rain" &&
                                    <Image src={moderaterain}
                                           alt='rain-cloud-icon'/> || description[0] === "heavy intensity rain" &&
                                    <Image src={heavyrain}
                                           alt='rain-cloud-icon'/> || description[0] === "overcast clouds" &&
                                    <Image src={cloud} alt="cloud-sun"/> || description[0] === "broken clouds" &&
                                    <Image src={midcloud} alt="cloud-sun"/> || description[0] === "scattered clouds" &&
                                    <Image src={fewcloud} alt="sun"/> || description[0] === "few clouds" &&
                                    <Image src={fewcloud} alt="sun-cloud-icon"/> || description[0] === "Snow" &&
                                    <Image className="w-3/4" src={snow} alt="snow-icon"/>}
                            </div>
                            <div className='pl-2'>
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
                                        className='text-xs align-top'>°C</span>
                                    </div>
                                </div>
                                <div>
                                    <div className="uppercase text-xs font-medium text-gray-400">
                                        gece:
                                    </div>
                                    <div className='font-medium text-md text-gray-200'>
                                        {tempnight[0]}<span className='text-xs align-top'>°C</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
)}


export default Weather