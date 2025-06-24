import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';//axios

const DynamicPortfolio = () => {
    const { id } = useParams();
    const [portfolio, setPortfolio] = useState('');
    const [style, setStyle] = useState('');

    // Helper function to sanitize HTML string for React compatibility
    const sanitizeHtml = (html) => {
        return html
            .replace(/\sclass=/g, ' className=')
            .replace(/\sfor=/g, ' htmlFor=');
    };

    // Fetch portfolio data on mount
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/dynamic/portfolio/${id}`)
            .then((response) => {
                const rawHtml = response.data.user.html;
                const cleanedHtml = sanitizeHtml(rawHtml);
                setPortfolio(cleanedHtml); // Set sanitized HTML
                setStyle(response.data.user.css); // Set raw CSS
            })
            .catch((error) => {
                console.error("Error setting profile:", error);
            });
    }, [id]);

    return (
        <div>
            <style>{style}</style>
            <div dangerouslySetInnerHTML={{ __html: portfolio }}></div>
        </div>
    );
};

export default DynamicPortfolio;
