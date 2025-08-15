import React from 'react'
import MainBanner from '../components/MainBanner'
import Categories from '../components/Categories'
import BestSeller from '../components/BestSeller'
import BottomBanner from '../components/BottomBanner'
import NewsLetter from '../components/NewsLetter'
import Details from '../components/VoiceOfTrust'

const Home = () => {
  return (
    <div className='mt-10'>
      <MainBanner />
      <Categories />
      <div id="best-sellers">
        <BestSeller />
      </div>
      <Details />
      <BottomBanner />
      <NewsLetter />
    </div>
  )
}

export default Home
