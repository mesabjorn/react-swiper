import React from 'react';
import './styles/SwiperItem.css';
import { SwiperItemType } from './types';

interface Props {
  ComponentToRender:React.FunctionComponent<any>,
  [other:string]: any;
}

const SwiperItem:React.FunctionComponent<Props>  = ({ ComponentToRender,...other}:Props) => {  
  return (
    <li className='swiper-item'>
      {<ComponentToRender {...other}/>}
    </li>
  );
};

export default SwiperItem;
