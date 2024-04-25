import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ContextApi from '../../ContextApi';

function Navbar({ favAdd, allData }) {
    const { setSingleDataID } = useContext(ContextApi);
    const navigate = useNavigate();
    const firstName = localStorage.getItem('firstName');
    const [searchedData, setSearchedData] = useState(null);

    function removeCookie(name) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
    }

    function handleSignOut(e) {
        localStorage.removeItem('firstName');
        removeCookie('token');
        navigate('/login');
    }

    const handleSearchedData = (value) => {
        if (!value) {
            setSearchedData(null);
        } else {
            const filterData = allData.filter(data => data.name.toLowerCase().includes(value));
            setSearchedData(filterData);
        }
    };

    const handleItemClick = (id) => {
        console.log(id);
        setSingleDataID(id);
        navigate('/showDetails');
    };

    return (
        <nav className="navbar">
            <div className="contain">
                <div className="col-md-12 d-flex align-items-center justify-content-between position-fixed top-0 w-100 bg-black py-2 z-3">
                    <div className='Nav_Name'>
                        <Link to={'/'}>AKSHAt</Link>
                    </div>

                    <div className="position-relative w-100 d-flex justify-content-center">
                        <form className='SearchForm mx-2 w-75' onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="text"
                                className='form-control position-relative w-100'
                                value={searchedData ? searchedData.name : ''}
                                onChange={(e) => { handleSearchedData(e.target.value) }}
                            />
                        </form>
                        {searchedData &&
                            <div className='position-absolute d-flex flex-column w-75 border border-1 bg-black rounded-3 p-3 overflow-y-scroll' style={{ top: '50px', height: '82vh' }}>
                                {searchedData && searchedData.map((Data) => (
                                    <button className='text-white border border-1 p-1 m-1 fs-5 text-decoration-none bg-black text-center text-white' onClick={() => handleItemClick(Data.id)} key={Data.id}>{Data.name}</button>
                                ))}
                            </div>
                        }
                    </div>
                    <div className='logBtn d-flex me-5'>
                        <div className="fav">

                            {favAdd ? (
                                <Link to={'/watchlist'} className='text-decoration-none'>
                                    <button type='button'>
                                        <i className="fa-solid fa-bookmark mx-2"></i>WatchList
                                        <span className='totalWL text-black ms-1'>{favAdd}</span>
                                    </button>
                                </Link>
                            ) : (
                                <Link to={'/watchlist'} className='text-decoration-none'>
                                    <button type='button'>
                                        <i className="fa-solid fa-bookmark mx-2"></i>WatchList
                                    </button>
                                </Link>
                            )}
                        </div>

                        <div className="SignBtn mx-2" style={{ width: '80px' }}>
                            {!firstName ? (
                                <Link to={'/login'} className='text-decoration-none'>
                                    <button type='button'>Sign In</button>
                                </Link>
                            ) : (
                                <button type='button'>
                                    <i className="fa-solid fa-user mx-1"></i>
                                    <ul className="navItem">
                                        <li className="list py-4"><Link to="#" className='lh-1 d-flex gap-1'>{firstName} <i className="fas fa-caret-down"></i> </Link>
                                            <ul className="dropdown">
                                                <li><Link to={'/watchlist'}>Your watchlist</Link></li>
                                                <li><Link to={'/login'} onClick={(e) => { handleSignOut(e) }}>Sign Out</Link></li>
                                            </ul>
                                        </li>
                                    </ul>
                                </button>
                            )
                            }

                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
