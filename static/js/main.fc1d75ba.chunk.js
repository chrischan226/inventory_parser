(this.webpackJsonpinventory_parser=this.webpackJsonpinventory_parser||[]).push([[0],{14:function(e,t,a){e.exports=a(29)},19:function(e,t,a){},20:function(e,t,a){},27:function(e,t){},28:function(e,t){},29:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(7),o=a.n(i),s=(a(19),a(8)),c=a(9),l=a(10),u=a(12),d=a(11),h=a(1),f=a(13),m=(a(20),a(21)),v=function(e){function t(e){var a;return Object(c.a)(this,t),(a=Object(u.a)(this,Object(d.a)(t).call(this,e))).state={data:null,foundRows:[],search:""},a.fileHandler=a.fileHandler.bind(Object(h.a)(a)),a.filterRows=a.filterRows.bind(Object(h.a)(a)),a.changeHandler=a.changeHandler.bind(Object(h.a)(a)),a}return Object(f.a)(t,e),Object(l.a)(t,[{key:"fileHandler",value:function(e){var t=this,a=e.target.files[0];if(a){var n=new FileReader;n.onload=function(e){var a=e.target,n=new Uint8Array(a.result),r=m.read(n,{type:"array"}),i=r.Sheets[r.SheetNames[0]],o=m.utils.sheet_to_json(i,{header:1});t.setState({data:o})},n.readAsArrayBuffer(a)}}},{key:"filterRows",value:function(){var e=this.state,t=e.data,a=e.search,n=t.filter((function(e){if(-1!==e.join("").indexOf(a))return e}));this.setState({foundRows:n})}},{key:"changeHandler",value:function(e){var t=e.target,a=t.name;this.setState(Object(s.a)({},a,t.value))}},{key:"render",value:function(){var e=this.state,t=e.data,a=e.foundRows;return r.a.createElement("div",{className:"App"},r.a.createElement("div",{className:"titleContainer"},r.a.createElement("p",{className:"title"},"Search by Part Name")),r.a.createElement("input",{type:"file",id:"input",accept:".xls,.xlsx,.ods",onChange:this.fileHandler}),null!==t?r.a.createElement("div",{className:"searchContainer"},r.a.createElement("div",{className:"searchInput"},r.a.createElement("input",{type:"text",id:"search",name:"search",onChange:this.changeHandler,placeholder:"Search by Part Name..."}),r.a.createElement("button",{className:"submit",onClick:this.filterRows},"Search"))):void 0,null!==a?a.map((function(e){return r.a.createElement("div",{className:"foundRow"},e)})):void 0)}}]),t}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(v,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},6:function(e,t){}},[[14,1,2]]]);
//# sourceMappingURL=main.fc1d75ba.chunk.js.map