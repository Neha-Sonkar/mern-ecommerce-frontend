import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import video1 from '../assets/9430550-uhd_2160_4096_25fps.mp4'
import video2 from '../assets/7706677-uhd_2160_4096_25fps.mp4'
import { TypeAnimation } from 'react-type-animation'
import bg from '../assets/bg.avif'
import Context from '../Context/Context'
import './components.css'

const Home = () => {
    const a = useContext(Context)

    return (
        <div className="home-wrapper">
            <section className="hero-section">
                <div 
                    className="hero-bg d-flex justify-content-around align-items-center flex-column flex-lg-row"
                    style={{ backgroundImage: `url(${bg})` }}
                >
                    <div className="hero-content d-flex justify-content-center align-items-center flex-column flex-lg-row gap-5">
                        <div className="video-container left-video">
                            <video 
                                className="hero-video" 
                                src={video1} 
                                autoPlay 
                                loop 
                                muted 
                                playsInline
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                        <div className="text-container text-center">
                            <div className="tagline-wrapper">
                                <h1 className="hero-tagline mb-4">
                                    <span className="tagline-line">Adorn yourself with elegance</span>
                                    <span className="tagline-line">let your jewelry tell your story.</span>
                                </h1>
                            </div>
                        </div>
                        <div className="video-container right-video">
                            <video 
                                className="hero-video" 
                                src={video2} 
                                autoPlay 
                                loop 
                                muted 
                                playsInline
                            >
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}

export default Home