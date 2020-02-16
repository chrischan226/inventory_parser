import React from 'react';

const Found = props => (
    props.foundRows.map((row, i) => {
        return (
            <div className = 'foundRow' key = {i}>
                <div className = 'itemNum'>{`Item #: ${row[0]}`}</div>
                <div className = 'quantity'>{`Quantity: ${row[1]}`}</div>
            </div>  
        )
    })
)

export default Found;