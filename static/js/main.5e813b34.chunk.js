(this.webpackJsonpinventory_parser=this.webpackJsonpinventory_parser||[]).push([[0],{14:function(e,t,n){e.exports=n(29)},19:function(e,t,n){},20:function(e,t,n){},27:function(e,t){},28:function(e,t){},29:function(e,t,n){"use strict";n.r(t);var a=n(0),i=n.n(a),l=n(8),s=n.n(l),o=(n(19),n(2)),r=n(9),c=n(10),d=n(13),m=n(11),u=n(1),f=n(12),h=function(e){return i.a.createElement("div",{className:"inputContainer"},i.a.createElement("h3",null,e.title),i.a.createElement("input",{type:"file",id:"input",accept:".xls,.xlsx,.ods",onChange:e.fileHandler,name:e.name}))},v=function(e){return i.a.createElement("div",{className:"searchContainer"},i.a.createElement("div",{className:"searchInput"},i.a.createElement("button",{className:"submit",onClick:e.filterRows},"Compare")))},g=function(e){return e.foundRows.map((function(e,t){return i.a.createElement("div",{className:"foundRow",key:t},i.a.createElement("div",{className:"itemNum"},"Item #: ".concat(e[0])),i.a.createElement("div",{className:"quantity"},"Quantity: ".concat(e[1])))}))},p=(n(20),n(21)),y=function(e){function t(e){var n;return Object(r.a)(this,t),(n=Object(d.a)(this,Object(m.a)(t).call(this,e))).state={fileName:null,newCol:null,data:null,bomData:null,inventoryData:null,foundRows:null,missing:null,search:""},n.fileHandler=n.fileHandler.bind(Object(u.a)(n)),n.filterRows=n.filterRows.bind(Object(u.a)(n)),n.changeHandler=n.changeHandler.bind(Object(u.a)(n)),n}return Object(f.a)(t,e),Object(c.a)(t,[{key:"fileHandler",value:function(e){var t,n,a,i=this,l=e.target,s=l.files[0],r=l.name,c=l.value,d=0,m={};if(console.log(s),s){var u=new FileReader;document.getElementsByClassName("lds-ring")[0].style.height="80px",document.getElementsByClassName("lds-ring")[0].style.width="80px",document.getElementsByClassName("lds-ring")[0].style.marginTop="200px",document.getElementsByClassName("lds-ring")[0].style.visibility="visible",u.onload=function(e){var l,s=e.target,u=new Uint8Array(s.result),f=p.read(u,{type:"array"}),h=f.Sheets[f.SheetNames[0]],v=p.utils.sheet_to_json(h,{header:1});switch(r){case"bomData":v.forEach((function(e,n){if(void 0!==e[t]&&"string"===typeof e[t]&&-1!==e[t].indexOf("\r\n")&&"N/A"!==e[t]&&"MFG_PN"!==e[t])e[t].split("\r\n").forEach((function(e){void 0===m[e]?m[e]=[n]:m[e].push(n)}));else if(void 0!==e[t]&&"string"===typeof e[t]&&-1===e[t].indexOf("\r\n")&&"N/A"!==e[t]&&"MFG_PN"!==e[t])e[t].split("\n").forEach((function(e){void 0===m[e]?m[e]=[n]:m[e].push(n)}));else if(void 0!==e[0]&&"string"===typeof e[0]&&-1!==e[0].indexOf("Item")){void 0===a&&(a=d);for(var i=0;i<e.length;i++)"string"===typeof e[i]&&"mfg_pn"===e[i].toLocaleLowerCase()&&(t=i)}d++})),document.getElementsByClassName("lds-ring")[0].style.height="0px",document.getElementsByClassName("lds-ring")[0].style.width="0px",document.getElementsByClassName("lds-ring")[0].style.marginTop="0px",document.getElementsByClassName("lds-ring")[0].style.visibility="hidden",v[a].push("Oracle P/N"),v[a].push("B/R after Reserve"),c=(c=c.slice(c.indexOf("fakepath")+9)).slice(0,c.indexOf(".xlsx"))+" - Comparison"+c.slice(c.indexOf(".xlsx")),i.setState({fileName:c,newCol:v[a].length,bomData:m,data:v,foundRows:null});break;case"inventoryData":v.forEach((function(e){if(void 0!==e[0]&&void 0!==e[t]&&e[t].length>0)e[t].replace(/\r\n/g,"|").replace(/,/g,"|").replace(/ /g,"").split("|").forEach((function(t){void 0===m[t]?m[t]=[e[0],e[n]]:-1===m[t][0].indexOf(e[0])&&(m[t][0]+=", \r\n".concat(e[0]),m[t][1]+=", \r\n".concat(e[n]))}));else if(void 0!==e[0]&&"string"===typeof e[0]&&void 0===t)for(var a=0;a<e.length;a++)"string"===typeof e[a]&&("mfg_pn"!==e[a].toLocaleLowerCase()&&-1===e[a].toLocaleLowerCase().indexOf("mfg part")||(t=a),-1!==e[a].toLocaleLowerCase().indexOf("reserve")&&(n=a))})),document.getElementsByClassName("lds-ring")[0].style.height="0px",document.getElementsByClassName("lds-ring")[0].style.width="0px",document.getElementsByClassName("lds-ring")[0].style.marginTop="0px",document.getElementsByClassName("lds-ring")[0].style.visibility="hidden",v=m,i.setState((l={},Object(o.a)(l,r,v),Object(o.a)(l,"foundRows",null),l))}},u.readAsArrayBuffer(s)}}},{key:"filterRows",value:function(){var e,t,n=this.state,a=n.bomData,i=n.inventoryData,l=n.data,s=n.fileName,o=n.newCol,r=[],c={},d=l.slice();Object.keys(a).forEach((function(e){a[e].forEach((function(t){if(void 0!==i[e]){if(void 0===d[t][o-2]&&void 0===d[t][o-1])d[t][o-2]=i[e][0],d[t][o-1]=i[e][1];else{var n={},a=String(d[t][o-2]).split(","),l=String(d[t][o-1]).split(",");for(var s in a.forEach((function(e,t){n[e]=l[t]})),a=String(i[e][0]).split(","),l=String(i[e][1]).split(","),a.forEach((function(e,t){void 0===n[e]&&(n[e]=l[t])})),d[t][o-2]="",d[t][o-1]="",n)""===d[t][o-2]?d[t][o-2]="".concat(s):d[t][o-2]+=",".concat(s),""===d[t][o-1]?d[t][o-1]="".concat(n[s]):d[t][o-1]+=",".concat(n[s])}r.push(i[e])}else c[e]=!0}))})),this.setState({foundRows:r,missing:c},(function(){e=p.utils.json_to_sheet(d,{header:["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18"],skipHeader:!0}),t=p.utils.book_new(),p.utils.book_append_sheet(t,e,"parts"),p.writeFile(t,s)}))}},{key:"changeHandler",value:function(e){var t=e.target,n=t.name;this.setState(Object(o.a)({},n,t.value))}},{key:"render",value:function(){var e=this.state,t=e.bomData,n=e.inventoryData,a=e.foundRows;return i.a.createElement("div",{className:"App"},i.a.createElement("div",{className:"titleContainer"},i.a.createElement("p",{className:"title"},"Search Inventory")),i.a.createElement("div",{className:"fileInput"},i.a.createElement(h,{title:"BOM",fileHandler:this.fileHandler,name:"bomData"}),i.a.createElement(h,{title:"Inventory",fileHandler:this.fileHandler,name:"inventoryData"})),null!==t&&null!==n?i.a.createElement(v,{changeHandler:this.changeHandler,filterRows:this.filterRows}):void 0,i.a.createElement("div",{className:"lds-ring"},i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null),i.a.createElement("div",null)),null!==a?i.a.createElement("div",{className:"foundContainer"},i.a.createElement("div",{className:"foundHeader"},"Found"),i.a.createElement(g,{foundRows:a})):void 0)}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},7:function(e,t){}},[[14,1,2]]]);
//# sourceMappingURL=main.5e813b34.chunk.js.map