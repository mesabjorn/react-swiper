import React from 'react';
import './App.css';
import Swiper from './Swiper';

const items = [
  {
    imageSrc: '/images/pic1.jpeg',
    imageAlt: "A person's eye"
  },
  {
    imageSrc: '/images/pic2.jpeg',
    imageAlt: 'A rock formation'
  },
  {
    imageSrc: '/images/pic3.jpeg',
    imageAlt: 'Some flowers'
  },
  {
    imageSrc: '/images/pic4.jpeg',
    imageAlt: 'An egyptian wall painting'
  },
  {
    imageSrc: '/images/pic5.jpeg',
    imageAlt: 'A butterfly on a leaf'
  },
];

type Props  = {
  imageSrc:string,
  imageAlt:string
}

const MySwiperItem = ({imageSrc,imageAlt}:Props)=>{
  return(
    <>
    <div style={{fontSize: '25pt',textAlign:'center'}}>{imageAlt}</div>
    {[0,1,2,3,4,5].map((item,i)=>(
      <img
      key={i}
      src={imageSrc}
      alt={imageAlt}
      className="swiper-img"
      draggable={false}
    />
  ))}
  </>)
}

function App() {
  return (
    <div className="container">
      <Swiper items={items} ChildComponent={MySwiperItem} />
    </div>
  );
}

export default App;
