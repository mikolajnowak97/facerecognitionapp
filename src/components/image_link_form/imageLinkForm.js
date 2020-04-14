import React from 'react';
import './image_link_form.css'

const ImageLinkForm = ({onInputChange, onButtonSubmit, foundedFaces}) => {
    return (
        <div>
            <p className='f3'>
                {'This site will detect faces in your pictures. Give it a try :)'}
            </p>
            <div className='center'> 
                <div className='center form pa4 br3 shadow-5'>
                    <input className='f4 pa2 w-70 center' type='text' onChange={onInputChange} placeholder="Paste image Url here" />
                    <button className='ml1 w-30 grow f4 link ph3 pv2 dib white bg-light-purple b--none '
                    onClick={onButtonSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    )
};
export default ImageLinkForm;