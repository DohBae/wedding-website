import React from 'react';
import lisaAndJohnny from '../images/lisaAndJohnny.webp';

const Home = () => (
  <div className='container'>
    <div className='container__content'>
    <img className='container__content__img'src={lisaAndJohnny} />
    <p className='container__content__p'>We can't wait to share our day with you! Please check back for updates as we near the wedding date.</p>
    </div>
  </div>
)

export default Home;