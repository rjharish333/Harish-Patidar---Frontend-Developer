import React from 'react'
import HeroBanner from '../layouts/HeroBanner';
import HomeContainer from './HomeContainer';
import { useSelector } from 'react-redux';
import Login from './../login/Login';
import { getIsLoggedIn } from '../redux/slices/authSlice';
import Footer from '../layouts/Footer';

// Home Component ( Loggedin & non loggedin user)
const Home = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  console.log("isLoggedIn",isLoggedIn)
  return (
    isLoggedIn
    ?
    <>
    <HeroBanner />
    <HomeContainer />
    <Footer />
    </>
    :
    <Login />
  )
}

export default Home