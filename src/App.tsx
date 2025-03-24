import React, { useEffect, useRef } from 'react';
import Home from './page/Home';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { BrowserRouter as Router, Routes, useNavigate, useLocation, Navigate, Route } from 'react-router-dom';
import { Work } from './page/Work';
import { Skills } from './page/Skills';
import { Layout } from './components/Layout';

import Error404 from './404';
import { MetaTags } from './metaTags';

const routes = ['/skills', '/hello', '/work'];

const FullScreenSlider: React.FC = () => {
  const sliderRef = useRef<Slider | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current: number, next: number) => {
      if (routes[next]) {
        navigate(routes[next], { replace: true });
      }
    },
  };

  useEffect(() => {
    let currentPath = location.pathname;

    if (currentPath.endsWith('/')) {
      currentPath = currentPath.slice(0, -1);
      navigate(currentPath, { replace: true });
    }

    const currentSlide = routes.indexOf(currentPath);
    if (sliderRef.current && currentSlide !== -1) {
      sliderRef.current.slickGoTo(currentSlide);
    }
  }, [location.pathname]);

  return (
    <Layout>
      <Slider ref={sliderRef} {...settings}>
        <Skills key="skills" />
        <Home key="hello" />
        <Work key="work" />
      </Slider>
    </Layout>
  );
};

const App = () => (
  <Router basename={process.env.PUBLIC_URL}>
    <MetaTags
      title="Portfolio | Web developer"
      description="Portfolio of a web developer with experience in building modern web applications and websites. Specializing in React, Node.js, MERN stack, and full-stack development to create efficient and responsive solutions."
      imageUrl="/profile/metaImg.png"
      url="https://portfolio-yak.vercel.app"
    />
    <Routes>
      <Route path="/" element={<Navigate to="/hello" replace />} />
      {routes.map((path) => (
        <Route key={path} path={path} element={<FullScreenSlider />} />
      ))}
      <Route path="*" element={<Error404 />} />
    </Routes>
  </Router>
);

export default App;
