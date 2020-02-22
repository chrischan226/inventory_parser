(this.webpackJsonpinventory_parser=this.webpackJsonpinventory_parser||[]).push([[0],{14:function(e,t,n){e.exports=n(29)},19:function(e,t,n){},20:function(e,t,n){},27:function(e,t){},28:function(e,t){},29:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),i=n(8),s=n.n(i),r=(n(19),n(2)),o=n(9),c=n(10),d=n(13),m=n(11),u=n(1),f=n(12),h=function(e){return l.a.createElement("div",{className:"inputContainer"},l.a.createElement("h3",null,e.title),l.a.createElement("input",{type:"file",id:"input",accept:".xls,.xlsx,.ods",onChange:e.fileHandler,name:e.name}))},v=function(e){return l.a.createElement("div",{className:"searchContainer"},l.a.createElement("div",{className:"searchInput"},l.a.createElement("button",{className:"submit",onClick:e.filterRows},"Compare")))},g=function(e){return e.foundRows.map((function(e,t){return l.a.createElement("div",{className:"foundRow",key:t},l.a.createElement("div",{className:"itemNum"},"Item #: ".concat(e[0])),l.a.createElement("div",{className:"quantity"},"Quantity: ".concat(e[1])))}))},p=(n(20),n(21)),y=function(e){function t(e){var n;return Object(o.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={fileName:null,newCol:null,data:null,bomData:null,inventoryData:null,foundRows:null,missing:null,search:""},n.fileHandler=n.fileHandler.bind(Object(u.a)(n)),n.filterRows=n.filterRows.bind(Object(u.a)(n)),n.changeHandler=n.changeHandler.bind(Object(u.a)(n)),n}return Object(f.a)(t,e),Object(c.a)(t,[{key:"fileHandler",value:function(e){var t,n,a,l=this,i=e.target,s=i.files[0],o=i.name,c=i.value,d=0,m={};if(s){var u=new FileReader;document.getElementsByClassName("lds-ring")[0].style.height="80px",document.getElementsByClassName("lds-ring")[0].style.width="80px",document.getElementsByClassName("lds-ring")[0].style.marginTop="200px",document.getElementsByClassName("lds-ring")[0].style.visibility="visible",u.onload=function(e){var i,s=e.target,u=new Uint8Array(s.result),f=p.read(u,{type:"array"}),h=f.Sheets[f.SheetNames[0]],v=p.utils.sheet_to_json(h,{header:1});switch(o){case"bomData":v.forEach((function(e,n){if(void 0!==e[t]&&"string"===typeof e[t]&&-1!==e[t].indexOf("\r\n")&&"N/A"!==e[t]&&"MFG_PN"!==e[t])e[t].split("\r\n").forEach((function(e){m[e]=n}));else if(void 0!==e[t]&&"string"===typeof e[t]&&-1===e[t].indexOf("\r\n")&&"N/A"!==e[t]&&"MFG_PN"!==e[t])e[t].split("\n").forEach((function(e){m[e]=n}));else if(void 0!==e[0]&&"string"===typeof e[0]&&-1!==e[0].indexOf("Item")){void 0===a&&(a=d);for(var l=0;l<e.length;l++)"string"===typeof e[l]&&"mfg_pn"===e[l].toLocaleLowerCase()&&(t=l)}d++})),document.getElementsByClassName("lds-ring")[0].style.height="0px",document.getElementsByClassName("lds-ring")[0].style.width="0px",document.getElementsByClassName("lds-ring")[0].style.marginTop="0px",document.getElementsByClassName("lds-ring")[0].style.visibility="hidden",v[a].push("Oracle P/N"),v[a].push("B/R after Reserve"),c=(c=c.slice(c.indexOf("fakepath")+9)).slice(0,c.indexOf(".xlsx"))+" - Comparison"+c.slice(c.indexOf(".xlsx")),l.setState({fileName:c,newCol:v[a].length,bomData:m,data:v,foundRows:null});break;case"inventoryData":v.forEach((function(e){if(void 0!==e[0]&&void 0!==e[t]&&e[t].length>0)e[t].replace(/\r\n/g,"|").replace(/,/g,"|").replace(/ /g,"").split("|").forEach((function(t){void 0===m[t]?m[t]=[e[0],e[n]]:-1===m[t][0].indexOf(e[0])&&(m[t][0]+=", \r\n".concat(e[0]),m[t][1]+=", \r\n".concat(e[n]))}));else if(void 0!==e[0]&&"string"===typeof e[0]&&void 0===t)for(var a=0;a<e.length;a++)"string"===typeof e[a]&&("mfg_pn"!==e[a].toLocaleLowerCase()&&-1===e[a].toLocaleLowerCase().indexOf("mfg part")||(t=a),-1!==e[a].toLocaleLowerCase().indexOf("reserve")&&(n=a))})),document.getElementsByClassName("lds-ring")[0].style.height="0px",document.getElementsByClassName("lds-ring")[0].style.width="0px",document.getElementsByClassName("lds-ring")[0].style.marginTop="0px",document.getElementsByClassName("lds-ring")[0].style.visibility="hidden",v=m,l.setState((i={},Object(r.a)(i,o,v),Object(r.a)(i,"foundRows",null),i))}},u.readAsArrayBuffer(s)}}},{key:"filterRows",value:function(){var e,t,n=this.state,a=n.bomData,l=n.inventoryData,i=n.data,s=n.fileName,r=n.newCol,o=[],c={},d=i.slice();Object.keys(a).forEach((function(e){void 0!==l[e]?(d[a[e]][r-2]=l[e][0],d[a[e]][r-1]=l[e][1],o.push(l[e])):c[e]=!0})),this.setState({foundRows:o,missing:c},(function(){e=p.utils.json_to_sheet(d,{header:["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"],skipHeader:!0}),t=p.utils.book_new(),p.utils.book_append_sheet(t,e,"parts"),p.writeFile(t,s)}))}},{key:"changeHandler",value:function(e){var t=e.target,n=t.name;this.setState(Object(r.a)({},n,t.value))}},{key:"render",value:function(){var e=this.state,t=e.bomData,n=e.inventoryData,a=e.foundRows;return l.a.createElement("div",{className:"App"},l.a.createElement("div",{className:"titleContainer"},l.a.createElement("p",{className:"title"},"Search Inventory")),l.a.createElement("div",{className:"fileInput"},l.a.createElement(h,{title:"BOM",fileHandler:this.fileHandler,name:"bomData"}),l.a.createElement(h,{title:"Inventory",fileHandler:this.fileHandler,name:"inventoryData"})),null!==t&&null!==n?l.a.createElement(v,{changeHandler:this.changeHandler,filterRows:this.filterRows}):void 0,l.a.createElement("div",{className:"lds-ring"},l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null),l.a.createElement("div",null)),null!==a?l.a.createElement("div",{className:"foundContainer"},l.a.createElement("div",{className:"foundHeader"},"Found"),l.a.createElement(g,{foundRows:a})):void 0)}}]),t}(l.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(l.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},7:function(e,t){}},[[14,1,2]]]);
//# sourceMappingURL=main.98553fae.chunk.js.map