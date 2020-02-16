import React from 'react';

const Search = (props) => {
    return(
        <div className = 'searchContainer'>
          <div className = "searchInput">
            <button className = 'submit' onClick = {props.filterRows}>Compare</button>
          </div>
        </div>
    )
}

export default Search;