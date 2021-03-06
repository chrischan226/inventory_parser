import React from 'react';
import FileInput from './FileInput';
import Search from './Search';
import Found from './Found';
import './App.css';

const XLSX = require('xlsx');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: null,
      newCol: null,
      data: null,
      bomData: null,
      inventoryData: null,
      foundRows: null,
      missing: null,
      search: '',
    }

    this.fileHandler = this.fileHandler.bind(this);
    this.filterRows = this.filterRows.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
  }

  fileHandler({target}) {
    let file = target.files[0],
        { name } = target,
        fileName = target.value,
        mfgPN,
        reserve,
        headers,
        parts,
        count = 0,
        partList = {};
    console.log(file);
    if (!file) return;

    var FR = new FileReader();
    document.getElementsByClassName('lds-ring')[0].style.height = '80px';
    document.getElementsByClassName('lds-ring')[0].style.width = '80px';
    document.getElementsByClassName('lds-ring')[0].style.marginTop = '200px';
    document.getElementsByClassName('lds-ring')[0].style.visibility = 'visible';
    FR.onload = ({target}) => {
      var data = new Uint8Array(target.result),
        workbook = XLSX.read(data, {type: 'array'}),
        firstSheet = workbook.Sheets[workbook.SheetNames[0]],
        result = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });

      switch(name) {
        case 'bomData':
          result.forEach((part, index) => {
            if(part[mfgPN] !== undefined && typeof part[mfgPN] === 'string' && part[mfgPN].indexOf('\r\n') !== -1 && part[mfgPN] !== 'N/A' && part[mfgPN] !== 'MFG_PN') {
              parts = part[mfgPN].split('\r\n');
              parts.forEach(partName => {
                if(partList[partName] === undefined) partList[partName] = [index];
                else partList[partName].push(index);
              })
            } else if(part[mfgPN] !== undefined && typeof part[mfgPN] === 'string' && part[mfgPN].indexOf('\r\n') === -1 && part[mfgPN] !== 'N/A' && part[mfgPN] !== 'MFG_PN') {
              parts = part[mfgPN].split('\n');
              parts.forEach(partName => {
                if(partList[partName] === undefined) partList[partName] = [index];
                else partList[partName].push(index);
              })
            } else if(part[0] !== undefined && typeof part[0] === 'string' && part[0].indexOf('Item') !== -1) {
                if(headers === undefined) headers = count;
                for(let i = 0; i < part.length; i++) {
                  if(typeof part[i] === 'string') {
                    if(part[i].toLocaleLowerCase() === 'mfg_pn') mfgPN = i; 
                  }
                }
            }
            count++;
          });
          document.getElementsByClassName('lds-ring')[0].style.height = '0px';
          document.getElementsByClassName('lds-ring')[0].style.width = '0px';
          document.getElementsByClassName('lds-ring')[0].style.marginTop = '0px';
          document.getElementsByClassName('lds-ring')[0].style.visibility = 'hidden';
          result[headers].push('Oracle P/N');
          result[headers].push('B/R after Reserve');
          fileName = fileName.slice(fileName.indexOf('fakepath') + 9);
          fileName = fileName.slice(0,fileName.indexOf('.xlsx')) + ' - Comparison' + fileName.slice(fileName.indexOf('.xlsx'));
          this.setState({
            fileName,
            newCol: result[headers].length,
            bomData: partList,
            data: result,
            foundRows: null,
          })
          break;
        case 'inventoryData':
          result.forEach(part => {
            if(part[0] !== undefined && part[mfgPN] !== undefined && part[mfgPN].length > 0) {
              let parts = part[mfgPN].replace(/\r\n/g, '|').replace(/,/g, '|').replace(/ /g,'').split('|');
              parts.forEach(partName => {
                if(partList[partName] === undefined) partList[partName] = [part[0], part[reserve]];
                else if(partList[partName][0].indexOf(part[0]) === -1) {
                  partList[partName][0] += `, \r\n${part[0]}`
                  partList[partName][1] += `, \r\n${part[reserve]}`
                }
              })
            } else if(part[0] !== undefined && typeof part[0] === 'string' && mfgPN === undefined) {
              for(let i = 0; i < part.length; i++) {
                if(typeof part[i] === 'string') {
                  if(part[i].toLocaleLowerCase() === 'mfg_pn' || part[i].toLocaleLowerCase().indexOf('mfg part') !== -1) mfgPN = i; 
                  if(part[i].toLocaleLowerCase().indexOf('reserve') !== -1) reserve = i; 
                }
              }
            }
          });
          document.getElementsByClassName('lds-ring')[0].style.height = '0px';
          document.getElementsByClassName('lds-ring')[0].style.width = '0px';
          document.getElementsByClassName('lds-ring')[0].style.marginTop = '0px';
          document.getElementsByClassName('lds-ring')[0].style.visibility = 'hidden';
          result = partList;
          this.setState({
            [name]: result,
            foundRows: null,
          })
          break;
        default:
          break;
      }
   };
   FR.readAsArrayBuffer(file);
  }

  filterRows() {
    let { bomData, inventoryData, data, fileName, newCol } = this.state,
        found = [],
        notFound = {},
        newData = data.slice(),
        worksheet,
        workbook;

    Object.keys(bomData).forEach(partName => {
      bomData[partName].forEach(index => {
        if(inventoryData[partName] !== undefined) {
          if(newData[index][newCol - 2] === undefined && newData[index][newCol - 1] === undefined) {
            newData[index][newCol - 2] = inventoryData[partName][0];
            newData[index][newCol - 1] = inventoryData[partName][1];
          } else {
            let store = {},
                partNumbers = String(newData[index][newCol - 2]).split(','),
                partAmounts = String(newData[index][newCol - 1]).split(',');

            partNumbers.forEach((item, index) => {
              store[item] = partAmounts[index];
            })
            partNumbers = String(inventoryData[partName][0]).split(',');
            partAmounts = String(inventoryData[partName][1]).split(',');
            partNumbers.forEach((item, index) => {
              if(store[item] === undefined) store[item] = partAmounts[index];
            })

            newData[index][newCol - 2] = '';
            newData[index][newCol - 1] = '';

            for(let items in store) {
              if(newData[index][newCol - 2] === '') newData[index][newCol - 2] = `${items}`;
              else newData[index][newCol - 2] += `,${items}`;

              if(newData[index][newCol - 1] === '') newData[index][newCol - 1] = `${store[items]}`;
              else newData[index][newCol - 1] += `,${store[items]}`;
            }
          }
          found.push(inventoryData[partName])
        }
        else notFound[partName] = true;
      })
    })

    this.setState({
      foundRows : found,
      missing: notFound,
    }, () => {
      worksheet = XLSX.utils.json_to_sheet(newData, {header:['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18'], skipHeader: true});
      workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'parts');
      XLSX.writeFile(workbook, fileName);
    })
  }

  changeHandler({target}) {
    let { name } = target;
    this.setState({
      [name] : target.value,
    })
  }

  render() {
    let { bomData, inventoryData, foundRows } = this.state;
    return (
      <div className="App">
        <div className = 'titleContainer'>
          <p className = 'title'>Search Inventory</p>
        </div>
        <div className = 'fileInput'>
          <FileInput title ='BOM' fileHandler = {this.fileHandler} name = 'bomData' />
          <FileInput title ='Inventory' fileHandler = {this.fileHandler} name = 'inventoryData' />
        </div>
        {bomData !== null  && inventoryData !== null ? 
          <Search changeHandler = {this.changeHandler} filterRows = {this.filterRows} />
        : 
          undefined
        }
        <div className = "lds-ring"><div></div><div></div><div></div><div></div></div>
        {foundRows !== null ? 
          <div className = 'foundContainer'>
            <div className = 'foundHeader'>Found</div>
            <Found foundRows = {foundRows} />
          </div>
        : 
          undefined
        }
      </div>
    );
  }
}

export default App;
