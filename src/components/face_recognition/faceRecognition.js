import React from 'react';
import './faceRecognition.css';
import BoundingBoxes from './boundingBoxes';

const faceRecognition = ({ imageUrl, box }) => {
    if (box.length === 1) {
        return (
            <div className='center ma'>
                <div className='absolute mt2'>
                    <img alt='' id='inputImage' src={imageUrl} width='500px' height='auto' />
                </div>
            </div>
        )
    } else if (box.length > 1) {
        return ( 
            <div className='center ma'>
            <div className='absolute mt2'>
                <img alt='' id='inputImage' src={imageUrl} width='500px' height='auto' />
                <BoundingBoxes box={box}/>
            </div>
        </div>
        )
    }

};
export default faceRecognition;