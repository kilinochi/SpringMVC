!function(t){function e(e){for(var r,s,a=e[0],u=e[1],c=e[2],f=0,h=[];f<a.length;f++)s=a[f],o[s]&&h.push(o[s][0]),o[s]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);for(l&&l(e);h.length;)h.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,a=1;a<n.length;a++){var u=n[a];0!==o[u]&&(r=!1)}r&&(i.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},o={0:0},i=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="";var a=window.webpackJsonp=window.webpackJsonp||[],u=a.push.bind(a);a.push=e,a=a.slice();for(var c=0;c<a.length;c++)e(a[c]);var l=u;i.push([84,1]),n()}({51:function(t,e,n){},84:function(t,e,n){"use strict";n.r(e);n(51);function r(t,e,n){var r=document.createElement(t);for(var o in e)r[o]=e[o];return n&&n.length>0&&n.forEach(function(t){return r.appendChild(t)}),r}n(23),n(27),n(28),n(45);function o(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var i=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.listeners={}}var e,n,r;return e=t,(n=[{key:"on",value:function(t,e){this.listeners[t]=this.listeners[t]||[],this.listeners[t].push(e)}},{key:"off",value:function(t,e){if(void 0===t)return this.listeners={},!0;var n=this.listeners[t];return!(!n||0===n.length)&&(this.listeners[t]=e?n.filter(function(t){return"function"==typeof t&&t!==e}):[],!0)}},{key:"trigger",value:function(t){for(var e=arguments.length,n=new Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];(this.listeners[t]||[]).forEach(function(t){return t.apply(void 0,n)})}}])&&o(e.prototype,n),r&&o(e,r),t}();function s(t){return(s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function a(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t,e){return!e||"object"!==s(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function c(t){return(c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function l(t,e){return(l=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var f=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=u(this,c(e).call(this))).array=t||[],n}var n,r,o;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&l(t,e)}(e,i),n=e,(r=[{key:"push",value:function(t){var e=this.array.push(t);return this.trigger("push",t),e}},{key:"clear",value:function(){this.array=[],this.trigger("clear")}},{key:"remove",value:function(t){this.array=this.array.filter(function(e){return t!==e}),this.trigger("remove",t)}},{key:"removeByIndex",value:function(t){var e=this.array[t];this.array.splice(t,1),this.trigger("remove",e)}},{key:"length",value:function(){return this.array.length}}])&&a(n.prototype,r),o&&a(n,o),e}();n(46),n(66),n(67),n(82);function h(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var d=function(){function t(){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.path="/todo"}var e,n,r;return e=t,(n=[{key:"create",value:function(t){return this._xhr("POST",{description:t})}},{key:"read",value:function(){return this._xhr("GET")}},{key:"update",value:function(t,e,n){return this._xhr("PUT",{id:t,description:e,isChecked:n})}},{key:"delete",value:function(t){return this._xhr("DELETE",{id:t})}},{key:"_xhr",value:function(t,e){var n=this;return new Promise(function(r,o){var i=new XMLHttpRequest,s=document.querySelector("meta[name='_csrf']").getAttribute("content"),a=document.querySelector("meta[name='_csrf_header']").getAttribute("content");i.open(t,n.path,!0),i.setRequestHeader(a,s),i.send(n._getFormData(e)),i.onreadystatechange=function(){4===i.readyState&&(200!==i.status&&o({statusCode:i.status,statusText:i.statusText}),r(JSON.parse(i.responseText)))}})}},{key:"_getFormData",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=new FormData;return Object.keys(t).forEach(function(n){return e.append(n,t[n])}),e}}])&&h(e.prototype,n),r&&h(e,r),t}();function p(t){return(p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function y(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function m(t,e){return!e||"object"!==p(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function v(t){return(v=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function b(t,e){return(b=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var _=function(t){function e(t,n,r,o){var i;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(i=m(this,v(e).call(this))).model=new d,i.DOMNode=i.render(t),i.isChecked=!!o,i.text=n,i.id=r,i}var n,o,s;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&b(t,e)}(e,i),n=e,(o=[{key:"_onTextFocus",value:function(){this._lastText=this.text}},{key:"_onTextBlur",value:function(){this.text!==this._lastText&&this.model.update(this.id,this.text,this.isChecked)}},{key:"render",value:function(t){var e=this;return this._checkbox=r("input",{type:"checkbox",className:"custom-checkbox_target",onclick:function(){return e.change()}}),this._textArea=r("textarea",{className:"todos-list_item_text",oninput:function(){return e.autoresize()},onfocus:function(){return e._onTextFocus()},onblur:function(){return e._onTextBlur()}}),t.appendChild(r("div",{className:"todos-list_item"},[r("div",{className:"custom-checkbox todos-list_item_ready-marker"},[this._checkbox,r("div",{className:"custom-checkbox_visual"},[r("div",{className:"custom-checkbox_visual_icon"})])]),r("button",{className:"todos-list_item_remove cross-button",onclick:function(){return e.remove()}}),r("div",{className:"todos-list_item_text-w"},[this._textArea])]))}},{key:"remove",value:function(){this.trigger("remove")}},{key:"change",value:function(){this.trigger("change"),this.model.update(this.id,this.text,this.isChecked),this.isChecked?this._textArea.style.textDecoration="line-through":this._textArea.style.textDecoration="none"}},{key:"autoresize",value:function(){this._textArea.style.height="36px",this._textArea.style.height=this._textArea.scrollHeight+"px"}},{key:"isChecked",get:function(){return!!this._checkbox&&this._checkbox.checked},set:function(t){this._checkbox&&(this._checkbox.checked=t)}},{key:"text",get:function(){return this._textArea?this._textArea.value:""},set:function(t){this._textArea&&(this._textArea.value=t)}}])&&y(n.prototype,o),s&&y(n,s),e}();function g(t){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}function k(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function x(t,e){return!e||"object"!==g(e)&&"function"!=typeof e?function(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}(t):e}function O(t){return(O=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)})(t)}function w(t,e){return(w=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t})(t,e)}var C=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=x(this,O(e).call(this))).DOMNode=n.render(t),n.items=new f,n.model=new d,n.model.read().then(function(t){t.forEach(function(t){n.renderItem(t.id,t.description,t.isChecked)})}),n}var n,o,s;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&w(t,e)}(e,i),n=e,(o=[{key:"render",value:function(t){return t.appendChild(r("div",{className:"todos-list"}))}},{key:"getItemsCount",value:function(){return this.items.length()}},{key:"addItem",value:function(t,e){var n=this;this.model.create(t).then(function(r){var o=new _(n.DOMNode,t,r.id,e);return o.on("remove",function(){return n.removeItem(o)}),o.on("change",function(){return n.trigger("itemchanged")}),n.items.push(o),n.trigger("itemchanged"),1==n.getItemsCount()&&n.trigger("notEmpty"),o})}},{key:"renderItem",value:function(t,e,n){var r=this,o=new _(this.DOMNode,e,t,n);return o.on("remove",function(){return r.removeItem(o)}),o.on("change",function(){return r.trigger("itemchanged")}),this.items.push(o),this.trigger("itemchanged"),1==this.getItemsCount()&&this.trigger("notEmpty"),o}},{key:"removeItem",value:function(t){this.items.remove(t),this.DOMNode.removeChild(t.DOMNode),this.trigger("itemchanged"),0===this.getItemsCount()&&this.trigger("empty"),this.model.delete(t.id)}},{key:"getUncheckedCount",value:function(){var t=0;return this.items.array.forEach(function(e){return t+=!e.isChecked}),t}},{key:"clearCompleated",value:function(){var t=this.items.array.slice(),e=!0,n=!1,r=void 0;try{for(var o,i=t[Symbol.iterator]();!(e=(o=i.next()).done);e=!0){var s=o.value;s.isChecked&&this.removeItem(s)}}catch(t){n=!0,r=t}finally{try{e||null==i.return||i.return()}finally{if(n)throw r}}}}])&&k(n.prototype,o),s&&k(n,s),e}();function N(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var S=function(){function t(e,n){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.todoList=n,this.DOMNode=this.render(e)}var e,n,o;return e=t,(n=[{key:"submit",value:function(t){this.input.trim().length>0&&this.todoList.addItem(this.input.trim()),this.input="",t.preventDefault()}},{key:"checkAll",value:function(){this.todoList.items.array.forEach(function(t){return t.isChecked=!0})}},{key:"render",value:function(t){var e=this;return this._inputControl=r("input",{type:"text",placeholder:"What needs to be done?",className:"todo-creator_text-input"}),t.insertBefore(r("form",{className:"todo-creator",onsubmit:function(t){return e.submit(t)}},[r("div",{className:"todo-creator_check-all",onclick:function(){return e.checkAll()}}),r("div",{className:"todo-creator_text-input-w"},[this._inputControl])]),this.todoList.DOMNode)}},{key:"input",get:function(){return this._inputControl.value},set:function(t){this._inputControl.value=t}}])&&N(e.prototype,n),o&&N(e,o),t}();n(83);function j(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}var L=function(){function t(e,n){var r=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.todoList=n,this.DOMNode=this.render(e),this.filterStatuses=Object.freeze({all:1,active:2,compleated:3}),this.filterStatus=this.filterStatuses.all,this.todoList.on("itemchanged",function(){return r.leftCount=r.todoList.getUncheckedCount()})}var e,n,o;return e=t,(n=[{key:"render",value:function(t){var e=this;this._itemsLeftCounter=document.createTextNode(this.todoList.getUncheckedCount()),this._filterAllBtn=r("button",{className:"filters-item all-btn __selected",textContent:"All",onclick:function(){return e.filterStatus=e.filterStatuses.all}}),this._filterActiveBtn=r("button",{className:"filters-item active-btn",textContent:"Active",onclick:function(){return e.filterStatus=e.filterStatuses.active}}),this._filterCompleatedBtn=r("button",{className:"filters-item completed-btn",textContent:"Completed",onclick:function(){return e.filterStatus=e.filterStatuses.compleated}});var n=document.createTextNode(" items left");return t.appendChild(r("div",{className:"todos-toolbar"},[r("div",{className:"todos-toolbar_unready-counter"},[this._itemsLeftCounter,n]),r("button",{className:"todos-toolbar_clear-completed",textContent:"Clear completed",onclick:function(){return e.todoList.clearCompleated()}}),r("div",{className:"filters todos-toolbar_filters"},[this._filterAllBtn,this._filterActiveBtn,this._filterCompleatedBtn])]))}},{key:"leftCount",get:function(){return this._itemsLeftCounter?this._itemsLeftCounter.textContent:"0"},set:function(t){this._itemsLeftCounter&&(this._itemsLeftCounter.textContent=t)}},{key:"filterStatus",set:function(t){this._filterActiveBtn.classList.remove("__selected"),this._filterCompleatedBtn.classList.remove("__selected"),this._filterAllBtn.classList.remove("__selected"),t==this.filterStatuses.all?(this._filterAllBtn.classList.add("__selected"),this.todoList.items.array.forEach(function(t){t.DOMNode.style.display="block"})):t==this.filterStatuses.active?(this._filterActiveBtn.classList.add("__selected"),this.todoList.items.array.forEach(function(t){t.isChecked?t.DOMNode.style.display="none":t.DOMNode.style.display="block"})):(this._filterCompleatedBtn.classList.add("__selected"),this.todoList.items.array.forEach(function(t){t.isChecked?t.DOMNode.style.display="block":t.DOMNode.style.display="none"}))}}])&&j(e.prototype,n),o&&j(e,o),t}();function E(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}new(function(){function t(e){var n=this;!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,t),this.DOMNode=this.render(e),this.todoList=new C(this.DOMNode),this.todoGenerator=new S(this.DOMNode,this.todoList),this.statusBar=new L(this.DOMNode,this.todoList),this.todoList.on("empty",function(){return n._board.classList.remove("__has-content")}),this.todoList.on("notEmpty",function(){return n._board.classList.add("__has-content")})}var e,n,o;return e=t,(n=[{key:"render",value:function(t){return this._board=r("div",{className:"todo-board"}),t.appendChild(this._board)}}])&&E(e.prototype,n),o&&E(e,o),t}())(document.querySelector(".main-layout")),console.log("init")}});
//# sourceMappingURL=app.8810ff82.js.map