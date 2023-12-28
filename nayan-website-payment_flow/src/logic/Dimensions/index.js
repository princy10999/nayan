import { useEffect,useState } from 'react';

export const useDimensions = props => { 
    const [windowDimensions, setWindowDimensions] = useState(
        getDimentions()
      );
    
      useEffect(() => {
        function handleResize() {
          setWindowDimensions(getDimentions());
        }
    
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
      }, []);
    
      return windowDimensions;
} 

const getDimentions = () => {
    const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}