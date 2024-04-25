import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import ContextApi from '../../ContextApi';
import Navbar from '../partials/Navbar';
import Carousel from '../partials/Carousel';
import { useNavigate } from 'react-router-dom';

function ShowDetails() {
    const { singleDataID } = useContext(ContextApi);
    const navigate = useNavigate();
    const [allData, setAllData] = useState([]);
    const firstName = localStorage.getItem('firstName');
    const [genresData, setGenresData] = useState([]);
    const [singleDataGenres, setsingleDataGenres] = useState([]);
    const [singleData, setSingleData] = useState(null);
    const id = localStorage.getItem('ShowDetailsId')

    useEffect(() => {
        if (!firstName) {
            navigate('/login');
        } else if (singleDataID) {
            localStorage.setItem('ShowDetailsId', singleDataID)
        }

    }, [firstName, navigate, singleDataID]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });


        axios.get(`https://api.tvmaze.com/shows/${id}`)
            .then((response) => {
                setSingleData(response.data);
                setsingleDataGenres(response.data.genres);
            })
            .catch((error) => {
                console.error('Error fetching single data:', error);
            });
    }, [id, singleDataID]);

    useEffect(() => {
        axios.get('https://api.tvmaze.com/shows')
            .then((response) => {
                setAllData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching all data:', error);
            });

    }, []);

    useEffect(() => {
        const suggestionData = allData.filter(show => {
            return singleDataGenres.every(genre => show.genres.includes(genre));
        });

        setGenresData(suggestionData);
    }, [allData, singleDataGenres]);

    function removeHTMLtags(inputString) {
        let doc = new DOMParser().parseFromString(inputString, 'text/html');
        return doc.body.textContent || '';
    }

    return (
        <>
            {singleData ? (
                <>
                    <Navbar />
                    <div className="bg_Color mt-sm-4 pt-2">
                        <div className='SinglePostD'>
                            <div className='Sdetails'>
                                <h1>{singleData.name}</h1>
                                <p>{singleData.premiered} &nbsp;&nbsp;&nbsp; {singleData.runtime}min/episode</p>
                            </div>
                            <div className='Srating'>
                                <h6>IMDb RATING</h6>
                                <p><i className='fas fa-star text-warning'></i> {singleData.rating.average}<span>/10</span></p>
                            </div>
                        </div>

                        <div className="singleDimg d-flex">
                            <img src={singleData.image.original} alt="" />

                            <div className='singleMainD m-5'>
                                <h6><span className='text-light'>Genres: </span>{singleData.genres.join(', ')}</h6>
                                <hr />
                                <h6 className='text-light'>{removeHTMLtags(singleData.summary)}</h6>
                                <hr />
                                <h6><span className='text-light'>Language: </span>{singleData.language}</h6>
                                <hr />
                                <h6><span className='text-light'>Runtime: </span>{singleData.runtime}m Per Episode</h6>
                                <hr />
                                <h6 className='hboIcon'><span className='text-light'>OfficialSite: </span><span className='hbo'><a href={singleData.officialSite} target='_blank' rel="noopener noreferrer"><img src="https://www.hbo.com/img/hbo-logo-blk.svg" rel="noopener noreferrer" alt="" /></a></span></h6>
                                <hr />
                                <h6><span className='text-light'>Tv Type: </span>{singleData.type}</h6>
                            </div>
                        </div>
                        <Carousel genresData={genresData} />
                    </div>
                </>
            ) : (
                <div className='gifSetting'>
                    <img src="https://icons8.com/preloaders/preloaders/1493/Settings.gif" alt="Animation" />
                </div>
            )}
        </>
    );
}

export default ShowDetails;
