import React from 'react';
import './faceRecognition.css';

const faceRecognition = ({ imageUrl,box }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2'>
                <img alt='' id='inputImage' src={imageUrl} width='500px' height='auto'/>
                <div className='boudning-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
            </div>
        </div>
    )
};
export default faceRecognition;