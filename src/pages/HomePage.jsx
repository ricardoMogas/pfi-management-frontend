import React, { useState } from 'react';
import Button from '../../ui_components/Button';

const HomePage = () => {
  const [count, setCount] = useState(0);

  const incrementCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <div className='position-absolute top-50 start-50 translate-middle'>
        <h1>Welcome to the Home Page</h1>
        <p>This is the content of the home page.</p>
        <section className='text-center'>
          <Button className="btn-primary" onClick={incrementCount}>
            Increment Count
          </Button>
          <p>Count: {count}</p>
        </section> 
      </div>
    </>
  );
};

export default HomePage;
