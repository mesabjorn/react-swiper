import './SwiperItem.css';
import { SwiperItemType } from '../types';

export type Props = SwiperItemType;

const data = [{
  title:'A title #1',
  size:1000,
}]

const SwiperItem = ({ imageSrc, imageAlt}: Props) => {
  return (    
    <li className="swiper-item">
      <div>
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
      </div>
    </li>
    
  );
};

export default SwiperItem;
