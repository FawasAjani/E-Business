import React from 'react';
import './Templates.css';
import { useNavigate, useParams} from 'react-router-dom';

const Templates = () => {
    const { id } = useParams();
    const navigate = useNavigate(); 

    // naviagting to the page of the professional emplate 
    const renderProfessionalTemplate = async (e) => {
        e.preventDefault(); 
        navigate('/templates/professional/' + id);
    };

    // naviagting to the page of the freelancer template 
    const renderFreelancerTemplate = async (e) => {
        e.preventDefault(); 
        navigate('/templates/freelancer/' + id);
    };

    // naviagting to the page of the freelancer template 
    const renderServiceTemplate = async (e) => {
        e.preventDefault(); 
        navigate('/templates/service/' + id);
    };

    // naviagting to the page of the dynamic template 
    const renderDynamicTemplate = async (e) => {
        e.preventDefault(); 
        navigate('/templates/dynamic/' + id);
    };

    return (
        <div className='templates'>
            <div className="row">
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-content">
                           {/*product emoji added */}
                            <h3>Product🛍️</h3>
                            <p>Show off a product with key features and a bold call to action.</p>
                        </div>
                        <img src="/images/product15.png" alt="Template1" />
                        <button className="button" onClick={renderProfessionalTemplate}>Use this template</button> 
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-content">
                              {/*Freelancer emoji added */}
                            <h3>Freelancer🧑‍💻 </h3>
                            <p>Highlight your skills, services, and past work to attract clients.</p>
                        </div>
                        <img src="/images/freelancer11.png" alt="Template1" />
                        <button className="button" onClick={renderFreelancerTemplate}>Use this template</button> 
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-content">
                            <h3>Service💼</h3>
                            <p>Promote a service you offer, with clear descriptions and benefits.</p>
                        </div>
                        <img src="/images/service10.png" alt="Template1" />
                        <button className="button" onClick={renderServiceTemplate}>Use this template</button> 
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="card">
                        <div className="card-content">
                            <h3>Dynamic🎨</h3>
                            <p>Build your own layout from scratch - fully customizable.</p>
                        </div>
                        <img src="/images/dynamic13.png" alt="Template1"/>
                        <button className="button" onClick={renderDynamicTemplate}>Use this template</button> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Templates;
