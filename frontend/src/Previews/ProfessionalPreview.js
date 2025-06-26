import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfessionalPreview.css';

const ProfessionalPreview = () => {
          // Extract the `id` from the URL parameters
    const { id } = useParams();
     // Get the navigation function from React Router
    const navigate = useNavigate();
     // Declare state variables for all dynamic content
    const [title, setTitle] = useState('');
    const [slogan, setSlogan] = useState('');
    const [product, setProduct] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [feature1, setFeature1] = useState('');
    const [feature2, setFeature2] = useState('');
    const [feature3, setFeature3] = useState('');
    const [contact1, setContact1] = useState('');
    const [contact2, setContact2] = useState('');
 // Fetch template data from the backend when the component mounts or `id` changes
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/templates/professional/${id}`)
            .then((response) => {
                const data = response.data.professional;
                setTitle(data.title);
                setSlogan(data.slogan);
                setProduct(data.product);
                setImage(data.image);
                setDescription(data.description);
                setFeature1(data.feature1);
                setFeature2(data.feature2);
                setFeature3(data.feature3);
                setContact1(data.contact1);
                setContact2(data.contact2);
            })     // Log any errors in fetching data
            .catch((error) => {
                console.error("Error getting profile:", error);
            });
    }, [id]);
  // Navigate back to the editable professional template page
    const backToPort = (e) => {
        e.preventDefault();
        navigate(`/templates/professional/${id}`);
    };

    return (
        <div>
            <div className="phoneContainer">
                <div className="phoneView">
                    <h2>{title}</h2>
                    <p>{slogan}</p>
                    <hr />
                    <div className='image'>
                        <img src={image} alt="Product" className='product-image' />
                    </div>
                    <hr />
                    <h2>Introducing {product}</h2>
                    <p>{description}</p>
                     {/* Display key features */}
                    <h3>Key Features</h3>
                    <ul>
                        <li>{feature1}</li>
                        <li>{feature2}</li>
                        <li>{feature3}</li>
                    </ul>
                    <h3>Get in Touch</h3>
                    <ul>
                        <li>{contact1}</li>
                        <li>{contact2}</li>
                    </ul>
                </div>
            </div> {/* Button to return to the editing page */}
            <div className='portfolio-button'>
                <button className='button' onClick={backToPort}>Back to portfolio</button>
            </div>
        </div>
    );
};

export default ProfessionalPreview;
