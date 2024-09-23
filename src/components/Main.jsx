import axios from 'axios';
import { useEffect, useState } from 'react';
import requests from '../Request';

const Main = () => {
  const [movies, setMovies] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(requests.requestPopular);
        setMovies(response.data.results);
        setIndex(Math.floor(Math.random() * response.data.results.length)); // Initial random movie
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchMovies();

    const interval = setInterval(() => {
      setIndex(prevIndex => {
        const newIndex = Math.floor(Math.random() * movies.length);
        return newIndex !== prevIndex ? newIndex : (newIndex + 1) % movies.length; // Ensure a new movie is shown
      });
    }, 5000); // Change movie every 5 seconds

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [movies.length]); // Depend on movies.length to ensure interval resets correctly if movie list changes

  const movie = movies[index];

  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + '...';
    } else {
      return str;
    }
  };

  return (
    <div className='w-full h-[600px] text-white'>
      <div className='w-full h-full'>
        <div className='absolute w-full h-[600px] bg-gradient-to-r from-black'></div>
        <img
          className='w-full h-full object-cover'
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
        />
        <div className='absolute w-full top-[20%] p-4 md:p-8'>
          <h1 className='text-3xl md:text-5xl font-bold'>{movie?.title}</h1>
          <div className='my-4'>
            <button className='border bg-gray-300 text-black border-gray-300 py-2 px-5'>
              Play
            </button>
            <button className='border text-white border-gray-300 py-2 px-5 ml-4'>
              Watch Later
            </button>
          </div>
          <p className='text-gray-400 text-sm'>
            Released: {movie?.release_date}
          </p>
          <p className='w-full md:max-w-[70%] lg:max-w-[50%] xl:max-w-[35%] text-gray-200'>
            {truncateString(movie?.overview, 150)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
