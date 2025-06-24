import React, { useRef } from 'react';
import QRCode from 'react-qr-code'; // Library for rendering QR codes
import * as htmlToImage from 'html-to-image';// Utility to convert DOM nodes into images
import './QrCodeGenerator.css';// Custom CSS for styling the QR code UI
// QrCodeGenerator component receives `type` and `id`
function QrCodeGenerator({ type, id }) {
  const baseUrl = window.location.origin;
  const url = `${baseUrl}/${type}/portfolio/${id}`;
  const qrCodeRef = useRef(null);// Ref to access the QR code DOM node
  // Function to download the QR code as a PNG image
  const downloadQRCode = () => {
     // Access only the <svg> inside the QR code wrapper
    const qrNode = qrCodeRef.current?.querySelector('svg'); //  Only export the SVG

    if (!qrNode) {
      console.error('QR Code SVG not found.');
      return;
    }

    htmlToImage
      .toPng(qrNode) //  Only convert the SVG node, not the whole wrapper
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = 'qr-code.png';
        link.click();
      })
      .catch((error) => {
        console.error('Error generating the QR code image:', error);
      });
  };

  const copy = () => {
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Copied the link: ' + url);
      })
      .catch((error) => {
        console.error('Error copying text:', error);
      });
  };

  return (
    <div className='main-container'>
      <div className="qrcode-container">
        <h1>Portfolio QR Code</h1>
      </div>
      <hr />
      <div className="qr-code" ref={qrCodeRef}>
        <QRCode value={url} size={300} />
      </div>
      <div className='qr-button'>
        <button onClick={downloadQRCode} className='download'>Download QR Code</button>
      </div>
      <div className='link'>
        <button className='copy' onClick={copy}>Copy link</button>
      </div>
    </div>
  );
}

export default QrCodeGenerator;
