import React from 'react';
import './App.css';
const XLSX = require('xlsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      foundRows: [],
      search: '',
    }

    this.fileHandler = this.fileHandler.bind(this);
    this.filterRows = this.filterRows.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  fileHandler({target}) {
    let file = target.files[0];
    if (!file) return;

    var FR = new FileReader();
    FR.onload = ({target}) => {
     var data = new Uint8Array(target.result),
         workbook = XLSX.read(data, {type: 'array'}),
         firstSheet = workbook.Sheets[workbook.SheetNames[0]],
         result = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

     this.setState({
       data: result,
     })
   };
   FR.readAsArrayBuffer(file);
  }

  filterRows() {
    let { data, search } = this.state,
        foundRows = data.filter(row => {
          let rowString = row.join('');
          if(rowString.indexOf(search) !== -1) {
            return row;
          }
        })

    this.setState({
      foundRows,
    })
  }

  changeHandler({target}) {
    let { name } = target;
    this.setState({
      [name] : target.value,
    })
  }

  render() {
    let { data, foundRows } = this.state;
    return (
      <div className="App">
        <div className = 'titleContainer'>
          <p className = 'title'>Search by Part Name</p>
        </div>
        <input type="file" id="input" accept=".xls,.xlsx,.ods" onChange = {this.fileHandler}/>
        {data !== null ? 
        <div className = 'searchContainer'>
          <div className = "searchInput">
            <input type="text" id="search" name = "search" onChange = {this.changeHandler} placeholder='Search by Part Name...'/>
            <button className = 'submit' onClick = {this.filterRows}>Search</button>
          </div>
        </div>
        : 
          undefined
        }
        {foundRows !== null ? 
          foundRows.map(row => {
            return <div className = 'foundRow'>{row}</div>  
          })
        : 
          undefined
        }
      </div>
    );
  }
}

export default App;
