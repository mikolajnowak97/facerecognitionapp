import React from 'react';

const boundingBoxes = ({ box }) => {
    var boxes = [];
    for (var i = 1; i < box.length; i++) {
        boxes.push(<div className='boudning-box' style={{ top: box[i].topRow, right: box[i].rightCol, bottom: box[i].bottomRow, left: box[i].leftCol }}></div>);
    }
    return boxes;
}


export default boundingBoxes;