import React from 'react';
import { Layout } from 'antd';
import lisaAndJohnny from '../images/lisaAndJohnny.webp';
const { Content } = Layout;

const Home = () => (
  <Content>
  <div className='home-container'>
    <div className='home-container__content'>
    <img className='home-container__content__img'src={lisaAndJohnny} />
    <p className='home-container__content__p'>We can't wait to share our day with you! Please check back for updates as we near the wedding date.</p>
    </div>
  </div>
  </Content>
  
)

export default Home;