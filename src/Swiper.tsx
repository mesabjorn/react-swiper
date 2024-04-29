import React from 'react';

import {useState, useRef } from 'react';

import { SwiperItemType } from './types';
import SwiperItem from './SwiperItem';

import './styles/Swiper.css';
import { useStateRef, getRefValue } from './lib/hooks';
import { getTouchEventData } from './lib/dom';

export type Props = {
  ChildComponent: React.FunctionComponent<any>  
  items: Array<SwiperItemType>,
  onSwipe:(page:number)=>void,
  onPageChange:(page:number)=>void,
  childProps:Object,
  MIN_SWIPE_REQUIRED:number
};

// const MIN_SWIPE_REQUIRED = 40;


const Swiper:React.FunctionComponent<Props> = ({ items, ChildComponent, onSwipe, childProps, onPageChange=()=>{}, MIN_SWIPE_REQUIRED = 80}:Props) => {
  const [isSwiping, setIsSwiping] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);

  const containerRef = useRef<HTMLUListElement>(null);
  const minOffsetXRef = useRef(0);

  const currentOffsetXRef = useRef(0);
  const startXRef = useRef(0);
  const containerWidthRef = useRef(0);

  const [offsetX, setOffsetX, offsetXRef] = useStateRef(0);

  const onTouchStart = (
    e: React.TouchEvent<HTMLElement> | React.MouseEvent<HTMLDivElement>
  ) => {
    setIsSwiping(true);

    currentOffsetXRef.current = getRefValue(offsetXRef);
    startXRef.current = getTouchEventData(e).clientX;

    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('mousemove', onTouchMove);
    window.addEventListener('mouseup', onTouchEnd);

    const containerEl = getRefValue(containerRef);
    minOffsetXRef.current = containerEl.offsetWidth - containerEl.scrollWidth;
    containerWidthRef.current = containerEl.offsetWidth;
  };

  const onTouchEnd = () => {
    window.removeEventListener('mouseup', onTouchEnd);
    window.removeEventListener('mousemove', onTouchMove);
    window.removeEventListener('touchend', onTouchEnd);
    window.removeEventListener('touchmove', onTouchMove);

    const containerWidth = getRefValue(containerWidthRef);
    const currentOffsetX = getRefValue(currentOffsetXRef);

    let newOffsetX = getRefValue(offsetXRef);    

    const diff = currentOffsetX - newOffsetX;
    if (Math.abs(diff)>MIN_SWIPE_REQUIRED){
      if(diff>0){
        newOffsetX = Math.floor(newOffsetX/containerWidth)*containerWidth;
      }else{
        newOffsetX = Math.ceil(newOffsetX/containerWidth)*containerWidth;
      }
      onSwipe(Math.abs(newOffsetX)/containerWidth);
    }
    else{
        newOffsetX = Math.round(newOffsetX/containerWidth)*containerWidth;
    }
    setIsSwiping(false);
    setOffsetX(newOffsetX);
    setCurrentIdx(Math.abs(newOffsetX / containerWidth));
  };

  const onTouchMove = (e: TouchEvent | MouseEvent) => {
    const currentX = getTouchEventData(e).clientX;
    const diff = getRefValue(startXRef) - currentX;
    
    let newOffsetX = getRefValue(currentOffsetXRef) - diff;

    const maxOffsetX = 0;
    const minOffsetX = getRefValue(minOffsetXRef);

    if (newOffsetX > maxOffsetX) {
      newOffsetX = maxOffsetX;
    }

    if (newOffsetX < minOffsetX) {
      newOffsetX = minOffsetX;
    }

    setOffsetX(newOffsetX);
  };

  const indicatorOnClick = (idx: number) => {
    const containerEl = getRefValue(containerRef);
    const containerWidth = containerEl.offsetWidth;

    setCurrentIdx(idx);
    setOffsetX(-(containerWidth * idx));
    onPageChange(idx);
  };

  return (
    <div
      className="swiper-container"
      onTouchStart={onTouchStart}
      onMouseDown={onTouchStart}
    >
      <ul
        ref={containerRef}
        className={`swiper-list ${isSwiping ? 'is-swiping' : ''}`}
        style={{ transform: `translate3d(${offsetX}px,0,0)` }}
      >
        {items.map((item, idx) => (
          <SwiperItem key={idx} ComponentToRender={ChildComponent} {...item} {...childProps} />
        ))}
      </ul>
      <ul className="swiper-indicator">
        {items.map((_item,idx)=>(
          <li key={idx} className={`swiper-indicator-item ${currentIdx===idx?'active':''}`} data-test-id="indicator" onClick={()=>indicatorOnClick(idx)}>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Swiper;
