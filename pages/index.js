import { useRouter } from 'next/router';
import { useEffect } from 'react';
import React from "react";
import Home from "@/pages/home";




 const Index = () =>{
     const router = useRouter();
     const {pathname} = router;
     if (pathname === '/' || pathname === 'home') {
         return <Home/>;
     }}

export default Index;