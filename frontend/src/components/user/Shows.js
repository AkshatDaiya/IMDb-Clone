import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../partials/Navbar'
import BackToTop from '../partials/BackToTop'
import ContextApi from '../../ContextApi'

function Shows() {
    const { setSingleDataID, addFav, setAddFav } = useContext(ContextApi)
    const [allData, setAllData] = useState([])
    const [activeButton, setActiveButton] = useState('active');
    const [postPerPage, setPostPerPage] = useState(24);
    const currentPage = 1;
    const navigate = useNavigate()

    const lastPostIndex = currentPage * postPerPage;
    const firstPostIndex = lastPostIndex - postPerPage; // Correcting calculation
    const currentPosts = allData.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        axios.get('https://api.tvmaze.com/shows')
            .then((response) => { setAllData(response.data) })
            .catch((error) => { console.log(error) })
    }, [])

    function handleLoadMore() {
        // Increase postPerPage by 24
        setPostPerPage(prevPostPerPage => prevPostPerPage + 24);
    }

    function handleDetails(id) {
        setSingleDataID(id);
    }

    function handleAddFav(e, id) {
        e.preventDefault(); // Prevent default form submission
        let _addFav = { ...addFav }
        _addFav.ids = _addFav.ids || {}; // Simplified condition
        _addFav.ids[id] = (_addFav.ids[id] || 0) + 1; // Simplified increment
        _addFav.totalItems = (_addFav.totalItems || 0) + 1; // Simplified increment
        setAddFav(_addFav)
        navigate('/')
    }

    const handleClick = (buttonIndex) => {
        setActiveButton(buttonIndex);
    };

    return (
        <>
            <Navbar favAdd={addFav && addFav.totalItems} allData={allData} />
            {currentPosts.length === 0 ? (
                <div className='gifSetting'>
                    <img src="https://icons8.com/preloaders/preloaders/1493/Settings.gif" alt="Animation" />
                </div>
            ) : (<div className='bg_color0 w-100'>
                <div className='bg_color1'>
                    <div className="details">
                        <h3>AKSHAt Charts</h3>
                        <div>
                            <h1>AKSHAt Top 240 Movies </h1>
                        </div>
                        <small className='text-secondary'>As rated by regular IMDb voters.</small>
                    </div>

                    <div className='d-flex justify-content-center'>
                        <div className="sortingItems">
                            <div>
                                <button className={activeButton === 0 ? 'active' : ''}
                                    onClick={() => handleClick(0)}><i className="fa-solid fa-list fs-4"></i>
                                </button>
                                <button className={activeButton === 1 ? 'active' : ''}
                                    onClick={() => handleClick(1)}><i className="fas fa-border-all fs-4"></i>
                                </button>
                                <button className={activeButton === 2 ? 'active' : ''}
                                    onClick={() => handleClick(2)}><i className="fa-solid fa-bars fs-4"></i>
                                </button>
                            </div>
                            <div className='d-flex align-items-center'>
                                <h6 className='m-0 px-2'>Sort by </h6>
                                <select id="sortBy">
                                    <option value="Ranking">Ranking</option>
                                    <option value="AKSHAt Rating">AKSHAt Rating</option>
                                    <option value="Alphabetical">Alphabetical</option>
                                    <option value="Release date">Release date</option>
                                    <option value="Runtime">Runtime</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row row-cols-1 row-cols-md-4 g-4 m-3 mt-0">
                        {currentPosts.map((data, i) => (
                            <div key={data.id} className="col">
                                <div className="card h-100">
                                    <img src={data.image.original} className="card-img-top img-hight position-relative" alt="..." />
                                    <button onClick={(e) => { handleAddFav(e, data.id) }} className='addFavBtn'>
                                        <h1>+</h1>
                                    </button>
                                    <div className="card-body position-relative">
                                        <p className="card-text m-0 text-secondary"><i className='fas fa-star text-warning'></i> {data.rating.average}</p>
                                        <h4 className="card-title fs-5"><small className='fs-6'>{i + 1}. </small> {data.name}</h4>
                                        <div className='d-flex flex-wrap'>
                                            <p className="card-text m-0 text-secondary">{data.premiered}</p>
                                            <p className="card-text m-0 text-secondary mx-4">{data.runtime}min/episode</p>
                                        </div>
                                        <Link to={`/showDetails`}><button className='StyleBTN1 position-relative' onClick={() => { handleDetails(data.id) }}>More Details</button></Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="d-flex justify-content-center p-3">
                        <button className='StyleBTN' onClick={handleLoadMore}>Load More...</button>
                    </div>

                    <BackToTop />

                </div>
            </div>)}
        </>
    )
}

export default Shows;
