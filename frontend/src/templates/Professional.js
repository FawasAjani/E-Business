import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';//import useNavigate
import axios from 'axios';//import axios
import './Professional.css';//professional
import QrCodeGenerator from '../components/QrCodeGenerator';//QrcodeGenerator
import imageCompression from 'browser-image-compression';//imageCompression

const Professional = () => {
    const { id } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const togglePopup = () => setIsOpen(false);

    const [title, setTitle] = useState("");
    const [slogan, setSlogan] = useState("");
    const [product, setProduct] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [feature1, setFeature1] = useState("");
    const [feature2, setFeature2] = useState("");
    const [feature3, setFeature3] = useState("");
    const [contact1, setContact1] = useState("");
    const [contact2, setContact2] = useState("");
    const [type] = useState("professional");

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/templates/professional/${id}`)
            .then((response) => {
                const data = response.data.professional;
                setTitle(data.title || "Enter business name");// business name
                setSlogan(data.slogan || "Enter slogan");//slogan
                setProduct(data.product || "Enter product name");//product name
                setDescription(data.description || "Enter product description");
                setFeature1(data.feature1 || "Enter feature 1");//Enter feature 1
                setFeature2(data.feature2 || "Enter feature 2");//Enter feature 2
                setFeature3(data.feature3 || "Enter feature 3");//Enter feature 3
                setContact1(data.contact1 || "Email: ");//Email
                setContact2(data.contact2 || "Phone: ");//phone
                setImage(data.image || "");
            })
            .catch((error) => {
                console.log("Error", error);
            });
    }, [id]);

    const handleSave = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/templates/professional/profile/${id}`, {
            professional: {
                title, slogan, product, description,
                feature1, feature2, feature3,
                contact1, contact2, image,
            }
        }).then(() => {
            // Optional: show a success message
        }).catch((error) => {
            console.error('Error:', error);
            alert('Failed to save profile');
        });
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const adjustments = {
            maxSizeMB: 5,
            maxWidthOrHeight: 300,
        };

        const compressedFile = await imageCompression(file, adjustments);
        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);
        reader.onloadend = () => {
            setImage(reader.result);
        };
    };

    const handldeFormSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${process.env.REACT_APP_BACKEND_URL}/templates/professional/profile/${id}`, {
            professional: {
                title, slogan, product, description,
                feature1, feature2, feature3,
                contact1, contact2, image,
            }
        }).then(() => {
            setIsOpen(true);
        }).catch((error) => {
            console.error('Error:', error);
            alert('Failed to save profile');
        });
    };

    const loadPreview = () => navigate('/professional/portfolio/preview/' + id);
    const goToTemplates = () => navigate('/templates/' + id);

    return (
        <div>
            <div className='template-button-holder'>
                <button className='template-button' onClick={goToTemplates}>Browse templates</button>
            </div>
            <div className="containerForm">
                <form onSubmit={handleSave}>
                    <h1 className='header'> Product Portfolio </h1>
                    <br /><hr /><br />
                    <div className='form'>
                        <h4>Business Name</h4>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <br />
                    <div className='form'>
                        <h4>Enter slogan</h4>
                        <input type="text" value={slogan} onChange={(e) => setSlogan(e.target.value)} />
                    </div>
                    <br />
                    <div className='form'>
                        <h4>Enter product name</h4>
                        <input type="text" value={product} onChange={(e) => setProduct(e.target.value)} />
                    </div>
                    <br />
                    <div className='form'>
                        <h4 htmlFor="fileInput">Upload image here</h4>
                        <div className='displayed-images'>
                            {image && <img src={image} alt="Uploaded Preview" className='uploaded-image' />}
                        </div>
                        <input type="file" id="fileInput" accept="image/*" onChange={handleImageUpload} />
                    </div>
                    <br />
                    <div className='form'>
                        <h4>The product description</h4>
                        <textarea rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <br />
                    <div className='form'>
                        <h4>Enter product features</h4>
                        <textarea rows="2" value={feature1} onChange={(e) => setFeature1(e.target.value)} />
                        <textarea rows="2" value={feature2} onChange={(e) => setFeature2(e.target.value)} />
                        <textarea rows="2" value={feature3} onChange={(e) => setFeature3(e.target.value)} />
                    </div>
                    <br />
                    <div className='form'>
                        <h4>Enter your contacts</h4>
                        <textarea rows="2" value={contact1} onChange={(e) => setContact1(e.target.value)} />
                        <textarea rows="2" value={contact2} onChange={(e) => setContact2(e.target.value)} />
                    </div>
                    <div className='form-buttons'>
                        <button className="save" type="submit">Save</button>
                        <button onClick={loadPreview} className='preview'>Preview</button>
                    </div>
                    <div className='submit-button'>
                        <button onClick={handldeFormSubmit} className='submit'>Submit</button>
                    </div>
                    {isOpen && (
                        <div className="popup">
                            <QrCodeGenerator type={type} id={id} />
                            <div className='pop-but-container'>
                                <button onClick={togglePopup} className='close-button'>Close</button>
                            </div>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Professional;
