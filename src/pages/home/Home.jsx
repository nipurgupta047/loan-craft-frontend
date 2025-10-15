import React from 'react'
import homeImage from '../../assets/images/home.png';
import './home.css'
import { RiUploadCloud2Fill } from 'react-icons/ri';
import { GiProcessor } from 'react-icons/gi';
import { SiTicktick } from 'react-icons/si';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()

  return (
    <div>
        <section class="hero">
            <div class="hero-text">
                <h1>Simplifying Loan Validation with AI</h1>
                <p>Our system automatically validates your PAN card and salary slips using advanced AI, and instantly tells you whether your application is approved, needs manual review, or is rejected.</p>
                <button class="primary-btn" onClick={()=>navigate('/apply')}>Apply Now</button>
            </div>
            <div class="hero-img">
                <img src={homeImage} alt="Home Image" />
            </div>
        </section>

        <section class="features">
            <div class="feature-card">
                <RiUploadCloud2Fill className='homeIcon'/>
                <h3>Upload Documents</h3>
                <p>Upload your PAN card and salary slip</p>
            </div>
            <div class="feature-card">
                <GiProcessor className='homeIcon'/>
                <h3>AI Validation</h3>
                <p>Our AI model validates your documents</p>
            </div>
            <div class="feature-card">
                <SiTicktick className='homeIcon'/>
                <h3>Instant Decision</h3>
                <p>Receive an instant decision on your application</p>
            </div>
        </section>
    </div>
  )
}
