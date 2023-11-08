import '@/styles/globals.css'
import App  from 'next/app';
import {DefaultSeo} from 'next-seo'
import React from 'react'


// export default function MyApp({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

export default class MyApp extends App {
        render() {
        const { Component, pageProps } = this.props;
        return (
            <React.Fragment>
              <DefaultSeo
                title="Hava durumu 15 günlük"
                defaultDescription="istanbul, bursa, ankara ve izmir için 15 günlük hava durumu tahminleri"
                titleTemplate="%s | Hava Durumu 15"
                defaultTitle="Hava Durumu 15"
                description="istanbul, bursa, ankara ve izmir için 15 günlük hava durumu tahminleri"
                canonical='https://www.havadurumu15.com/'
                additionalMetaTags={[
                  {
                    name: 'button',
                    content: 'hava durumu tahminlerini göster'
                  }
                ]}
                openGraph={{
                  title: 'Hava durumu 15 - Hava durumu tahminleri',
                  description: 'Havadurumu15 ile konumunuz için doğru hava durumu tahminlerini alın',
                  type: 'website',
                  locale: 'tr_TR',
                  url: 'https://www.havadurumu15.com/',
                  siteName: 'Havadurumu15 ',
                }}
                additionalLinkTags={[
                  {
                    rel: 'icon',
                    href: '../public/favicon.ico'
                  },
                  {
                    rel: 'icon-şimşek-gök-gürültülü-sağanak-yağmur',
                    href: '../icons/thunder_cloud_and_rain.png'
                  },
                  {
                    rel: 'güneş-icon',
                    href: '../icons/sunny.png'
                  }
                  {
                    rel: 'kar-tanesi-icon',
                    href: '../icons/snowflake.png'
                  },
                  {
                    rel: 'yağmur-bulut-icon',
                    href: '../icons/rain_cloud.png',
                  },
                  {
                    rel: 'yağmur-ve-güneş-icon',
                    href: '../icons/partly_sunny_rain.png',
                  },
                  {
                    rel: 'güneş-bulut-icon',
                    href: '../icons/partly_rain.png',
                  },
                  {
                    rel: 'güneş-icon',
                    href: '../icons/mostly_sunny.png',
                  },
                  {
                    rel: 'bulut-icon',
                    href: '../icons/cloud.png'
                  }
                ]}
              />
              <Component {...pageProps} />
          </React.Fragment>
        );
    }
  }