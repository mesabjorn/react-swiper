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


function App() {
  return (
    <div className="container">
      <Swiper items={items} />
    </div>
  );
}

export default App;
