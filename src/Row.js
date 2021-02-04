import React, {useState, useEffect} from 'react';
import axios from './axios';
// import APIKEY from './request'
import "./Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";


const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLargeRow }) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    // console.log(fetchURL)
    useEffect(()=> {
        async function fetchData() {
            const request = await axios.get(fetchURL);
                // {
                //     headers: {
                //         Authorization: `Bearer ${APIKEY}`
                //     },
                // })
                // .then((request) => {
                //     //API json response
                //     console.log(request.data.result)
                // })
                // .catch((err) => {
                //     if (err.response) {
                //         console.log(err.response.status);
                //     }
                // });
            // console.log(request.data.results);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL]);

    // console.table(movies);
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay:1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl('');
        } else {
            // console.log(movie?.name);
            movieTrailer(movie?.name || "")
            .then(
                url => {
                //https://www.youtube.com/watch?v=XtMThy8QKqU
                const urlParams = new URLSearchParams(new URL(url).search); 
                console.log(urlParams);
                setTrailerUrl(urlParams.get("v")); }
            ) .catch(error => console.log(error));
        }
    }

    return (
        <div className="row">
            <h2>{title}</h2>

            <div className="row_posters">

                {movies.map(movie =>(
                    <img 
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} alt={movie.name}/>
                ))}
            </div>

            {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}

        </div>
    )
}

export default Row
