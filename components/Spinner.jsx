import React from 'react'
import Spinner from '../public/spinner.gif'
import Image from "next/image";
const Spinner = () => {
    const Spinner = () => {
        return (
            <>
            <Image className={'w-[200px] m-auto '} src={spinner} alt={'loading..'}/>
            </>
        )
    }
}

export default Spinner