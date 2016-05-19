if(typeof Math.imul == "undefined" || (Math.imul(0xffffffff,5) == 0)) {
    Math.imul = function (a, b) {
        var ah  = (a >>> 16) & 0xffff;
        var al = a & 0xffff;
        var bh  = (b >>> 16) & 0xffff;
        var bl = b & 0xffff;
        // the shift by 0 fixes the sign on the high part
        // the final |0 converts the unsigned value into a signed value
        return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0)|0);
    }
}

(function(n){if("object"==typeof exports&&"object"==typeof module)module.exports=n();else{if("function"==typeof define&&define.amd)return define([],n);(this||window).CodeMirror=n()}})(function(){function n(a,b){if(!(this instanceof n))return new n(a,b);this.options=b=b?X(b):{};X(wf,b,!1);wc(b);var c=b.value;"string"==typeof c&&(c=new P(c,b.mode,null,b.lineSeparator));this.doc=c;var d=new n.inputStyles[b.inputStyle](this),d=this.display=new xf(a,c,d);d.wrapper.CodeMirror=this;zd(this);Ad(this);b.lineWrapping&&
(this.display.wrapper.className+=" CodeMirror-wrap");b.autofocus&&!bb&&d.input.focus();Bd(this);this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:!1,cutIncoming:!1,selectingText:!1,draggingText:!1,highlight:new ua,keySeq:null,specialChars:null};var e=this;A&&11>C&&setTimeout(function(){e.display.input.reset(!0)},20);yf(this);Cd||(zf(),Cd=!0);Ka(this);this.curOp.forceUpdate=!0;Dd(this,c);b.autofocus&&!bb||e.hasFocus()?setTimeout(cb(xc,
this),20):db(this);for(var f in La)if(La.hasOwnProperty(f))La[f](this,b[f],Ed);Fd(this);b.finishInit&&b.finishInit(this);for(c=0;c<yc.length;++c)yc[c](this);Ma(this);K&&b.lineWrapping&&"optimizelegibility"==getComputedStyle(d.lineDiv).textRendering&&(d.lineDiv.style.textRendering="auto")}function xf(a,b,c){this.input=c;this.scrollbarFiller=r("div",null,"CodeMirror-scrollbar-filler");this.scrollbarFiller.setAttribute("cm-not-content","true");this.gutterFiller=r("div",null,"CodeMirror-gutter-filler");
this.gutterFiller.setAttribute("cm-not-content","true");this.lineDiv=r("div",null,"CodeMirror-code");this.selectionDiv=r("div",null,null,"position: relative; z-index: 1");this.cursorDiv=r("div",null,"CodeMirror-cursors");this.measure=r("div",null,"CodeMirror-measure");this.lineMeasure=r("div",null,"CodeMirror-measure");this.lineSpace=r("div",[this.measure,this.lineMeasure,this.selectionDiv,this.cursorDiv,this.lineDiv],null,"position: relative; outline: none");this.mover=r("div",[r("div",[this.lineSpace],
"CodeMirror-lines")],null,"position: relative");this.sizer=r("div",[this.mover],"CodeMirror-sizer");this.sizerWidth=null;this.heightForcer=r("div",null,null,"position: absolute; height: "+Gd+"px; width: 1px;");this.gutters=r("div",null,"CodeMirror-gutters");this.lineGutter=null;this.scroller=r("div",[this.sizer,this.heightForcer,this.gutters],"CodeMirror-scroll");this.scroller.setAttribute("tabIndex","-1");this.wrapper=r("div",[this.scrollbarFiller,this.gutterFiller,this.scroller],"CodeMirror");A&&
8>C&&(this.gutters.style.zIndex=-1,this.scroller.style.paddingRight=0);K||oa&&bb||(this.scroller.draggable=!0);a&&(a.appendChild?a.appendChild(this.wrapper):a(this.wrapper));this.reportedViewFrom=this.reportedViewTo=this.viewFrom=this.viewTo=b.first;this.view=[];this.externalMeasured=this.renderedView=null;this.lastWrapHeight=this.lastWrapWidth=this.viewOffset=0;this.updateLineNumbers=null;this.nativeBarWidth=this.barHeight=this.barWidth=0;this.scrollbarsClipped=!1;this.lineNumWidth=this.lineNumInnerWidth=
this.lineNumChars=null;this.alignWidgets=!1;this.maxLine=this.cachedCharWidth=this.cachedTextHeight=this.cachedPaddingH=null;this.maxLineLength=0;this.maxLineChanged=!1;this.wheelDX=this.wheelDY=this.wheelStartX=this.wheelStartY=null;this.shift=!1;this.activeTouch=this.selForContextMenu=null;c.init(this)}function zc(a){a.doc.mode=n.getMode(a.options,a.doc.modeOption);eb(a)}function eb(a){a.doc.iter(function(a){a.stateAfter&&(a.stateAfter=null);a.styles&&(a.styles=null)});a.doc.frontier=a.doc.first;
fb(a,100);a.state.modeGen++;a.curOp&&O(a)}function Hd(a){var b=va(a.display),c=a.options.lineWrapping,d=c&&Math.max(5,a.display.scroller.clientWidth/gb(a.display)-3);return function(e){if(wa(a.doc,e))return 0;var f=0;if(e.widgets)for(var g=0;g<e.widgets.length;g++)e.widgets[g].height&&(f+=e.widgets[g].height);return c?f+(Math.ceil(e.text.length/d)||1)*b:f+b}}function Ac(a){var b=a.doc,c=Hd(a);b.iter(function(a){var b=c(a);b!=a.height&&ca(a,b)})}function Ad(a){a.display.wrapper.className=a.display.wrapper.className.replace(/\s*cm-s-\S+/g,
"")+a.options.theme.replace(/(^|\s)\s*/g," cm-s-");hb(a)}function ib(a){zd(a);O(a);setTimeout(function(){Bc(a)},20)}function zd(a){var b=a.display.gutters,c=a.options.gutters;xa(b);for(var d=0;d<c.length;++d){var e=c[d],f=b.appendChild(r("div",null,"CodeMirror-gutter "+e));"CodeMirror-linenumbers"==e&&(a.display.lineGutter=f,f.style.width=(a.display.lineNumWidth||1)+"px")}b.style.display=d?"":"none";Cc(a)}function Cc(a){a.display.sizer.style.marginLeft=a.display.gutters.offsetWidth+"px"}function Jb(a){if(0==
a.height)return 0;for(var b=a.text.length,c,d=a;c=ya(d,!0);)c=c.find(0,!0),d=c.from.line,b+=c.from.ch-c.to.ch;for(d=a;c=ya(d,!1);)c=c.find(0,!0),b-=d.text.length-c.from.ch,d=c.to.line,b+=d.text.length-c.to.ch;return b}function Dc(a){var b=a.display;a=a.doc;b.maxLine=t(a,a.first);b.maxLineLength=Jb(b.maxLine);b.maxLineChanged=!0;a.iter(function(a){var d=Jb(a);d>b.maxLineLength&&(b.maxLineLength=d,b.maxLine=a)})}function wc(a){var b=D(a.gutters,"CodeMirror-linenumbers");-1==b&&a.lineNumbers?a.gutters=
a.gutters.concat(["CodeMirror-linenumbers"]):-1<b&&!a.lineNumbers&&(a.gutters=a.gutters.slice(0),a.gutters.splice(b,1))}function jb(a){var b=a.display,c=b.gutters.offsetWidth,d=Math.round(a.doc.height+Ec(a.display));return{clientHeight:b.scroller.clientHeight,viewHeight:b.wrapper.clientHeight,scrollWidth:b.scroller.scrollWidth,clientWidth:b.scroller.clientWidth,viewWidth:b.wrapper.clientWidth,barLeft:a.options.fixedGutter?c:0,docHeight:d,scrollHeight:d+da(a)+b.barHeight,nativeBarWidth:b.nativeBarWidth,
gutterWidth:c}}function Fc(a,b,c){this.cm=c;var d=this.vert=r("div",[r("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar"),e=this.horiz=r("div",[r("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar");a(d);a(e);u(d,"scroll",function(){d.clientHeight&&b(d.scrollTop,"vertical")});u(e,"scroll",function(){e.clientWidth&&b(e.scrollLeft,"horizontal")});this.checkedZeroWidth=!1;A&&8>C&&(this.horiz.style.minHeight=this.vert.style.minWidth="18px")}function Gc(){}function Bd(a){a.display.scrollbars&&
(a.display.scrollbars.clear(),a.display.scrollbars.addClass&&kb(a.display.wrapper,a.display.scrollbars.addClass));a.display.scrollbars=new n.scrollbarModel[a.options.scrollbarStyle](function(b){a.display.wrapper.insertBefore(b,a.display.scrollbarFiller);u(b,"mousedown",function(){a.state.focused&&setTimeout(function(){a.display.input.focus()},0)});b.setAttribute("cm-not-content","true")},function(b,c){"horizontal"==c?Na(a,b):lb(a,b)},a);a.display.scrollbars.addClass&&mb(a.display.wrapper,a.display.scrollbars.addClass)}
function Oa(a,b){b||(b=jb(a));var c=a.display.barWidth,d=a.display.barHeight;Id(a,b);for(var e=0;4>e&&c!=a.display.barWidth||d!=a.display.barHeight;e++)c!=a.display.barWidth&&a.options.lineWrapping&&Kb(a),Id(a,jb(a)),c=a.display.barWidth,d=a.display.barHeight}function Id(a,b){var c=a.display,d=c.scrollbars.update(b);c.sizer.style.paddingRight=(c.barWidth=d.right)+"px";c.sizer.style.paddingBottom=(c.barHeight=d.bottom)+"px";d.right&&d.bottom?(c.scrollbarFiller.style.display="block",c.scrollbarFiller.style.height=
d.bottom+"px",c.scrollbarFiller.style.width=d.right+"px"):c.scrollbarFiller.style.display="";d.bottom&&a.options.coverGutterNextToScrollbar&&a.options.fixedGutter?(c.gutterFiller.style.display="block",c.gutterFiller.style.height=d.bottom+"px",c.gutterFiller.style.width=b.gutterWidth+"px"):c.gutterFiller.style.display=""}function Hc(a,b,c){var d=c&&null!=c.top?Math.max(0,c.top):a.scroller.scrollTop,d=Math.floor(d-a.lineSpace.offsetTop),e=c&&null!=c.bottom?c.bottom:d+a.wrapper.clientHeight,d=za(b,d),
e=za(b,e);if(c&&c.ensure){var f=c.ensure.from.line;c=c.ensure.to.line;f<d?(d=f,e=za(b,ea(t(b,f))+a.wrapper.clientHeight)):Math.min(c,b.lastLine())>=e&&(d=za(b,ea(t(b,c))-a.wrapper.clientHeight),e=c)}return{from:d,to:Math.max(e,d+1)}}function Bc(a){var b=a.display,c=b.view;if(b.alignWidgets||b.gutters.firstChild&&a.options.fixedGutter){for(var d=Ic(b)-b.scroller.scrollLeft+a.doc.scrollLeft,e=b.gutters.offsetWidth,f=d+"px",g=0;g<c.length;g++)if(!c[g].hidden){a.options.fixedGutter&&c[g].gutter&&(c[g].gutter.style.left=
f);var h=c[g].alignable;if(h)for(var k=0;k<h.length;k++)h[k].style.left=f}a.options.fixedGutter&&(b.gutters.style.left=d+e+"px")}}function Fd(a){if(!a.options.lineNumbers)return!1;var b=a.doc,b=Jc(a.options,b.first+b.size-1),c=a.display;if(b.length!=c.lineNumChars){var d=c.measure.appendChild(r("div",[r("div",b)],"CodeMirror-linenumber CodeMirror-gutter-elt")),e=d.firstChild.offsetWidth,d=d.offsetWidth-e;c.lineGutter.style.width="";c.lineNumInnerWidth=Math.max(e,c.lineGutter.offsetWidth-d)+1;c.lineNumWidth=
c.lineNumInnerWidth+d;c.lineNumChars=c.lineNumInnerWidth?b.length:-1;c.lineGutter.style.width=c.lineNumWidth+"px";Cc(a);return!0}return!1}function Jc(a,b){return String(a.lineNumberFormatter(b+a.firstLineNumber))}function Ic(a){return a.scroller.getBoundingClientRect().left-a.sizer.getBoundingClientRect().left}function Lb(a,b,c){var d=a.display;this.viewport=b;this.visible=Hc(d,a.doc,b);this.editorIsHidden=!d.wrapper.offsetWidth;this.wrapperHeight=d.wrapper.clientHeight;this.wrapperWidth=d.wrapper.clientWidth;
this.oldDisplayWidth=pa(a);this.force=c;this.dims=Kc(a);this.events=[]}function Lc(a,b){var c=a.display,d=a.doc;if(b.editorIsHidden)return qa(a),!1;if(!b.force&&b.visible.from>=c.viewFrom&&b.visible.to<=c.viewTo&&(null==c.updateLineNumbers||c.updateLineNumbers>=c.viewTo)&&c.renderedView==c.view&&0==Jd(a))return!1;Fd(a)&&(qa(a),b.dims=Kc(a));var e=d.first+d.size,f=Math.max(b.visible.from-a.options.viewportMargin,d.first),g=Math.min(e,b.visible.to+a.options.viewportMargin);c.viewFrom<f&&20>f-c.viewFrom&&
(f=Math.max(d.first,c.viewFrom));c.viewTo>g&&20>c.viewTo-g&&(g=Math.min(e,c.viewTo));ra&&(f=Mc(a.doc,f),g=Kd(a.doc,g));d=f!=c.viewFrom||g!=c.viewTo||c.lastWrapHeight!=b.wrapperHeight||c.lastWrapWidth!=b.wrapperWidth;e=a.display;0==e.view.length||f>=e.viewTo||g<=e.viewFrom?(e.view=Mb(a,f,g),e.viewFrom=f):(e.viewFrom>f?e.view=Mb(a,f,e.viewFrom).concat(e.view):e.viewFrom<f&&(e.view=e.view.slice(Aa(a,f))),e.viewFrom=f,e.viewTo<g?e.view=e.view.concat(Mb(a,e.viewTo,g)):e.viewTo>g&&(e.view=e.view.slice(0,
Aa(a,g))));e.viewTo=g;c.viewOffset=ea(t(a.doc,c.viewFrom));a.display.mover.style.top=c.viewOffset+"px";g=Jd(a);if(!d&&0==g&&!b.force&&c.renderedView==c.view&&(null==c.updateLineNumbers||c.updateLineNumbers>=c.viewTo))return!1;f=fa();4<g&&(c.lineDiv.style.display="none");Af(a,c.updateLineNumbers,b.dims);4<g&&(c.lineDiv.style.display="");c.renderedView=c.view;f&&fa()!=f&&f.offsetHeight&&f.focus();xa(c.cursorDiv);xa(c.selectionDiv);c.gutters.style.height=c.sizer.style.minHeight=0;d&&(c.lastWrapHeight=
b.wrapperHeight,c.lastWrapWidth=b.wrapperWidth,fb(a,400));c.updateLineNumbers=null;return!0}function Ld(a,b){for(var c=b.viewport,d=!0;;d=!1){if(!d||!a.options.lineWrapping||b.oldDisplayWidth==pa(a))if(c&&null!=c.top&&(c={top:Math.min(a.doc.height+Ec(a.display)-Nc(a),c.top)}),b.visible=Hc(a.display,a.doc,c),b.visible.from>=a.display.viewFrom&&b.visible.to<=a.display.viewTo)break;if(!Lc(a,b))break;Kb(a);d=jb(a);nb(a);Oc(a,d);Oa(a,d)}b.signal(a,"update",a);if(a.display.viewFrom!=a.display.reportedViewFrom||
a.display.viewTo!=a.display.reportedViewTo)b.signal(a,"viewportChange",a,a.display.viewFrom,a.display.viewTo),a.display.reportedViewFrom=a.display.viewFrom,a.display.reportedViewTo=a.display.viewTo}function Pc(a,b){var c=new Lb(a,b);if(Lc(a,c)){Kb(a);Ld(a,c);var d=jb(a);nb(a);Oc(a,d);Oa(a,d);c.finish()}}function Oc(a,b){a.display.sizer.style.minHeight=b.docHeight+"px";var c=b.docHeight+a.display.barHeight;a.display.heightForcer.style.top=c+"px";a.display.gutters.style.height=Math.max(c+da(a),b.clientHeight)+
"px"}function Kb(a){a=a.display;for(var b=a.lineDiv.offsetTop,c=0;c<a.view.length;c++){var d=a.view[c],e;if(!d.hidden){if(A&&8>C){var f=d.node.offsetTop+d.node.offsetHeight;e=f-b;b=f}else e=d.node.getBoundingClientRect(),e=e.bottom-e.top;f=d.line.height-e;2>e&&(e=va(a));if(.001<f||-.001>f)if(ca(d.line,e),Md(d.line),d.rest)for(e=0;e<d.rest.length;e++)Md(d.rest[e])}}}function Md(a){if(a.widgets)for(var b=0;b<a.widgets.length;++b)a.widgets[b].height=a.widgets[b].node.parentNode.offsetHeight}function Kc(a){for(var b=
a.display,c={},d={},e=b.gutters.clientLeft,f=b.gutters.firstChild,g=0;f;f=f.nextSibling,++g)c[a.options.gutters[g]]=f.offsetLeft+f.clientLeft+e,d[a.options.gutters[g]]=f.clientWidth;return{fixedPos:Ic(b),gutterTotalWidth:b.gutters.offsetWidth,gutterLeft:c,gutterWidth:d,wrapperWidth:b.wrapper.clientWidth}}function Af(a,b,c){function d(b){var c=b.nextSibling;K&&Y&&a.display.currentWheelTarget==b?b.style.display="none":b.parentNode.removeChild(b);return c}for(var e=a.display,f=a.options.lineNumbers,
g=e.lineDiv,h=g.firstChild,k=e.view,e=e.viewFrom,l=0;l<k.length;l++){var m=k[l];if(!m.hidden)if(m.node&&m.node.parentNode==g){for(;h!=m.node;)h=d(h);h=f&&null!=b&&b<=e&&m.lineNumber;m.changes&&(-1<D(m.changes,"gutter")&&(h=!1),Nd(a,m,e,c));h&&(xa(m.lineNumber),m.lineNumber.appendChild(document.createTextNode(Jc(a.options,e))));h=m.node.nextSibling}else{var s=Bf(a,m,e,c);g.insertBefore(s,h)}e+=m.size}for(;h;)h=d(h)}function Nd(a,b,c,d){for(var e=0;e<b.changes.length;e++){var f=b.changes[e];if("text"==
f){var f=b,g=f.text.className,h=Od(a,f);f.text==f.node&&(f.node=h.pre);f.text.parentNode.replaceChild(h.pre,f.text);f.text=h.pre;h.bgClass!=f.bgClass||h.textClass!=f.textClass?(f.bgClass=h.bgClass,f.textClass=h.textClass,Qc(f)):g&&(f.text.className=g)}else if("gutter"==f)Pd(a,b,c,d);else if("class"==f)Qc(b);else if("widget"==f){f=a;g=b;h=d;g.alignable&&(g.alignable=null);for(var k=g.node.firstChild,l=void 0;k;k=l)l=k.nextSibling,"CodeMirror-linewidget"==k.className&&g.node.removeChild(k);Qd(f,g,h)}}b.changes=
null}function ob(a){a.node==a.text&&(a.node=r("div",null,null,"position: relative"),a.text.parentNode&&a.text.parentNode.replaceChild(a.node,a.text),a.node.appendChild(a.text),A&&8>C&&(a.node.style.zIndex=2));return a.node}function Od(a,b){var c=a.display.externalMeasured;return c&&c.line==b.line?(a.display.externalMeasured=null,b.measure=c.measure,c.built):Rd(a,b)}function Qc(a){var b=a.bgClass?a.bgClass+" "+(a.line.bgClass||""):a.line.bgClass;b&&(b+=" CodeMirror-linebackground");if(a.background)b?
a.background.className=b:(a.background.parentNode.removeChild(a.background),a.background=null);else if(b){var c=ob(a);a.background=c.insertBefore(r("div",null,b),c.firstChild)}a.line.wrapClass?ob(a).className=a.line.wrapClass:a.node!=a.text&&(a.node.className="");a.text.className=(a.textClass?a.textClass+" "+(a.line.textClass||""):a.line.textClass)||""}function Pd(a,b,c,d){b.gutter&&(b.node.removeChild(b.gutter),b.gutter=null);b.gutterBackground&&(b.node.removeChild(b.gutterBackground),b.gutterBackground=
null);if(b.line.gutterClass){var e=ob(b);b.gutterBackground=r("div",null,"CodeMirror-gutter-background "+b.line.gutterClass,"left: "+(a.options.fixedGutter?d.fixedPos:-d.gutterTotalWidth)+"px; width: "+d.gutterTotalWidth+"px");e.insertBefore(b.gutterBackground,b.text)}var f=b.line.gutterMarkers;if(a.options.lineNumbers||f){var e=ob(b),g=b.gutter=r("div",null,"CodeMirror-gutter-wrapper","left: "+(a.options.fixedGutter?d.fixedPos:-d.gutterTotalWidth)+"px");a.display.input.setUneditable(g);e.insertBefore(g,
b.text);b.line.gutterClass&&(g.className+=" "+b.line.gutterClass);!a.options.lineNumbers||f&&f["CodeMirror-linenumbers"]||(b.lineNumber=g.appendChild(r("div",Jc(a.options,c),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+d.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+a.display.lineNumInnerWidth+"px")));if(f)for(b=0;b<a.options.gutters.length;++b)c=a.options.gutters[b],(e=f.hasOwnProperty(c)&&f[c])&&g.appendChild(r("div",[e],"CodeMirror-gutter-elt","left: "+d.gutterLeft[c]+"px; width: "+
d.gutterWidth[c]+"px"))}}function Bf(a,b,c,d){var e=Od(a,b);b.text=b.node=e.pre;e.bgClass&&(b.bgClass=e.bgClass);e.textClass&&(b.textClass=e.textClass);Qc(b);Pd(a,b,c,d);Qd(a,b,d);return b.node}function Qd(a,b,c){Sd(a,b.line,b,c,!0);if(b.rest)for(var d=0;d<b.rest.length;d++)Sd(a,b.rest[d],b,c,!1)}function Sd(a,b,c,d,e){if(b.widgets){var f=ob(c),g=0;for(b=b.widgets;g<b.length;++g){var h=b[g],k=r("div",[h.node],"CodeMirror-linewidget");h.handleMouseEvents||k.setAttribute("cm-ignore-events","true");
var l=h,m=k,s=d;if(l.noHScroll){(c.alignable||(c.alignable=[])).push(m);var p=s.wrapperWidth;m.style.left=s.fixedPos+"px";l.coverGutter||(p-=s.gutterTotalWidth,m.style.paddingLeft=s.gutterTotalWidth+"px");m.style.width=p+"px"}l.coverGutter&&(m.style.zIndex=5,m.style.position="relative",l.noHScroll||(m.style.marginLeft=-s.gutterTotalWidth+"px"));a.display.input.setUneditable(k);e&&h.above?f.insertBefore(k,c.gutter||c.text):f.appendChild(k);Q(h,"redraw")}}}function Rc(a){return q(a.line,a.ch)}function Nb(a,
b){return 0>w(a,b)?b:a}function Ob(a,b){return 0>w(a,b)?a:b}function Td(a){a.state.focused||(a.display.input.focus(),xc(a))}function Pb(a,b,c,d,e){var f=a.doc;a.display.shift=!1;d||(d=f.sel);var g=a.state.pasteIncoming||"paste"==e,h=f.splitLines(b),k=null;if(g&&1<d.ranges.length)if(V&&V.join("\n")==b){if(0==d.ranges.length%V.length)for(var k=[],l=0;l<V.length;l++)k.push(f.splitLines(V[l]))}else h.length==d.ranges.length&&(k=Qb(h,function(a){return[a]}));for(l=d.ranges.length-1;0<=l;l--){var m=d.ranges[l],
s=m.from(),p=m.to();m.empty()&&(c&&0<c?s=q(s.line,s.ch-c):a.state.overwrite&&!g&&(p=q(p.line,Math.min(t(f,p.line).text.length,p.ch+z(h).length))));m=a.curOp.updateInput;s={from:s,to:p,text:k?k[l%k.length]:h,origin:e||(g?"paste":a.state.cutIncoming?"cut":"+input")};Pa(a.doc,s);Q(a,"inputRead",a,s)}b&&!g&&Ud(a,b);Qa(a);a.curOp.updateInput=m;a.curOp.typing=!0;a.state.pasteIncoming=a.state.cutIncoming=!1}function Vd(a,b){var c=a.clipboardData&&a.clipboardData.getData("text/plain");if(c)return a.preventDefault(),
b.isReadOnly()||b.options.disableInput||R(b,function(){Pb(b,c,0,null,"paste")}),!0}function Ud(a,b){if(a.options.electricChars&&a.options.smartIndent)for(var c=a.doc.sel,d=c.ranges.length-1;0<=d;d--){var e=c.ranges[d];if(!(100<e.head.ch||d&&c.ranges[d-1].head.line==e.head.line)){var f=a.getModeAt(e.head),g=!1;if(f.electricChars)for(var h=0;h<f.electricChars.length;h++){if(-1<b.indexOf(f.electricChars.charAt(h))){g=pb(a,e.head.line,"smart");break}}else f.electricInput&&f.electricInput.test(t(a.doc,
e.head.line).text.slice(0,e.head.ch))&&(g=pb(a,e.head.line,"smart"));g&&Q(a,"electricInput",a,e.head.line)}}}function Wd(a){for(var b=[],c=[],d=0;d<a.doc.sel.ranges.length;d++){var e=a.doc.sel.ranges[d].head.line,e={anchor:q(e,0),head:q(e+1,0)};c.push(e);b.push(a.getRange(e.anchor,e.head))}return{text:b,ranges:c}}function Xd(a){a.setAttribute("autocorrect","off");a.setAttribute("autocapitalize","off");a.setAttribute("spellcheck","false")}function Sc(a){this.cm=a;this.prevInput="";this.pollingFast=
!1;this.polling=new ua;this.hasSelection=this.inaccurateSelection=!1;this.composing=null}function Yd(){var a=r("textarea",null,null,"position: absolute; padding: 0; width: 1px; height: 1em; outline: none"),b=r("div",[a],null,"overflow: hidden; position: relative; width: 3px; height: 0px;");K?a.style.width="1000px":a.setAttribute("wrap","off");Ra&&(a.style.border="1px solid black");Xd(a);return b}function Tc(a){this.cm=a;this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=
null;this.polling=new ua;this.gracePeriod=!1}function Zd(a,b){var c=Uc(a,b.line);if(!c||c.hidden)return null;var d=t(a.doc,b.line),c=$d(c,d,b.line),d=Z(d),e="left";d&&(e=Rb(d,b.ch)%2?"right":"left");c=ae(c.map,b.ch,e);c.offset="right"==c.collapse?c.end:c.start;return c}function Sa(a,b){b&&(a.bad=!0);return a}function Sb(a,b,c){var d;if(b==a.display.lineDiv){d=a.display.lineDiv.childNodes[c];if(!d)return Sa(a.clipPos(q(a.display.viewTo-1)),!0);b=null;c=0}else for(d=b;;d=d.parentNode){if(!d||d==a.display.lineDiv)return null;
if(d.parentNode&&d.parentNode==a.display.lineDiv)break}for(var e=0;e<a.display.view.length;e++){var f=a.display.view[e];if(f.node==d)return Cf(f,b,c)}}function Cf(a,b,c){function d(b,c,d){for(var e=-1;e<(l?l.length:0);e++)for(var f=0>e?k.map:l[e],g=0;g<f.length;g+=3){var h=f[g+2];if(h==b||h==c){c=E(0>e?a.line:a.rest[e]);e=f[g]+d;if(0>d||h!=b)e=f[g+(d?1:0)];return q(c,e)}}}var e=a.text.firstChild,f=!1;if(!b||!Vc(e,b))return Sa(q(E(a.line),0),!0);if(b==e&&(f=!0,b=e.childNodes[c],c=0,!b))return c=a.rest?
z(a.rest):a.line,Sa(q(E(c),c.text.length),f);var g=3==b.nodeType?b:null,h=b;g||1!=b.childNodes.length||3!=b.firstChild.nodeType||(g=b.firstChild,c&&(c=g.nodeValue.length));for(;h.parentNode!=e;)h=h.parentNode;var k=a.measure,l=k.maps;if(b=d(g,h,c))return Sa(b,f);e=h.nextSibling;for(g=g?g.nodeValue.length-c:0;e;e=e.nextSibling){if(b=d(e,e.firstChild,0))return Sa(q(b.line,b.ch-g),f);g+=e.textContent.length}h=h.previousSibling;for(g=c;h;h=h.previousSibling){if(b=d(h,h.firstChild,-1))return Sa(q(b.line,
b.ch+g),f);g+=e.textContent.length}}function Df(a,b,c,d,e){function f(a){return function(b){return b.id==a}}function g(b){if(1==b.nodeType){var c=b.getAttribute("cm-text");if(null!=c)""==c&&(c=b.textContent.replace(/\u200b/g,"")),h+=c;else{var c=b.getAttribute("cm-marker"),p;if(c)b=a.findMarks(q(d,0),q(e+1,0),f(+c)),b.length&&(p=b[0].find())&&(h+=Ba(a.doc,p.from,p.to).join(l));else if("false"!=b.getAttribute("contenteditable")){for(p=0;p<b.childNodes.length;p++)g(b.childNodes[p]);/^(pre|div|p)$/i.test(b.nodeName)&&
(k=!0)}}}else 3==b.nodeType&&(b=b.nodeValue)&&(k&&(h+=l,k=!1),h+=b)}for(var h="",k=!1,l=a.doc.lineSeparator();;){g(b);if(b==c)break;b=b.nextSibling}return h}function ka(a,b){this.ranges=a;this.primIndex=b}function y(a,b){this.anchor=a;this.head=b}function $(a,b){var c=a[b];a.sort(function(a,b){return w(a.from(),b.from())});b=D(a,c);for(c=1;c<a.length;c++){var d=a[c],e=a[c-1];if(0<=w(e.to(),d.from())){var f=Ob(e.from(),d.from()),g=Nb(e.to(),d.to()),d=e.empty()?d.from()==d.head:e.from()==e.head;c<=
b&&--b;a.splice(--c,2,new y(d?g:f,d?f:g))}}return new ka(a,b)}function ga(a,b){return new ka([new y(a,b||a)],0)}function x(a,b){if(b.line<a.first)return q(a.first,0);var c=a.first+a.size-1;if(b.line>c)return q(c,t(a,c).text.length);var c=t(a,b.line).text.length,d=b.ch,c=null==d||d>c?q(b.line,c):0>d?q(b.line,0):b;return c}function qb(a,b){return b>=a.first&&b<a.first+a.size}function be(a,b){for(var c=[],d=0;d<b.length;d++)c[d]=x(a,b[d]);return c}function rb(a,b,c,d){return a.cm&&a.cm.display.shift||
a.extend?(a=b.anchor,d&&(b=0>w(c,a),b!=0>w(d,a)?(a=c,c=d):b!=0>w(c,d)&&(c=d)),new y(a,c)):new y(d||c,c)}function Tb(a,b,c,d){H(a,new ka([rb(a,a.sel.primary(),b,c)],0),d)}function ce(a,b,c){for(var d=[],e=0;e<a.sel.ranges.length;e++)d[e]=rb(a,a.sel.ranges[e],b[e],null);b=$(d,a.sel.primIndex);H(a,b,c)}function Wc(a,b,c,d){var e=a.sel.ranges.slice(0);e[b]=c;H(a,$(e,a.sel.primIndex),d)}function Ef(a,b,c){c={ranges:b.ranges,update:function(b){this.ranges=[];for(var c=0;c<b.length;c++)this.ranges[c]=new y(x(a,
b[c].anchor),x(a,b[c].head))},origin:c&&c.origin};J(a,"beforeSelectionChange",a,c);a.cm&&J(a.cm,"beforeSelectionChange",a.cm,c);return c.ranges!=b.ranges?$(c.ranges,c.ranges.length-1):b}function de(a,b,c){var d=a.history.done,e=z(d);e&&e.ranges?(d[d.length-1]=b,Ub(a,b,c)):H(a,b,c)}function H(a,b,c){Ub(a,b,c);b=a.sel;var d=a.cm?a.cm.curOp.id:NaN,e=a.history,f=c&&c.origin,g;if(!(g=d==e.lastSelOp)&&(g=f&&e.lastSelOrigin==f)&&!(g=e.lastModTime==e.lastSelTime&&e.lastOrigin==f)){g=z(e.done);var h=f.charAt(0);
g="*"==h||"+"==h&&g.ranges.length==b.ranges.length&&g.somethingSelected()==b.somethingSelected()&&new Date-a.history.lastSelTime<=(a.cm?a.cm.options.historyEventDelay:500)}g?e.done[e.done.length-1]=b:Vb(b,e.done);e.lastSelTime=+new Date;e.lastSelOrigin=f;e.lastSelOp=d;c&&!1!==c.clearRedo&&ee(e.undone)}function Ub(a,b,c){if(W(a,"beforeSelectionChange")||a.cm&&W(a.cm,"beforeSelectionChange"))b=Ef(a,b,c);var d=c&&c.bias||(0>w(b.primary().head,a.sel.primary().head)?-1:1);fe(a,ge(a,b,d,!0));c&&!1===c.scroll||
!a.cm||Qa(a.cm)}function fe(a,b){b.equals(a.sel)||(a.sel=b,a.cm&&(a.cm.curOp.updateInput=a.cm.curOp.selectionChanged=!0,he(a.cm)),Q(a,"cursorActivity",a))}function ie(a){fe(a,ge(a,a.sel,null,!1),ha)}function ge(a,b,c,d){for(var e,f=0;f<b.ranges.length;f++){var g=b.ranges[f],h=b.ranges.length==a.sel.ranges.length&&a.sel.ranges[f],k=Xc(a,g.anchor,h&&h.anchor,c,d),h=Xc(a,g.head,h&&h.head,c,d);if(e||k!=g.anchor||h!=g.head)e||(e=b.ranges.slice(0,f)),e[f]=new y(k,h)}return e?$(e,b.primIndex):b}function Ta(a,
b,c,d,e){var f=t(a,b.line);if(f.markedSpans)for(var g=0;g<f.markedSpans.length;++g){var h=f.markedSpans[g],k=h.marker;if((null==h.from||(k.inclusiveLeft?h.from<=b.ch:h.from<b.ch))&&(null==h.to||(k.inclusiveRight?h.to>=b.ch:h.to>b.ch))){if(e&&(J(k,"beforeCursorEnter"),k.explicitlyCleared))if(f.markedSpans){--g;continue}else break;if(k.atomic){if(c){var g=k.find(0>d?1:-1),l;if(0>d?k.inclusiveRight:k.inclusiveLeft)g=je(a,g,-d,f);if(g&&g.line==b.line&&(l=w(g,c))&&(0>d?0>l:0<l))return Ta(a,g,b,d,e)}c=
k.find(0>d?-1:1);if(0>d?k.inclusiveLeft:k.inclusiveRight)c=je(a,c,d,f);return c?Ta(a,c,b,d,e):null}}}return b}function Xc(a,b,c,d,e){d=d||1;b=Ta(a,b,c,d,e)||!e&&Ta(a,b,c,d,!0)||Ta(a,b,c,-d,e)||!e&&Ta(a,b,c,-d,!0);return b?b:(a.cantEdit=!0,q(a.first,0))}function je(a,b,c,d){return 0>c&&0==b.ch?b.line>a.first?x(a,q(b.line-1)):null:0<c&&b.ch==(d||t(a,b.line)).text.length?b.line<a.first+a.size-1?q(b.line+1,0):null:new q(b.line,b.ch+c)}function nb(a){a.display.input.showSelection(a.display.input.prepareSelection())}
function ke(a,b){for(var c=a.doc,d={},e=d.cursors=document.createDocumentFragment(),f=d.selection=document.createDocumentFragment(),g=0;g<c.sel.ranges.length;g++)if(!1!==b||g!=c.sel.primIndex){var h=c.sel.ranges[g],k=h.empty();(k||a.options.showCursorWhenSelecting)&&le(a,h.head,e);k||Ff(a,h,f)}return d}function le(a,b,c){b=la(a,b,"div",null,null,!a.options.singleCursorHeightPerLine);var d=c.appendChild(r("div"," ","CodeMirror-cursor"));d.style.left=b.left+"px";d.style.top=b.top+"px";d.style.height=
Math.max(0,b.bottom-b.top)*a.options.cursorHeight+"px";b.other&&(a=c.appendChild(r("div"," ","CodeMirror-cursor CodeMirror-secondarycursor")),a.style.display="",a.style.left=b.other.left+"px",a.style.top=b.other.top+"px",a.style.height=.85*(b.other.bottom-b.other.top)+"px")}function Ff(a,b,c){function d(a,b,c,d){0>b&&(b=0);b=Math.round(b);d=Math.round(d);h.appendChild(r("div",null,"CodeMirror-selected","position: absolute; left: "+a+"px; top: "+b+"px; width: "+(null==c?m-a:c)+"px; height: "+(d-b)+
"px"))}function e(b,c,e){var f=t(g,b),h=f.text.length,k,s;Gf(Z(f),c||0,null==e?h:e,function(g,n,r){var t=Wb(a,q(b,g),"div",f,"left"),u,v;g==n?(u=t,r=v=t.left):(u=Wb(a,q(b,n-1),"div",f,"right"),"rtl"==r&&(r=t,t=u,u=r),r=t.left,v=u.right);null==c&&0==g&&(r=l);3<u.top-t.top&&(d(r,t.top,null,t.bottom),r=l,t.bottom<u.top&&d(r,t.bottom,null,u.top));null==e&&n==h&&(v=m);if(!k||t.top<k.top||t.top==k.top&&t.left<k.left)k=t;if(!s||u.bottom>s.bottom||u.bottom==s.bottom&&u.right>s.right)s=u;r<l+1&&(r=l);d(r,
u.top,v-r,u.bottom)});return{start:k,end:s}}var f=a.display,g=a.doc,h=document.createDocumentFragment(),k=me(a.display),l=k.left,m=Math.max(f.sizerWidth,pa(a)-f.sizer.offsetLeft)-k.right,f=b.from();b=b.to();if(f.line==b.line)e(f.line,f.ch,b.ch);else{var s=t(g,f.line),k=t(g,b.line),k=ia(s)==ia(k),f=e(f.line,f.ch,k?s.text.length+1:null).end;b=e(b.line,k?0:null,b.ch).start;k&&(f.top<b.top-2?(d(f.right,f.top,null,f.bottom),d(l,b.top,b.left,b.bottom)):d(f.right,f.top,b.left-f.right,f.bottom));f.bottom<
b.top&&d(l,f.bottom,null,b.top)}c.appendChild(h)}function Yc(a){if(a.state.focused){var b=a.display;clearInterval(b.blinker);var c=!0;b.cursorDiv.style.visibility="";0<a.options.cursorBlinkRate?b.blinker=setInterval(function(){b.cursorDiv.style.visibility=(c=!c)?"":"hidden"},a.options.cursorBlinkRate):0>a.options.cursorBlinkRate&&(b.cursorDiv.style.visibility="hidden")}}function fb(a,b){a.doc.mode.startState&&a.doc.frontier<a.display.viewTo&&a.state.highlight.set(b,cb(Hf,a))}function Hf(a){var b=
a.doc;b.frontier<b.first&&(b.frontier=b.first);if(!(b.frontier>=a.display.viewTo)){var c=+new Date+a.options.workTime,d=sa(b.mode,sb(a,b.frontier)),e=[];b.iter(b.frontier,Math.min(b.first+b.size,a.display.viewTo+500),function(f){if(b.frontier>=a.display.viewFrom){var g=f.styles,h=f.text.length>a.options.maxHighlightLength,k=ne(a,f,h?sa(b.mode,d):d,!0);f.styles=k.styles;var l=f.styleClasses;(k=k.classes)?f.styleClasses=k:l&&(f.styleClasses=null);l=!g||g.length!=f.styles.length||l!=k&&(!l||!k||l.bgClass!=
k.bgClass||l.textClass!=k.textClass);for(k=0;!l&&k<g.length;++k)l=g[k]!=f.styles[k];l&&e.push(b.frontier);f.stateAfter=h?d:sa(b.mode,d)}else f.text.length<=a.options.maxHighlightLength&&Zc(a,f.text,d),f.stateAfter=0==b.frontier%5?sa(b.mode,d):null;++b.frontier;if(+new Date>c)return fb(a,a.options.workDelay),!0});e.length&&R(a,function(){for(var b=0;b<e.length;b++)ma(a,e[b],"text")})}}function If(a,b,c){for(var d,e,f=a.doc,g=c?-1:b-(a.doc.mode.innerMode?1E3:100);b>g;--b){if(b<=f.first)return f.first;
var h=t(f,b-1);if(h.stateAfter&&(!c||b<=f.frontier))return b;h=aa(h.text,null,a.options.tabSize);if(null==e||d>h)e=b-1,d=h}return e}function sb(a,b,c){var d=a.doc,e=a.display;if(!d.mode.startState)return!0;var f=If(a,b,c),g=f>d.first&&t(d,f-1).stateAfter,g=g?sa(d.mode,g):Jf(d.mode);d.iter(f,b,function(c){Zc(a,c.text,g);c.stateAfter=f==b-1||0==f%5||f>=e.viewFrom&&f<e.viewTo?sa(d.mode,g):null;++f});c&&(d.frontier=f);return g}function Ec(a){return a.mover.offsetHeight-a.lineSpace.offsetHeight}function me(a){if(a.cachedPaddingH)return a.cachedPaddingH;
var b=S(a.measure,r("pre","x")),b=window.getComputedStyle?window.getComputedStyle(b):b.currentStyle,b={left:parseInt(b.paddingLeft),right:parseInt(b.paddingRight)};isNaN(b.left)||isNaN(b.right)||(a.cachedPaddingH=b);return b}function da(a){return Gd-a.display.nativeBarWidth}function pa(a){return a.display.scroller.clientWidth-da(a)-a.display.barWidth}function Nc(a){return a.display.scroller.clientHeight-da(a)-a.display.barHeight}function $d(a,b,c){if(a.line==b)return{map:a.measure.map,cache:a.measure.cache};
for(var d=0;d<a.rest.length;d++)if(a.rest[d]==b)return{map:a.measure.maps[d],cache:a.measure.caches[d]};for(d=0;d<a.rest.length;d++)if(E(a.rest[d])>c)return{map:a.measure.maps[d],cache:a.measure.caches[d],before:!0}}function Uc(a,b){if(b>=a.display.viewFrom&&b<a.display.viewTo)return a.display.view[Aa(a,b)];var c=a.display.externalMeasured;if(c&&b>=c.lineN&&b<c.lineN+c.size)return c}function Xb(a,b){var c=E(b),d=Uc(a,c);d&&!d.text?d=null:d&&d.changes&&(Nd(a,d,c,Kc(a)),a.curOp.forceUpdate=!0);if(!d){var e;
e=ia(b);d=E(e);e=a.display.externalMeasured=new oe(a.doc,e,d);e.lineN=d;d=e.built=Rd(a,e);e.text=d.pre;S(a.display.lineMeasure,d.pre);d=e}c=$d(d,b,c);return{line:b,view:d,rect:null,map:c.map,cache:c.cache,before:c.before,hasHeights:!1}}function $c(a,b,c,d,e){b.before&&(c=-1);var f=c+(d||"");if(b.cache.hasOwnProperty(f))a=b.cache[f];else{b.rect||(b.rect=b.view.text.getBoundingClientRect());if(!b.hasHeights){var g=b.view,h=b.rect,k=a.options.lineWrapping,l=k&&pa(a);if(!g.measure.heights||k&&g.measure.width!=
l){var m=g.measure.heights=[];if(k)for(g.measure.width=l,g=g.text.firstChild.getClientRects(),k=0;k<g.length-1;k++){var l=g[k],s=g[k+1];2<Math.abs(l.bottom-s.bottom)&&m.push((l.bottom+s.top)/2-h.top)}m.push(h.bottom-h.top)}b.hasHeights=!0}g=d;k=ae(b.map,c,g);d=k.node;h=k.start;l=k.end;c=k.collapse;var p;if(3==d.nodeType){for(m=0;4>m;m++){for(;h&&tb(b.line.text.charAt(k.coverStart+h));)--h;for(;k.coverStart+l<k.coverEnd&&tb(b.line.text.charAt(k.coverStart+l));)++l;if(A&&9>C&&0==h&&l==k.coverEnd-k.coverStart)p=
d.parentNode.getBoundingClientRect();else if(A&&a.options.lineWrapping){var F=Ca(d,h,l).getClientRects();p=F.length?F["right"==g?F.length-1:0]:ad}else p=Ca(d,h,l).getBoundingClientRect()||ad;if(p.left||p.right||0==h)break;l=h;--h;c="right"}A&&11>C&&((F=!window.screen||null==screen.logicalXDPI||screen.logicalXDPI==screen.deviceXDPI)||(null!=bd?F=bd:(m=S(a.display.measure,r("span","x")),F=m.getBoundingClientRect(),m=Ca(m,0,1).getBoundingClientRect(),F=bd=1<Math.abs(F.left-m.left)),F=!F),F||(F=screen.logicalXDPI/
screen.deviceXDPI,m=screen.logicalYDPI/screen.deviceYDPI,p={left:p.left*F,right:p.right*F,top:p.top*m,bottom:p.bottom*m}))}else 0<h&&(c=g="right"),p=a.options.lineWrapping&&1<(F=d.getClientRects()).length?F["right"==g?F.length-1:0]:d.getBoundingClientRect();!(A&&9>C)||h||p&&(p.left||p.right)||(p=(p=d.parentNode.getClientRects()[0])?{left:p.left,right:p.left+gb(a.display),top:p.top,bottom:p.bottom}:ad);F=p.top-b.rect.top;d=p.bottom-b.rect.top;h=(F+d)/2;g=b.view.measure.heights;for(m=0;m<g.length-1&&
!(h<g[m]);m++);c={left:("right"==c?p.right:p.left)-b.rect.left,right:("left"==c?p.left:p.right)-b.rect.left,top:m?g[m-1]:0,bottom:g[m]};p.left||p.right||(c.bogus=!0);a.options.singleCursorHeightPerLine||(c.rtop=F,c.rbottom=d);a=c;a.bogus||(b.cache[f]=a)}return{left:a.left,right:a.right,top:e?a.rtop:a.top,bottom:e?a.rbottom:a.bottom}}function ae(a,b,c){for(var d,e,f,g,h=0;h<a.length;h+=3){var k=a[h],l=a[h+1];if(b<k)e=0,f=1,g="left";else if(b<l)e=b-k,f=e+1;else if(h==a.length-3||b==l&&a[h+3]>b)f=l-
k,e=f-1,b>=l&&(g="right");if(null!=e){d=a[h+2];k==l&&c==(d.insertLeft?"left":"right")&&(g=c);if("left"==c&&0==e)for(;h&&a[h-2]==a[h-3]&&a[h-1].insertLeft;)d=a[(h-=3)+2],g="left";if("right"==c&&e==l-k)for(;h<a.length-3&&a[h+3]==a[h+4]&&!a[h+5].insertLeft;)d=a[(h+=3)+2],g="right";break}}return{node:d,start:e,end:f,collapse:g,coverStart:k,coverEnd:l}}function pe(a){if(a.measure&&(a.measure.cache={},a.measure.heights=null,a.rest))for(var b=0;b<a.rest.length;b++)a.measure.caches[b]={}}function qe(a){a.display.externalMeasure=
null;xa(a.display.lineMeasure);for(var b=0;b<a.display.view.length;b++)pe(a.display.view[b])}function hb(a){qe(a);a.display.cachedCharWidth=a.display.cachedTextHeight=a.display.cachedPaddingH=null;a.options.lineWrapping||(a.display.maxLineChanged=!0);a.display.lineNumChars=null}function cd(a,b,c,d){if(b.widgets)for(var e=0;e<b.widgets.length;++e)if(b.widgets[e].above){var f=ub(b.widgets[e]);c.top+=f;c.bottom+=f}if("line"==d)return c;d||(d="local");b=ea(b);b="local"==d?b+a.display.lineSpace.offsetTop:
b-a.display.viewOffset;if("page"==d||"window"==d)a=a.display.lineSpace.getBoundingClientRect(),b+=a.top+("window"==d?0:window.pageYOffset||(document.documentElement||document.body).scrollTop),d=a.left+("window"==d?0:window.pageXOffset||(document.documentElement||document.body).scrollLeft),c.left+=d,c.right+=d;c.top+=b;c.bottom+=b;return c}function re(a,b,c){if("div"==c)return b;var d=b.left;b=b.top;"page"==c?(d-=window.pageXOffset||(document.documentElement||document.body).scrollLeft,b-=window.pageYOffset||
(document.documentElement||document.body).scrollTop):"local"!=c&&c||(c=a.display.sizer.getBoundingClientRect(),d+=c.left,b+=c.top);a=a.display.lineSpace.getBoundingClientRect();return{left:d-a.left,top:b-a.top}}function Wb(a,b,c,d,e){d||(d=t(a.doc,b.line));var f=d;b=b.ch;d=$c(a,Xb(a,d),b,e);return cd(a,f,d,c)}function la(a,b,c,d,e,f){function g(b,g){var h=$c(a,e,b,g?"right":"left",f);g?h.left=h.right:h.right=h.left;return cd(a,d,h,c)}function h(a,b){var c=k[b],d=c.level%2;a==dd(c)&&b&&c.level<k[b-
1].level?(c=k[--b],a=ed(c)-(c.level%2?0:1),d=!0):a==ed(c)&&b<k.length-1&&c.level<k[b+1].level&&(c=k[++b],a=dd(c)-c.level%2,d=!1);return d&&a==c.to&&a>c.from?g(a-1):g(a,d)}d=d||t(a.doc,b.line);e||(e=Xb(a,d));var k=Z(d);b=b.ch;if(!k)return g(b);var l=Rb(k,b),l=h(b,l);null!=vb&&(l.other=h(b,vb));return l}function se(a,b){var c=0;b=x(a.doc,b);a.options.lineWrapping||(c=gb(a.display)*b.ch);var d=t(a.doc,b.line),e=ea(d)+a.display.lineSpace.offsetTop;return{left:c,right:c,top:e,bottom:e+d.height}}function Yb(a,
b,c,d){a=q(a,b);a.xRel=d;c&&(a.outside=!0);return a}function fd(a,b,c){var d=a.doc;c+=a.display.viewOffset;if(0>c)return Yb(d.first,0,!0,-1);var e=za(d,c),f=d.first+d.size-1;if(e>f)return Yb(d.first+d.size-1,t(d,f).text.length,!0,1);0>b&&(b=0);for(d=t(d,e);;)if(e=Kf(a,d,e,b,c),f=(d=ya(d,!1))&&d.find(0,!0),d&&(e.ch>f.from.ch||e.ch==f.from.ch&&0<e.xRel))e=E(d=f.to.line);else return e}function Kf(a,b,c,d,e){function f(d){d=la(a,q(c,d),"line",b,l);h=!0;if(g>d.bottom)return d.left-k;if(g<d.top)return d.left+
k;h=!1;return d.left}var g=e-ea(b),h=!1,k=2*a.display.wrapper.clientWidth,l=Xb(a,b),m=Z(b),s=b.text.length;e=Zb(b);var p=$b(b),F=f(e),n=h,r=f(p),t=h;if(d>r)return Yb(c,p,t,1);for(;;){if(m?p==e||p==gd(b,e,1):1>=p-e){m=d<F||d-F<=r-d?e:p;for(d-=m==e?F:r;tb(b.text.charAt(m));)++m;return Yb(c,m,m==e?n:t,-1>d?-1:1<d?1:0)}var u=Math.ceil(s/2),v=e+u;if(m)for(var v=e,w=0;w<u;++w)v=gd(b,v,1);w=f(v);if(w>d){p=v;r=w;if(t=h)r+=1E3;s=u}else e=v,F=w,n=h,s-=u}}function va(a){if(null!=a.cachedTextHeight)return a.cachedTextHeight;
if(null==Da){Da=r("pre");for(var b=0;49>b;++b)Da.appendChild(document.createTextNode("x")),Da.appendChild(r("br"));Da.appendChild(document.createTextNode("x"))}S(a.measure,Da);b=Da.offsetHeight/50;3<b&&(a.cachedTextHeight=b);xa(a.measure);return b||1}function gb(a){if(null!=a.cachedCharWidth)return a.cachedCharWidth;var b=r("span","xxxxxxxxxx"),c=r("pre",[b]);S(a.measure,c);b=b.getBoundingClientRect();b=(b.right-b.left)/10;2<b&&(a.cachedCharWidth=b);return b||10}function Ka(a){a.curOp={cm:a,viewChanged:!1,
startHeight:a.doc.height,forceUpdate:!1,updateInput:null,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,focus:!1,id:++Lf};Ua?Ua.ops.push(a.curOp):a.curOp.ownsGroup=Ua={ops:[a.curOp],delayedCallbacks:[]}}function Ma(a){if(a=a.curOp.ownsGroup)try{var b=a.delayedCallbacks,c=0;do{for(;c<b.length;c++)b[c].call(null);for(var d=0;d<a.ops.length;d++){var e=a.ops[d];if(e.cursorActivityHandlers)for(;e.cursorActivityCalled<
e.cursorActivityHandlers.length;)e.cursorActivityHandlers[e.cursorActivityCalled++].call(null,e.cm)}}while(c<b.length)}finally{Ua=null;for(b=0;b<a.ops.length;b++)a.ops[b].cm.curOp=null;a=a.ops;for(b=0;b<a.length;b++){var e=a[b],c=e.cm,f=d=c.display;!f.scrollbarsClipped&&f.scroller.offsetWidth&&(f.nativeBarWidth=f.scroller.offsetWidth-f.scroller.clientWidth,f.heightForcer.style.height=da(c)+"px",f.sizer.style.marginBottom=-f.nativeBarWidth+"px",f.sizer.style.borderRightWidth=da(c)+"px",f.scrollbarsClipped=
!0);e.updateMaxLine&&Dc(c);e.mustUpdate=e.viewChanged||e.forceUpdate||null!=e.scrollTop||e.scrollToPos&&(e.scrollToPos.from.line<d.viewFrom||e.scrollToPos.to.line>=d.viewTo)||d.maxLineChanged&&c.options.lineWrapping;e.update=e.mustUpdate&&new Lb(c,e.mustUpdate&&{top:e.scrollTop,ensure:e.scrollToPos},e.forceUpdate)}for(b=0;b<a.length;b++)e=a[b],e.updatedDisplay=e.mustUpdate&&Lc(e.cm,e.update);for(b=0;b<a.length;b++)if(e=a[b],c=e.cm,d=c.display,e.updatedDisplay&&Kb(c),e.barMeasure=jb(c),d.maxLineChanged&&
!c.options.lineWrapping&&(f=void 0,f=d.maxLine.text.length,f=$c(c,Xb(c,d.maxLine),f,void 0),e.adjustWidthTo=f.left+3,c.display.sizerWidth=e.adjustWidthTo,e.barMeasure.scrollWidth=Math.max(d.scroller.clientWidth,d.sizer.offsetLeft+e.adjustWidthTo+da(c)+c.display.barWidth),e.maxScrollLeft=Math.max(0,d.sizer.offsetLeft+e.adjustWidthTo-pa(c))),e.updatedDisplay||e.selectionChanged)e.preparedSelection=d.input.prepareSelection();for(b=0;b<a.length;b++)e=a[b],c=e.cm,null!=e.adjustWidthTo&&(c.display.sizer.style.minWidth=
e.adjustWidthTo+"px",e.maxScrollLeft<c.doc.scrollLeft&&Na(c,Math.min(c.display.scroller.scrollLeft,e.maxScrollLeft),!0),c.display.maxLineChanged=!1),e.preparedSelection&&c.display.input.showSelection(e.preparedSelection),e.updatedDisplay&&Oc(c,e.barMeasure),(e.updatedDisplay||e.startHeight!=c.doc.height)&&Oa(c,e.barMeasure),e.selectionChanged&&Yc(c),c.state.focused&&e.updateInput&&c.display.input.reset(e.typing),!e.focus||e.focus!=fa()||document.hasFocus&&!document.hasFocus()||Td(e.cm);for(b=0;b<
a.length;b++){e=a[b];c=e.cm;d=c.display;f=c.doc;e.updatedDisplay&&Ld(c,e.update);null==d.wheelStartX||null==e.scrollTop&&null==e.scrollLeft&&!e.scrollToPos||(d.wheelStartX=d.wheelStartY=null);null==e.scrollTop||d.scroller.scrollTop==e.scrollTop&&!e.forceScroll||(f.scrollTop=Math.max(0,Math.min(d.scroller.scrollHeight-d.scroller.clientHeight,e.scrollTop)),d.scrollbars.setScrollTop(f.scrollTop),d.scroller.scrollTop=f.scrollTop);null==e.scrollLeft||d.scroller.scrollLeft==e.scrollLeft&&!e.forceScroll||
(f.scrollLeft=Math.max(0,Math.min(d.scroller.scrollWidth-pa(c),e.scrollLeft)),d.scrollbars.setScrollLeft(f.scrollLeft),d.scroller.scrollLeft=f.scrollLeft,Bc(c));if(e.scrollToPos){var g=void 0,h=x(f,e.scrollToPos.from),g=x(f,e.scrollToPos.to),k=e.scrollToPos.margin;null==k&&(k=0);for(var l=0;5>l;l++){var m=!1,s=la(c,h),p=g&&g!=h?la(c,g):s,p=ac(c,Math.min(s.left,p.left),Math.min(s.top,p.top)-k,Math.max(s.left,p.left),Math.max(s.bottom,p.bottom)+k),n=c.doc.scrollTop,q=c.doc.scrollLeft;null!=p.scrollTop&&
(lb(c,p.scrollTop),1<Math.abs(c.doc.scrollTop-n)&&(m=!0));null!=p.scrollLeft&&(Na(c,p.scrollLeft),1<Math.abs(c.doc.scrollLeft-q)&&(m=!0));if(!m)break}g=s;e.scrollToPos.isCursor&&c.state.focused&&(B(c,"scrollCursorIntoView")||(k=c.display,l=k.sizer.getBoundingClientRect(),h=null,0>g.top+l.top?h=!0:g.bottom+l.top>(window.innerHeight||document.documentElement.clientHeight)&&(h=!1),null==h||Mf||(g=r("div","​",null,"position: absolute; top: "+(g.top-k.viewOffset-c.display.lineSpace.offsetTop)+"px; height: "+
(g.bottom-g.top+da(c)+k.barHeight)+"px; left: "+g.left+"px; width: 2px;"),c.display.lineSpace.appendChild(g),g.scrollIntoView(h),c.display.lineSpace.removeChild(g))))}h=e.maybeHiddenMarkers;g=e.maybeUnhiddenMarkers;if(h)for(k=0;k<h.length;++k)h[k].lines.length||J(h[k],"hide");if(g)for(k=0;k<g.length;++k)g[k].lines.length&&J(g[k],"unhide");d.wrapper.offsetHeight&&(f.scrollTop=c.display.scroller.scrollTop);e.changeObjs&&J(c,"changes",c,e.changeObjs);e.update&&e.update.finish()}}}function R(a,b){if(a.curOp)return b();
Ka(a);try{return b()}finally{Ma(a)}}function G(a,b){return function(){if(a.curOp)return b.apply(a,arguments);Ka(a);try{return b.apply(a,arguments)}finally{Ma(a)}}}function L(a){return function(){if(this.curOp)return a.apply(this,arguments);Ka(this);try{return a.apply(this,arguments)}finally{Ma(this)}}}function M(a){return function(){var b=this.cm;if(!b||b.curOp)return a.apply(this,arguments);Ka(b);try{return a.apply(this,arguments)}finally{Ma(b)}}}function oe(a,b,c){for(var d=this.line=b,e;d=ya(d,
!1);)d=d.find(1,!0).line,(e||(e=[])).push(d);this.size=(this.rest=e)?E(z(this.rest))-c+1:1;this.node=this.text=null;this.hidden=wa(a,b)}function Mb(a,b,c){var d=[],e;for(e=b;e<c;)b=new oe(a.doc,t(a.doc,e),e),e+=b.size,d.push(b);return d}function O(a,b,c,d){null==b&&(b=a.doc.first);null==c&&(c=a.doc.first+a.doc.size);d||(d=0);var e=a.display;d&&c<e.viewTo&&(null==e.updateLineNumbers||e.updateLineNumbers>b)&&(e.updateLineNumbers=b);a.curOp.viewChanged=!0;if(b>=e.viewTo)ra&&Mc(a.doc,b)<e.viewTo&&qa(a);
else if(c<=e.viewFrom)ra&&Kd(a.doc,c+d)>e.viewFrom?qa(a):(e.viewFrom+=d,e.viewTo+=d);else if(b<=e.viewFrom&&c>=e.viewTo)qa(a);else if(b<=e.viewFrom){var f=bc(a,c,c+d,1);f?(e.view=e.view.slice(f.index),e.viewFrom=f.lineN,e.viewTo+=d):qa(a)}else if(c>=e.viewTo)(f=bc(a,b,b,-1))?(e.view=e.view.slice(0,f.index),e.viewTo=f.lineN):qa(a);else{var f=bc(a,b,b,-1),g=bc(a,c,c+d,1);f&&g?(e.view=e.view.slice(0,f.index).concat(Mb(a,f.lineN,g.lineN)).concat(e.view.slice(g.index)),e.viewTo+=d):qa(a)}if(a=e.externalMeasured)c<
a.lineN?a.lineN+=d:b<a.lineN+a.size&&(e.externalMeasured=null)}function ma(a,b,c){a.curOp.viewChanged=!0;var d=a.display,e=a.display.externalMeasured;e&&b>=e.lineN&&b<e.lineN+e.size&&(d.externalMeasured=null);b<d.viewFrom||b>=d.viewTo||(a=d.view[Aa(a,b)],null!=a.node&&(a=a.changes||(a.changes=[]),-1==D(a,c)&&a.push(c)))}function qa(a){a.display.viewFrom=a.display.viewTo=a.doc.first;a.display.view=[];a.display.viewOffset=0}function Aa(a,b){if(b>=a.display.viewTo)return null;b-=a.display.viewFrom;if(0>
b)return null;for(var c=a.display.view,d=0;d<c.length;d++)if(b-=c[d].size,0>b)return d}function bc(a,b,c,d){var e=Aa(a,b),f=a.display.view;if(!ra||c==a.doc.first+a.doc.size)return{index:e,lineN:c};for(var g=0,h=a.display.viewFrom;g<e;g++)h+=f[g].size;if(h!=b){if(0<d){if(e==f.length-1)return null;b=h+f[e].size-b;e++}else b=h-b;c+=b}for(;Mc(a.doc,c)!=c;){if(e==(0>d?0:f.length-1))return null;c+=d*f[e-(0>d?1:0)].size;e+=d}return{index:e,lineN:c}}function Jd(a){a=a.display.view;for(var b=0,c=0;c<a.length;c++){var d=
a[c];d.hidden||d.node&&!d.changes||++b}return b}function yf(a){function b(){d.activeTouch&&(e=setTimeout(function(){d.activeTouch=null},1E3),f=d.activeTouch,f.end=+new Date)}function c(a,b){if(null==b.left)return!0;var c=b.left-a.left,d=b.top-a.top;return 400<c*c+d*d}var d=a.display;u(d.scroller,"mousedown",G(a,Nf));A&&11>C?u(d.scroller,"dblclick",G(a,function(b){if(!B(a,b)){var c=Ea(a,b);!c||hd(a,b,"gutterClick",!0)||na(a.display,b)||(N(b),b=a.findWordAt(c),Tb(a.doc,b.anchor,b.head))}})):u(d.scroller,
"dblclick",function(b){B(a,b)||N(b)});id||u(d.scroller,"contextmenu",function(b){te(a,b)});var e,f={end:0};u(d.scroller,"touchstart",function(b){var c;if(c=!B(a,b))1!=b.touches.length?c=!1:(c=b.touches[0],c=1>=c.radiusX&&1>=c.radiusY),c=!c;c&&(clearTimeout(e),c=+new Date,d.activeTouch={start:c,moved:!1,prev:300>=c-f.end?f:null},1==b.touches.length&&(d.activeTouch.left=b.touches[0].pageX,d.activeTouch.top=b.touches[0].pageY))});u(d.scroller,"touchmove",function(){d.activeTouch&&(d.activeTouch.moved=
!0)});u(d.scroller,"touchend",function(e){var f=d.activeTouch;if(f&&!na(d,e)&&null!=f.left&&!f.moved&&300>new Date-f.start){var g=a.coordsChar(d.activeTouch,"page"),f=!f.prev||c(f,f.prev)?new y(g,g):!f.prev.prev||c(f,f.prev.prev)?a.findWordAt(g):new y(q(g.line,0),x(a.doc,q(g.line+1,0)));a.setSelection(f.anchor,f.head);a.focus();N(e)}b()});u(d.scroller,"touchcancel",b);u(d.scroller,"scroll",function(){d.scroller.clientHeight&&(lb(a,d.scroller.scrollTop),Na(a,d.scroller.scrollLeft,!0),J(a,"scroll",
a))});u(d.scroller,"mousewheel",function(b){ue(a,b)});u(d.scroller,"DOMMouseScroll",function(b){ue(a,b)});u(d.wrapper,"scroll",function(){d.wrapper.scrollTop=d.wrapper.scrollLeft=0});d.dragFunctions={enter:function(b){B(a,b)||cc(b)},over:function(b){if(!B(a,b)){var c=Ea(a,b);if(c){var d=document.createDocumentFragment();le(a,c,d);a.display.dragCursor||(a.display.dragCursor=r("div",null,"CodeMirror-cursors CodeMirror-dragcursors"),a.display.lineSpace.insertBefore(a.display.dragCursor,a.display.cursorDiv));
S(a.display.dragCursor,d)}cc(b)}},start:function(b){if(A&&(!a.state.draggingText||100>+new Date-ve))cc(b);else if(!B(a,b)&&!na(a.display,b)&&(b.dataTransfer.setData("Text",a.getSelection()),b.dataTransfer.setDragImage&&!we)){var c=r("img",null,null,"position: fixed; left: 0; top: 0;");c.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw\x3d\x3d";ba&&(c.width=c.height=1,a.display.wrapper.appendChild(c),c._top=c.offsetTop);b.dataTransfer.setDragImage(c,0,0);ba&&c.parentNode.removeChild(c)}},
drop:G(a,Of),leave:function(){xe(a)}};var g=d.input.getField();u(g,"keyup",function(b){ye.call(a,b)});u(g,"keydown",G(a,ze));u(g,"keypress",G(a,Ae));u(g,"focus",cb(xc,a));u(g,"blur",cb(db,a))}function Pf(a){var b=a.display;if(b.lastWrapHeight!=b.wrapper.clientHeight||b.lastWrapWidth!=b.wrapper.clientWidth)b.cachedCharWidth=b.cachedTextHeight=b.cachedPaddingH=null,b.scrollbarsClipped=!1,a.setSize()}function na(a,b){for(var c=b.target||b.srcElement;c!=a.wrapper;c=c.parentNode)if(!c||1==c.nodeType&&
"true"==c.getAttribute("cm-ignore-events")||c.parentNode==a.sizer&&c!=a.mover)return!0}function Ea(a,b,c,d){var e=a.display;if(!c&&"true"==(b.target||b.srcElement).getAttribute("cm-not-content"))return null;var f,g;c=e.lineSpace.getBoundingClientRect();try{f=b.clientX-c.left,g=b.clientY-c.top}catch(h){return null}b=fd(a,f,g);var k;d&&1==b.xRel&&(k=t(a.doc,b.line).text).length==b.ch&&(d=aa(k,k.length,a.options.tabSize)-k.length,b=q(b.line,Math.max(0,Math.round((f-me(a.display).left)/gb(a.display))-
d)));return b}function Nf(a){var b=this.display;if(!(B(this,a)||b.activeTouch&&b.input.supportsTouch()))if(b.shift=a.shiftKey,na(b,a))K||(b.scroller.draggable=!1,setTimeout(function(){b.scroller.draggable=!0},100));else if(!hd(this,a,"gutterClick",!0)){var c=Ea(this,a);window.focus();switch(Be(a)){case 1:this.state.selectingText?this.state.selectingText(a):c?Qf(this,a,c):(a.target||a.srcElement)==b.scroller&&N(a);break;case 2:K&&(this.state.lastMiddleDown=+new Date);c&&Tb(this.doc,c);setTimeout(function(){b.input.focus()},
20);N(a);break;case 3:id?te(this,a):Rf(this)}}}function Qf(a,b,c){A?setTimeout(cb(Td,a),0):a.curOp.focus=fa();var d=+new Date,e;dc&&dc.time>d-400&&0==w(dc.pos,c)?e="triple":ec&&ec.time>d-400&&0==w(ec.pos,c)?(e="double",dc={time:d,pos:c}):(e="single",ec={time:d,pos:c});var d=a.doc.sel,f=Y?b.metaKey:b.ctrlKey,g;a.options.dragDrop&&Sf&&!a.isReadOnly()&&"single"==e&&-1<(g=d.contains(c))&&(0>w((g=d.ranges[g]).from(),c)||0<c.xRel)&&(0<w(g.to(),c)||0>c.xRel)?Tf(a,b,c,f):Uf(a,b,c,e,f)}function Tf(a,b,c,d){var e=
a.display,f=+new Date,g=G(a,function(h){K&&(e.scroller.draggable=!1);a.state.draggingText=!1;ja(document,"mouseup",g);ja(e.scroller,"drop",g);10>Math.abs(b.clientX-h.clientX)+Math.abs(b.clientY-h.clientY)&&(N(h),!d&&+new Date-200<f&&Tb(a.doc,c),K||A&&9==C?setTimeout(function(){document.body.focus();e.input.focus()},20):e.input.focus())});K&&(e.scroller.draggable=!0);a.state.draggingText=g;e.scroller.dragDrop&&e.scroller.dragDrop();u(document,"mouseup",g);u(e.scroller,"drop",g)}function Uf(a,b,c,d,
e){function f(b){if(0!=w(v,b))if(v=b,"rect"==d){for(var e=[],f=a.options.tabSize,g=aa(t(l,c.line).text,c.ch,f),h=aa(t(l,b.line).text,b.ch,f),k=Math.min(g,h),g=Math.max(g,h),h=Math.min(c.line,b.line),n=Math.min(a.lastLine(),Math.max(c.line,b.line));h<=n;h++){var r=t(l,h).text,F=Ce(r,k,f);k==g?e.push(new y(q(h,F),q(h,F))):r.length>F&&e.push(new y(q(h,F),q(h,Ce(r,g,f))))}e.length||e.push(new y(c,c));H(l,$(p.ranges.slice(0,s).concat(e),s),{origin:"*mouse",scroll:!1});a.scrollIntoView(b)}else e=m,f=e.anchor,
k=b,"single"!=d&&(b="double"==d?a.findWordAt(b):new y(q(b.line,0),x(l,q(b.line+1,0))),0<w(b.anchor,f)?(k=b.head,f=Ob(e.from(),b.anchor)):(k=b.anchor,f=Nb(e.to(),b.head))),e=p.ranges.slice(0),e[s]=new y(x(l,f),k),H(l,$(e,s),jd)}function g(b){var c=++z,e=Ea(a,b,!0,"rect"==d);if(e)if(0!=w(e,v)){a.curOp.focus=fa();f(e);var h=Hc(k,l);(e.line>=h.to||e.line<h.from)&&setTimeout(G(a,function(){z==c&&g(b)}),150)}else{var m=b.clientY<A.top?-20:b.clientY>A.bottom?20:0;m&&setTimeout(G(a,function(){z==c&&(k.scroller.scrollTop+=
m,g(b))}),50)}}function h(b){a.state.selectingText=!1;z=Infinity;N(b);k.input.focus();ja(document,"mousemove",E);ja(document,"mouseup",C);l.history.lastSelOrigin=null}var k=a.display,l=a.doc;N(b);var m,s,p=l.sel,n=p.ranges;e&&!b.shiftKey?(s=l.sel.contains(c),m=-1<s?n[s]:new y(c,c)):(m=l.sel.primary(),s=l.sel.primIndex);if(b.altKey)d="rect",e||(m=new y(c,c)),c=Ea(a,b,!0,!0),s=-1;else if("double"==d){var r=a.findWordAt(c);m=a.display.shift||l.extend?rb(l,m,r.anchor,r.head):r}else"triple"==d?(r=new y(q(c.line,
0),x(l,q(c.line+1,0))),m=a.display.shift||l.extend?rb(l,m,r.anchor,r.head):r):m=rb(l,m,c);e?-1==s?(s=n.length,H(l,$(n.concat([m]),s),{scroll:!1,origin:"*mouse"})):1<n.length&&n[s].empty()&&"single"==d&&!b.shiftKey?(H(l,$(n.slice(0,s).concat(n.slice(s+1)),0),{scroll:!1,origin:"*mouse"}),p=l.sel):Wc(l,s,m,jd):(s=0,H(l,new ka([m],0),jd),p=l.sel);var v=c,A=k.wrapper.getBoundingClientRect(),z=0,E=G(a,function(a){Be(a)?g(a):h(a)}),C=G(a,h);a.state.selectingText=C;u(document,"mousemove",E);u(document,"mouseup",
C)}function hd(a,b,c,d){try{var e=b.clientX,f=b.clientY}catch(g){return!1}if(e>=Math.floor(a.display.gutters.getBoundingClientRect().right))return!1;d&&N(b);d=a.display;var h=d.lineDiv.getBoundingClientRect();if(f>h.bottom||!W(a,c))return kd(b);f-=h.top-d.viewOffset;for(h=0;h<a.options.gutters.length;++h){var k=d.gutters.childNodes[h];if(k&&k.getBoundingClientRect().right>=e)return e=za(a.doc,f),J(a,c,a,e,a.options.gutters[h],b),kd(b)}}function Of(a){var b=this;xe(b);if(!B(b,a)&&!na(b.display,a)){N(a);
A&&(ve=+new Date);var c=Ea(b,a,!0),d=a.dataTransfer.files;if(c&&!b.isReadOnly())if(d&&d.length&&window.FileReader&&window.File){var e=d.length,f=Array(e),g=0;a=function(a,d){if(!b.options.allowDropFileTypes||-1!=D(b.options.allowDropFileTypes,a.type)){var h=new FileReader;h.onload=G(b,function(){var a=h.result;/[\x00-\x08\x0e-\x1f]{2}/.test(a)&&(a="");f[d]=a;++g==e&&(c=x(b.doc,c),a={from:c,to:c,text:b.doc.splitLines(f.join(b.doc.lineSeparator())),origin:"paste"},Pa(b.doc,a),de(b.doc,ga(c,Fa(a))))});
h.readAsText(a)}};for(var h=0;h<e;++h)a(d[h],h)}else if(b.state.draggingText&&-1<b.doc.sel.contains(c))b.state.draggingText(a),setTimeout(function(){b.display.input.focus()},20);else try{if(f=a.dataTransfer.getData("Text")){if(b.state.draggingText&&(Y?!a.altKey:!a.ctrlKey))var k=b.listSelections();Ub(b.doc,ga(c,c));if(k)for(h=0;h<k.length;++h)Va(b.doc,"",k[h].anchor,k[h].head,"drag");b.replaceSelection(f,"around","paste");b.display.input.focus()}}catch(l){}}}function xe(a){a.display.dragCursor&&(a.display.lineSpace.removeChild(a.display.dragCursor),
a.display.dragCursor=null)}function lb(a,b){2>Math.abs(a.doc.scrollTop-b)||(a.doc.scrollTop=b,oa||Pc(a,{top:b}),a.display.scroller.scrollTop!=b&&(a.display.scroller.scrollTop=b),a.display.scrollbars.setScrollTop(b),oa&&Pc(a),fb(a,100))}function Na(a,b,c){(c?b==a.doc.scrollLeft:2>Math.abs(a.doc.scrollLeft-b))||(b=Math.min(b,a.display.scroller.scrollWidth-a.display.scroller.clientWidth),a.doc.scrollLeft=b,Bc(a),a.display.scroller.scrollLeft!=b&&(a.display.scroller.scrollLeft=b),a.display.scrollbars.setScrollLeft(b))}
function ue(a,b){var c=De(b),d=c.x,c=c.y,e=a.display,f=e.scroller,g=f.scrollWidth>f.clientWidth,h=f.scrollHeight>f.clientHeight;if(d&&g||c&&h){if(c&&Y&&K){var g=b.target,k=e.view;a:for(;g!=f;g=g.parentNode)for(var l=0;l<k.length;l++)if(k[l].node==g){a.display.currentWheelTarget=g;break a}}!d||oa||ba||null==T?(c&&null!=T&&(h=c*T,g=a.doc.scrollTop,k=g+e.wrapper.clientHeight,0>h?g=Math.max(0,g+h-50):k=Math.min(a.doc.height,k+h+50),Pc(a,{top:g,bottom:k})),20>fc&&(null==e.wheelStartX?(e.wheelStartX=f.scrollLeft,
e.wheelStartY=f.scrollTop,e.wheelDX=d,e.wheelDY=c,setTimeout(function(){if(null!=e.wheelStartX){var a=f.scrollLeft-e.wheelStartX,b=f.scrollTop-e.wheelStartY,a=b&&e.wheelDY&&b/e.wheelDY||a&&e.wheelDX&&a/e.wheelDX;e.wheelStartX=e.wheelStartY=null;a&&(T=(T*fc+a)/(fc+1),++fc)}},200)):(e.wheelDX+=d,e.wheelDY+=c))):(c&&h&&lb(a,Math.max(0,Math.min(f.scrollTop+c*T,f.scrollHeight-f.clientHeight))),Na(a,Math.max(0,Math.min(f.scrollLeft+d*T,f.scrollWidth-f.clientWidth))),(!c||c&&h)&&N(b),e.wheelStartX=null)}}
function gc(a,b,c){if("string"==typeof b&&(b=hc[b],!b))return!1;a.display.input.ensurePolled();var d=a.display.shift,e=!1;try{a.isReadOnly()&&(a.state.suppressEdits=!0),c&&(a.display.shift=!1),e=b(a)!=Ee}finally{a.display.shift=d,a.state.suppressEdits=!1}return e}function Vf(a,b,c){for(var d=0;d<a.state.keyMaps.length;d++){var e=wb(b,a.state.keyMaps[d],c,a);if(e)return e}return a.options.extraKeys&&wb(b,a.options.extraKeys,c,a)||wb(b,a.options.keyMap,c,a)}function ic(a,b,c,d){var e=a.state.keySeq;
if(e){if(Wf(b))return"handled";Xf.set(50,function(){a.state.keySeq==e&&(a.state.keySeq=null,a.display.input.reset())});b=e+" "+b}d=Vf(a,b,d);"multi"==d&&(a.state.keySeq=b);"handled"==d&&Q(a,"keyHandled",a,b,c);if("handled"==d||"multi"==d)N(c),Yc(a);return e&&!d&&/\'$/.test(b)?(N(c),!0):!!d}function Fe(a,b){var c=Yf(b,!0);return c?b.shiftKey&&!a.state.keySeq?ic(a,"Shift-"+c,b,function(b){return gc(a,b,!0)})||ic(a,c,b,function(b){if("string"==typeof b?/^go[A-Z]/.test(b):b.motion)return gc(a,b)}):ic(a,
c,b,function(b){return gc(a,b)}):!1}function Zf(a,b,c){return ic(a,"'"+c+"'",b,function(b){return gc(a,b,!0)})}function ze(a){this.curOp.focus=fa();if(!B(this,a)){A&&11>C&&27==a.keyCode&&(a.returnValue=!1);var b=a.keyCode;this.display.shift=16==b||a.shiftKey;var c=Fe(this,a);ba&&(ld=c?b:null,!c&&88==b&&!Ge&&(Y?a.metaKey:a.ctrlKey)&&this.replaceSelection("",null,"cut"));18!=b||/\bCodeMirror-crosshair\b/.test(this.display.lineDiv.className)||$f(this)}}function $f(a){function b(a){18!=a.keyCode&&a.altKey||
(kb(c,"CodeMirror-crosshair"),ja(document,"keyup",b),ja(document,"mouseover",b))}var c=a.display.lineDiv;mb(c,"CodeMirror-crosshair");u(document,"keyup",b);u(document,"mouseover",b)}function ye(a){16==a.keyCode&&(this.doc.sel.shift=!1);B(this,a)}function Ae(a){if(!(na(this.display,a)||B(this,a)||a.ctrlKey&&!a.altKey||Y&&a.metaKey)){var b=a.keyCode,c=a.charCode;if(ba&&b==ld)ld=null,N(a);else if(!ba||a.which&&!(10>a.which)||!Fe(this,a))if(b=String.fromCharCode(null==c?b:c),!Zf(this,a,b))this.display.input.onKeyPress(a)}}
function Rf(a){a.state.delayingBlurEvent=!0;setTimeout(function(){a.state.delayingBlurEvent&&(a.state.delayingBlurEvent=!1,db(a))},100)}function xc(a){a.state.delayingBlurEvent&&(a.state.delayingBlurEvent=!1);"nocursor"!=a.options.readOnly&&(a.state.focused||(J(a,"focus",a),a.state.focused=!0,mb(a.display.wrapper,"CodeMirror-focused"),a.curOp||a.display.selForContextMenu==a.doc.sel||(a.display.input.reset(),K&&setTimeout(function(){a.display.input.reset(!0)},20)),a.display.input.receivedFocus()),
Yc(a))}function db(a){a.state.delayingBlurEvent||(a.state.focused&&(J(a,"blur",a),a.state.focused=!1,kb(a.display.wrapper,"CodeMirror-focused")),clearInterval(a.display.blinker),setTimeout(function(){a.state.focused||(a.display.shift=!1)},150))}function te(a,b){var c;(c=na(a.display,b))||(c=W(a,"gutterContextMenu")?hd(a,b,"gutterContextMenu",!1):!1);if(!c&&!B(a,b,"contextmenu"))a.display.input.onContextMenu(b)}function He(a,b){if(0>w(a,b.from))return a;if(0>=w(a,b.to))return Fa(b);var c=a.line+b.text.length-
(b.to.line-b.from.line)-1,d=a.ch;a.line==b.to.line&&(d+=Fa(b).ch-b.to.ch);return q(c,d)}function md(a,b){for(var c=[],d=0;d<a.sel.ranges.length;d++){var e=a.sel.ranges[d];c.push(new y(He(e.anchor,b),He(e.head,b)))}return $(c,a.sel.primIndex)}function Ie(a,b,c){return a.line==b.line?q(c.line,a.ch-b.ch+c.ch):q(c.line+(a.line-b.line),a.ch)}function Je(a,b,c){b={canceled:!1,from:b.from,to:b.to,text:b.text,origin:b.origin,cancel:function(){this.canceled=!0}};c&&(b.update=function(b,c,f,g){b&&(this.from=
x(a,b));c&&(this.to=x(a,c));f&&(this.text=f);void 0!==g&&(this.origin=g)});J(a,"beforeChange",a,b);a.cm&&J(a.cm,"beforeChange",a.cm,b);return b.canceled?null:{from:b.from,to:b.to,text:b.text,origin:b.origin}}function Pa(a,b,c){if(a.cm){if(!a.cm.curOp)return G(a.cm,Pa)(a,b,c);if(a.cm.state.suppressEdits)return}if(W(a,"beforeChange")||a.cm&&W(a.cm,"beforeChange"))if(b=Je(a,b,!0),!b)return;if(c=Ke&&!c&&ag(a,b.from,b.to))for(var d=c.length-1;0<=d;--d)Le(a,{from:c[d].from,to:c[d].to,text:d?[""]:b.text});
else Le(a,b)}function Le(a,b){if(1!=b.text.length||""!=b.text[0]||0!=w(b.from,b.to)){var c=md(a,b);Me(a,b,c,a.cm?a.cm.curOp.id:NaN);xb(a,b,c,nd(a,b));var d=[];Ga(a,function(a,c){c||-1!=D(d,a.history)||(Ne(a.history,b),d.push(a.history));xb(a,b,null,nd(a,b))})}}function jc(a,b,c){if(!a.cm||!a.cm.state.suppressEdits){for(var d=a.history,e,f=a.sel,g="undo"==b?d.done:d.undone,h="undo"==b?d.undone:d.done,k=0;k<g.length&&(e=g[k],c?!e.ranges||e.equals(a.sel):e.ranges);k++);if(k!=g.length){for(d.lastOrigin=
d.lastSelOrigin=null;;)if(e=g.pop(),e.ranges){Vb(e,h);if(c&&!e.equals(a.sel)){H(a,e,{clearRedo:!1});return}f=e}else break;c=[];Vb(f,h);h.push({changes:c,generation:d.generation});d.generation=e.generation||++d.maxGeneration;d=W(a,"beforeChange")||a.cm&&W(a.cm,"beforeChange");for(k=e.changes.length-1;0<=k;--k){var l=e.changes[k];l.origin=b;if(d&&!Je(a,l,!1)){g.length=0;break}c.push(od(a,l));f=k?md(a,l):z(g);xb(a,l,f,Oe(a,l));!k&&a.cm&&a.cm.scrollIntoView({from:l.from,to:Fa(l)});var m=[];Ga(a,function(a,
b){b||-1!=D(m,a.history)||(Ne(a.history,l),m.push(a.history));xb(a,l,null,Oe(a,l))})}}}}function Pe(a,b){if(0!=b&&(a.first+=b,a.sel=new ka(Qb(a.sel.ranges,function(a){return new y(q(a.anchor.line+b,a.anchor.ch),q(a.head.line+b,a.head.ch))}),a.sel.primIndex),a.cm)){O(a.cm,a.first,a.first-b,b);for(var c=a.cm.display,d=c.viewFrom;d<c.viewTo;d++)ma(a.cm,d,"gutter")}}function xb(a,b,c,d){if(a.cm&&!a.cm.curOp)return G(a.cm,xb)(a,b,c,d);if(b.to.line<a.first)Pe(a,b.text.length-1-(b.to.line-b.from.line));
else if(!(b.from.line>a.lastLine())){if(b.from.line<a.first){var e=b.text.length-1-(a.first-b.from.line);Pe(a,e);b={from:q(a.first,0),to:q(b.to.line+e,b.to.ch),text:[z(b.text)],origin:b.origin}}e=a.lastLine();b.to.line>e&&(b={from:b.from,to:q(e,t(a,e).text.length),text:[b.text[0]],origin:b.origin});b.removed=Ba(a,b.from,b.to);c||(c=md(a,b));a.cm?bg(a.cm,b,d):pd(a,b,d);Ub(a,c,ha)}}function bg(a,b,c){var d=a.doc,e=a.display,f=b.from,g=b.to,h=!1,k=f.line;a.options.lineWrapping||(k=E(ia(t(d,f.line))),
d.iter(k,g.line+1,function(a){if(a==e.maxLine)return h=!0}));-1<d.sel.contains(b.from,b.to)&&he(a);pd(d,b,c,Hd(a));a.options.lineWrapping||(d.iter(k,f.line+b.text.length,function(a){var b=Jb(a);b>e.maxLineLength&&(e.maxLine=a,e.maxLineLength=b,e.maxLineChanged=!0,h=!1)}),h&&(a.curOp.updateMaxLine=!0));d.frontier=Math.min(d.frontier,f.line);fb(a,400);c=b.text.length-(g.line-f.line)-1;b.full?O(a):f.line!=g.line||1!=b.text.length||Qe(a.doc,b)?O(a,f.line,g.line+1,c):ma(a,f.line,"text");c=W(a,"changes");
if((d=W(a,"change"))||c)b={from:f,to:g,text:b.text,removed:b.removed,origin:b.origin},d&&Q(a,"change",a,b),c&&(a.curOp.changeObjs||(a.curOp.changeObjs=[])).push(b);a.display.selForContextMenu=null}function Va(a,b,c,d,e){d||(d=c);if(0>w(d,c)){var f=d;d=c;c=f}"string"==typeof b&&(b=a.splitLines(b));Pa(a,{from:c,to:d,text:b,origin:e})}function ac(a,b,c,d,e){var f=a.display,g=va(a.display);0>c&&(c=0);var h=a.curOp&&null!=a.curOp.scrollTop?a.curOp.scrollTop:f.scroller.scrollTop,k=Nc(a),l={};e-c>k&&(e=
c+k);var m=a.doc.height+Ec(f),s=c<g,g=e>m-g;c<h?l.scrollTop=s?0:c:e>h+k&&(c=Math.min(c,(g?m:e)-k),c!=h&&(l.scrollTop=c));h=a.curOp&&null!=a.curOp.scrollLeft?a.curOp.scrollLeft:f.scroller.scrollLeft;a=pa(a)-(a.options.fixedGutter?f.gutters.offsetWidth:0);(f=d-b>a)&&(d=b+a);10>b?l.scrollLeft=0:b<h?l.scrollLeft=Math.max(0,b-(f?0:10)):d>a+h-3&&(l.scrollLeft=d+(f?0:10)-a);return l}function kc(a,b,c){null==b&&null==c||lc(a);null!=b&&(a.curOp.scrollLeft=(null==a.curOp.scrollLeft?a.doc.scrollLeft:a.curOp.scrollLeft)+
b);null!=c&&(a.curOp.scrollTop=(null==a.curOp.scrollTop?a.doc.scrollTop:a.curOp.scrollTop)+c)}function Qa(a){lc(a);var b=a.getCursor(),c=b,d=b;a.options.lineWrapping||(c=b.ch?q(b.line,b.ch-1):b,d=q(b.line,b.ch+1));a.curOp.scrollToPos={from:c,to:d,margin:a.options.cursorScrollMargin,isCursor:!0}}function lc(a){var b=a.curOp.scrollToPos;if(b){a.curOp.scrollToPos=null;var c=se(a,b.from),d=se(a,b.to),b=ac(a,Math.min(c.left,d.left),Math.min(c.top,d.top)-b.margin,Math.max(c.right,d.right),Math.max(c.bottom,
d.bottom)+b.margin);a.scrollTo(b.scrollLeft,b.scrollTop)}}function pb(a,b,c,d){var e=a.doc,f;null==c&&(c="add");"smart"==c&&(e.mode.indent?f=sb(a,b):c="prev");var g=a.options.tabSize,h=t(e,b),k=aa(h.text,null,g);h.stateAfter&&(h.stateAfter=null);var l=h.text.match(/^\s*/)[0],m;if(!d&&!/\S/.test(h.text))m=0,c="not";else if("smart"==c&&(m=e.mode.indent(f,h.text.slice(l.length),h.text),m==Ee||150<m)){if(!d)return;c="prev"}"prev"==c?m=b>e.first?aa(t(e,b-1).text,null,g):0:"add"==c?m=k+a.options.indentUnit:
"subtract"==c?m=k-a.options.indentUnit:"number"==typeof c&&(m=k+c);m=Math.max(0,m);c="";d=0;if(a.options.indentWithTabs)for(a=Math.floor(m/g);a;--a)d+=g,c+="\t";d<m&&(c+=Re(m-d));if(c!=l)return Va(e,c,q(b,0),q(b,l.length),"+input"),h.stateAfter=null,!0;for(a=0;a<e.sel.ranges.length;a++)if(g=e.sel.ranges[a],g.head.line==b&&g.head.ch<l.length){d=q(b,l.length);Wc(e,a,new y(d,d));break}}function mc(a,b,c,d){var e=b,f=b;"number"==typeof b?f=t(a,Math.max(a.first,Math.min(b,a.first+a.size-1))):e=E(b);if(null==
e)return null;d(f,e)&&a.cm&&ma(a.cm,e,c);return f}function Wa(a,b){for(var c=a.doc.sel.ranges,d=[],e=0;e<c.length;e++){for(var f=b(c[e]);d.length&&0>=w(f.from,z(d).to);){var g=d.pop();if(0>w(g.from,f.from)){f.from=g.from;break}}d.push(f)}R(a,function(){for(var b=d.length-1;0<=b;b--)Va(a.doc,"",d[b].from,d[b].to,"+delete");Qa(a)})}function qd(a,b,c,d,e){function f(b){var d=(e?gd:Se)(l,h,c,!0);if(null==d){if(b=!b)b=g+c,b<a.first||b>=a.first+a.size?b=!1:(g=b,b=l=t(a,b));if(b)h=e?(0>c?$b:Zb)(l):0>c?l.text.length:
0;else return!1}else h=d;return!0}var g=b.line,h=b.ch,k=c,l=t(a,g);if("char"==d)f();else if("column"==d)f(!0);else if("word"==d||"group"==d){var m=null;d="group"==d;for(var s=a.cm&&a.cm.getHelper(b,"wordChars"),p=!0;!(0>c)||f(!p);p=!1){var n=l.text.charAt(h)||"\n",n=nc(n,s)?"w":d&&"\n"==n?"n":!d||/\s/.test(n)?null:"p";!d||p||n||(n="s");if(m&&m!=n){0>c&&(c=1,f());break}n&&(m=n);if(0<c&&!f(!p))break}}k=Xc(a,q(g,h),b,k,!0);w(b,k)||(k.hitSide=!0);return k}function Te(a,b,c,d){var e=a.doc,f=b.left,g;"page"==
d?(g=Math.min(a.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight),g=b.top+c*(g-(0>c?1.5:.5)*va(a.display))):"line"==d&&(g=0<c?b.bottom+3:b.top-3);for(;;){b=fd(a,f,g);if(!b.outside)break;if(0>c?0>=g:g>=e.height){b.hitSide=!0;break}g+=5*c}return b}function v(a,b,c,d){n.defaults[a]=b;c&&(La[a]=d?function(a,b,d){d!=Ed&&c(a,b,d)}:c)}function cg(a){var b=a.split(/-(?!$)/);a=b[b.length-1];for(var c,d,e,f,g=0;g<b.length-1;g++){var h=b[g];if(/^(cmd|meta|m)$/i.test(h))f=
!0;else if(/^a(lt)?$/i.test(h))c=!0;else if(/^(c|ctrl|control)$/i.test(h))d=!0;else if(/^s(hift)$/i.test(h))e=!0;else throw Error("Unrecognized modifier name: "+h);}c&&(a="Alt-"+a);d&&(a="Ctrl-"+a);f&&(a="Cmd-"+a);e&&(a="Shift-"+a);return a}function oc(a){return"string"==typeof a?ta[a]:a}function Xa(a,b,c,d,e){if(d&&d.shared)return dg(a,b,c,d,e);if(a.cm&&!a.cm.curOp)return G(a.cm,Xa)(a,b,c,d,e);var f=new Ha(a,e);e=w(b,c);d&&X(d,f,!1);if(0<e||0==e&&!1!==f.clearWhenEmpty)return f;f.replacedWith&&(f.collapsed=
!0,f.widgetNode=r("span",[f.replacedWith],"CodeMirror-widget"),d.handleMouseEvents||f.widgetNode.setAttribute("cm-ignore-events","true"),d.insertLeft&&(f.widgetNode.insertLeft=!0));if(f.collapsed){if(Ue(a,b.line,b,c,f)||b.line!=c.line&&Ue(a,c.line,b,c,f))throw Error("Inserting collapsed marker partially overlapping an existing one");ra=!0}f.addToHistory&&Me(a,{from:b,to:c,origin:"markText"},a.sel,NaN);var g=b.line,h=a.cm,k;a.iter(g,c.line+1,function(a){h&&f.collapsed&&!h.options.lineWrapping&&ia(a)==
h.display.maxLine&&(k=!0);f.collapsed&&g!=b.line&&ca(a,0);var d=new pc(f,g==b.line?b.ch:null,g==c.line?c.ch:null);a.markedSpans=a.markedSpans?a.markedSpans.concat([d]):[d];d.marker.attachLine(a);++g});f.collapsed&&a.iter(b.line,c.line+1,function(b){wa(a,b)&&ca(b,0)});f.clearOnEnter&&u(f,"beforeCursorEnter",function(){f.clear()});f.readOnly&&(Ke=!0,(a.history.done.length||a.history.undone.length)&&a.clearHistory());f.collapsed&&(f.id=++rd,f.atomic=!0);if(h){k&&(h.curOp.updateMaxLine=!0);if(f.collapsed)O(h,
b.line,c.line+1);else if(f.className||f.title||f.startStyle||f.endStyle||f.css)for(d=b.line;d<=c.line;d++)ma(h,d,"text");f.atomic&&ie(h.doc);Q(h,"markerAdded",h,f)}return f}function dg(a,b,c,d,e){d=X(d);d.shared=!1;var f=[Xa(a,b,c,d,e)],g=f[0],h=d.widgetNode;Ga(a,function(a){h&&(d.widgetNode=h.cloneNode(!0));f.push(Xa(a,x(a,b),x(a,c),d,e));for(var l=0;l<a.linked.length;++l)if(a.linked[l].isParent)return;g=z(f)});return new qc(f,g)}function Ve(a){return a.findMarks(q(a.first,0),a.clipPos(q(a.lastLine())),
function(a){return a.parent})}function eg(a){for(var b=0;b<a.length;b++){var c=a[b],d=[c.primary.doc];Ga(c.primary.doc,function(a){d.push(a)});for(var e=0;e<c.markers.length;e++){var f=c.markers[e];-1==D(d,f.doc)&&(f.parent=null,c.markers.splice(e--,1))}}}function pc(a,b,c){this.marker=a;this.from=b;this.to=c}function yb(a,b){if(a)for(var c=0;c<a.length;++c){var d=a[c];if(d.marker==b)return d}}function nd(a,b){if(b.full)return null;var c=qb(a,b.from.line)&&t(a,b.from.line).markedSpans,d=qb(a,b.to.line)&&
t(a,b.to.line).markedSpans;if(!c&&!d)return null;var e=b.from.ch,f=b.to.ch,g=0==w(b.from,b.to);if(c)for(var h=0,k;h<c.length;++h){var l=c[h],m=l.marker;if(null==l.from||(m.inclusiveLeft?l.from<=e:l.from<e)||!(l.from!=e||"bookmark"!=m.type||g&&l.marker.insertLeft)){var s=null==l.to||(m.inclusiveRight?l.to>=e:l.to>e);(k||(k=[])).push(new pc(m,l.from,s?null:l.to))}}c=k;if(d)for(var h=0,p;h<d.length;++h)if(k=d[h],l=k.marker,null==k.to||(l.inclusiveRight?k.to>=f:k.to>f)||k.from==f&&"bookmark"==l.type&&
(!g||k.marker.insertLeft))m=null==k.from||(l.inclusiveLeft?k.from<=f:k.from<f),(p||(p=[])).push(new pc(l,m?null:k.from-f,null==k.to?null:k.to-f));d=p;g=1==b.text.length;p=z(b.text).length+(g?e:0);if(c)for(f=0;f<c.length;++f)if(h=c[f],null==h.to)(k=yb(d,h.marker),k)?g&&(h.to=null==k.to?null:k.to+p):h.to=e;if(d)for(f=0;f<d.length;++f)h=d[f],null!=h.to&&(h.to+=p),null==h.from?(k=yb(c,h.marker),k||(h.from=p,g&&(c||(c=[])).push(h))):(h.from+=p,g&&(c||(c=[])).push(h));c&&(c=We(c));d&&d!=c&&(d=We(d));e=
[c];if(!g){var g=b.text.length-2,n;if(0<g&&c)for(f=0;f<c.length;++f)null==c[f].to&&(n||(n=[])).push(new pc(c[f].marker,null,null));for(f=0;f<g;++f)e.push(n);e.push(d)}return e}function We(a){for(var b=0;b<a.length;++b){var c=a[b];null!=c.from&&c.from==c.to&&!1!==c.marker.clearWhenEmpty&&a.splice(b--,1)}return a.length?a:null}function Oe(a,b){var c;if(c=b["spans_"+a.id]){for(var d=0,e=[];d<b.text.length;++d)e.push(fg(c[d]));c=e}else c=null;d=nd(a,b);if(!c)return d;if(!d)return c;for(e=0;e<c.length;++e){var f=
c[e],g=d[e];if(f&&g){var h=0;a:for(;h<g.length;++h){for(var k=g[h],l=0;l<f.length;++l)if(f[l].marker==k.marker)continue a;f.push(k)}}else g&&(c[e]=g)}return c}function ag(a,b,c){var d=null;a.iter(b.line,c.line+1,function(a){if(a.markedSpans)for(var b=0;b<a.markedSpans.length;++b){var c=a.markedSpans[b].marker;!c.readOnly||d&&-1!=D(d,c)||(d||(d=[])).push(c)}});if(!d)return null;a=[{from:b,to:c}];for(b=0;b<d.length;++b){c=d[b];for(var e=c.find(0),f=0;f<a.length;++f){var g=a[f];if(!(0>w(g.to,e.from)||
0<w(g.from,e.to))){var h=[f,1],k=w(g.from,e.from),l=w(g.to,e.to);(0>k||!c.inclusiveLeft&&!k)&&h.push({from:g.from,to:e.from});(0<l||!c.inclusiveRight&&!l)&&h.push({from:e.to,to:g.to});a.splice.apply(a,h);f+=h.length-1}}}return a}function Xe(a){var b=a.markedSpans;if(b){for(var c=0;c<b.length;++c)b[c].marker.detachLine(a);a.markedSpans=null}}function Ye(a,b){if(b){for(var c=0;c<b.length;++c)b[c].marker.attachLine(a);a.markedSpans=b}}function Ze(a,b){var c=a.lines.length-b.lines.length;if(0!=c)return c;
var c=a.find(),d=b.find(),e=w(c.from,d.from)||(a.inclusiveLeft?-1:0)-(b.inclusiveLeft?-1:0);return e?-e:(c=w(c.to,d.to)||(a.inclusiveRight?1:0)-(b.inclusiveRight?1:0))?c:b.id-a.id}function ya(a,b){var c=ra&&a.markedSpans,d;if(c)for(var e,f=0;f<c.length;++f)e=c[f],e.marker.collapsed&&null==(b?e.from:e.to)&&(!d||0>Ze(d,e.marker))&&(d=e.marker);return d}function Ue(a,b,c,d,e){a=t(a,b);if(a=ra&&a.markedSpans)for(b=0;b<a.length;++b){var f=a[b];if(f.marker.collapsed){var g=f.marker.find(0),h=w(g.from,c)||
(f.marker.inclusiveLeft?-1:0)-(e.inclusiveLeft?-1:0),k=w(g.to,d)||(f.marker.inclusiveRight?1:0)-(e.inclusiveRight?1:0);if(!(0<=h&&0>=k||0>=h&&0<=k)&&(0>=h&&(0<w(g.to,c)||f.marker.inclusiveRight&&e.inclusiveLeft)||0<=h&&(0>w(g.from,d)||f.marker.inclusiveLeft&&e.inclusiveRight)))return!0}}}function ia(a){for(var b;b=ya(a,!0);)a=b.find(-1,!0).line;return a}function Mc(a,b){var c=t(a,b),d=ia(c);return c==d?b:E(d)}function Kd(a,b){if(b>a.lastLine())return b;var c=t(a,b),d;if(!wa(a,c))return b;for(;d=ya(c,
!1);)c=d.find(1,!0).line;return E(c)+1}function wa(a,b){var c=ra&&b.markedSpans;if(c)for(var d,e=0;e<c.length;++e)if(d=c[e],d.marker.collapsed&&(null==d.from||!d.marker.widgetNode&&0==d.from&&d.marker.inclusiveLeft&&sd(a,b,d)))return!0}function sd(a,b,c){if(null==c.to)return b=c.marker.find(1,!0),sd(a,b.line,yb(b.line.markedSpans,c.marker));if(c.marker.inclusiveRight&&c.to==b.text.length)return!0;for(var d,e=0;e<b.markedSpans.length;++e)if(d=b.markedSpans[e],d.marker.collapsed&&!d.marker.widgetNode&&
d.from==c.to&&(null==d.to||d.to!=c.from)&&(d.marker.inclusiveLeft||c.marker.inclusiveRight)&&sd(a,b,d))return!0}function ub(a){if(null!=a.height)return a.height;var b=a.doc.cm;if(!b)return 0;if(!Vc(document.body,a.node)){var c="position: relative;";a.coverGutter&&(c+="margin-left: -"+b.display.gutters.offsetWidth+"px;");a.noHScroll&&(c+="width: "+b.display.wrapper.clientWidth+"px;");S(b.display.measure,r("div",[a.node],null,c))}return a.height=a.node.parentNode.offsetHeight}function gg(a,b,c,d){var e=
new rc(a,c,d),f=a.cm;f&&e.noHScroll&&(f.display.alignWidgets=!0);mc(a,b,"widget",function(b){var c=b.widgets||(b.widgets=[]);null==e.insertAt?c.push(e):c.splice(Math.min(c.length-1,Math.max(0,e.insertAt)),0,e);e.line=b;f&&!wa(a,b)&&(c=ea(b)<a.scrollTop,ca(b,b.height+ub(e)),c&&kc(f,null,e.height),f.curOp.forceUpdate=!0);return!0});return e}function $e(a,b){if(a)for(;;){var c=a.match(/(?:^|\s+)line-(background-)?(\S+)/);if(!c)break;a=a.slice(0,c.index)+a.slice(c.index+c[0].length);var d=c[1]?"bgClass":
"textClass";null==b[d]?b[d]=c[2]:(new RegExp("(?:^|s)"+c[2]+"(?:$|s)")).test(b[d])||(b[d]+=" "+c[2])}return a}function af(a,b){if(a.blankLine)return a.blankLine(b);if(a.innerMode){var c=n.innerMode(a,b);if(c.mode.blankLine)return c.mode.blankLine(c.state)}}function td(a,b,c,d){for(var e=0;10>e;e++){d&&(d[0]=n.innerMode(a,c).mode);var f=a.token(b,c);if(b.pos>b.start)return f}throw Error("Mode "+a.name+" failed to advance stream.");}function bf(a,b,c,d){function e(a){return{start:m.start,end:m.pos,
string:m.current(),type:h||null,state:a?sa(f.mode,l):l}}var f=a.doc,g=f.mode,h;b=x(f,b);var k=t(f,b.line),l=sb(a,b.line,c),m=new sc(k.text,a.options.tabSize),s;for(d&&(s=[]);(d||m.pos<b.ch)&&!m.eol();)m.start=m.pos,h=td(g,m,l),d&&s.push(e(!0));return d?s:e()}function cf(a,b,c,d,e,f,g){var h=c.flattenSpans;null==h&&(h=a.options.flattenSpans);var k=0,l=null,m=new sc(b,a.options.tabSize),s,p=a.options.addModeClass&&[null];for(""==b&&$e(af(c,d),f);!m.eol();){m.pos>a.options.maxHighlightLength?(h=!1,g&&
Zc(a,b,d,m.pos),m.pos=b.length,s=null):s=$e(td(c,m,d,p),f);if(p){var n=p[0].name;n&&(s="m-"+(s?n+" "+s:n))}if(!h||l!=s){for(;k<m.start;)k=Math.min(m.start,k+5E4),e(k,l);l=s}m.start=m.pos}for(;k<m.pos;)a=Math.min(m.pos,k+5E4),e(a,l),k=a}function ne(a,b,c,d){var e=[a.state.modeGen],f={};cf(a,b.text,a.doc.mode,c,function(a,b){e.push(a,b)},f,d);for(c=0;c<a.state.overlays.length;++c){var g=a.state.overlays[c],h=1,k=0;cf(a,b.text,g.mode,!0,function(a,b){for(var c=h;k<a;){var d=e[h];d>a&&e.splice(h,1,a,
e[h+1],d);h+=2;k=Math.min(a,d)}if(b)if(g.opaque)e.splice(c,h-c,a,"cm-overlay "+b),h=c+2;else for(;c<h;c+=2)d=e[c+1],e[c+1]=(d?d+" ":"")+"cm-overlay "+b},f)}return{styles:e,classes:f.bgClass||f.textClass?f:null}}function df(a,b,c){if(!b.styles||b.styles[0]!=a.state.modeGen){var d=sb(a,E(b)),e=ne(a,b,b.text.length>a.options.maxHighlightLength?sa(a.doc.mode,d):d);b.stateAfter=d;b.styles=e.styles;e.classes?b.styleClasses=e.classes:b.styleClasses&&(b.styleClasses=null);c===a.doc.frontier&&a.doc.frontier++}return b.styles}
function Zc(a,b,c,d){var e=a.doc.mode;a=new sc(b,a.options.tabSize);a.start=a.pos=d||0;for(""==b&&af(e,c);!a.eol();)td(e,a,c),a.start=a.pos}function ef(a,b){if(!a||/^\s*$/.test(a))return null;var c=b.addModeClass?hg:ig;return c[a]||(c[a]=a.replace(/\S+/g,"cm-$\x26"))}function Rd(a,b){var c=r("span",null,null,K?"padding-right: .1px":null),c={pre:r("pre",[c],"CodeMirror-line"),content:c,col:0,pos:0,cm:a,splitSpaces:(A||K)&&a.getOption("lineWrapping")};b.measure={};for(var d=0;d<=(b.rest?b.rest.length:
0);d++){var e=d?b.rest[d-1]:b.line,f;c.pos=0;c.addToken=jg;var g;if(null!=ud)g=ud;else{g=S(a.display.measure,document.createTextNode("AخA"));var h=Ca(g,0,1).getBoundingClientRect();g=h&&h.left!=h.right?ud=3>Ca(g,1,2).getBoundingClientRect().right-h.right:!1}g&&(f=Z(e))&&(c.addToken=kg(c.addToken,f));c.map=[];h=b!=a.display.externalMeasured&&E(e);a:{g=c;var h=df(a,e,h),k=e.markedSpans,l=e.text,m=0;if(k)for(var s=l.length,p=0,n=1,q="",t=void 0,u=void 0,v=0,w=void 0,x=void 0,z=void 0,C=void 0,y=void 0;;){if(v==
p){for(var w=x=z=C=u="",y=null,v=Infinity,G=[],H,B=0;B<k.length;++B){var I=k[B],D=I.marker;"bookmark"==D.type&&I.from==p&&D.widgetNode?G.push(D):I.from<=p&&(null==I.to||I.to>p||D.collapsed&&I.to==p&&I.from==p)?(null!=I.to&&I.to!=p&&v>I.to&&(v=I.to,x=""),D.className&&(w+=" "+D.className),D.css&&(u=(u?u+";":"")+D.css),D.startStyle&&I.from==p&&(z+=" "+D.startStyle),D.endStyle&&I.to==v&&(H||(H=[])).push(D.endStyle,I.to),D.title&&!C&&(C=D.title),D.collapsed&&(!y||0>Ze(y.marker,D))&&(y=I)):I.from>p&&v>
I.from&&(v=I.from)}if(H)for(B=0;B<H.length;B+=2)H[B+1]==v&&(x+=" "+H[B]);if(!y||y.from==p)for(B=0;B<G.length;++B)ff(g,0,G[B]);if(y&&(y.from||0)==p){ff(g,(null==y.to?s+1:y.to)-p,y.marker,null==y.from);if(null==y.to)break a;y.to==p&&(y=!1)}}if(p>=s)break;for(G=Math.min(s,v);;){if(q){B=p+q.length;y||(I=B>G?q.slice(0,G-p):q,g.addToken(g,I,t?t+w:w,z,p+I.length==v?x:"",C,u));if(B>=G){q=q.slice(G-p);p=G;break}p=B;z=""}q=l.slice(m,m=h[n++]);t=ef(h[n++],g.cm.options)}}else for(var n=1;n<h.length;n+=2)g.addToken(g,
l.slice(m,m=h[n]),ef(h[n+1],g.cm.options))}e.styleClasses&&(e.styleClasses.bgClass&&(c.bgClass=vd(e.styleClasses.bgClass,c.bgClass||"")),e.styleClasses.textClass&&(c.textClass=vd(e.styleClasses.textClass,c.textClass||"")));0==c.map.length&&c.map.push(0,0,c.content.appendChild(lg(a.display.measure)));0==d?(b.measure.map=c.map,b.measure.cache={}):((b.measure.maps||(b.measure.maps=[])).push(c.map),(b.measure.caches||(b.measure.caches=[])).push({}))}K&&/\bcm-tab\b/.test(c.content.lastChild.className)&&
(c.content.className="cm-tab-wrap-hack");J(a,"renderLine",a,b.line,c.pre);c.pre.className&&(c.textClass=vd(c.pre.className,c.textClass||""));return c}function jg(a,b,c,d,e,f,g){if(b){var h=a.splitSpaces?b.replace(/ {3,}/g,mg):b,k=a.cm.state.specialChars,l=!1;if(k.test(b))for(var m=document.createDocumentFragment(),s=0;;){k.lastIndex=s;var p=k.exec(b),n=p?p.index-s:b.length-s;if(n){var q=document.createTextNode(h.slice(s,s+n));A&&9>C?m.appendChild(r("span",[q])):m.appendChild(q);a.map.push(a.pos,a.pos+
n,q);a.col+=n;a.pos+=n}if(!p)break;s+=n+1;"\t"==p[0]?(q=a.cm.options.tabSize,p=q-a.col%q,q=m.appendChild(r("span",Re(p),"cm-tab")),q.setAttribute("role","presentation"),q.setAttribute("cm-text","\t"),a.col+=p):("\r"==p[0]||"\n"==p[0]?(q=m.appendChild(r("span","\r"==p[0]?"␍":"␤","cm-invalidchar")),q.setAttribute("cm-text",p[0])):(q=a.cm.options.specialCharPlaceholder(p[0]),q.setAttribute("cm-text",p[0]),A&&9>C?m.appendChild(r("span",[q])):m.appendChild(q)),a.col+=1);a.map.push(a.pos,a.pos+1,q);a.pos++}else{a.col+=
b.length;var m=document.createTextNode(h);a.map.push(a.pos,a.pos+b.length,m);A&&9>C&&(l=!0);a.pos+=b.length}if(c||d||e||l||g)return b=c||"",d&&(b+=d),e&&(b+=e),d=r("span",[m],b,g),f&&(d.title=f),a.content.appendChild(d);a.content.appendChild(m)}}function mg(a){for(var b=" ",c=0;c<a.length-2;++c)b+=c%2?" ":" ";return b+" "}function kg(a,b){return function(c,d,e,f,g,h,k){e=e?e+" cm-force-border":"cm-force-border";for(var l=c.pos,m=l+d.length;;){for(var s=0;s<b.length;s++){var p=b[s];if(p.to>l&&p.from<=
l)break}if(p.to>=m)return a(c,d,e,f,g,h,k);a(c,d.slice(0,p.to-l),e,f,null,h,k);f=null;d=d.slice(p.to-l);l=p.to}}}function ff(a,b,c,d){var e=!d&&c.widgetNode;e&&a.map.push(a.pos,a.pos+b,e);!d&&a.cm.display.input.needsContentAttribute&&(e||(e=a.content.appendChild(document.createElement("span"))),e.setAttribute("cm-marker",c.id));e&&(a.cm.display.input.setUneditable(e),a.content.appendChild(e));a.pos+=b}function Qe(a,b){return 0==b.from.ch&&0==b.to.ch&&""==z(b.text)&&(!a.cm||a.cm.options.wholeLineUpdateBefore)}
function pd(a,b,c,d){function e(a,c,e){a.text=c;a.stateAfter&&(a.stateAfter=null);a.styles&&(a.styles=null);null!=a.order&&(a.order=null);Xe(a);Ye(a,e);c=d?d(a):1;c!=a.height&&ca(a,c);Q(a,"change",a,b)}function f(a,b){for(var e=a,f=[];e<b;++e)f.push(new zb(k[e],c?c[e]:null,d));return f}var g=b.from,h=b.to,k=b.text,l=t(a,g.line),m=t(a,h.line),s=z(k),p=c?c[k.length-1]:null,n=h.line-g.line;if(b.full)a.insert(0,f(0,k.length)),a.remove(k.length,a.size-k.length);else if(Qe(a,b)){var q=f(0,k.length-1);e(m,
m.text,p);n&&a.remove(g.line,n);q.length&&a.insert(g.line,q)}else l==m?1==k.length?e(l,l.text.slice(0,g.ch)+s+l.text.slice(h.ch),p):(q=f(1,k.length-1),q.push(new zb(s+l.text.slice(h.ch),p,d)),e(l,l.text.slice(0,g.ch)+k[0],c?c[0]:null),a.insert(g.line+1,q)):1==k.length?(e(l,l.text.slice(0,g.ch)+k[0]+m.text.slice(h.ch),c?c[0]:null),a.remove(g.line+1,n)):(e(l,l.text.slice(0,g.ch)+k[0],c?c[0]:null),e(m,s+m.text.slice(h.ch),p),q=f(1,k.length-1),1<n&&a.remove(g.line+1,n-1),a.insert(g.line+1,q));Q(a,"change",
a,b)}function Ab(a){this.lines=a;this.parent=null;for(var b=0,c=0;b<a.length;++b)a[b].parent=this,c+=a[b].height;this.height=c}function Bb(a){this.children=a;for(var b=0,c=0,d=0;d<a.length;++d){var e=a[d],b=b+e.chunkSize(),c=c+e.height;e.parent=this}this.size=b;this.height=c;this.parent=null}function Ga(a,b,c){function d(a,f,g){if(a.linked)for(var h=0;h<a.linked.length;++h){var k=a.linked[h];if(k.doc!=f){var l=g&&k.sharedHist;if(!c||l)b(k.doc,l),d(k.doc,a,l)}}}d(a,null,!0)}function Dd(a,b){if(b.cm)throw Error("This document is already in use.");
a.doc=b;b.cm=a;Ac(a);zc(a);a.options.lineWrapping||Dc(a);a.options.mode=b.modeOption;O(a)}function t(a,b){b-=a.first;if(0>b||b>=a.size)throw Error("There is no line "+(b+a.first)+" in the document.");for(var c=a;!c.lines;)for(var d=0;;++d){var e=c.children[d],f=e.chunkSize();if(b<f){c=e;break}b-=f}return c.lines[b]}function Ba(a,b,c){var d=[],e=b.line;a.iter(b.line,c.line+1,function(a){a=a.text;e==c.line&&(a=a.slice(0,c.ch));e==b.line&&(a=a.slice(b.ch));d.push(a);++e});return d}function wd(a,b,c){var d=
[];a.iter(b,c,function(a){d.push(a.text)});return d}function ca(a,b){var c=b-a.height;if(c)for(var d=a;d;d=d.parent)d.height+=c}function E(a){if(null==a.parent)return null;var b=a.parent;a=D(b.lines,a);for(var c=b.parent;c;b=c,c=c.parent)for(var d=0;c.children[d]!=b;++d)a+=c.children[d].chunkSize();return a+b.first}function za(a,b){var c=a.first;a:do{for(var d=0;d<a.children.length;++d){var e=a.children[d],f=e.height;if(b<f){a=e;continue a}b-=f;c+=e.chunkSize()}return c}while(!a.lines);for(d=0;d<
a.lines.length;++d){e=a.lines[d].height;if(b<e)break;b-=e}return c+d}function ea(a){a=ia(a);for(var b=0,c=a.parent,d=0;d<c.lines.length;++d){var e=c.lines[d];if(e==a)break;else b+=e.height}for(a=c.parent;a;c=a,a=c.parent)for(d=0;d<a.children.length&&(e=a.children[d],e!=c);++d)b+=e.height;return b}function Z(a){var b=a.order;null==b&&(b=a.order=ng(a.text));return b}function tc(a){this.done=[];this.undone=[];this.undoDepth=Infinity;this.lastModTime=this.lastSelTime=0;this.lastOrigin=this.lastSelOrigin=
this.lastOp=this.lastSelOp=null;this.generation=this.maxGeneration=a||1}function od(a,b){var c={from:Rc(b.from),to:Fa(b),text:Ba(a,b.from,b.to)};gf(a,c,b.from.line,b.to.line+1);Ga(a,function(a){gf(a,c,b.from.line,b.to.line+1)},!0);return c}function ee(a){for(;a.length;)if(z(a).ranges)a.pop();else break}function Me(a,b,c,d){var e=a.history;e.undone.length=0;var f=+new Date,g,h;if(h=e.lastOp==d||e.lastOrigin==b.origin&&b.origin&&("+"==b.origin.charAt(0)&&a.cm&&e.lastModTime>f-a.cm.options.historyEventDelay||
"*"==b.origin.charAt(0)))e.lastOp==d?(ee(e.done),g=z(e.done)):e.done.length&&!z(e.done).ranges?g=z(e.done):1<e.done.length&&!e.done[e.done.length-2].ranges?(e.done.pop(),g=z(e.done)):g=void 0,h=g;if(h){var k=z(g.changes);0==w(b.from,b.to)&&0==w(b.from,k.to)?k.to=Fa(b):g.changes.push(od(a,b))}else for((g=z(e.done))&&g.ranges||Vb(a.sel,e.done),g={changes:[od(a,b)],generation:e.generation},e.done.push(g);e.done.length>e.undoDepth;)e.done.shift(),e.done[0].ranges||e.done.shift();e.done.push(c);e.generation=
++e.maxGeneration;e.lastModTime=e.lastSelTime=f;e.lastOp=e.lastSelOp=d;e.lastOrigin=e.lastSelOrigin=b.origin;k||J(a,"historyAdded")}function Vb(a,b){var c=z(b);c&&c.ranges&&c.equals(a)||b.push(a)}function gf(a,b,c,d){var e=b["spans_"+a.id],f=0;a.iter(Math.max(a.first,c),Math.min(a.first+a.size,d),function(c){c.markedSpans&&((e||(e=b["spans_"+a.id]={}))[f]=c.markedSpans);++f})}function fg(a){if(!a)return null;for(var b=0,c;b<a.length;++b)a[b].marker.explicitlyCleared?c||(c=a.slice(0,b)):c&&c.push(a[b]);
return c?c.length?c:null:a}function Ya(a,b,c){for(var d=0,e=[];d<a.length;++d){var f=a[d];if(f.ranges)e.push(c?ka.prototype.deepCopy.call(f):f);else{var f=f.changes,g=[];e.push({changes:g});for(var h=0;h<f.length;++h){var k=f[h],l;g.push({from:k.from,to:k.to,text:k.text});if(b)for(var m in k)(l=m.match(/^spans_(\d+)$/))&&-1<D(b,Number(l[1]))&&(z(g)[m]=k[m],delete k[m])}}}return e}function hf(a,b,c,d){c<a.line?a.line+=d:b<a.line&&(a.line=b,a.ch=0)}function jf(a,b,c,d){for(var e=0;e<a.length;++e){var f=
a[e],g=!0;if(f.ranges){f.copied||(f=a[e]=f.deepCopy(),f.copied=!0);for(var h=0;h<f.ranges.length;h++)hf(f.ranges[h].anchor,b,c,d),hf(f.ranges[h].head,b,c,d)}else{for(h=0;h<f.changes.length;++h){var k=f.changes[h];if(c<k.from.line)k.from=q(k.from.line+d,k.from.ch),k.to=q(k.to.line+d,k.to.ch);else if(b<=k.to.line){g=!1;break}}g||(a.splice(0,e+1),e=0)}}}function Ne(a,b){var c=b.from.line,d=b.to.line,e=b.text.length-(d-c)-1;jf(a.done,c,d,e);jf(a.undone,c,d,e)}function kd(a){return null!=a.defaultPrevented?
a.defaultPrevented:0==a.returnValue}function Be(a){var b=a.which;null==b&&(a.button&1?b=1:a.button&2?b=3:a.button&4&&(b=2));Y&&a.ctrlKey&&1==b&&(b=3);return b}function uc(a,b,c){a=a._handlers&&a._handlers[b];return c?a&&0<a.length?a.slice():kf:a||kf}function Q(a,b){function c(a){return function(){a.apply(null,e)}}var d=uc(a,b,!1);if(d.length){var e=Array.prototype.slice.call(arguments,2),f;Ua?f=Ua.delayedCallbacks:Cb?f=Cb:(f=Cb=[],setTimeout(og,0));for(var g=0;g<d.length;++g)f.push(c(d[g]))}}function og(){var a=
Cb;Cb=null;for(var b=0;b<a.length;++b)a[b]()}function B(a,b,c){"string"==typeof b&&(b={type:b,preventDefault:function(){this.defaultPrevented=!0}});J(a,c||b.type,a,b);return kd(b)||b.codemirrorIgnore}function he(a){var b=a._handlers&&a._handlers.cursorActivity;if(b){a=a.curOp.cursorActivityHandlers||(a.curOp.cursorActivityHandlers=[]);for(var c=0;c<b.length;++c)-1==D(a,b[c])&&a.push(b[c])}}function W(a,b){return 0<uc(a,b).length}function Za(a){a.prototype.on=function(a,c){u(this,a,c)};a.prototype.off=
function(a,c){ja(this,a,c)}}function ua(){this.id=null}function Re(a){for(;vc.length<=a;)vc.push(z(vc)+" ");return vc[a]}function z(a){return a[a.length-1]}function D(a,b){for(var c=0;c<a.length;++c)if(a[c]==b)return c;return-1}function Qb(a,b){for(var c=[],d=0;d<a.length;d++)c[d]=b(a[d],d);return c}function Db(){}function lf(a,b){var c;Object.create?c=Object.create(a):(Db.prototype=a,c=new Db);b&&X(b,c);return c}function X(a,b,c){b||(b={});for(var d in a)!a.hasOwnProperty(d)||!1===c&&b.hasOwnProperty(d)||
(b[d]=a[d]);return b}function cb(a){var b=Array.prototype.slice.call(arguments,1);return function(){return a.apply(null,b)}}function nc(a,b){return b?-1<b.source.indexOf("\\w")&&mf(a)?!0:b.test(a):mf(a)}function nf(a){for(var b in a)if(a.hasOwnProperty(b)&&a[b])return!1;return!0}function tb(a){return 768<=a.charCodeAt(0)&&pg.test(a)}function r(a,b,c,d){a=document.createElement(a);c&&(a.className=c);d&&(a.style.cssText=d);if("string"==typeof b)a.appendChild(document.createTextNode(b));else if(b)for(c=
0;c<b.length;++c)a.appendChild(b[c]);return a}function xa(a){for(var b=a.childNodes.length;0<b;--b)a.removeChild(a.firstChild);return a}function S(a,b){return xa(a).appendChild(b)}function fa(){for(var a=document.activeElement;a&&a.root&&a.root.activeElement;)a=a.root.activeElement;return a}function Eb(a){return new RegExp("(^|\\s)"+a+"(?:$|\\s)\\s*")}function vd(a,b){for(var c=a.split(" "),d=0;d<c.length;d++)c[d]&&!Eb(c[d]).test(b)&&(b+=" "+c[d]);return b}function of(a){if(document.body.getElementsByClassName)for(var b=
document.body.getElementsByClassName("CodeMirror"),c=0;c<b.length;c++){var d=b[c].CodeMirror;d&&a(d)}}function zf(){var a;u(window,"resize",function(){null==a&&(a=setTimeout(function(){a=null;of(Pf)},100))});u(window,"blur",function(){of(db)})}function lg(a){if(null==xd){var b=r("span","​");S(a,r("span",[b,document.createTextNode("x")]));0!=a.firstChild.offsetHeight&&(xd=1>=b.offsetWidth&&2<b.offsetHeight&&!(A&&8>C))}a=xd?r("span","​"):r("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px");
a.setAttribute("cm-text","");return a}function Gf(a,b,c,d){if(!a)return d(b,c,"ltr");for(var e=!1,f=0;f<a.length;++f){var g=a[f];if(g.from<c&&g.to>b||b==c&&g.to==b)d(Math.max(g.from,b),Math.min(g.to,c),1==g.level?"rtl":"ltr"),e=!0}e||d(b,c,"ltr")}function dd(a){return a.level%2?a.to:a.from}function ed(a){return a.level%2?a.from:a.to}function Zb(a){return(a=Z(a))?dd(a[0]):0}function $b(a){var b=Z(a);return b?ed(z(b)):a.text.length}function pf(a,b){var c=t(a.doc,b),d=ia(c);d!=c&&(b=E(d));d=(c=Z(d))?
c[0].level%2?$b(d):Zb(d):0;return q(b,d)}function qf(a,b){var c=pf(a,b.line),d=t(a.doc,c.line),e=Z(d);return e&&0!=e[0].level?c:(d=Math.max(0,d.text.search(/\S/)),q(c.line,b.line==c.line&&b.ch<=d&&b.ch?0:d))}function Rb(a,b){vb=null;for(var c=0,d;c<a.length;++c){var e=a[c];if(e.from<b&&e.to>b)return c;if(e.from==b||e.to==b)if(null==d)d=c;else{var f;f=e.level;var g=a[d].level,h=a[0].level;f=f==h?!0:g==h?!1:f<g;if(f)return e.from!=e.to&&(vb=d),c;e.from!=e.to&&(vb=c);break}}return d}function yd(a,b,
c,d){if(!d)return b+c;do b+=c;while(0<b&&tb(a.text.charAt(b)));return b}function gd(a,b,c,d){var e=Z(a);if(!e)return Se(a,b,c,d);var f=Rb(e,b),g=e[f];for(b=yd(a,b,g.level%2?-c:c,d);;){if(b>g.from&&b<g.to)return b;if(b==g.from||b==g.to){if(Rb(e,b)==f)return b;g=e[f+c];return 0<c==g.level%2?g.to:g.from}g=e[f+=c];if(!g)return null;b=0<c==g.level%2?yd(a,g.to,-1,d):yd(a,g.from,1,d)}}function Se(a,b,c,d){b+=c;if(d)for(;0<b&&tb(a.text.charAt(b));)b+=c;return 0>b||b>a.text.length?null:b}var U=navigator.userAgent,
rf=navigator.platform,oa=/gecko\/\d/i.test(U),sf=/MSIE \d/.test(U),tf=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(U),A=sf||tf,C=A&&(sf?document.documentMode||6:tf[1]),K=/WebKit\//.test(U),qg=K&&/Qt\/\d+\.\d+/.test(U),rg=/Chrome\//.test(U),ba=/Opera\//.test(U),we=/Apple Computer/.test(navigator.vendor),sg=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(U),Mf=/PhantomJS/.test(U),Ra=/AppleWebKit/.test(U)&&/Mobile\/\w+/.test(U),bb=Ra||/Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(U),Y=Ra||/Mac/.test(rf),
tg=/win/i.test(rf),Ia=ba&&U.match(/Version\/(\d*\.\d*)/);Ia&&(Ia=Number(Ia[1]));Ia&&15<=Ia&&(ba=!1,K=!0);var uf=Y&&(qg||ba&&(null==Ia||12.11>Ia)),id=oa||A&&9<=C,Ke=!1,ra=!1;Fc.prototype=X({update:function(a){var b=a.scrollWidth>a.clientWidth+1,c=a.scrollHeight>a.clientHeight+1,d=a.nativeBarWidth;c?(this.vert.style.display="block",this.vert.style.bottom=b?d+"px":"0",this.vert.firstChild.style.height=Math.max(0,a.scrollHeight-a.clientHeight+(a.viewHeight-(b?d:0)))+"px"):(this.vert.style.display="",
this.vert.firstChild.style.height="0");b?(this.horiz.style.display="block",this.horiz.style.right=c?d+"px":"0",this.horiz.style.left=a.barLeft+"px",this.horiz.firstChild.style.width=a.scrollWidth-a.clientWidth+(a.viewWidth-a.barLeft-(c?d:0))+"px"):(this.horiz.style.display="",this.horiz.firstChild.style.width="0");!this.checkedZeroWidth&&0<a.clientHeight&&(0==d&&this.zeroWidthHack(),this.checkedZeroWidth=!0);return{right:c?d:0,bottom:b?d:0}},setScrollLeft:function(a){this.horiz.scrollLeft!=a&&(this.horiz.scrollLeft=
a);this.disableHoriz&&this.enableZeroWidthBar(this.horiz,this.disableHoriz)},setScrollTop:function(a){this.vert.scrollTop!=a&&(this.vert.scrollTop=a);this.disableVert&&this.enableZeroWidthBar(this.vert,this.disableVert)},zeroWidthHack:function(){this.horiz.style.height=this.vert.style.width=Y&&!sg?"12px":"18px";this.horiz.style.pointerEvents=this.vert.style.pointerEvents="none";this.disableHoriz=new ua;this.disableVert=new ua},enableZeroWidthBar:function(a,b){function c(){var d=a.getBoundingClientRect();
document.elementFromPoint(d.left+1,d.bottom-1)!=a?a.style.pointerEvents="none":b.set(1E3,c)}a.style.pointerEvents="auto";b.set(1E3,c)},clear:function(){var a=this.horiz.parentNode;a.removeChild(this.horiz);a.removeChild(this.vert)}},Fc.prototype);Gc.prototype=X({update:function(){return{bottom:0,right:0}},setScrollLeft:function(){},setScrollTop:function(){},clear:function(){}},Gc.prototype);n.scrollbarModel={"native":Fc,"null":Gc};Lb.prototype.signal=function(a,b){W(a,b)&&this.events.push(arguments)};
Lb.prototype.finish=function(){for(var a=0;a<this.events.length;a++)J.apply(null,this.events[a])};var q=n.Pos=function(a,b){if(!(this instanceof q))return new q(a,b);this.line=a;this.ch=b},w=n.cmpPos=function(a,b){return a.line-b.line||a.ch-b.ch},V=null;Sc.prototype=X({init:function(a){function b(a){if(!B(d,a)){if(d.somethingSelected())V=d.getSelections(),c.inaccurateSelection&&(c.prevInput="",c.inaccurateSelection=!1,f.value=V.join("\n"),$a(f));else if(d.options.lineWiseCopyCut){var b=Wd(d);V=b.text;
"cut"==a.type?d.setSelections(b.ranges,null,ha):(c.prevInput="",f.value=b.text.join("\n"),$a(f))}else return;"cut"==a.type&&(d.state.cutIncoming=!0)}}var c=this,d=this.cm,e=this.wrapper=Yd(),f=this.textarea=e.firstChild;a.wrapper.insertBefore(e,a.wrapper.firstChild);Ra&&(f.style.width="0px");u(f,"input",function(){A&&9<=C&&c.hasSelection&&(c.hasSelection=null);c.poll()});u(f,"paste",function(a){B(d,a)||Vd(a,d)||(d.state.pasteIncoming=!0,c.fastPoll())});u(f,"cut",b);u(f,"copy",b);u(a.scroller,"paste",
function(b){na(a,b)||B(d,b)||(d.state.pasteIncoming=!0,c.focus())});u(a.lineSpace,"selectstart",function(b){na(a,b)||N(b)});u(f,"compositionstart",function(){var a=d.getCursor("from");c.composing&&c.composing.range.clear();c.composing={start:a,range:d.markText(a,d.getCursor("to"),{className:"CodeMirror-composing"})}});u(f,"compositionend",function(){c.composing&&(c.poll(),c.composing.range.clear(),c.composing=null)})},prepareSelection:function(){var a=this.cm,b=a.display,c=a.doc,d=ke(a);if(a.options.moveInputWithCursor){var a=
la(a,c.sel.primary().head,"div"),c=b.wrapper.getBoundingClientRect(),e=b.lineDiv.getBoundingClientRect();d.teTop=Math.max(0,Math.min(b.wrapper.clientHeight-10,a.top+e.top-c.top));d.teLeft=Math.max(0,Math.min(b.wrapper.clientWidth-10,a.left+e.left-c.left))}return d},showSelection:function(a){var b=this.cm.display;S(b.cursorDiv,a.cursors);S(b.selectionDiv,a.selection);null!=a.teTop&&(this.wrapper.style.top=a.teTop+"px",this.wrapper.style.left=a.teLeft+"px")},reset:function(a){if(!this.contextMenuPending){var b,
c,d=this.cm,e=d.doc;d.somethingSelected()?(this.prevInput="",b=e.sel.primary(),c=(b=Ge&&(100<b.to().line-b.from().line||1E3<(c=d.getSelection()).length))?"-":c||d.getSelection(),this.textarea.value=c,d.state.focused&&$a(this.textarea),A&&9<=C&&(this.hasSelection=c)):a||(this.prevInput=this.textarea.value="",A&&9<=C&&(this.hasSelection=null));this.inaccurateSelection=b}},getField:function(){return this.textarea},supportsTouch:function(){return!1},focus:function(){if("nocursor"!=this.cm.options.readOnly&&
(!bb||fa()!=this.textarea))try{this.textarea.focus()}catch(a){}},blur:function(){this.textarea.blur()},resetPosition:function(){this.wrapper.style.top=this.wrapper.style.left=0},receivedFocus:function(){this.slowPoll()},slowPoll:function(){var a=this;a.pollingFast||a.polling.set(this.cm.options.pollInterval,function(){a.poll();a.cm.state.focused&&a.slowPoll()})},fastPoll:function(){function a(){c.poll()||b?(c.pollingFast=!1,c.slowPoll()):(b=!0,c.polling.set(60,a))}var b=!1,c=this;c.pollingFast=!0;
c.polling.set(20,a)},poll:function(){var a=this.cm,b=this.textarea,c=this.prevInput;if(this.contextMenuPending||!a.state.focused||ug(b)&&!c&&!this.composing||a.isReadOnly()||a.options.disableInput||a.state.keySeq)return!1;var d=b.value;if(d==c&&!a.somethingSelected())return!1;if(A&&9<=C&&this.hasSelection===d||Y&&/[\uf700-\uf7ff]/.test(d))return a.display.input.reset(),!1;if(a.doc.sel==a.display.selForContextMenu){var e=d.charCodeAt(0);8203!=e||c||(c="​");if(8666==e)return this.reset(),this.cm.execCommand("undo")}for(var f=
0,e=Math.min(c.length,d.length);f<e&&c.charCodeAt(f)==d.charCodeAt(f);)++f;var g=this;R(a,function(){Pb(a,d.slice(f),c.length-f,null,g.composing?"*compose":null);1E3<d.length||-1<d.indexOf("\n")?b.value=g.prevInput="":g.prevInput=d;g.composing&&(g.composing.range.clear(),g.composing.range=a.markText(g.composing.start,a.getCursor("to"),{className:"CodeMirror-composing"}))});return!0},ensurePolled:function(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)},onKeyPress:function(){A&&9<=C&&(this.hasSelection=
null);this.fastPoll()},onContextMenu:function(a){function b(){if(null!=g.selectionStart){var a=e.somethingSelected(),b="​"+(a?g.value:"");g.value="⇚";g.value=b;d.prevInput=a?"":"​";g.selectionStart=1;g.selectionEnd=b.length;f.selForContextMenu=e.doc.sel}}function c(){d.contextMenuPending=!1;d.wrapper.style.position="relative";g.style.cssText=l;A&&9>C&&f.scrollbars.setScrollTop(f.scroller.scrollTop=k);if(null!=g.selectionStart){(!A||A&&9>C)&&b();var a=0,c=function(){f.selForContextMenu==e.doc.sel&&
0==g.selectionStart&&0<g.selectionEnd&&"​"==d.prevInput?G(e,hc.selectAll)(e):10>a++?f.detectingSelectAll=setTimeout(c,500):f.input.reset()};f.detectingSelectAll=setTimeout(c,200)}}var d=this,e=d.cm,f=e.display,g=d.textarea,h=Ea(e,a),k=f.scroller.scrollTop;if(h&&!ba){e.options.resetSelectionOnContextMenu&&-1==e.doc.sel.contains(h)&&G(e,H)(e.doc,ga(h),ha);var l=g.style.cssText;d.wrapper.style.position="absolute";g.style.cssText="position: fixed; width: 30px; height: 30px; top: "+(a.clientY-5)+"px; left: "+
(a.clientX-5)+"px; z-index: 1000; background: "+(A?"rgba(255, 255, 255, .05)":"transparent")+"; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity\x3d5);";if(K)var m=window.scrollY;f.input.focus();K&&window.scrollTo(null,m);f.input.reset();e.somethingSelected()||(g.value=d.prevInput=" ");d.contextMenuPending=!0;f.selForContextMenu=e.doc.sel;clearTimeout(f.detectingSelectAll);A&&9<=C&&b();if(id){cc(a);var n=function(){ja(window,"mouseup",n);setTimeout(c,
20)};u(window,"mouseup",n)}else setTimeout(c,50)}},readOnlyChanged:function(a){a||this.reset()},setUneditable:Db,needsContentAttribute:!1},Sc.prototype);Tc.prototype=X({init:function(a){function b(a){if(!B(d,a)){if(d.somethingSelected())V=d.getSelections(),"cut"==a.type&&d.replaceSelection("",null,"cut");else if(d.options.lineWiseCopyCut){var b=Wd(d);V=b.text;"cut"==a.type&&d.operation(function(){d.setSelections(b.ranges,0,ha);d.replaceSelection("",null,"cut")})}else return;if(a.clipboardData&&!Ra)a.preventDefault(),
a.clipboardData.clearData(),a.clipboardData.setData("text/plain",V.join("\n"));else{var c=Yd();a=c.firstChild;d.display.lineSpace.insertBefore(c,d.display.lineSpace.firstChild);a.value=V.join("\n");var h=document.activeElement;$a(a);setTimeout(function(){d.display.lineSpace.removeChild(c);h.focus()},50)}}}var c=this,d=c.cm;a=c.div=a.lineDiv;Xd(a);u(a,"paste",function(a){B(d,a)||Vd(a,d)});u(a,"compositionstart",function(a){a=a.data;c.composing={sel:d.doc.sel,data:a,startData:a};if(a){var b=d.doc.sel.primary(),
g=d.getLine(b.head.line).indexOf(a,Math.max(0,b.head.ch-a.length));-1<g&&g<=b.head.ch&&(c.composing.sel=ga(q(b.head.line,g),q(b.head.line,g+a.length)))}});u(a,"compositionupdate",function(a){c.composing.data=a.data});u(a,"compositionend",function(a){var b=c.composing;b&&(a.data==b.startData||/\u200b/.test(a.data)||(b.data=a.data),setTimeout(function(){b.handled||c.applyComposition(b);c.composing==b&&(c.composing=null)},50))});u(a,"touchstart",function(){c.forceCompositionEnd()});u(a,"input",function(){c.composing||
!d.isReadOnly()&&c.pollContent()||R(c.cm,function(){O(d)})});u(a,"copy",b);u(a,"cut",b)},prepareSelection:function(){var a=ke(this.cm,!1);a.focus=this.cm.state.focused;return a},showSelection:function(a){a&&this.cm.display.view.length&&(a.focus&&this.showPrimarySelection(),this.showMultipleSelections(a))},showPrimarySelection:function(){var a=window.getSelection(),b=this.cm.doc.sel.primary(),c=Sb(this.cm,a.anchorNode,a.anchorOffset),d=Sb(this.cm,a.focusNode,a.focusOffset);if(!c||c.bad||!d||d.bad||
0!=w(Ob(c,d),b.from())||0!=w(Nb(c,d),b.to()))if(c=Zd(this.cm,b.from()),d=Zd(this.cm,b.to()),c||d){var e=this.cm.display.view,b=a.rangeCount&&a.getRangeAt(0);c?d||(d=e[e.length-1].measure,d=d.maps?d.maps[d.maps.length-1]:d.map,d={node:d[d.length-1],offset:d[d.length-2]-d[d.length-3]}):c={node:e[0].measure.map[2],offset:0};try{var f=Ca(c.node,c.offset,d.offset,d.node)}catch(g){}f&&(!oa&&this.cm.state.focused?(a.collapse(c.node,c.offset),f.collapsed||a.addRange(f)):(a.removeAllRanges(),a.addRange(f)),
b&&null==a.anchorNode?a.addRange(b):oa&&this.startGracePeriod());this.rememberSelection()}},startGracePeriod:function(){var a=this;clearTimeout(this.gracePeriod);this.gracePeriod=setTimeout(function(){a.gracePeriod=!1;a.selectionChanged()&&a.cm.operation(function(){a.cm.curOp.selectionChanged=!0})},20)},showMultipleSelections:function(a){S(this.cm.display.cursorDiv,a.cursors);S(this.cm.display.selectionDiv,a.selection)},rememberSelection:function(){var a=window.getSelection();this.lastAnchorNode=
a.anchorNode;this.lastAnchorOffset=a.anchorOffset;this.lastFocusNode=a.focusNode;this.lastFocusOffset=a.focusOffset},selectionInEditor:function(){var a=window.getSelection();if(!a.rangeCount)return!1;a=a.getRangeAt(0).commonAncestorContainer;return Vc(this.div,a)},focus:function(){"nocursor"!=this.cm.options.readOnly&&this.div.focus()},blur:function(){this.div.blur()},getField:function(){return this.div},supportsTouch:function(){return!0},receivedFocus:function(){function a(){b.cm.state.focused&&
(b.pollSelection(),b.polling.set(b.cm.options.pollInterval,a))}var b=this;this.selectionInEditor()?this.pollSelection():R(this.cm,function(){b.cm.curOp.selectionChanged=!0});this.polling.set(this.cm.options.pollInterval,a)},selectionChanged:function(){var a=window.getSelection();return a.anchorNode!=this.lastAnchorNode||a.anchorOffset!=this.lastAnchorOffset||a.focusNode!=this.lastFocusNode||a.focusOffset!=this.lastFocusOffset},pollSelection:function(){if(!this.composing&&!this.gracePeriod&&this.selectionChanged()){var a=
window.getSelection(),b=this.cm;this.rememberSelection();var c=Sb(b,a.anchorNode,a.anchorOffset),d=Sb(b,a.focusNode,a.focusOffset);c&&d&&R(b,function(){H(b.doc,ga(c,d),ha);if(c.bad||d.bad)b.curOp.selectionChanged=!0})}},pollContent:function(){var a=this.cm,b=a.display,c=a.doc.sel.primary(),d=c.from(),c=c.to();if(d.line<b.viewFrom||c.line>b.viewTo-1)return!1;var e;d.line==b.viewFrom||0==(e=Aa(a,d.line))?(d=E(b.view[0].line),e=b.view[0].node):(d=E(b.view[e].line),e=b.view[e-1].node.nextSibling);var f=
Aa(a,c.line);f==b.view.length-1?(c=b.viewTo-1,b=b.lineDiv.lastChild):(c=E(b.view[f+1].line)-1,b=b.view[f+1].node.previousSibling);b=a.doc.splitLines(Df(a,e,b,d,c));for(e=Ba(a.doc,q(d,0),q(c,t(a.doc,c).text.length));1<b.length&&1<e.length;)if(z(b)==z(e))b.pop(),e.pop(),c--;else if(b[0]==e[0])b.shift(),e.shift(),d++;else break;for(var g=0,f=0,h=b[0],k=e[0],l=Math.min(h.length,k.length);g<l&&h.charCodeAt(g)==k.charCodeAt(g);)++g;h=z(b);k=z(e);for(l=Math.min(h.length-(1==b.length?g:0),k.length-(1==e.length?
g:0));f<l&&h.charCodeAt(h.length-f-1)==k.charCodeAt(k.length-f-1);)++f;b[b.length-1]=h.slice(0,h.length-f);b[0]=b[0].slice(g);d=q(d,g);c=q(c,e.length?z(e).length-f:0);if(1<b.length||b[0]||w(d,c))return Va(a.doc,b,d,c,"+input"),!0},ensurePolled:function(){this.forceCompositionEnd()},reset:function(){this.forceCompositionEnd()},forceCompositionEnd:function(){this.composing&&!this.composing.handled&&(this.applyComposition(this.composing),this.composing.handled=!0,this.div.blur(),this.div.focus())},applyComposition:function(a){this.cm.isReadOnly()?
G(this.cm,O)(this.cm):a.data&&a.data!=a.startData&&G(this.cm,Pb)(this.cm,a.data,0,a.sel)},setUneditable:function(a){a.contentEditable="false"},onKeyPress:function(a){a.preventDefault();this.cm.isReadOnly()||G(this.cm,Pb)(this.cm,String.fromCharCode(null==a.charCode?a.keyCode:a.charCode),0)},readOnlyChanged:function(a){this.div.contentEditable=String("nocursor"!=a)},onContextMenu:Db,resetPosition:Db,needsContentAttribute:!0},Tc.prototype);n.inputStyles={textarea:Sc,contenteditable:Tc};ka.prototype=
{primary:function(){return this.ranges[this.primIndex]},equals:function(a){if(a==this)return!0;if(a.primIndex!=this.primIndex||a.ranges.length!=this.ranges.length)return!1;for(var b=0;b<this.ranges.length;b++){var c=this.ranges[b],d=a.ranges[b];if(0!=w(c.anchor,d.anchor)||0!=w(c.head,d.head))return!1}return!0},deepCopy:function(){for(var a=[],b=0;b<this.ranges.length;b++)a[b]=new y(Rc(this.ranges[b].anchor),Rc(this.ranges[b].head));return new ka(a,this.primIndex)},somethingSelected:function(){for(var a=
0;a<this.ranges.length;a++)if(!this.ranges[a].empty())return!0;return!1},contains:function(a,b){b||(b=a);for(var c=0;c<this.ranges.length;c++){var d=this.ranges[c];if(0<=w(b,d.from())&&0>=w(a,d.to()))return c}return-1}};y.prototype={from:function(){return Ob(this.anchor,this.head)},to:function(){return Nb(this.anchor,this.head)},empty:function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch}};var ad={left:0,right:0,top:0,bottom:0},Da,Ua=null,Lf=0,ec,dc,ve=0,fc=0,T=null;A?T=
-.53:oa?T=15:rg?T=-.7:we&&(T=-1/3);var De=function(a){var b=a.wheelDeltaX,c=a.wheelDeltaY;null==b&&a.detail&&a.axis==a.HORIZONTAL_AXIS&&(b=a.detail);null==c&&a.detail&&a.axis==a.VERTICAL_AXIS?c=a.detail:null==c&&(c=a.wheelDelta);return{x:b,y:c}};n.wheelEventPixels=function(a){a=De(a);a.x*=T;a.y*=T;return a};var Xf=new ua,ld=null,Fa=n.changeEnd=function(a){return a.text?q(a.from.line+a.text.length-1,z(a.text).length+(1==a.text.length?a.from.ch:0)):a.to};n.prototype={constructor:n,focus:function(){window.focus();
this.display.input.focus()},setOption:function(a,b){var c=this.options,d=c[a];if(c[a]!=b||"mode"==a)c[a]=b,La.hasOwnProperty(a)&&G(this,La[a])(this,b,d)},getOption:function(a){return this.options[a]},getDoc:function(){return this.doc},addKeyMap:function(a,b){this.state.keyMaps[b?"push":"unshift"](oc(a))},removeKeyMap:function(a){for(var b=this.state.keyMaps,c=0;c<b.length;++c)if(b[c]==a||b[c].name==a)return b.splice(c,1),!0},addOverlay:L(function(a,b){var c=a.token?a:n.getMode(this.options,a);if(c.startState)throw Error("Overlays may not be stateful.");
this.state.overlays.push({mode:c,modeSpec:a,opaque:b&&b.opaque});this.state.modeGen++;O(this)}),removeOverlay:L(function(a){for(var b=this.state.overlays,c=0;c<b.length;++c){var d=b[c].modeSpec;if(d==a||"string"==typeof a&&d.name==a){b.splice(c,1);this.state.modeGen++;O(this);break}}}),indentLine:L(function(a,b,c){"string"!=typeof b&&"number"!=typeof b&&(b=null==b?this.options.smartIndent?"smart":"prev":b?"add":"subtract");qb(this.doc,a)&&pb(this,a,b,c)}),indentSelection:L(function(a){for(var b=this.doc.sel.ranges,
c=-1,d=0;d<b.length;d++){var e=b[d];if(e.empty())e.head.line>c&&(pb(this,e.head.line,a,!0),c=e.head.line,d==this.doc.sel.primIndex&&Qa(this));else{for(var f=e.from(),e=e.to(),g=Math.max(c,f.line),c=Math.min(this.lastLine(),e.line-(e.ch?0:1))+1,e=g;e<c;++e)pb(this,e,a);e=this.doc.sel.ranges;0==f.ch&&b.length==e.length&&0<e[d].from().ch&&Wc(this.doc,d,new y(f,e[d].to()),ha)}}}),getTokenAt:function(a,b){return bf(this,a,b)},getLineTokens:function(a,b){return bf(this,q(a),b,!0)},getTokenTypeAt:function(a){a=
x(this.doc,a);var b=df(this,t(this.doc,a.line)),c=0,d=(b.length-1)/2;a=a.ch;if(0==a)b=b[2];else for(;;){var e=c+d>>1;if((e?b[2*e-1]:0)>=a)d=e;else if(b[2*e+1]<a)c=e+1;else{b=b[2*e+2];break}}c=b?b.indexOf("cm-overlay "):-1;return 0>c?b:0==c?null:b.slice(0,c-1)},getModeAt:function(a){var b=this.doc.mode;return b.innerMode?n.innerMode(b,this.getTokenAt(a).state).mode:b},getHelper:function(a,b){return this.getHelpers(a,b)[0]},getHelpers:function(a,b){var c=[];if(!ab.hasOwnProperty(b))return c;var d=ab[b],
e=this.getModeAt(a);if("string"==typeof e[b])d[e[b]]&&c.push(d[e[b]]);else if(e[b])for(var f=0;f<e[b].length;f++){var g=d[e[b][f]];g&&c.push(g)}else e.helperType&&d[e.helperType]?c.push(d[e.helperType]):d[e.name]&&c.push(d[e.name]);for(f=0;f<d._global.length;f++)g=d._global[f],g.pred(e,this)&&-1==D(c,g.val)&&c.push(g.val);return c},getStateAfter:function(a,b){var c=this.doc;a=Math.max(c.first,Math.min(null==a?c.first+c.size-1:a,c.first+c.size-1));return sb(this,a+1,b)},cursorCoords:function(a,b){var c;
c=this.doc.sel.primary();c=null==a?c.head:"object"==typeof a?x(this.doc,a):a?c.from():c.to();return la(this,c,b||"page")},charCoords:function(a,b){return Wb(this,x(this.doc,a),b||"page")},coordsChar:function(a,b){a=re(this,a,b||"page");return fd(this,a.left,a.top)},lineAtHeight:function(a,b){a=re(this,{top:a,left:0},b||"page").top;return za(this.doc,a+this.display.viewOffset)},heightAtLine:function(a,b){var c=!1,d;"number"==typeof a?(d=this.doc.first+this.doc.size-1,a<this.doc.first?a=this.doc.first:
a>d&&(a=d,c=!0),d=t(this.doc,a)):d=a;return cd(this,d,{top:0,left:0},b||"page").top+(c?this.doc.height-ea(d):0)},defaultTextHeight:function(){return va(this.display)},defaultCharWidth:function(){return gb(this.display)},setGutterMarker:L(function(a,b,c){return mc(this.doc,a,"gutter",function(a){var e=a.gutterMarkers||(a.gutterMarkers={});e[b]=c;!c&&nf(e)&&(a.gutterMarkers=null);return!0})}),clearGutter:L(function(a){var b=this,c=b.doc,d=c.first;c.iter(function(c){c.gutterMarkers&&c.gutterMarkers[a]&&
(c.gutterMarkers[a]=null,ma(b,d,"gutter"),nf(c.gutterMarkers)&&(c.gutterMarkers=null));++d})}),lineInfo:function(a){if("number"==typeof a){if(!qb(this.doc,a))return null;var b=a;a=t(this.doc,a);if(!a)return null}else if(b=E(a),null==b)return null;return{line:b,handle:a,text:a.text,gutterMarkers:a.gutterMarkers,textClass:a.textClass,bgClass:a.bgClass,wrapClass:a.wrapClass,widgets:a.widgets}},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(a,b,c,
d,e){var f=this.display;a=la(this,x(this.doc,a));var g=a.bottom,h=a.left;b.style.position="absolute";b.setAttribute("cm-ignore-events","true");this.display.input.setUneditable(b);f.sizer.appendChild(b);if("over"==d)g=a.top;else if("above"==d||"near"==d){var k=Math.max(f.wrapper.clientHeight,this.doc.height),l=Math.max(f.sizer.clientWidth,f.lineSpace.clientWidth);("above"==d||a.bottom+b.offsetHeight>k)&&a.top>b.offsetHeight?g=a.top-b.offsetHeight:a.bottom+b.offsetHeight<=k&&(g=a.bottom);h+b.offsetWidth>
l&&(h=l-b.offsetWidth)}b.style.top=g+"px";b.style.left=b.style.right="";"right"==e?(h=f.sizer.clientWidth-b.offsetWidth,b.style.right="0px"):("left"==e?h=0:"middle"==e&&(h=(f.sizer.clientWidth-b.offsetWidth)/2),b.style.left=h+"px");c&&(a=ac(this,h,g,h+b.offsetWidth,g+b.offsetHeight),null!=a.scrollTop&&lb(this,a.scrollTop),null!=a.scrollLeft&&Na(this,a.scrollLeft))},triggerOnKeyDown:L(ze),triggerOnKeyPress:L(Ae),triggerOnKeyUp:ye,execCommand:function(a){if(hc.hasOwnProperty(a))return hc[a].call(null,
this)},triggerElectric:L(function(a){Ud(this,a)}),findPosH:function(a,b,c,d){var e=1;0>b&&(e=-1,b=-b);var f=0;for(a=x(this.doc,a);f<b&&(a=qd(this.doc,a,e,c,d),!a.hitSide);++f);return a},moveH:L(function(a,b){var c=this;c.extendSelectionsBy(function(d){return c.display.shift||c.doc.extend||d.empty()?qd(c.doc,d.head,a,b,c.options.rtlMoveVisually):0>a?d.from():d.to()},Fb)}),deleteH:L(function(a,b){var c=this.doc;this.doc.sel.somethingSelected()?c.replaceSelection("",null,"+delete"):Wa(this,function(d){var e=
qd(c,d.head,a,b,!1);return 0>a?{from:e,to:d.head}:{from:d.head,to:e}})}),findPosV:function(a,b,c,d){var e=1;0>b&&(e=-1,b=-b);var f=0;for(a=x(this.doc,a);f<b&&(a=la(this,a,"div"),null==d?d=a.left:a.left=d,a=Te(this,a,e,c),!a.hitSide);++f);return a},moveV:L(function(a,b){var c=this,d=this.doc,e=[],f=!c.display.shift&&!d.extend&&d.sel.somethingSelected();d.extendSelectionsBy(function(g){if(f)return 0>a?g.from():g.to();var k=la(c,g.head,"div");null!=g.goalColumn&&(k.left=g.goalColumn);e.push(k.left);
var l=Te(c,k,a,b);"page"==b&&g==d.sel.primary()&&kc(c,null,Wb(c,l,"div").top-k.top);return l},Fb);if(e.length)for(var g=0;g<d.sel.ranges.length;g++)d.sel.ranges[g].goalColumn=e[g]}),findWordAt:function(a){var b=t(this.doc,a.line).text,c=a.ch,d=a.ch;if(b){var e=this.getHelper(a,"wordChars");(0>a.xRel||d==b.length)&&c?--c:++d;for(var f=b.charAt(c),f=nc(f,e)?function(a){return nc(a,e)}:/\s/.test(f)?function(a){return/\s/.test(a)}:function(a){return!/\s/.test(a)&&!nc(a)};0<c&&f(b.charAt(c-1));)--c;for(;d<
b.length&&f(b.charAt(d));)++d}return new y(q(a.line,c),q(a.line,d))},toggleOverwrite:function(a){if(null==a||a!=this.state.overwrite)(this.state.overwrite=!this.state.overwrite)?mb(this.display.cursorDiv,"CodeMirror-overwrite"):kb(this.display.cursorDiv,"CodeMirror-overwrite"),J(this,"overwriteToggle",this,this.state.overwrite)},hasFocus:function(){return this.display.input.getField()==fa()},isReadOnly:function(){return!(!this.options.readOnly&&!this.doc.cantEdit)},scrollTo:L(function(a,b){null==
a&&null==b||lc(this);null!=a&&(this.curOp.scrollLeft=a);null!=b&&(this.curOp.scrollTop=b)}),getScrollInfo:function(){var a=this.display.scroller;return{left:a.scrollLeft,top:a.scrollTop,height:a.scrollHeight-da(this)-this.display.barHeight,width:a.scrollWidth-da(this)-this.display.barWidth,clientHeight:Nc(this),clientWidth:pa(this)}},scrollIntoView:L(function(a,b){null==a?(a={from:this.doc.sel.primary().head,to:null},null==b&&(b=this.options.cursorScrollMargin)):"number"==typeof a?a={from:q(a,0),
to:null}:null==a.from&&(a={from:a,to:null});a.to||(a.to=a.from);a.margin=b||0;if(null!=a.from.line)lc(this),this.curOp.scrollToPos=a;else{var c=ac(this,Math.min(a.from.left,a.to.left),Math.min(a.from.top,a.to.top)-a.margin,Math.max(a.from.right,a.to.right),Math.max(a.from.bottom,a.to.bottom)+a.margin);this.scrollTo(c.scrollLeft,c.scrollTop)}}),setSize:L(function(a,b){function c(a){return"number"==typeof a||/^\d+$/.test(String(a))?a+"px":a}var d=this;null!=a&&(d.display.wrapper.style.width=c(a));null!=
b&&(d.display.wrapper.style.height=c(b));d.options.lineWrapping&&qe(this);var e=d.display.viewFrom;d.doc.iter(e,d.display.viewTo,function(a){if(a.widgets)for(var b=0;b<a.widgets.length;b++)if(a.widgets[b].noHScroll){ma(d,e,"widget");break}++e});d.curOp.forceUpdate=!0;J(d,"refresh",this)}),operation:function(a){return R(this,a)},refresh:L(function(){var a=this.display.cachedTextHeight;O(this);this.curOp.forceUpdate=!0;hb(this);this.scrollTo(this.doc.scrollLeft,this.doc.scrollTop);Cc(this);(null==a||
.5<Math.abs(a-va(this.display)))&&Ac(this);J(this,"refresh",this)}),swapDoc:L(function(a){var b=this.doc;b.cm=null;Dd(this,a);hb(this);this.display.input.reset();this.scrollTo(a.scrollLeft,a.scrollTop);this.curOp.forceScroll=!0;Q(this,"swapDoc",this,b);return b}),getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}};
Za(n);var wf=n.defaults={},La=n.optionHandlers={},Ed=n.Init={toString:function(){return"CodeMirror.Init"}};v("value","",function(a,b){a.setValue(b)},!0);v("mode",null,function(a,b){a.doc.modeOption=b;zc(a)},!0);v("indentUnit",2,zc,!0);v("indentWithTabs",!1);v("smartIndent",!0);v("tabSize",4,function(a){eb(a);hb(a);O(a)},!0);v("lineSeparator",null,function(a,b){if(a.doc.lineSep=b){var c=[],d=a.doc.first;a.doc.iter(function(a){for(var e=0;;){var h=a.text.indexOf(b,e);if(-1==h)break;e=h+b.length;c.push(q(d,
h))}d++});for(var e=c.length-1;0<=e;e--)Va(a.doc,b,c[e],q(c[e].line,c[e].ch+b.length))}});v("specialChars",/[\t\u0000-\u0019\u00ad\u200b-\u200f\u2028\u2029\ufeff]/g,function(a,b,c){a.state.specialChars=new RegExp(b.source+(b.test("\t")?"":"|\t"),"g");c!=n.Init&&a.refresh()});v("specialCharPlaceholder",function(a){var b=r("span","•","cm-invalidchar");b.title="\\u"+a.charCodeAt(0).toString(16);b.setAttribute("aria-label",b.title);return b},function(a){a.refresh()},!0);v("electricChars",!0);v("inputStyle",
bb?"contenteditable":"textarea",function(){throw Error("inputStyle can not (yet) be changed in a running editor");},!0);v("rtlMoveVisually",!tg);v("wholeLineUpdateBefore",!0);v("theme","default",function(a){Ad(a);ib(a)},!0);v("keyMap","default",function(a,b,c){b=oc(b);(c=c!=n.Init&&oc(c))&&c.detach&&c.detach(a,b);b.attach&&b.attach(a,c||null)});v("extraKeys",null);v("lineWrapping",!1,function(a){a.options.lineWrapping?(mb(a.display.wrapper,"CodeMirror-wrap"),a.display.sizer.style.minWidth="",a.display.sizerWidth=
null):(kb(a.display.wrapper,"CodeMirror-wrap"),Dc(a));Ac(a);O(a);hb(a);setTimeout(function(){Oa(a)},100)},!0);v("gutters",[],function(a){wc(a.options);ib(a)},!0);v("fixedGutter",!0,function(a,b){a.display.gutters.style.left=b?Ic(a.display)+"px":"0";a.refresh()},!0);v("coverGutterNextToScrollbar",!1,function(a){Oa(a)},!0);v("scrollbarStyle","native",function(a){Bd(a);Oa(a);a.display.scrollbars.setScrollTop(a.doc.scrollTop);a.display.scrollbars.setScrollLeft(a.doc.scrollLeft)},!0);v("lineNumbers",!1,
function(a){wc(a.options);ib(a)},!0);v("firstLineNumber",1,ib,!0);v("lineNumberFormatter",function(a){return a},ib,!0);v("showCursorWhenSelecting",!1,nb,!0);v("resetSelectionOnContextMenu",!0);v("lineWiseCopyCut",!0);v("readOnly",!1,function(a,b){"nocursor"==b?(db(a),a.display.input.blur(),a.display.disabled=!0):a.display.disabled=!1;a.display.input.readOnlyChanged(b)});v("disableInput",!1,function(a,b){b||a.display.input.reset()},!0);v("dragDrop",!0,function(a,b,c){!b!=!(c&&c!=n.Init)&&(c=a.display.dragFunctions,
b=b?u:ja,b(a.display.scroller,"dragstart",c.start),b(a.display.scroller,"dragenter",c.enter),b(a.display.scroller,"dragover",c.over),b(a.display.scroller,"dragleave",c.leave),b(a.display.scroller,"drop",c.drop))});v("allowDropFileTypes",null);v("cursorBlinkRate",530);v("cursorScrollMargin",0);v("cursorHeight",1,nb,!0);v("singleCursorHeightPerLine",!0,nb,!0);v("workTime",100);v("workDelay",100);v("flattenSpans",!0,eb,!0);v("addModeClass",!1,eb,!0);v("pollInterval",100);v("undoDepth",200,function(a,
b){a.doc.history.undoDepth=b});v("historyEventDelay",1250);v("viewportMargin",10,function(a){a.refresh()},!0);v("maxHighlightLength",1E4,eb,!0);v("moveInputWithCursor",!0,function(a,b){b||a.display.input.resetPosition()});v("tabindex",null,function(a,b){a.display.input.getField().tabIndex=b||""});v("autofocus",null);var vf=n.modes={},Gb=n.mimeModes={};n.defineMode=function(a,b){n.defaults.mode||"null"==a||(n.defaults.mode=a);2<arguments.length&&(b.dependencies=Array.prototype.slice.call(arguments,
2));vf[a]=b};n.defineMIME=function(a,b){Gb[a]=b};n.resolveMode=function(a){if("string"==typeof a&&Gb.hasOwnProperty(a))a=Gb[a];else if(a&&"string"==typeof a.name&&Gb.hasOwnProperty(a.name)){var b=Gb[a.name];"string"==typeof b&&(b={name:b});a=lf(b,a);a.name=b.name}else if("string"==typeof a&&/^[\w\-]+\/[\w\-]+\+xml$/.test(a))return n.resolveMode("application/xml");return"string"==typeof a?{name:a}:a||{name:"null"}};n.getMode=function(a,b){b=n.resolveMode(b);var c=vf[b.name];if(!c)return n.getMode(a,
"text/plain");c=c(a,b);if(Hb.hasOwnProperty(b.name)){var d=Hb[b.name],e;for(e in d)d.hasOwnProperty(e)&&(c.hasOwnProperty(e)&&(c["_"+e]=c[e]),c[e]=d[e])}c.name=b.name;b.helperType&&(c.helperType=b.helperType);if(b.modeProps)for(e in b.modeProps)c[e]=b.modeProps[e];return c};n.defineMode("null",function(){return{token:function(a){a.skipToEnd()}}});n.defineMIME("text/plain","null");var Hb=n.modeExtensions={};n.extendMode=function(a,b){var c=Hb.hasOwnProperty(a)?Hb[a]:Hb[a]={};X(b,c)};n.defineExtension=
function(a,b){n.prototype[a]=b};n.defineDocExtension=function(a,b){P.prototype[a]=b};n.defineOption=v;var yc=[];n.defineInitHook=function(a){yc.push(a)};var ab=n.helpers={};n.registerHelper=function(a,b,c){ab.hasOwnProperty(a)||(ab[a]=n[a]={_global:[]});ab[a][b]=c};n.registerGlobalHelper=function(a,b,c,d){n.registerHelper(a,b,d);ab[a]._global.push({pred:c,val:d})};var sa=n.copyState=function(a,b){if(!0===b)return b;if(a.copyState)return a.copyState(b);var c={},d;for(d in b){var e=b[d];e instanceof
Array&&(e=e.concat([]));c[d]=e}return c},Jf=n.startState=function(a,b,c){return a.startState?a.startState(b,c):!0};n.innerMode=function(a,b){for(;a.innerMode;){var c=a.innerMode(b);if(!c||c.mode==a)break;b=c.state;a=c.mode}return c||{mode:a,state:b}};var hc=n.commands={selectAll:function(a){a.setSelection(q(a.firstLine(),0),q(a.lastLine()),ha)},singleSelection:function(a){a.setSelection(a.getCursor("anchor"),a.getCursor("head"),ha)},killLine:function(a){Wa(a,function(b){if(b.empty()){var c=t(a.doc,
b.head.line).text.length;return b.head.ch==c&&b.head.line<a.lastLine()?{from:b.head,to:q(b.head.line+1,0)}:{from:b.head,to:q(b.head.line,c)}}return{from:b.from(),to:b.to()}})},deleteLine:function(a){Wa(a,function(b){return{from:q(b.from().line,0),to:x(a.doc,q(b.to().line+1,0))}})},delLineLeft:function(a){Wa(a,function(a){return{from:q(a.from().line,0),to:a.from()}})},delWrappedLineLeft:function(a){Wa(a,function(b){var c=a.charCoords(b.head,"div").top+5;return{from:a.coordsChar({left:0,top:c},"div"),
to:b.from()}})},delWrappedLineRight:function(a){Wa(a,function(b){var c=a.charCoords(b.head,"div").top+5,c=a.coordsChar({left:a.display.lineDiv.offsetWidth+100,top:c},"div");return{from:b.from(),to:c}})},undo:function(a){a.undo()},redo:function(a){a.redo()},undoSelection:function(a){a.undoSelection()},redoSelection:function(a){a.redoSelection()},goDocStart:function(a){a.extendSelection(q(a.firstLine(),0))},goDocEnd:function(a){a.extendSelection(q(a.lastLine()))},goLineStart:function(a){a.extendSelectionsBy(function(b){return pf(a,
b.head.line)},{origin:"+move",bias:1})},goLineStartSmart:function(a){a.extendSelectionsBy(function(b){return qf(a,b.head)},{origin:"+move",bias:1})},goLineEnd:function(a){a.extendSelectionsBy(function(b){b=b.head.line;for(var c,d=t(a.doc,b);c=ya(d,!1);)d=c.find(1,!0).line,b=null;c=(c=Z(d))?c[0].level%2?Zb(d):$b(d):d.text.length;return q(null==b?E(d):b,c)},{origin:"+move",bias:-1})},goLineRight:function(a){a.extendSelectionsBy(function(b){b=a.charCoords(b.head,"div").top+5;return a.coordsChar({left:a.display.lineDiv.offsetWidth+
100,top:b},"div")},Fb)},goLineLeft:function(a){a.extendSelectionsBy(function(b){b=a.charCoords(b.head,"div").top+5;return a.coordsChar({left:0,top:b},"div")},Fb)},goLineLeftSmart:function(a){a.extendSelectionsBy(function(b){var c=a.charCoords(b.head,"div").top+5,c=a.coordsChar({left:0,top:c},"div");return c.ch<a.getLine(c.line).search(/\S/)?qf(a,b.head):c},Fb)},goLineUp:function(a){a.moveV(-1,"line")},goLineDown:function(a){a.moveV(1,"line")},goPageUp:function(a){a.moveV(-1,"page")},goPageDown:function(a){a.moveV(1,
"page")},goCharLeft:function(a){a.moveH(-1,"char")},goCharRight:function(a){a.moveH(1,"char")},goColumnLeft:function(a){a.moveH(-1,"column")},goColumnRight:function(a){a.moveH(1,"column")},goWordLeft:function(a){a.moveH(-1,"word")},goGroupRight:function(a){a.moveH(1,"group")},goGroupLeft:function(a){a.moveH(-1,"group")},goWordRight:function(a){a.moveH(1,"word")},delCharBefore:function(a){a.deleteH(-1,"char")},delCharAfter:function(a){a.deleteH(1,"char")},delWordBefore:function(a){a.deleteH(-1,"word")},
delWordAfter:function(a){a.deleteH(1,"word")},delGroupBefore:function(a){a.deleteH(-1,"group")},delGroupAfter:function(a){a.deleteH(1,"group")},indentAuto:function(a){a.indentSelection("smart")},indentMore:function(a){a.indentSelection("add")},indentLess:function(a){a.indentSelection("subtract")},insertTab:function(a){a.replaceSelection("\t")},insertSoftTab:function(a){for(var b=[],c=a.listSelections(),d=a.options.tabSize,e=0;e<c.length;e++){var f=c[e].from(),f=aa(a.getLine(f.line),f.ch,d);b.push(Array(d-
f%d+1).join(" "))}a.replaceSelections(b)},defaultTab:function(a){a.somethingSelected()?a.indentSelection("add"):a.execCommand("insertTab")},transposeChars:function(a){R(a,function(){for(var b=a.listSelections(),c=[],d=0;d<b.length;d++){var e=b[d].head,f=t(a.doc,e.line).text;if(f)if(e.ch==f.length&&(e=new q(e.line,e.ch-1)),0<e.ch)e=new q(e.line,e.ch+1),a.replaceRange(f.charAt(e.ch-1)+f.charAt(e.ch-2),q(e.line,e.ch-2),e,"+transpose");else if(e.line>a.doc.first){var g=t(a.doc,e.line-1).text;g&&a.replaceRange(f.charAt(0)+
a.doc.lineSeparator()+g.charAt(g.length-1),q(e.line-1,g.length-1),q(e.line,1),"+transpose")}c.push(new y(e,e))}a.setSelections(c)})},newlineAndIndent:function(a){R(a,function(){for(var b=a.listSelections().length,c=0;c<b;c++){var d=a.listSelections()[c];a.replaceRange(a.doc.lineSeparator(),d.anchor,d.head,"+input");a.indentLine(d.from().line+1,null,!0)}Qa(a)})},toggleOverwrite:function(a){a.toggleOverwrite()}},ta=n.keyMap={};ta.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",
End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"};ta.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft",
"Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"};ta.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown",
"Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-D":"delWordAfter","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars"};ta.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft",
"Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",
fallthrough:["basic","emacsy"]};ta["default"]=Y?ta.macDefault:ta.pcDefault;n.normalizeKeyMap=function(a){var b={},c;for(c in a)if(a.hasOwnProperty(c)){var d=a[c];if(!/^(name|fallthrough|(de|at)tach)$/.test(c)){if("..."!=d)for(var e=Qb(c.split(" "),cg),f=0;f<e.length;f++){var g,h;f==e.length-1?(h=e.join(" "),g=d):(h=e.slice(0,f+1).join(" "),g="...");var k=b[h];if(!k)b[h]=g;else if(k!=g)throw Error("Inconsistent bindings for "+h);}delete a[c]}}for(var l in b)a[l]=b[l];return a};var wb=n.lookupKey=function(a,
b,c,d){b=oc(b);var e=b.call?b.call(a,d):b[a];if(!1===e)return"nothing";if("..."===e)return"multi";if(null!=e&&c(e))return"handled";if(b.fallthrough){if("[object Array]"!=Object.prototype.toString.call(b.fallthrough))return wb(a,b.fallthrough,c,d);for(e=0;e<b.fallthrough.length;e++){var f=wb(a,b.fallthrough[e],c,d);if(f)return f}}},Wf=n.isModifierKey=function(a){a="string"==typeof a?a:Ja[a.keyCode];return"Ctrl"==a||"Alt"==a||"Shift"==a||"Mod"==a},Yf=n.keyName=function(a,b){if(ba&&34==a.keyCode&&a["char"])return!1;
var c=Ja[a.keyCode],d=c;if(null==d||a.altGraphKey)return!1;a.altKey&&"Alt"!=c&&(d="Alt-"+d);(uf?a.metaKey:a.ctrlKey)&&"Ctrl"!=c&&(d="Ctrl-"+d);(uf?a.ctrlKey:a.metaKey)&&"Cmd"!=c&&(d="Cmd-"+d);!b&&a.shiftKey&&"Shift"!=c&&(d="Shift-"+d);return d};n.fromTextArea=function(a,b){function c(){a.value=k.getValue()}b=b?X(b):{};b.value=a.value;!b.tabindex&&a.tabIndex&&(b.tabindex=a.tabIndex);!b.placeholder&&a.placeholder&&(b.placeholder=a.placeholder);if(null==b.autofocus){var d=fa();b.autofocus=d==a||null!=
a.getAttribute("autofocus")&&d==document.body}if(a.form&&(u(a.form,"submit",c),!b.leaveSubmitMethodAlone)){var e=a.form,f=e.submit;try{var g=e.submit=function(){c();e.submit=f;e.submit();e.submit=g}}catch(h){}}b.finishInit=function(b){b.save=c;b.getTextArea=function(){return a};b.toTextArea=function(){b.toTextArea=isNaN;c();a.parentNode.removeChild(b.getWrapperElement());a.style.display="";a.form&&(ja(a.form,"submit",c),"function"==typeof a.form.submit&&(a.form.submit=f))}};a.style.display="none";
var k=n(function(b){a.parentNode.insertBefore(b,a.nextSibling)},b);return k};var sc=n.StringStream=function(a,b){this.pos=this.start=0;this.string=a;this.tabSize=b||8;this.lineStart=this.lastColumnPos=this.lastColumnValue=0};sc.prototype={eol:function(){return this.pos>=this.string.length},sol:function(){return this.pos==this.lineStart},peek:function(){return this.string.charAt(this.pos)||void 0},next:function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},eat:function(a){var b=
this.string.charAt(this.pos);if("string"==typeof a?b==a:b&&(a.test?a.test(b):a(b)))return++this.pos,b},eatWhile:function(a){for(var b=this.pos;this.eat(a););return this.pos>b},eatSpace:function(){for(var a=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos;return this.pos>a},skipToEnd:function(){this.pos=this.string.length},skipTo:function(a){a=this.string.indexOf(a,this.pos);if(-1<a)return this.pos=a,!0},backUp:function(a){this.pos-=a},column:function(){this.lastColumnPos<this.start&&
(this.lastColumnValue=aa(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start);return this.lastColumnValue-(this.lineStart?aa(this.string,this.lineStart,this.tabSize):0)},indentation:function(){return aa(this.string,null,this.tabSize)-(this.lineStart?aa(this.string,this.lineStart,this.tabSize):0)},match:function(a,b,c){if("string"==typeof a){var d=function(a){return c?a.toLowerCase():a},e=this.string.substr(this.pos,a.length);if(d(e)==d(a))return!1!==
b&&(this.pos+=a.length),!0}else{if((a=this.string.slice(this.pos).match(a))&&0<a.index)return null;a&&!1!==b&&(this.pos+=a[0].length);return a}},current:function(){return this.string.slice(this.start,this.pos)},hideFirstChars:function(a,b){this.lineStart+=a;try{return b()}finally{this.lineStart-=a}}};var rd=0,Ha=n.TextMarker=function(a,b){this.lines=[];this.type=b;this.doc=a;this.id=++rd};Za(Ha);Ha.prototype.clear=function(){if(!this.explicitlyCleared){var a=this.doc.cm,b=a&&!a.curOp;b&&Ka(a);if(W(this,
"clear")){var c=this.find();c&&Q(this,"clear",c.from,c.to)}for(var d=c=null,e=0;e<this.lines.length;++e){var f=this.lines[e],g=yb(f.markedSpans,this);a&&!this.collapsed?ma(a,E(f),"text"):a&&(null!=g.to&&(d=E(f)),null!=g.from&&(c=E(f)));for(var h=f,k=f.markedSpans,l=g,m=void 0,n=0;n<k.length;++n)k[n]!=l&&(m||(m=[])).push(k[n]);h.markedSpans=m;null==g.from&&this.collapsed&&!wa(this.doc,f)&&a&&ca(f,va(a.display))}if(a&&this.collapsed&&!a.options.lineWrapping)for(e=0;e<this.lines.length;++e)f=ia(this.lines[e]),
g=Jb(f),g>a.display.maxLineLength&&(a.display.maxLine=f,a.display.maxLineLength=g,a.display.maxLineChanged=!0);null!=c&&a&&this.collapsed&&O(a,c,d+1);this.lines.length=0;this.explicitlyCleared=!0;this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,a&&ie(a.doc));a&&Q(a,"markerCleared",a,this);b&&Ma(a);this.parent&&this.parent.clear()}};Ha.prototype.find=function(a,b){null==a&&"bookmark"==this.type&&(a=1);for(var c,d,e=0;e<this.lines.length;++e){var f=this.lines[e],g=yb(f.markedSpans,this);if(null!=
g.from&&(c=q(b?f:E(f),g.from),-1==a))return c;if(null!=g.to&&(d=q(b?f:E(f),g.to),1==a))return d}return c&&{from:c,to:d}};Ha.prototype.changed=function(){var a=this.find(-1,!0),b=this,c=this.doc.cm;a&&c&&R(c,function(){var d=a.line,e=E(a.line);if(e=Uc(c,e))pe(e),c.curOp.selectionChanged=c.curOp.forceUpdate=!0;c.curOp.updateMaxLine=!0;wa(b.doc,d)||null==b.height||(e=b.height,b.height=null,(e=ub(b)-e)&&ca(d,d.height+e))})};Ha.prototype.attachLine=function(a){if(!this.lines.length&&this.doc.cm){var b=
this.doc.cm.curOp;b.maybeHiddenMarkers&&-1!=D(b.maybeHiddenMarkers,this)||(b.maybeUnhiddenMarkers||(b.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(a)};Ha.prototype.detachLine=function(a){this.lines.splice(D(this.lines,a),1);!this.lines.length&&this.doc.cm&&(a=this.doc.cm.curOp,(a.maybeHiddenMarkers||(a.maybeHiddenMarkers=[])).push(this))};var rd=0,qc=n.SharedTextMarker=function(a,b){this.markers=a;this.primary=b;for(var c=0;c<a.length;++c)a[c].parent=this};Za(qc);qc.prototype.clear=function(){if(!this.explicitlyCleared){this.explicitlyCleared=
!0;for(var a=0;a<this.markers.length;++a)this.markers[a].clear();Q(this,"clear")}};qc.prototype.find=function(a,b){return this.primary.find(a,b)};var rc=n.LineWidget=function(a,b,c){if(c)for(var d in c)c.hasOwnProperty(d)&&(this[d]=c[d]);this.doc=a;this.node=b};Za(rc);rc.prototype.clear=function(){var a=this.doc.cm,b=this.line.widgets,c=this.line,d=E(c);if(null!=d&&b){for(var e=0;e<b.length;++e)b[e]==this&&b.splice(e--,1);b.length||(c.widgets=null);var f=ub(this);ca(c,Math.max(0,c.height-f));a&&R(a,
function(){var b=-f;ea(c)<(a.curOp&&a.curOp.scrollTop||a.doc.scrollTop)&&kc(a,null,b);ma(a,d,"widget")})}};rc.prototype.changed=function(){var a=this.height,b=this.doc.cm,c=this.line;this.height=null;var d=ub(this)-a;d&&(ca(c,c.height+d),b&&R(b,function(){b.curOp.forceUpdate=!0;ea(c)<(b.curOp&&b.curOp.scrollTop||b.doc.scrollTop)&&kc(b,null,d)}))};var zb=n.Line=function(a,b,c){this.text=a;Ye(this,b);this.height=c?c(this):1};Za(zb);zb.prototype.lineNo=function(){return E(this)};var ig={},hg={};Ab.prototype=
{chunkSize:function(){return this.lines.length},removeInner:function(a,b){for(var c=a,d=a+b;c<d;++c){var e=this.lines[c];this.height-=e.height;var f=e;f.parent=null;Xe(f);Q(e,"delete")}this.lines.splice(a,b)},collapse:function(a){a.push.apply(a,this.lines)},insertInner:function(a,b,c){this.height+=c;this.lines=this.lines.slice(0,a).concat(b).concat(this.lines.slice(a));for(a=0;a<b.length;++a)b[a].parent=this},iterN:function(a,b,c){for(b=a+b;a<b;++a)if(c(this.lines[a]))return!0}};Bb.prototype={chunkSize:function(){return this.size},
removeInner:function(a,b){this.size-=b;for(var c=0;c<this.children.length;++c){var d=this.children[c],e=d.chunkSize();if(a<e){var f=Math.min(b,e-a),g=d.height;d.removeInner(a,f);this.height-=g-d.height;e==f&&(this.children.splice(c--,1),d.parent=null);if(0==(b-=f))break;a=0}else a-=e}25>this.size-b&&(1<this.children.length||!(this.children[0]instanceof Ab))&&(c=[],this.collapse(c),this.children=[new Ab(c)],this.children[0].parent=this)},collapse:function(a){for(var b=0;b<this.children.length;++b)this.children[b].collapse(a)},
insertInner:function(a,b,c){this.size+=b.length;this.height+=c;for(var d=0;d<this.children.length;++d){var e=this.children[d],f=e.chunkSize();if(a<=f){e.insertInner(a,b,c);if(e.lines&&50<e.lines.length){for(;50<e.lines.length;)a=e.lines.splice(e.lines.length-25,25),a=new Ab(a),e.height-=a.height,this.children.splice(d+1,0,a),a.parent=this;this.maybeSpill()}break}a-=f}},maybeSpill:function(){if(!(10>=this.children.length)){var a=this;do{var b=a.children.splice(a.children.length-5,5),b=new Bb(b);if(a.parent){a.size-=
b.size;a.height-=b.height;var c=D(a.parent.children,a);a.parent.children.splice(c+1,0,b)}else c=new Bb(a.children),c.parent=a,a.children=[c,b],a=c;b.parent=a.parent}while(10<a.children.length);a.parent.maybeSpill()}},iterN:function(a,b,c){for(var d=0;d<this.children.length;++d){var e=this.children[d],f=e.chunkSize();if(a<f){f=Math.min(b,f-a);if(e.iterN(a,f,c))return!0;if(0==(b-=f))break;a=0}else a-=f}}};var vg=0,P=n.Doc=function(a,b,c,d){if(!(this instanceof P))return new P(a,b,c,d);null==c&&(c=0);
Bb.call(this,[new Ab([new zb("",null)])]);this.first=c;this.scrollTop=this.scrollLeft=0;this.cantEdit=!1;this.cleanGeneration=1;this.frontier=c;c=q(c,0);this.sel=ga(c);this.history=new tc(null);this.id=++vg;this.modeOption=b;this.lineSep=d;this.extend=!1;"string"==typeof a&&(a=this.splitLines(a));pd(this,{from:c,to:c,text:a});H(this,ga(c),ha)};P.prototype=lf(Bb.prototype,{constructor:P,iter:function(a,b,c){c?this.iterN(a-this.first,b-a,c):this.iterN(this.first,this.first+this.size,a)},insert:function(a,
b){for(var c=0,d=0;d<b.length;++d)c+=b[d].height;this.insertInner(a-this.first,b,c)},remove:function(a,b){this.removeInner(a-this.first,b)},getValue:function(a){var b=wd(this,this.first,this.first+this.size);return!1===a?b:b.join(a||this.lineSeparator())},setValue:M(function(a){var b=q(this.first,0),c=this.first+this.size-1;Pa(this,{from:b,to:q(c,t(this,c).text.length),text:this.splitLines(a),origin:"setValue",full:!0},!0);H(this,ga(b))}),replaceRange:function(a,b,c,d){b=x(this,b);c=c?x(this,c):b;
Va(this,a,b,c,d)},getRange:function(a,b,c){a=Ba(this,x(this,a),x(this,b));return!1===c?a:a.join(c||this.lineSeparator())},getLine:function(a){return(a=this.getLineHandle(a))&&a.text},getLineHandle:function(a){if(qb(this,a))return t(this,a)},getLineNumber:function(a){return E(a)},getLineHandleVisualStart:function(a){"number"==typeof a&&(a=t(this,a));return ia(a)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(a){return x(this,
a)},getCursor:function(a){var b=this.sel.primary();return null==a||"head"==a?b.head:"anchor"==a?b.anchor:"end"==a||"to"==a||!1===a?b.to():b.from()},listSelections:function(){return this.sel.ranges},somethingSelected:function(){return this.sel.somethingSelected()},setCursor:M(function(a,b,c){a=x(this,"number"==typeof a?q(a,b||0):a);H(this,ga(a,null),c)}),setSelection:M(function(a,b,c){var d=x(this,a);a=x(this,b||a);H(this,ga(d,a),c)}),extendSelection:M(function(a,b,c){Tb(this,x(this,a),b&&x(this,b),
c)}),extendSelections:M(function(a,b){ce(this,be(this,a),b)}),extendSelectionsBy:M(function(a,b){var c=Qb(this.sel.ranges,a);ce(this,be(this,c),b)}),setSelections:M(function(a,b,c){if(a.length){for(var d=0,e=[];d<a.length;d++)e[d]=new y(x(this,a[d].anchor),x(this,a[d].head));null==b&&(b=Math.min(a.length-1,this.sel.primIndex));H(this,$(e,b),c)}}),addSelection:M(function(a,b,c){var d=this.sel.ranges.slice(0);d.push(new y(x(this,a),x(this,b||a)));H(this,$(d,d.length-1),c)}),getSelection:function(a){for(var b=
this.sel.ranges,c,d=0;d<b.length;d++){var e=Ba(this,b[d].from(),b[d].to());c=c?c.concat(e):e}return!1===a?c:c.join(a||this.lineSeparator())},getSelections:function(a){for(var b=[],c=this.sel.ranges,d=0;d<c.length;d++){var e=Ba(this,c[d].from(),c[d].to());!1!==a&&(e=e.join(a||this.lineSeparator()));b[d]=e}return b},replaceSelection:function(a,b,c){for(var d=[],e=0;e<this.sel.ranges.length;e++)d[e]=a;this.replaceSelections(d,b,c||"+input")},replaceSelections:M(function(a,b,c){for(var d=[],e=this.sel,
f=0;f<e.ranges.length;f++){var g=e.ranges[f];d[f]={from:g.from(),to:g.to(),text:this.splitLines(a[f]),origin:c}}if(f=b&&"end"!=b){f=[];c=a=q(this.first,0);for(e=0;e<d.length;e++){var h=d[e],g=Ie(h.from,a,c),k=Ie(Fa(h),a,c);a=h.to;c=k;"around"==b?(h=this.sel.ranges[e],h=0>w(h.head,h.anchor),f[e]=new y(h?k:g,h?g:k)):f[e]=new y(g,g)}f=new ka(f,this.sel.primIndex)}b=f;for(f=d.length-1;0<=f;f--)Pa(this,d[f]);b?de(this,b):this.cm&&Qa(this.cm)}),undo:M(function(){jc(this,"undo")}),redo:M(function(){jc(this,
"redo")}),undoSelection:M(function(){jc(this,"undo",!0)}),redoSelection:M(function(){jc(this,"redo",!0)}),setExtending:function(a){this.extend=a},getExtending:function(){return this.extend},historySize:function(){for(var a=this.history,b=0,c=0,d=0;d<a.done.length;d++)a.done[d].ranges||++b;for(d=0;d<a.undone.length;d++)a.undone[d].ranges||++c;return{undo:b,redo:c}},clearHistory:function(){this.history=new tc(this.history.maxGeneration)},markClean:function(){this.cleanGeneration=this.changeGeneration(!0)},
changeGeneration:function(a){a&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null);return this.history.generation},isClean:function(a){return this.history.generation==(a||this.cleanGeneration)},getHistory:function(){return{done:Ya(this.history.done),undone:Ya(this.history.undone)}},setHistory:function(a){var b=this.history=new tc(this.history.maxGeneration);b.done=Ya(a.done.slice(0),null,!0);b.undone=Ya(a.undone.slice(0),null,!0)},addLineClass:M(function(a,b,c){return mc(this,
a,"gutter"==b?"gutter":"class",function(a){var e="text"==b?"textClass":"background"==b?"bgClass":"gutter"==b?"gutterClass":"wrapClass";if(a[e]){if(Eb(c).test(a[e]))return!1;a[e]+=" "+c}else a[e]=c;return!0})}),removeLineClass:M(function(a,b,c){return mc(this,a,"gutter"==b?"gutter":"class",function(a){var e="text"==b?"textClass":"background"==b?"bgClass":"gutter"==b?"gutterClass":"wrapClass",f=a[e];if(f)if(null==c)a[e]=null;else{var g=f.match(Eb(c));if(!g)return!1;var h=g.index+g[0].length;a[e]=f.slice(0,
g.index)+(g.index&&h!=f.length?" ":"")+f.slice(h)||null}else return!1;return!0})}),addLineWidget:M(function(a,b,c){return gg(this,a,b,c)}),removeLineWidget:function(a){a.clear()},markText:function(a,b,c){return Xa(this,x(this,a),x(this,b),c,c&&c.type||"range")},setBookmark:function(a,b){var c={replacedWith:b&&(null==b.nodeType?b.widget:b),insertLeft:b&&b.insertLeft,clearWhenEmpty:!1,shared:b&&b.shared,handleMouseEvents:b&&b.handleMouseEvents};a=x(this,a);return Xa(this,a,a,c,"bookmark")},findMarksAt:function(a){a=
x(this,a);var b=[],c=t(this,a.line).markedSpans;if(c)for(var d=0;d<c.length;++d){var e=c[d];(null==e.from||e.from<=a.ch)&&(null==e.to||e.to>=a.ch)&&b.push(e.marker.parent||e.marker)}return b},findMarks:function(a,b,c){a=x(this,a);b=x(this,b);var d=[],e=a.line;this.iter(a.line,b.line+1,function(f){if(f=f.markedSpans)for(var g=0;g<f.length;g++){var h=f[g];e==a.line&&a.ch>h.to||null==h.from&&e!=a.line||e==b.line&&h.from>b.ch||c&&!c(h.marker)||d.push(h.marker.parent||h.marker)}++e});return d},getAllMarks:function(){var a=
[];this.iter(function(b){if(b=b.markedSpans)for(var c=0;c<b.length;++c)null!=b[c].from&&a.push(b[c].marker)});return a},posFromIndex:function(a){var b,c=this.first;this.iter(function(d){d=d.text.length+1;if(d>a)return b=a,!0;a-=d;++c});return x(this,q(c,b))},indexFromPos:function(a){a=x(this,a);var b=a.ch;if(a.line<this.first||0>a.ch)return 0;this.iter(this.first,a.line,function(a){b+=a.text.length+1});return b},copy:function(a){var b=new P(wd(this,this.first,this.first+this.size),this.modeOption,
this.first,this.lineSep);b.scrollTop=this.scrollTop;b.scrollLeft=this.scrollLeft;b.sel=this.sel;b.extend=!1;a&&(b.history.undoDepth=this.history.undoDepth,b.setHistory(this.getHistory()));return b},linkedDoc:function(a){a||(a={});var b=this.first,c=this.first+this.size;null!=a.from&&a.from>b&&(b=a.from);null!=a.to&&a.to<c&&(c=a.to);b=new P(wd(this,b,c),a.mode||this.modeOption,b,this.lineSep);a.sharedHist&&(b.history=this.history);(this.linked||(this.linked=[])).push({doc:b,sharedHist:a.sharedHist});
b.linked=[{doc:this,isParent:!0,sharedHist:a.sharedHist}];a=Ve(this);for(c=0;c<a.length;c++){var d=a[c],e=d.find(),f=b.clipPos(e.from),e=b.clipPos(e.to);w(f,e)&&(f=Xa(b,f,e,d.primary,d.primary.type),d.markers.push(f),f.parent=d)}return b},unlinkDoc:function(a){a instanceof n&&(a=a.doc);if(this.linked)for(var b=0;b<this.linked.length;++b)if(this.linked[b].doc==a){this.linked.splice(b,1);a.unlinkDoc(this);eg(Ve(this));break}if(a.history==this.history){var c=[a.id];Ga(a,function(a){c.push(a.id)},!0);
a.history=new tc(null);a.history.done=Ya(this.history.done,c);a.history.undone=Ya(this.history.undone,c)}},iterLinkedDocs:function(a){Ga(this,a)},getMode:function(){return this.mode},getEditor:function(){return this.cm},splitLines:function(a){return this.lineSep?a.split(this.lineSep):wg(a)},lineSeparator:function(){return this.lineSep||"\n"}});P.prototype.eachLine=P.prototype.iter;var xg="iter insert remove copy getEditor constructor".split(" "),Ib;for(Ib in P.prototype)P.prototype.hasOwnProperty(Ib)&&
0>D(xg,Ib)&&(n.prototype[Ib]=function(a){return function(){return a.apply(this.doc,arguments)}}(P.prototype[Ib]));Za(P);var N=n.e_preventDefault=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1},yg=n.e_stopPropagation=function(a){a.stopPropagation?a.stopPropagation():a.cancelBubble=!0},cc=n.e_stop=function(a){N(a);yg(a)},u=n.on=function(a,b,c){a.addEventListener?a.addEventListener(b,c,!1):a.attachEvent?a.attachEvent("on"+b,c):(a=a._handlers||(a._handlers={}),(a[b]||(a[b]=[])).push(c))},
kf=[],ja=n.off=function(a,b,c){if(a.removeEventListener)a.removeEventListener(b,c,!1);else if(a.detachEvent)a.detachEvent("on"+b,c);else for(a=uc(a,b,!1),b=0;b<a.length;++b)if(a[b]==c){a.splice(b,1);break}},J=n.signal=function(a,b){var c=uc(a,b,!0);if(c.length)for(var d=Array.prototype.slice.call(arguments,2),e=0;e<c.length;++e)c[e].apply(null,d)},Cb=null,Gd=30,Ee=n.Pass={toString:function(){return"CodeMirror.Pass"}},ha={scroll:!1},jd={origin:"*mouse"},Fb={origin:"+move"};ua.prototype.set=function(a,
b){clearTimeout(this.id);this.id=setTimeout(b,a)};var aa=n.countColumn=function(a,b,c,d,e){null==b&&(b=a.search(/[^\s\u00a0]/),-1==b&&(b=a.length));d=d||0;for(e=e||0;;){var f=a.indexOf("\t",d);if(0>f||f>=b)return e+(b-d);e+=f-d;e+=c-e%c;d=f+1}},Ce=n.findColumn=function(a,b,c){for(var d=0,e=0;;){var f=a.indexOf("\t",d);-1==f&&(f=a.length);var g=f-d;if(f==a.length||e+g>=b)return d+Math.min(g,b-e);e+=f-d;e+=c-e%c;d=f+1;if(e>=b)return d}},vc=[""],$a=function(a){a.select()};Ra?$a=function(a){a.selectionStart=
0;a.selectionEnd=a.value.length}:A&&($a=function(a){try{a.select()}catch(b){}});var zg=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,mf=n.isWordChar=function(a){return/\w/.test(a)||""<a&&(a.toUpperCase()!=a.toLowerCase()||zg.test(a))},pg=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,
Ca;Ca=document.createRange?function(a,b,c,d){var e=document.createRange();e.setEnd(d||a,c);e.setStart(a,b);return e}:function(a,b,c){var d=document.body.createTextRange();try{d.moveToElementText(a.parentNode)}catch(e){return d}d.collapse(!0);d.moveEnd("character",c);d.moveStart("character",b);return d};var Vc=n.contains=function(a,b){3==b.nodeType&&(b=b.parentNode);if(a.contains)return a.contains(b);do if(11==b.nodeType&&(b=b.host),b==a)return!0;while(b=b.parentNode)};A&&11>C&&(fa=function(){try{return document.activeElement}catch(a){return document.body}});
var kb=n.rmClass=function(a,b){var c=a.className,d=Eb(b).exec(c);if(d){var e=c.slice(d.index+d[0].length);a.className=c.slice(0,d.index)+(e?d[1]+e:"")}},mb=n.addClass=function(a,b){var c=a.className;Eb(b).test(c)||(a.className+=(c?" ":"")+b)},Cd=!1,Sf=function(){if(A&&9>C)return!1;var a=r("div");return"draggable"in a||"dragDrop"in a}(),xd,ud,wg=n.splitLines=3!="\n\nb".split(/\n/).length?function(a){for(var b=0,c=[],d=a.length;b<=d;){var e=a.indexOf("\n",b);-1==e&&(e=a.length);var f=a.slice(b,"\r"==
a.charAt(e-1)?e-1:e),g=f.indexOf("\r");-1!=g?(c.push(f.slice(0,g)),b+=g+1):(c.push(f),b=e+1)}return c}:function(a){return a.split(/\r\n?|\n/)},ug=window.getSelection?function(a){try{return a.selectionStart!=a.selectionEnd}catch(b){return!1}}:function(a){try{var b=a.ownerDocument.selection.createRange()}catch(c){}return b&&b.parentElement()==a?0!=b.compareEndPoints("StartToEnd",b):!1},Ge=function(){var a=r("div");if("oncopy"in a)return!0;a.setAttribute("oncopy","return;");return"function"==typeof a.oncopy}(),
bd=null,Ja=n.keyNames={3:"Enter",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"\x3d",91:"Mod",92:"Mod",93:"Mod",106:"*",107:"\x3d",109:"-",110:".",111:"/",127:"Delete",173:"-",186:";",187:"\x3d",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",63232:"Up",63233:"Down",63234:"Left",
63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"};(function(){for(var a=0;10>a;a++)Ja[a+48]=Ja[a+96]=String(a);for(a=65;90>=a;a++)Ja[a]=String.fromCharCode(a);for(a=1;12>=a;a++)Ja[a+111]=Ja[a+63235]="F"+a})();var vb,ng=function(){function a(a){return 247>=a?"bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(a):
1424<=a&&1524>=a?"R":1536<=a&&1773>=a?"rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm".charAt(a-1536):1774<=a&&2220>=a?"r":8192<=a&&8203>=a?"w":8204==a?"b":"L"}function b(a,b,c){this.level=a;this.from=b;this.to=c}var c=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,d=/[stwN]/,e=/[LRr]/,f=/[Lb1n]/,g=/[1n]/;return function(h){if(!c.test(h))return!1;
for(var k=h.length,l=[],m=0,n;m<k;++m)l.push(a(h.charCodeAt(m)));for(var m=0,p="L";m<k;++m)n=l[m],"m"==n?l[m]=p:p=n;m=0;for(p="L";m<k;++m)n=l[m],"1"==n&&"r"==p?l[m]="n":e.test(n)&&(p=n,"r"==n&&(l[m]="R"));m=1;for(p=l[0];m<k-1;++m)n=l[m],"+"==n&&"1"==p&&"1"==l[m+1]?l[m]="1":","!=n||p!=l[m+1]||"1"!=p&&"n"!=p||(l[m]=p),p=n;for(m=0;m<k;++m)if(n=l[m],","==n)l[m]="N";else if("%"==n){for(p=m+1;p<k&&"%"==l[p];++p);var q=m&&"!"==l[m-1]||p<k&&"1"==l[p]?"1":"N";for(n=m;n<p;++n)l[n]=q;m=p-1}m=0;for(p="L";m<k;++m)n=
l[m],"L"==p&&"1"==n?l[m]="L":e.test(n)&&(p=n);for(m=0;m<k;++m)if(d.test(l[m])){for(p=m+1;p<k&&d.test(l[p]);++p);n="L"==(p<k?l[p]:"L");q="L"==(m?l[m-1]:"L")||n?"L":"R";for(n=m;n<p;++n)l[n]=q;m=p-1}for(var p=[],r,m=0;m<k;)if(f.test(l[m])){n=m;for(++m;m<k&&f.test(l[m]);++m);p.push(new b(0,n,m))}else{var t=m,q=p.length;for(++m;m<k&&"L"!=l[m];++m);for(n=t;n<m;)if(g.test(l[n])){t<n&&p.splice(q,0,new b(1,t,n));t=n;for(++n;n<m&&g.test(l[n]);++n);p.splice(q,0,new b(2,t,n));t=n}else++n;t<m&&p.splice(q,0,new b(1,
t,m))}1==p[0].level&&(r=h.match(/^\s+/))&&(p[0].from=r[0].length,p.unshift(new b(0,0,r[0].length)));1==z(p).level&&(r=h.match(/\s+$/))&&(z(p).to-=r[0].length,p.push(new b(0,k-r[0].length,k)));2==p[0].level&&p.unshift(new b(1,p[0].to,p[0].to));p[0].level!=z(p).level&&p.push(new b(p[0].level,k,k));return p}}();n.version="5.11.0";return n});
// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../markdown/markdown"), require("../../addon/mode/overlay"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../markdown/markdown", "../../addon/mode/overlay"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

var urlRE = /^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i

CodeMirror.defineMode("gfm", function(config, modeConfig) {
  var codeDepth = 0;
  function blankLine(state) {
    state.code = false;
    return null;
  }
  var gfmOverlay = {
    startState: function() {
      return {
        code: false,
        codeBlock: false,
        ateSpace: false
      };
    },
    copyState: function(s) {
      return {
        code: s.code,
        codeBlock: s.codeBlock,
        ateSpace: s.ateSpace
      };
    },
    token: function(stream, state) {
      state.combineTokens = null;

      // Hack to prevent formatting override inside code blocks (block and inline)
      if (state.codeBlock) {
        if (stream.match(/^```+/)) {
          state.codeBlock = false;
          return null;
        }
        stream.skipToEnd();
        return null;
      }
      if (stream.sol()) {
        state.code = false;
      }
      if (stream.sol() && stream.match(/^```+/)) {
        stream.skipToEnd();
        state.codeBlock = true;
        return null;
      }
      // If this block is changed, it may need to be updated in Markdown mode
      if (stream.peek() === '`') {
        stream.next();
        var before = stream.pos;
        stream.eatWhile('`');
        var difference = 1 + stream.pos - before;
        if (!state.code) {
          codeDepth = difference;
          state.code = true;
        } else {
          if (difference === codeDepth) { // Must be exact
            state.code = false;
          }
        }
        return null;
      } else if (state.code) {
        stream.next();
        return null;
      }
      // Check if space. If so, links can be formatted later on
      if (stream.eatSpace()) {
        state.ateSpace = true;
        return null;
      }
      if (stream.sol() || state.ateSpace) {
        state.ateSpace = false;
        if (modeConfig.gitHubSpice !== false) {
          if(stream.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?:[a-f0-9]{7,40}\b)/)) {
            // User/Project@SHA
            // User@SHA
            // SHA
            state.combineTokens = true;
            return "link";
          } else if (stream.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/)) {
            // User/Project#Num
            // User#Num
            // #Num
            state.combineTokens = true;
            return "link";
          }
        }
      }
      if (stream.match(urlRE) &&
          stream.string.slice(stream.start - 2, stream.start) != "](" &&
          (stream.start == 0 || /\W/.test(stream.string.charAt(stream.start - 1)))) {
        // URLs
        // Taken from http://daringfireball.net/2010/07/improved_regex_for_matching_urls
        // And then (issue #1160) simplified to make it not crash the Chrome Regexp engine
        // And then limited url schemes to the CommonMark list, so foo:bar isn't matched as a URL
        state.combineTokens = true;
        return "link";
      }
      stream.next();
      return null;
    },
    blankLine: blankLine
  };

  var markdownConfig = {
    underscoresBreakWords: false,
    taskLists: true,
    fencedCodeBlocks: '```',
    strikethrough: true
  };
  for (var attr in modeConfig) {
    markdownConfig[attr] = modeConfig[attr];
  }
  markdownConfig.name = "markdown";
  return CodeMirror.overlayMode(CodeMirror.getMode(config, markdownConfig), gfmOverlay);

}, "markdown");

  CodeMirror.defineMIME("text/x-gfm", "gfm");
});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../../lib/codemirror"), require("../xml/xml"), require("../meta"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../../lib/codemirror", "../xml/xml", "../meta"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
"use strict";

CodeMirror.defineMode("markdown", function(cmCfg, modeCfg) {

  var htmlFound = CodeMirror.modes.hasOwnProperty("xml");
  var htmlMode = CodeMirror.getMode(cmCfg, htmlFound ? {name: "xml", htmlMode: true} : "text/plain");

  function getMode(name) {
    if (CodeMirror.findModeByName) {
      var found = CodeMirror.findModeByName(name);
      if (found) name = found.mime || found.mimes[0];
    }
    var mode = CodeMirror.getMode(cmCfg, name);
    return mode.name == "null" ? null : mode;
  }

  // Should characters that affect highlighting be highlighted separate?
  // Does not include characters that will be output (such as `1.` and `-` for lists)
  if (modeCfg.highlightFormatting === undefined)
    modeCfg.highlightFormatting = false;

  // Maximum number of nested blockquotes. Set to 0 for infinite nesting.
  // Excess `>` will emit `error` token.
  if (modeCfg.maxBlockquoteDepth === undefined)
    modeCfg.maxBlockquoteDepth = 0;

  // Should underscores in words open/close em/strong?
  if (modeCfg.underscoresBreakWords === undefined)
    modeCfg.underscoresBreakWords = true;

  // Use `fencedCodeBlocks` to configure fenced code blocks. false to
  // disable, string to specify a precise regexp that the fence should
  // match, and true to allow three or more backticks or tildes (as
  // per CommonMark).

  // Turn on task lists? ("- [ ] " and "- [x] ")
  if (modeCfg.taskLists === undefined) modeCfg.taskLists = false;

  // Turn on strikethrough syntax
  if (modeCfg.strikethrough === undefined)
    modeCfg.strikethrough = false;

  // Allow token types to be overridden by user-provided token types.
  if (modeCfg.tokenTypeOverrides === undefined)
    modeCfg.tokenTypeOverrides = {};

  var codeDepth = 0;

  var tokenTypes = {
    header: "header",
    code: "comment",
    quote: "quote",
    list1: "variable-2",
    list2: "variable-3",
    list3: "keyword",
    hr: "hr",
    image: "tag",
    formatting: "formatting",
    linkInline: "link",
    linkEmail: "link",
    linkText: "link",
    linkHref: "string",
    em: "em",
    strong: "strong",
    strikethrough: "strikethrough"
  };

  for (var tokenType in tokenTypes) {
    if (tokenTypes.hasOwnProperty(tokenType) && modeCfg.tokenTypeOverrides[tokenType]) {
      tokenTypes[tokenType] = modeCfg.tokenTypeOverrides[tokenType];
    }
  }

  var hrRE = /^([*\-_])(?:\s*\1){2,}\s*$/
  ,   ulRE = /^[*\-+]\s+/
  ,   olRE = /^[0-9]+([.)])\s+/
  ,   taskListRE = /^\[(x| )\](?=\s)/ // Must follow ulRE or olRE
  ,   atxHeaderRE = modeCfg.allowAtxHeaderWithoutSpace ? /^(#+)/ : /^(#+)(?: |$)/
  ,   setextHeaderRE = /^ *(?:\={1,}|-{1,})\s*$/
  ,   textRE = /^[^#!\[\]*_\\<>` "'(~]+/
  ,   fencedCodeRE = new RegExp("^(" + (modeCfg.fencedCodeBlocks === true ? "~~~+|```+" : modeCfg.fencedCodeBlocks) +
                                ")[ \\t]*([\\w+#]*)");

  function switchInline(stream, state, f) {
    state.f = state.inline = f;
    return f(stream, state);
  }

  function switchBlock(stream, state, f) {
    state.f = state.block = f;
    return f(stream, state);
  }

  function lineIsEmpty(line) {
    return !line || !/\S/.test(line.string)
  }

  // Blocks

  function blankLine(state) {
    // Reset linkTitle state
    state.linkTitle = false;
    // Reset EM state
    state.em = false;
    // Reset STRONG state
    state.strong = false;
    // Reset strikethrough state
    state.strikethrough = false;
    // Reset state.quote
    state.quote = 0;
    // Reset state.indentedCode
    state.indentedCode = false;
    if (!htmlFound && state.f == htmlBlock) {
      state.f = inlineNormal;
      state.block = blockNormal;
    }
    // Reset state.trailingSpace
    state.trailingSpace = 0;
    state.trailingSpaceNewLine = false;
    // Mark this line as blank
    state.prevLine = state.thisLine
    state.thisLine = null
    return null;
  }

  function blockNormal(stream, state) {

    var sol = stream.sol();

    var prevLineIsList = state.list !== false,
        prevLineIsIndentedCode = state.indentedCode;

    state.indentedCode = false;

    if (prevLineIsList) {
      if (state.indentationDiff >= 0) { // Continued list
        if (state.indentationDiff < 4) { // Only adjust indentation if *not* a code block
          state.indentation -= state.indentationDiff;
        }
        state.list = null;
      } else if (state.indentation > 0) {
        state.list = null;
        state.listDepth = Math.floor(state.indentation / 4);
      } else { // No longer a list
        state.list = false;
        state.listDepth = 0;
      }
    }

    var match = null;
    if (state.indentationDiff >= 4) {
      stream.skipToEnd();
      if (prevLineIsIndentedCode || lineIsEmpty(state.prevLine)) {
        state.indentation -= 4;
        state.indentedCode = true;
        return tokenTypes.code;
      } else {
        return null;
      }
    } else if (stream.eatSpace()) {
      return null;
    } else if ((match = stream.match(atxHeaderRE)) && match[1].length <= 6) {
      state.header = match[1].length;
      if (modeCfg.highlightFormatting) state.formatting = "header";
      state.f = state.inline;
      return getType(state);
    } else if (!lineIsEmpty(state.prevLine) && !state.quote && !prevLineIsList &&
               !prevLineIsIndentedCode && (match = stream.match(setextHeaderRE))) {
      state.header = match[0].charAt(0) == '=' ? 1 : 2;
      if (modeCfg.highlightFormatting) state.formatting = "header";
      state.f = state.inline;
      return getType(state);
    } else if (stream.eat('>')) {
      state.quote = sol ? 1 : state.quote + 1;
      if (modeCfg.highlightFormatting) state.formatting = "quote";
      stream.eatSpace();
      return getType(state);
    } else if (stream.peek() === '[') {
      return switchInline(stream, state, footnoteLink);
    } else if (stream.match(hrRE, true)) {
      state.hr = true;
      return tokenTypes.hr;
    } else if ((lineIsEmpty(state.prevLine) || prevLineIsList) && (stream.match(ulRE, false) || stream.match(olRE, false))) {
      var listType = null;
      if (stream.match(ulRE, true)) {
        listType = 'ul';
      } else {
        stream.match(olRE, true);
        listType = 'ol';
      }
      state.indentation = stream.column() + stream.current().length;
      state.list = true;
      state.listDepth++;
      if (modeCfg.taskLists && stream.match(taskListRE, false)) {
        state.taskList = true;
      }
      state.f = state.inline;
      if (modeCfg.highlightFormatting) state.formatting = ["list", "list-" + listType];
      return getType(state);
    } else if (modeCfg.fencedCodeBlocks && (match = stream.match(fencedCodeRE, true))) {
      state.fencedChars = match[1]
      // try switching mode
      state.localMode = getMode(match[2]);
      if (state.localMode) state.localState = state.localMode.startState();
      state.f = state.block = local;
      if (modeCfg.highlightFormatting) state.formatting = "code-block";
      state.code = true;
      return getType(state);
    }

    return switchInline(stream, state, state.inline);
  }

  function htmlBlock(stream, state) {
    var style = htmlMode.token(stream, state.htmlState);
    if ((htmlFound && state.htmlState.tagStart === null &&
         (!state.htmlState.context && state.htmlState.tokenize.isInText)) ||
        (state.md_inside && stream.current().indexOf(">") > -1)) {
      state.f = inlineNormal;
      state.block = blockNormal;
      state.htmlState = null;
    }
    return style;
  }

  function local(stream, state) {
    if (state.fencedChars && stream.match(state.fencedChars, false)) {
      state.localMode = state.localState = null;
      state.f = state.block = leavingLocal;
      return null;
    } else if (state.localMode) {
      return state.localMode.token(stream, state.localState);
    } else {
      stream.skipToEnd();
      return tokenTypes.code;
    }
  }

  function leavingLocal(stream, state) {
    stream.match(state.fencedChars);
    state.block = blockNormal;
    state.f = inlineNormal;
    state.fencedChars = null;
    if (modeCfg.highlightFormatting) state.formatting = "code-block";
    state.code = true;
    var returnType = getType(state);
    state.code = false;
    return returnType;
  }

  // Inline
  function getType(state) {
    var styles = [];

    if (state.formatting) {
      styles.push(tokenTypes.formatting);

      if (typeof state.formatting === "string") state.formatting = [state.formatting];

      for (var i = 0; i < state.formatting.length; i++) {
        styles.push(tokenTypes.formatting + "-" + state.formatting[i]);

        if (state.formatting[i] === "header") {
          styles.push(tokenTypes.formatting + "-" + state.formatting[i] + "-" + state.header);
        }

        // Add `formatting-quote` and `formatting-quote-#` for blockquotes
        // Add `error` instead if the maximum blockquote nesting depth is passed
        if (state.formatting[i] === "quote") {
          if (!modeCfg.maxBlockquoteDepth || modeCfg.maxBlockquoteDepth >= state.quote) {
            styles.push(tokenTypes.formatting + "-" + state.formatting[i] + "-" + state.quote);
          } else {
            styles.push("error");
          }
        }
      }
    }

    if (state.taskOpen) {
      styles.push("meta");
      return styles.length ? styles.join(' ') : null;
    }
    if (state.taskClosed) {
      styles.push("property");
      return styles.length ? styles.join(' ') : null;
    }

    if (state.linkHref) {
      styles.push(tokenTypes.linkHref, "url");
    } else { // Only apply inline styles to non-url text
      if (state.strong) { styles.push(tokenTypes.strong); }
      if (state.em) { styles.push(tokenTypes.em); }
      if (state.strikethrough) { styles.push(tokenTypes.strikethrough); }
      if (state.linkText) { styles.push(tokenTypes.linkText); }
      if (state.code) { styles.push(tokenTypes.code); }
    }

    if (state.header) { styles.push(tokenTypes.header, tokenTypes.header + "-" + state.header); }

    if (state.quote) {
      styles.push(tokenTypes.quote);

      // Add `quote-#` where the maximum for `#` is modeCfg.maxBlockquoteDepth
      if (!modeCfg.maxBlockquoteDepth || modeCfg.maxBlockquoteDepth >= state.quote) {
        styles.push(tokenTypes.quote + "-" + state.quote);
      } else {
        styles.push(tokenTypes.quote + "-" + modeCfg.maxBlockquoteDepth);
      }
    }

    if (state.list !== false) {
      var listMod = (state.listDepth - 1) % 3;
      if (!listMod) {
        styles.push(tokenTypes.list1);
      } else if (listMod === 1) {
        styles.push(tokenTypes.list2);
      } else {
        styles.push(tokenTypes.list3);
      }
    }

    if (state.trailingSpaceNewLine) {
      styles.push("trailing-space-new-line");
    } else if (state.trailingSpace) {
      styles.push("trailing-space-" + (state.trailingSpace % 2 ? "a" : "b"));
    }

    return styles.length ? styles.join(' ') : null;
  }

  function handleText(stream, state) {
    if (stream.match(textRE, true)) {
      return getType(state);
    }
    return undefined;
  }

  function inlineNormal(stream, state) {
    var style = state.text(stream, state);
    if (typeof style !== 'undefined')
      return style;

    if (state.list) { // List marker (*, +, -, 1., etc)
      state.list = null;
      return getType(state);
    }

    if (state.taskList) {
      var taskOpen = stream.match(taskListRE, true)[1] !== "x";
      if (taskOpen) state.taskOpen = true;
      else state.taskClosed = true;
      if (modeCfg.highlightFormatting) state.formatting = "task";
      state.taskList = false;
      return getType(state);
    }

    state.taskOpen = false;
    state.taskClosed = false;

    if (state.header && stream.match(/^#+$/, true)) {
      if (modeCfg.highlightFormatting) state.formatting = "header";
      return getType(state);
    }

    // Get sol() value now, before character is consumed
    var sol = stream.sol();

    var ch = stream.next();

    if (ch === '\\') {
      stream.next();
      if (modeCfg.highlightFormatting) {
        var type = getType(state);
        var formattingEscape = tokenTypes.formatting + "-escape";
        return type ? type + " " + formattingEscape : formattingEscape;
      }
    }

    // Matches link titles present on next line
    if (state.linkTitle) {
      state.linkTitle = false;
      var matchCh = ch;
      if (ch === '(') {
        matchCh = ')';
      }
      matchCh = (matchCh+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
      var regex = '^\\s*(?:[^' + matchCh + '\\\\]+|\\\\\\\\|\\\\.)' + matchCh;
      if (stream.match(new RegExp(regex), true)) {
        return tokenTypes.linkHref;
      }
    }

    // If this block is changed, it may need to be updated in GFM mode
    if (ch === '`') {
      var previousFormatting = state.formatting;
      if (modeCfg.highlightFormatting) state.formatting = "code";
      var t = getType(state);
      var before = stream.pos;
      stream.eatWhile('`');
      var difference = 1 + stream.pos - before;
      if (!state.code) {
        codeDepth = difference;
        state.code = true;
        return getType(state);
      } else {
        if (difference === codeDepth) { // Must be exact
          state.code = false;
          return t;
        }
        state.formatting = previousFormatting;
        return getType(state);
      }
    } else if (state.code) {
      return getType(state);
    }

    if (ch === '!' && stream.match(/\[[^\]]*\] ?(?:\(|\[)/, false)) {
      stream.match(/\[[^\]]*\]/);
      state.inline = state.f = linkHref;
      return tokenTypes.image;
    }

    if (ch === '[' && stream.match(/.*\](\(.*\)| ?\[.*\])/, false)) {
      state.linkText = true;
      if (modeCfg.highlightFormatting) state.formatting = "link";
      return getType(state);
    }

    if (ch === ']' && state.linkText && stream.match(/\(.*\)| ?\[.*\]/, false)) {
      if (modeCfg.highlightFormatting) state.formatting = "link";
      var type = getType(state);
      state.linkText = false;
      state.inline = state.f = linkHref;
      return type;
    }

    if (ch === '<' && stream.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/, false)) {
      state.f = state.inline = linkInline;
      if (modeCfg.highlightFormatting) state.formatting = "link";
      var type = getType(state);
      if (type){
        type += " ";
      } else {
        type = "";
      }
      return type + tokenTypes.linkInline;
    }

    if (ch === '<' && stream.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/, false)) {
      state.f = state.inline = linkInline;
      if (modeCfg.highlightFormatting) state.formatting = "link";
      var type = getType(state);
      if (type){
        type += " ";
      } else {
        type = "";
      }
      return type + tokenTypes.linkEmail;
    }

    if (ch === '<' && stream.match(/^(!--|\w)/, false)) {
      var end = stream.string.indexOf(">", stream.pos);
      if (end != -1) {
        var atts = stream.string.substring(stream.start, end);
        if (/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(atts)) state.md_inside = true;
      }
      stream.backUp(1);
      state.htmlState = CodeMirror.startState(htmlMode);
      return switchBlock(stream, state, htmlBlock);
    }

    if (ch === '<' && stream.match(/^\/\w*?>/)) {
      state.md_inside = false;
      return "tag";
    }

    var ignoreUnderscore = false;
    if (!modeCfg.underscoresBreakWords) {
      if (ch === '_' && stream.peek() !== '_' && stream.match(/(\w)/, false)) {
        var prevPos = stream.pos - 2;
        if (prevPos >= 0) {
          var prevCh = stream.string.charAt(prevPos);
          if (prevCh !== '_' && prevCh.match(/(\w)/, false)) {
            ignoreUnderscore = true;
          }
        }
      }
    }
    if (ch === '*' || (ch === '_' && !ignoreUnderscore)) {
      if (sol && stream.peek() === ' ') {
        // Do nothing, surrounded by newline and space
      } else if (state.strong === ch && stream.eat(ch)) { // Remove STRONG
        if (modeCfg.highlightFormatting) state.formatting = "strong";
        var t = getType(state);
        state.strong = false;
        return t;
      } else if (!state.strong && stream.eat(ch)) { // Add STRONG
        state.strong = ch;
        if (modeCfg.highlightFormatting) state.formatting = "strong";
        return getType(state);
      } else if (state.em === ch) { // Remove EM
        if (modeCfg.highlightFormatting) state.formatting = "em";
        var t = getType(state);
        state.em = false;
        return t;
      } else if (!state.em) { // Add EM
        state.em = ch;
        if (modeCfg.highlightFormatting) state.formatting = "em";
        return getType(state);
      }
    } else if (ch === ' ') {
      if (stream.eat('*') || stream.eat('_')) { // Probably surrounded by spaces
        if (stream.peek() === ' ') { // Surrounded by spaces, ignore
          return getType(state);
        } else { // Not surrounded by spaces, back up pointer
          stream.backUp(1);
        }
      }
    }

    if (modeCfg.strikethrough) {
      if (ch === '~' && stream.eatWhile(ch)) {
        if (state.strikethrough) {// Remove strikethrough
          if (modeCfg.highlightFormatting) state.formatting = "strikethrough";
          var t = getType(state);
          state.strikethrough = false;
          return t;
        } else if (stream.match(/^[^\s]/, false)) {// Add strikethrough
          state.strikethrough = true;
          if (modeCfg.highlightFormatting) state.formatting = "strikethrough";
          return getType(state);
        }
      } else if (ch === ' ') {
        if (stream.match(/^~~/, true)) { // Probably surrounded by space
          if (stream.peek() === ' ') { // Surrounded by spaces, ignore
            return getType(state);
          } else { // Not surrounded by spaces, back up pointer
            stream.backUp(2);
          }
        }
      }
    }

    if (ch === ' ') {
      if (stream.match(/ +$/, false)) {
        state.trailingSpace++;
      } else if (state.trailingSpace) {
        state.trailingSpaceNewLine = true;
      }
    }

    return getType(state);
  }

  function linkInline(stream, state) {
    var ch = stream.next();

    if (ch === ">") {
      state.f = state.inline = inlineNormal;
      if (modeCfg.highlightFormatting) state.formatting = "link";
      var type = getType(state);
      if (type){
        type += " ";
      } else {
        type = "";
      }
      return type + tokenTypes.linkInline;
    }

    stream.match(/^[^>]+/, true);

    return tokenTypes.linkInline;
  }

  function linkHref(stream, state) {
    // Check if space, and return NULL if so (to avoid marking the space)
    if(stream.eatSpace()){
      return null;
    }
    var ch = stream.next();
    if (ch === '(' || ch === '[') {
      state.f = state.inline = getLinkHrefInside(ch === "(" ? ")" : "]");
      if (modeCfg.highlightFormatting) state.formatting = "link-string";
      state.linkHref = true;
      return getType(state);
    }
    return 'error';
  }

  function getLinkHrefInside(endChar) {
    return function(stream, state) {
      var ch = stream.next();

      if (ch === endChar) {
        state.f = state.inline = inlineNormal;
        if (modeCfg.highlightFormatting) state.formatting = "link-string";
        var returnState = getType(state);
        state.linkHref = false;
        return returnState;
      }

      if (stream.match(inlineRE(endChar), true)) {
        stream.backUp(1);
      }

      state.linkHref = true;
      return getType(state);
    };
  }

  function footnoteLink(stream, state) {
    if (stream.match(/^([^\]\\]|\\.)*\]:/, false)) {
      state.f = footnoteLinkInside;
      stream.next(); // Consume [
      if (modeCfg.highlightFormatting) state.formatting = "link";
      state.linkText = true;
      return getType(state);
    }
    return switchInline(stream, state, inlineNormal);
  }

  function footnoteLinkInside(stream, state) {
    if (stream.match(/^\]:/, true)) {
      state.f = state.inline = footnoteUrl;
      if (modeCfg.highlightFormatting) state.formatting = "link";
      var returnType = getType(state);
      state.linkText = false;
      return returnType;
    }

    stream.match(/^([^\]\\]|\\.)+/, true);

    return tokenTypes.linkText;
  }

  function footnoteUrl(stream, state) {
    // Check if space, and return NULL if so (to avoid marking the space)
    if(stream.eatSpace()){
      return null;
    }
    // Match URL
    stream.match(/^[^\s]+/, true);
    // Check for link title
    if (stream.peek() === undefined) { // End of line, set flag to check next line
      state.linkTitle = true;
    } else { // More content on line, check if link title
      stream.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/, true);
    }
    state.f = state.inline = inlineNormal;
    return tokenTypes.linkHref + " url";
  }

  var savedInlineRE = [];
  function inlineRE(endChar) {
    if (!savedInlineRE[endChar]) {
      // Escape endChar for RegExp (taken from http://stackoverflow.com/a/494122/526741)
      endChar = (endChar+'').replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1");
      // Match any non-endChar, escaped character, as well as the closing
      // endChar.
      savedInlineRE[endChar] = new RegExp('^(?:[^\\\\]|\\\\.)*?(' + endChar + ')');
    }
    return savedInlineRE[endChar];
  }

  var mode = {
    startState: function() {
      return {
        f: blockNormal,

        prevLine: null,
        thisLine: null,

        block: blockNormal,
        htmlState: null,
        indentation: 0,

        inline: inlineNormal,
        text: handleText,

        formatting: false,
        linkText: false,
        linkHref: false,
        linkTitle: false,
        em: false,
        strong: false,
        header: 0,
        hr: false,
        taskList: false,
        list: false,
        listDepth: 0,
        quote: 0,
        trailingSpace: 0,
        trailingSpaceNewLine: false,
        strikethrough: false,
        fencedChars: null
      };
    },

    copyState: function(s) {
      return {
        f: s.f,

        prevLine: s.prevLine,
        thisLine: s.thisLine,

        block: s.block,
        htmlState: s.htmlState && CodeMirror.copyState(htmlMode, s.htmlState),
        indentation: s.indentation,

        localMode: s.localMode,
        localState: s.localMode ? CodeMirror.copyState(s.localMode, s.localState) : null,

        inline: s.inline,
        text: s.text,
        formatting: false,
        linkTitle: s.linkTitle,
        code: s.code,
        em: s.em,
        strong: s.strong,
        strikethrough: s.strikethrough,
        header: s.header,
        hr: s.hr,
        taskList: s.taskList,
        list: s.list,
        listDepth: s.listDepth,
        quote: s.quote,
        indentedCode: s.indentedCode,
        trailingSpace: s.trailingSpace,
        trailingSpaceNewLine: s.trailingSpaceNewLine,
        md_inside: s.md_inside,
        fencedChars: s.fencedChars
      };
    },

    token: function(stream, state) {

      // Reset state.formatting
      state.formatting = false;

      if (stream != state.thisLine) {
        var forceBlankLine = state.header || state.hr;

        // Reset state.header and state.hr
        state.header = 0;
        state.hr = false;

        if (stream.match(/^\s*$/, true) || forceBlankLine) {
          blankLine(state);
          if (!forceBlankLine) return null
          state.prevLine = null
        }

        state.prevLine = state.thisLine
        state.thisLine = stream

        // Reset state.taskList
        state.taskList = false;

        // Reset state.trailingSpace
        state.trailingSpace = 0;
        state.trailingSpaceNewLine = false;

        state.f = state.block;
        var indentation = stream.match(/^\s*/, true)[0].replace(/\t/g, '    ').length;
        var difference = Math.floor((indentation - state.indentation) / 4) * 4;
        if (difference > 4) difference = 4;
        var adjustedIndentation = state.indentation + difference;
        state.indentationDiff = adjustedIndentation - state.indentation;
        state.indentation = adjustedIndentation;
        if (indentation > 0) return null;
      }
      return state.f(stream, state);
    },

    innerMode: function(state) {
      if (state.block == htmlBlock) return {state: state.htmlState, mode: htmlMode};
      if (state.localState) return {state: state.localState, mode: state.localMode};
      return {state: state, mode: mode};
    },

    blankLine: blankLine,

    getType: getType,

    fold: "markdown"
  };
  return mode;
}, "xml");

CodeMirror.defineMIME("text/x-markdown", "markdown");

});

// CodeMirror, copyright (c) by Marijn Haverbeke and others
// Distributed under an MIT license: http://codemirror.net/LICENSE

(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    mod(require("../lib/codemirror"));
  else if (typeof define == "function" && define.amd) // AMD
    define(["../lib/codemirror"], mod);
  else // Plain browser env
    mod(CodeMirror);
})(function(CodeMirror) {
  "use strict";

  var Pos = CodeMirror.Pos;
  function posEq(a, b) { return a.line == b.line && a.ch == b.ch; }

  // Kill 'ring'

  var killRing = [];
  function addToRing(str) {
    killRing.push(str);
    if (killRing.length > 50) killRing.shift();
  }
  function growRingTop(str) {
    if (!killRing.length) return addToRing(str);
    killRing[killRing.length - 1] += str;
  }
  function getFromRing(n) { return killRing[killRing.length - (n ? Math.min(n, 1) : 1)] || ""; }
  function popFromRing() { if (killRing.length > 1) killRing.pop(); return getFromRing(); }

  var lastKill = null;

  function kill(cm, from, to, mayGrow, text) {
    if (text == null) text = cm.getRange(from, to);

    if (mayGrow && lastKill && lastKill.cm == cm && posEq(from, lastKill.pos) && cm.isClean(lastKill.gen))
      growRingTop(text);
    else
      addToRing(text);
    cm.replaceRange("", from, to, "+delete");

    if (mayGrow) lastKill = {cm: cm, pos: from, gen: cm.changeGeneration()};
    else lastKill = null;
  }

  // Boundaries of various units

  function byChar(cm, pos, dir) {
    return cm.findPosH(pos, dir, "char", true);
  }

  function byWord(cm, pos, dir) {
    return cm.findPosH(pos, dir, "word", true);
  }

  function byLine(cm, pos, dir) {
    return cm.findPosV(pos, dir, "line", cm.doc.sel.goalColumn);
  }

  function byPage(cm, pos, dir) {
    return cm.findPosV(pos, dir, "page", cm.doc.sel.goalColumn);
  }

  function byParagraph(cm, pos, dir) {
    var no = pos.line, line = cm.getLine(no);
    var sawText = /\S/.test(dir < 0 ? line.slice(0, pos.ch) : line.slice(pos.ch));
    var fst = cm.firstLine(), lst = cm.lastLine();
    for (;;) {
      no += dir;
      if (no < fst || no > lst)
        return cm.clipPos(Pos(no - dir, dir < 0 ? 0 : null));
      line = cm.getLine(no);
      var hasText = /\S/.test(line);
      if (hasText) sawText = true;
      else if (sawText) return Pos(no, 0);
    }
  }

  function bySentence(cm, pos, dir) {
    var line = pos.line, ch = pos.ch;
    var text = cm.getLine(pos.line), sawWord = false;
    for (;;) {
      var next = text.charAt(ch + (dir < 0 ? -1 : 0));
      if (!next) { // End/beginning of line reached
        if (line == (dir < 0 ? cm.firstLine() : cm.lastLine())) return Pos(line, ch);
        text = cm.getLine(line + dir);
        if (!/\S/.test(text)) return Pos(line, ch);
        line += dir;
        ch = dir < 0 ? text.length : 0;
        continue;
      }
      if (sawWord && /[!?.]/.test(next)) return Pos(line, ch + (dir > 0 ? 1 : 0));
      if (!sawWord) sawWord = /\w/.test(next);
      ch += dir;
    }
  }

  function byExpr(cm, pos, dir) {
    var wrap;
    if (cm.findMatchingBracket && (wrap = cm.findMatchingBracket(pos, true))
        && wrap.match && (wrap.forward ? 1 : -1) == dir)
      return dir > 0 ? Pos(wrap.to.line, wrap.to.ch + 1) : wrap.to;

    for (var first = true;; first = false) {
      var token = cm.getTokenAt(pos);
      var after = Pos(pos.line, dir < 0 ? token.start : token.end);
      if (first && dir > 0 && token.end == pos.ch || !/\w/.test(token.string)) {
        var newPos = cm.findPosH(after, dir, "char");
        if (posEq(after, newPos)) return pos;
        else pos = newPos;
      } else {
        return after;
      }
    }
  }

  // Prefixes (only crudely supported)

  function getPrefix(cm, precise) {
    var digits = cm.state.emacsPrefix;
    if (!digits) return precise ? null : 1;
    clearPrefix(cm);
    return digits == "-" ? -1 : Number(digits);
  }

  function repeated(cmd) {
    var f = typeof cmd == "string" ? function(cm) { cm.execCommand(cmd); } : cmd;
    return function(cm) {
      var prefix = getPrefix(cm);
      f(cm);
      for (var i = 1; i < prefix; ++i) f(cm);
    };
  }

  function findEnd(cm, pos, by, dir) {
    var prefix = getPrefix(cm);
    if (prefix < 0) { dir = -dir; prefix = -prefix; }
    for (var i = 0; i < prefix; ++i) {
      var newPos = by(cm, pos, dir);
      if (posEq(newPos, pos)) break;
      pos = newPos;
    }
    return pos;
  }

  function move(by, dir) {
    var f = function(cm) {
      cm.extendSelection(findEnd(cm, cm.getCursor(), by, dir));
    };
    f.motion = true;
    return f;
  }

  function killTo(cm, by, dir) {
    var selections = cm.listSelections(), cursor;
    var i = selections.length;
    while (i--) {
      cursor = selections[i].head;
      kill(cm, cursor, findEnd(cm, cursor, by, dir), true);
    }
  }

  function killRegion(cm) {
    if (cm.somethingSelected()) {
      var selections = cm.listSelections(), selection;
      var i = selections.length;
      while (i--) {
        selection = selections[i];
        kill(cm, selection.anchor, selection.head);
      }
      return true;
    }
  }

  function addPrefix(cm, digit) {
    if (cm.state.emacsPrefix) {
      if (digit != "-") cm.state.emacsPrefix += digit;
      return;
    }
    // Not active yet
    cm.state.emacsPrefix = digit;
    cm.on("keyHandled", maybeClearPrefix);
    cm.on("inputRead", maybeDuplicateInput);
  }

  var prefixPreservingKeys = {"Alt-G": true, "Ctrl-X": true, "Ctrl-Q": true, "Ctrl-U": true};

  function maybeClearPrefix(cm, arg) {
    if (!cm.state.emacsPrefixMap && !prefixPreservingKeys.hasOwnProperty(arg))
      clearPrefix(cm);
  }

  function clearPrefix(cm) {
    cm.state.emacsPrefix = null;
    cm.off("keyHandled", maybeClearPrefix);
    cm.off("inputRead", maybeDuplicateInput);
  }

  function maybeDuplicateInput(cm, event) {
    var dup = getPrefix(cm);
    if (dup > 1 && event.origin == "+input") {
      var one = event.text.join("\n"), txt = "";
      for (var i = 1; i < dup; ++i) txt += one;
      cm.replaceSelection(txt);
    }
  }

  function addPrefixMap(cm) {
    cm.state.emacsPrefixMap = true;
    cm.addKeyMap(prefixMap);
    cm.on("keyHandled", maybeRemovePrefixMap);
    cm.on("inputRead", maybeRemovePrefixMap);
  }

  function maybeRemovePrefixMap(cm, arg) {
    if (typeof arg == "string" && (/^\d$/.test(arg) || arg == "Ctrl-U")) return;
    cm.removeKeyMap(prefixMap);
    cm.state.emacsPrefixMap = false;
    cm.off("keyHandled", maybeRemovePrefixMap);
    cm.off("inputRead", maybeRemovePrefixMap);
  }

  // Utilities

  function setMark(cm) {
    cm.setCursor(cm.getCursor());
    cm.setExtending(!cm.getExtending());
    cm.on("change", function() { cm.setExtending(false); });
  }

  function clearMark(cm) {
    cm.setExtending(false);
    cm.setCursor(cm.getCursor());
  }

  function getInput(cm, msg, f) {
    if (cm.openDialog)
      cm.openDialog(msg + ": <input type=\"text\" style=\"width: 10em\"/>", f, {bottom: true});
    else
      f(prompt(msg, ""));
  }

  function operateOnWord(cm, op) {
    var start = cm.getCursor(), end = cm.findPosH(start, 1, "word");
    cm.replaceRange(op(cm.getRange(start, end)), start, end);
    cm.setCursor(end);
  }

  function toEnclosingExpr(cm) {
    var pos = cm.getCursor(), line = pos.line, ch = pos.ch;
    var stack = [];
    while (line >= cm.firstLine()) {
      var text = cm.getLine(line);
      for (var i = ch == null ? text.length : ch; i > 0;) {
        var ch = text.charAt(--i);
        if (ch == ")")
          stack.push("(");
        else if (ch == "]")
          stack.push("[");
        else if (ch == "}")
          stack.push("{");
        else if (/[\(\{\[]/.test(ch) && (!stack.length || stack.pop() != ch))
          return cm.extendSelection(Pos(line, i));
      }
      --line; ch = null;
    }
  }

  function quit(cm) {
    cm.execCommand("clearSearch");
    clearMark(cm);
  }

  // Actual keymap

  var keyMap = CodeMirror.keyMap.emacs = CodeMirror.normalizeKeyMap({
    "Ctrl-W": function(cm) {kill(cm, cm.getCursor("start"), cm.getCursor("end"));},
    "Ctrl-K": repeated(function(cm) {
      var start = cm.getCursor(), end = cm.clipPos(Pos(start.line));
      var text = cm.getRange(start, end);
      if (!/\S/.test(text)) {
        text += "\n";
        end = Pos(start.line + 1, 0);
      }
      kill(cm, start, end, true, text);
    }),
    "Alt-W": function(cm) {
      addToRing(cm.getSelection());
      clearMark(cm);
    },
    "Ctrl-Y": function(cm) {
      var start = cm.getCursor();
      cm.replaceRange(getFromRing(getPrefix(cm)), start, start, "paste");
      cm.setSelection(start, cm.getCursor());
    },
    "Alt-Y": function(cm) {cm.replaceSelection(popFromRing(), "around", "paste");},

    "Ctrl-Space": setMark, "Ctrl-Shift-2": setMark,

    "Ctrl-F": move(byChar, 1), "Ctrl-B": move(byChar, -1),
    "Right": move(byChar, 1), "Left": move(byChar, -1),
    "Ctrl-D": function(cm) { killTo(cm, byChar, 1); },
    "Delete": function(cm) { killRegion(cm) || killTo(cm, byChar, 1); },
    "Ctrl-H": function(cm) { killTo(cm, byChar, -1); },
    "Backspace": function(cm) { killRegion(cm) || killTo(cm, byChar, -1); },

    "Alt-F": move(byWord, 1), "Alt-B": move(byWord, -1),
    "Alt-D": function(cm) { killTo(cm, byWord, 1); },
    "Alt-Backspace": function(cm) { killTo(cm, byWord, -1); },

    "Ctrl-N": move(byLine, 1), "Ctrl-P": move(byLine, -1),
    "Down": move(byLine, 1), "Up": move(byLine, -1),
    "Ctrl-A": "goLineStart", "Ctrl-E": "goLineEnd",
    "End": "goLineEnd", "Home": "goLineStart",

    "Alt-V": move(byPage, -1), "Ctrl-V": move(byPage, 1),
    "PageUp": move(byPage, -1), "PageDown": move(byPage, 1),

    "Ctrl-Up": move(byParagraph, -1), "Ctrl-Down": move(byParagraph, 1),

    "Alt-A": move(bySentence, -1), "Alt-E": move(bySentence, 1),
    "Alt-K": function(cm) { killTo(cm, bySentence, 1); },

    "Ctrl-Alt-K": function(cm) { killTo(cm, byExpr, 1); },
    "Ctrl-Alt-Backspace": function(cm) { killTo(cm, byExpr, -1); },
    "Ctrl-Alt-F": move(byExpr, 1), "Ctrl-Alt-B": move(byExpr, -1),

    "Shift-Ctrl-Alt-2": function(cm) {
      var cursor = cm.getCursor();
      cm.setSelection(findEnd(cm, cursor, byExpr, 1), cursor);
    },
    "Ctrl-Alt-T": function(cm) {
      var leftStart = byExpr(cm, cm.getCursor(), -1), leftEnd = byExpr(cm, leftStart, 1);
      var rightEnd = byExpr(cm, leftEnd, 1), rightStart = byExpr(cm, rightEnd, -1);
      cm.replaceRange(cm.getRange(rightStart, rightEnd) + cm.getRange(leftEnd, rightStart) +
                      cm.getRange(leftStart, leftEnd), leftStart, rightEnd);
    },
    "Ctrl-Alt-U": repeated(toEnclosingExpr),

    "Alt-Space": function(cm) {
      var pos = cm.getCursor(), from = pos.ch, to = pos.ch, text = cm.getLine(pos.line);
      while (from && /\s/.test(text.charAt(from - 1))) --from;
      while (to < text.length && /\s/.test(text.charAt(to))) ++to;
      cm.replaceRange(" ", Pos(pos.line, from), Pos(pos.line, to));
    },
    "Ctrl-O": repeated(function(cm) { cm.replaceSelection("\n", "start"); }),
    "Ctrl-T": repeated(function(cm) {
      cm.execCommand("transposeChars");
    }),

    "Alt-C": repeated(function(cm) {
      operateOnWord(cm, function(w) {
        var letter = w.search(/\w/);
        if (letter == -1) return w;
        return w.slice(0, letter) + w.charAt(letter).toUpperCase() + w.slice(letter + 1).toLowerCase();
      });
    }),
    "Alt-U": repeated(function(cm) {
      operateOnWord(cm, function(w) { return w.toUpperCase(); });
    }),
    "Alt-L": repeated(function(cm) {
      operateOnWord(cm, function(w) { return w.toLowerCase(); });
    }),

    "Alt-;": "toggleComment",

    "Ctrl-/": repeated("undo"), "Shift-Ctrl--": repeated("undo"),
    "Ctrl-Z": repeated("undo"), "Cmd-Z": repeated("undo"),
    "Shift-Alt-,": "goDocStart", "Shift-Alt-.": "goDocEnd",
    "Ctrl-S": "findNext", "Ctrl-R": "findPrev", "Ctrl-G": quit, "Shift-Alt-5": "replace",
    "Alt-/": "autocomplete",
    "Ctrl-J": "newlineAndIndent", "Enter": false, "Tab": "indentAuto",

    "Alt-G G": function(cm) {
      var prefix = getPrefix(cm, true);
      if (prefix != null && prefix > 0) return cm.setCursor(prefix - 1);

      getInput(cm, "Goto line", function(str) {
        var num;
        if (str && !isNaN(num = Number(str)) && num == (num|0) && num > 0)
          cm.setCursor(num - 1);
      });
    },

    "Ctrl-X Tab": function(cm) {
      cm.indentSelection(getPrefix(cm, true) || cm.getOption("indentUnit"));
    },
    "Ctrl-X Ctrl-X": function(cm) {
      cm.setSelection(cm.getCursor("head"), cm.getCursor("anchor"));
    },
    "Ctrl-X Ctrl-S": "save",
    "Ctrl-X Ctrl-W": "save",
    "Ctrl-X S": "saveAll",
    "Ctrl-X F": "open",
    "Ctrl-X U": repeated("undo"),
    "Ctrl-X K": "close",
    "Ctrl-X Delete": function(cm) { kill(cm, cm.getCursor(), bySentence(cm, cm.getCursor(), 1), true); },
    "Ctrl-X H": "selectAll",

    "Ctrl-Q Tab": repeated("insertTab"),
    "Ctrl-U": addPrefixMap
  });

  var prefixMap = {"Ctrl-G": clearPrefix};
  function regPrefix(d) {
    prefixMap[d] = function(cm) { addPrefix(cm, d); };
    keyMap["Ctrl-" + d] = function(cm) { addPrefix(cm, d); };
    prefixPreservingKeys["Ctrl-" + d] = true;
  }
  for (var i = 0; i < 10; ++i) regPrefix(String(i));
  regPrefix("-");
});

;(function(){
var f;
function t(a){var b=typeof a;if("object"==b)if(a){if(a instanceof Array)return"array";if(a instanceof Object)return b;var c=Object.prototype.toString.call(a);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof a.length&&"undefined"!=typeof a.splice&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof a.call&&"undefined"!=typeof a.propertyIsEnumerable&&!a.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==
b&&"undefined"==typeof a.call)return"object";return b}var aa="closure_uid_"+(1E9*Math.random()>>>0),ba=0;function ca(a,b){for(var c in a)b.call(void 0,a[c],c,a)};function fa(a,b){null!=a&&this.append.apply(this,arguments)}f=fa.prototype;f.Ha="";f.set=function(a){this.Ha=""+a};f.append=function(a,b,c){this.Ha+=a;if(null!=b)for(var d=1;d<arguments.length;d++)this.Ha+=arguments[d];return this};f.clear=function(){this.Ha=""};f.toString=function(){return this.Ha};var ha={},ia;if("undefined"===typeof ja)var ja=function(){throw Error("No *print-fn* fn set for evaluation environment");};if("undefined"===typeof la)var la=function(){throw Error("No *print-err-fn* fn set for evaluation environment");};var na=null;if("undefined"===typeof pa)var pa=null;function y(a){return null!=a&&!1!==a}function qa(a){return a instanceof Array}function z(a,b){return a[t(null==b?null:b)]?!0:a._?!0:!1}
function A(a,b){var c=null==b?null:b.constructor,c=y(y(c)?c.mb:c)?c.Ya:t(b);return Error(["No protocol method ",a," defined for type ",c,": ",b].join(""))}function ra(a){var b=a.Ya;return y(b)?b:""+B(a)}var ta="undefined"!==typeof Symbol&&"function"===t(Symbol)?Symbol.iterator:"@@iterator";function va(a){for(var b=a.length,c=Array(b),d=0;;)if(d<b)c[d]=a[d],d+=1;else break;return c}
function wa(a){for(var b=[],c=arguments.length,d=0;;)if(d<c)b.push(arguments[d]),d+=1;else break;switch(b.length){case 1:return xa(arguments[0]);case 2:return xa(arguments[1]);default:throw Error([B("Invalid arity: "),B(b.length)].join(""));}}function ya(a){return xa(a)}function xa(a){function b(a,b){a.push(b);return a}var c=[];return za?za(b,c,a):Aa.call(null,b,c,a)}function Ca(){}
var Da=function Da(b){if(null!=b&&null!=b.T)return b.T(b);var c=Da[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=Da._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("ICounted.-count",b);},Ea=function Ea(b,c){if(null!=b&&null!=b.K)return b.K(b,c);var d=Ea[t(null==b?null:b)];if(null!=d)return d.a?d.a(b,c):d.call(null,b,c);d=Ea._;if(null!=d)return d.a?d.a(b,c):d.call(null,b,c);throw A("ICollection.-conj",b);};function Fa(){}
var D=function D(b){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 2:return D.a(arguments[0],arguments[1]);case 3:return D.g(arguments[0],arguments[1],arguments[2]);default:throw Error([B("Invalid arity: "),B(c.length)].join(""));}};
D.a=function(a,b){if(null!=a&&null!=a.U)return a.U(a,b);var c=D[t(null==a?null:a)];if(null!=c)return c.a?c.a(a,b):c.call(null,a,b);c=D._;if(null!=c)return c.a?c.a(a,b):c.call(null,a,b);throw A("IIndexed.-nth",a);};D.g=function(a,b,c){if(null!=a&&null!=a.ea)return a.ea(a,b,c);var d=D[t(null==a?null:a)];if(null!=d)return d.g?d.g(a,b,c):d.call(null,a,b,c);d=D._;if(null!=d)return d.g?d.g(a,b,c):d.call(null,a,b,c);throw A("IIndexed.-nth",a);};D.N=3;
var E=function E(b){if(null!=b&&null!=b.R)return b.R(b);var c=E[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=E._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("ISeq.-first",b);},F=function F(b){if(null!=b&&null!=b.aa)return b.aa(b);var c=F[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=F._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("ISeq.-rest",b);};function Ga(){}function Ia(){}
var Ja=function Ja(b){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 2:return Ja.a(arguments[0],arguments[1]);case 3:return Ja.g(arguments[0],arguments[1],arguments[2]);default:throw Error([B("Invalid arity: "),B(c.length)].join(""));}};
Ja.a=function(a,b){if(null!=a&&null!=a.L)return a.L(a,b);var c=Ja[t(null==a?null:a)];if(null!=c)return c.a?c.a(a,b):c.call(null,a,b);c=Ja._;if(null!=c)return c.a?c.a(a,b):c.call(null,a,b);throw A("ILookup.-lookup",a);};Ja.g=function(a,b,c){if(null!=a&&null!=a.C)return a.C(a,b,c);var d=Ja[t(null==a?null:a)];if(null!=d)return d.g?d.g(a,b,c):d.call(null,a,b,c);d=Ja._;if(null!=d)return d.g?d.g(a,b,c):d.call(null,a,b,c);throw A("ILookup.-lookup",a);};Ja.N=3;
var Ka=function Ka(b,c,d){if(null!=b&&null!=b.Na)return b.Na(b,c,d);var e=Ka[t(null==b?null:b)];if(null!=e)return e.g?e.g(b,c,d):e.call(null,b,c,d);e=Ka._;if(null!=e)return e.g?e.g(b,c,d):e.call(null,b,c,d);throw A("IAssociative.-assoc",b);};function La(){}function Ma(){}
var Na=function Na(b){if(null!=b&&null!=b.eb)return b.eb();var c=Na[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=Na._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("IMapEntry.-key",b);},Pa=function Pa(b){if(null!=b&&null!=b.fb)return b.fb();var c=Pa[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=Pa._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("IMapEntry.-val",b);};function Qa(){}
var Ra=function Ra(b,c,d){if(null!=b&&null!=b.gb)return b.gb(b,c,d);var e=Ra[t(null==b?null:b)];if(null!=e)return e.g?e.g(b,c,d):e.call(null,b,c,d);e=Ra._;if(null!=e)return e.g?e.g(b,c,d):e.call(null,b,c,d);throw A("IVector.-assoc-n",b);};function Sa(){}
var Ta=function Ta(b){if(null!=b&&null!=b.G)return b.G(b);var c=Ta[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=Ta._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("IMeta.-meta",b);},Ua=function Ua(b,c){if(null!=b&&null!=b.H)return b.H(b,c);var d=Ua[t(null==b?null:b)];if(null!=d)return d.a?d.a(b,c):d.call(null,b,c);d=Ua._;if(null!=d)return d.a?d.a(b,c):d.call(null,b,c);throw A("IWithMeta.-with-meta",b);};function Va(){}
var Wa=function Wa(b){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 2:return Wa.a(arguments[0],arguments[1]);case 3:return Wa.g(arguments[0],arguments[1],arguments[2]);default:throw Error([B("Invalid arity: "),B(c.length)].join(""));}};
Wa.a=function(a,b){if(null!=a&&null!=a.O)return a.O(a,b);var c=Wa[t(null==a?null:a)];if(null!=c)return c.a?c.a(a,b):c.call(null,a,b);c=Wa._;if(null!=c)return c.a?c.a(a,b):c.call(null,a,b);throw A("IReduce.-reduce",a);};Wa.g=function(a,b,c){if(null!=a&&null!=a.P)return a.P(a,b,c);var d=Wa[t(null==a?null:a)];if(null!=d)return d.g?d.g(a,b,c):d.call(null,a,b,c);d=Wa._;if(null!=d)return d.g?d.g(a,b,c):d.call(null,a,b,c);throw A("IReduce.-reduce",a);};Wa.N=3;
var Xa=function Xa(b,c){if(null!=b&&null!=b.o)return b.o(b,c);var d=Xa[t(null==b?null:b)];if(null!=d)return d.a?d.a(b,c):d.call(null,b,c);d=Xa._;if(null!=d)return d.a?d.a(b,c):d.call(null,b,c);throw A("IEquiv.-equiv",b);},$a=function $a(b){if(null!=b&&null!=b.F)return b.F(b);var c=$a[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=$a._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("IHash.-hash",b);};function ab(){}
var bb=function bb(b){if(null!=b&&null!=b.M)return b.M(b);var c=bb[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=bb._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("ISeqable.-seq",b);};function cb(){}function db(){}
var H=function H(b,c){if(null!=b&&null!=b.lb)return b.lb(0,c);var d=H[t(null==b?null:b)];if(null!=d)return d.a?d.a(b,c):d.call(null,b,c);d=H._;if(null!=d)return d.a?d.a(b,c):d.call(null,b,c);throw A("IWriter.-write",b);},eb=function eb(b){if(null!=b&&null!=b.Sa)return b.Sa(b);var c=eb[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=eb._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("IEditableCollection.-as-transient",b);},fb=function fb(b,c){if(null!=b&&null!=b.Wa)return b.Wa(b,
c);var d=fb[t(null==b?null:b)];if(null!=d)return d.a?d.a(b,c):d.call(null,b,c);d=fb._;if(null!=d)return d.a?d.a(b,c):d.call(null,b,c);throw A("ITransientCollection.-conj!",b);},gb=function gb(b){if(null!=b&&null!=b.Xa)return b.Xa(b);var c=gb[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=gb._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("ITransientCollection.-persistent!",b);},hb=function hb(b,c,d){if(null!=b&&null!=b.Oa)return b.Oa(b,c,d);var e=hb[t(null==b?null:b)];if(null!=
e)return e.g?e.g(b,c,d):e.call(null,b,c,d);e=hb._;if(null!=e)return e.g?e.g(b,c,d):e.call(null,b,c,d);throw A("ITransientAssociative.-assoc!",b);},ib=function ib(b,c,d){if(null!=b&&null!=b.kb)return b.kb(0,c,d);var e=ib[t(null==b?null:b)];if(null!=e)return e.g?e.g(b,c,d):e.call(null,b,c,d);e=ib._;if(null!=e)return e.g?e.g(b,c,d):e.call(null,b,c,d);throw A("ITransientVector.-assoc-n!",b);},jb=function jb(b){if(null!=b&&null!=b.ib)return b.ib();var c=jb[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):
c.call(null,b);c=jb._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("IChunk.-drop-first",b);},lb=function lb(b){if(null!=b&&null!=b.bb)return b.bb(b);var c=lb[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=lb._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("IChunkedSeq.-chunked-first",b);},mb=function mb(b){if(null!=b&&null!=b.cb)return b.cb(b);var c=mb[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=mb._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("IChunkedSeq.-chunked-rest",
b);},nb=function nb(b){if(null!=b&&null!=b.ab)return b.ab(b);var c=nb[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=nb._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("IChunkedNext.-chunked-next",b);},ob=function ob(b){if(null!=b&&null!=b.Ca)return b.Ca(b);var c=ob[t(null==b?null:b)];if(null!=c)return c.b?c.b(b):c.call(null,b);c=ob._;if(null!=c)return c.b?c.b(b):c.call(null,b);throw A("IIterable.-iterator",b);};function pb(a){this.Ab=a;this.i=1073741824;this.v=0}
pb.prototype.lb=function(a,b){return this.Ab.append(b)};function qb(a){var b=new fa;a.I(null,new pb(b),new rb(null,5,[sb,!0,tb,!0,ub,!1,wb,!1,xb,null],null));return""+B(b)}var yb="undefined"!==typeof Math.imul&&0!==Math.imul(4294967295,5)?function(a,b){return Math.imul(a,b)}:function(a,b){var c=a&65535,d=b&65535;return c*d+((a>>>16&65535)*d+c*(b>>>16&65535)<<16>>>0)|0};function zb(a){a=yb(a|0,-862048943);return yb(a<<15|a>>>-15,461845907)}
function Ab(a,b){var c=(a|0)^(b|0);return yb(c<<13|c>>>-13,5)+-430675100|0}function Bb(a,b){var c=(a|0)^b,c=yb(c^c>>>16,-2048144789),c=yb(c^c>>>13,-1028477387);return c^c>>>16}function Cb(a){var b;a:{b=1;for(var c=0;;)if(b<a.length){var d=b+2,c=Ab(c,zb(a.charCodeAt(b-1)|a.charCodeAt(b)<<16));b=d}else{b=c;break a}}b=1===(a.length&1)?b^zb(a.charCodeAt(a.length-1)):b;return Bb(b,yb(2,a.length))}var Db={},Eb=0;
function Fb(a){255<Eb&&(Db={},Eb=0);var b=Db[a];if("number"!==typeof b){a:if(null!=a)if(b=a.length,0<b)for(var c=0,d=0;;)if(c<b)var e=c+1,d=yb(31,d)+a.charCodeAt(c),c=e;else{b=d;break a}else b=0;else b=0;Db[a]=b;Eb+=1}return a=b}
function Gb(a){if(null!=a&&(a.i&4194304||a.Db))return a.F(null);if("number"===typeof a){if(y(isFinite(a)))return Math.floor(a)%2147483647;switch(a){case Infinity:return 2146435072;case -Infinity:return-1048576;default:return 2146959360}}else return!0===a?a=1:!1===a?a=0:"string"===typeof a?(a=Fb(a),0!==a&&(a=zb(a),a=Ab(0,a),a=Bb(a,4))):a=a instanceof Date?a.valueOf():null==a?0:$a(a),a}function Hb(a,b){return a^b+2654435769+(a<<6)+(a>>2)}
function Ib(a,b,c,d,e){this.Ra=a;this.name=b;this.Ga=c;this.La=d;this.da=e;this.i=2154168321;this.v=4096}f=Ib.prototype;f.toString=function(){return this.Ga};f.equiv=function(a){return this.o(null,a)};f.o=function(a,b){return b instanceof Ib?this.Ga===b.Ga:!1};
f.call=function(){function a(a,b,c){return I.g?I.g(b,this,c):I.call(null,b,this,c)}function b(a,b){return I.a?I.a(b,this):I.call(null,b,this)}var c=null,c=function(c,e,g){switch(arguments.length){case 2:return b.call(this,0,e);case 3:return a.call(this,0,e,g)}throw Error("Invalid arity: "+arguments.length);};c.a=b;c.g=a;return c}();f.apply=function(a,b){return this.call.apply(this,[this].concat(va(b)))};f.b=function(a){return I.a?I.a(a,this):I.call(null,a,this)};
f.a=function(a,b){return I.g?I.g(a,this,b):I.call(null,a,this,b)};f.G=function(){return this.da};f.H=function(a,b){return new Ib(this.Ra,this.name,this.Ga,this.La,b)};f.F=function(){var a=this.La;return null!=a?a:this.La=a=Hb(Cb(this.name),Fb(this.Ra))};f.I=function(a,b){return H(b,this.Ga)};
function J(a){if(null==a)return null;if(null!=a&&(a.i&8388608||a.wb))return a.M(null);if(qa(a)||"string"===typeof a)return 0===a.length?null:new K(a,0,null);if(z(ab,a))return bb(a);throw Error([B(a),B(" is not ISeqable")].join(""));}function L(a){if(null==a)return null;if(null!=a&&(a.i&64||a.Va))return a.R(null);a=J(a);return null==a?null:E(a)}function Jb(a){return null!=a?null!=a&&(a.i&64||a.Va)?a.aa(null):(a=J(a))?F(a):Kb:Kb}
function M(a){return null==a?null:null!=a&&(a.i&128||a.Ua)?a.X(null):J(Jb(a))}var O=function O(b){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 1:return O.b(arguments[0]);case 2:return O.a(arguments[0],arguments[1]);default:return O.B(arguments[0],arguments[1],new K(c.slice(2),0,null))}};O.b=function(){return!0};O.a=function(a,b){return null==a?null==b:a===b||Xa(a,b)};
O.B=function(a,b,c){for(;;)if(O.a(a,b))if(M(c))a=b,b=L(c),c=M(c);else return O.a(b,L(c));else return!1};O.J=function(a){var b=L(a),c=M(a);a=L(c);c=M(c);return O.B(b,a,c)};O.N=2;function Lb(a){this.u=a}Lb.prototype.next=function(){if(null!=this.u){var a=L(this.u);this.u=M(this.u);return{value:a,done:!1}}return{value:null,done:!0}};function P(a){return new Lb(J(a))}function Mb(a,b){var c=zb(a),c=Ab(0,c);return Bb(c,b)}
function Nb(a){var b=0,c=1;for(a=J(a);;)if(null!=a)b+=1,c=yb(31,c)+Gb(L(a))|0,a=M(a);else return Mb(c,b)}var Ob=Mb(1,0);function Pb(a){var b=0,c=0;for(a=J(a);;)if(null!=a)b+=1,c=c+Gb(L(a))|0,a=M(a);else return Mb(c,b)}var Qb=Mb(0,0);Ca["null"]=!0;Da["null"]=function(){return 0};Date.prototype.o=function(a,b){return b instanceof Date&&this.valueOf()===b.valueOf()};Xa.number=function(a,b){return a===b};Sa["function"]=!0;Ta["function"]=function(){return null};$a._=function(a){return a[aa]||(a[aa]=++ba)};
function Rb(a,b){var c=Da(a);if(0===c)return b.A?b.A():b.call(null);for(var d=D.a(a,0),e=1;;)if(e<c)var g=D.a(a,e),d=b.a?b.a(d,g):b.call(null,d,g),e=e+1;else return d}function Sb(a,b,c){var d=Da(a),e=c;for(c=0;;)if(c<d){var g=D.a(a,c),e=b.a?b.a(e,g):b.call(null,e,g);c+=1}else return e}function Ub(a,b){var c=a.length;if(0===a.length)return b.A?b.A():b.call(null);for(var d=a[0],e=1;;)if(e<c)var g=a[e],d=b.a?b.a(d,g):b.call(null,d,g),e=e+1;else return d}
function Vb(a,b,c){var d=a.length,e=c;for(c=0;;)if(c<d){var g=a[c],e=b.a?b.a(e,g):b.call(null,e,g);c+=1}else return e}function Wb(a,b,c,d){for(var e=a.length;;)if(d<e){var g=a[d];c=b.a?b.a(c,g):b.call(null,c,g);d+=1}else return c}function Xb(a){return null!=a?a.i&2||a.ob?!0:a.i?!1:z(Ca,a):z(Ca,a)}function Yb(a){return null!=a?a.i&16||a.jb?!0:a.i?!1:z(Fa,a):z(Fa,a)}
function Q(a,b,c){var d=R.b?R.b(a):R.call(null,a);if(c>=d)return-1;!(0<c)&&0>c&&(c+=d,c=0>c?0:c);for(;;)if(c<d){if(O.a(Zb?Zb(a,c):$b.call(null,a,c),b))return c;c+=1}else return-1}function S(a,b,c){var d=R.b?R.b(a):R.call(null,a);if(0===d)return-1;0<c?(--d,c=d<c?d:c):c=0>c?d+c:c;for(;;)if(0<=c){if(O.a(Zb?Zb(a,c):$b.call(null,a,c),b))return c;--c}else return-1}function ac(a,b){this.c=a;this.j=b}ac.prototype.fa=function(){return this.j<this.c.length};
ac.prototype.next=function(){var a=this.c[this.j];this.j+=1;return a};function K(a,b,c){this.c=a;this.j=b;this.m=c;this.i=166592766;this.v=8192}f=K.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R.b?R.b(this):R.call(null,this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.U=function(a,b){var c=b+this.j;return c<this.c.length?this.c[c]:null};f.ea=function(a,b,c){a=b+this.j;return a<this.c.length?this.c[a]:c};f.Ca=function(){return new ac(this.c,this.j)};f.G=function(){return this.m};
f.X=function(){return this.j+1<this.c.length?new K(this.c,this.j+1,null):null};f.T=function(){var a=this.c.length-this.j;return 0>a?0:a};f.F=function(){return Nb(this)};f.o=function(a,b){return bc.a?bc.a(this,b):bc.call(null,this,b)};f.O=function(a,b){return Wb(this.c,b,this.c[this.j],this.j+1)};f.P=function(a,b,c){return Wb(this.c,b,c,this.j)};f.R=function(){return this.c[this.j]};f.aa=function(){return this.j+1<this.c.length?new K(this.c,this.j+1,null):Kb};
f.M=function(){return this.j<this.c.length?this:null};f.H=function(a,b){return new K(this.c,this.j,b)};f.K=function(a,b){return T.a?T.a(b,this):T.call(null,b,this)};K.prototype[ta]=function(){return P(this)};function cc(a,b){return b<a.length?new K(a,b,null):null}
function dc(a){for(var b=[],c=arguments.length,d=0;;)if(d<c)b.push(arguments[d]),d+=1;else break;switch(b.length){case 1:return cc(arguments[0],0);case 2:return cc(arguments[0],arguments[1]);default:throw Error([B("Invalid arity: "),B(b.length)].join(""));}}Xa._=function(a,b){return a===b};
var ec=function ec(b){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 0:return ec.A();case 1:return ec.b(arguments[0]);case 2:return ec.a(arguments[0],arguments[1]);default:return ec.B(arguments[0],arguments[1],new K(c.slice(2),0,null))}};ec.A=function(){return fc};ec.b=function(a){return a};ec.a=function(a,b){return null!=a?Ea(a,b):Ea(Kb,b)};ec.B=function(a,b,c){for(;;)if(y(c))a=ec.a(a,b),b=L(c),c=M(c);else return ec.a(a,b)};
ec.J=function(a){var b=L(a),c=M(a);a=L(c);c=M(c);return ec.B(b,a,c)};ec.N=2;function R(a){if(null!=a)if(null!=a&&(a.i&2||a.ob))a=a.T(null);else if(qa(a))a=a.length;else if("string"===typeof a)a=a.length;else if(null!=a&&(a.i&8388608||a.wb))a:{a=J(a);for(var b=0;;){if(Xb(a)){a=b+Da(a);break a}a=M(a);b+=1}}else a=Da(a);else a=0;return a}function gc(a,b,c){for(;;){if(null==a)return c;if(0===b)return J(a)?L(a):c;if(Yb(a))return D.g(a,b,c);if(J(a))a=M(a),--b;else return c}}
function $b(a){for(var b=[],c=arguments.length,d=0;;)if(d<c)b.push(arguments[d]),d+=1;else break;switch(b.length){case 2:return Zb(arguments[0],arguments[1]);case 3:return hc(arguments[0],arguments[1],arguments[2]);default:throw Error([B("Invalid arity: "),B(b.length)].join(""));}}
function Zb(a,b){if("number"!==typeof b)throw Error("index argument to nth must be a number");if(null==a)return a;if(null!=a&&(a.i&16||a.jb))return a.U(null,b);if(qa(a))return b<a.length?a[b]:null;if("string"===typeof a)return b<a.length?a.charAt(b):null;if(null!=a&&(a.i&64||a.Va)){var c;a:{c=a;for(var d=b;;){if(null==c)throw Error("Index out of bounds");if(0===d){if(J(c)){c=L(c);break a}throw Error("Index out of bounds");}if(Yb(c)){c=D.a(c,d);break a}if(J(c))c=M(c),--d;else throw Error("Index out of bounds");
}}return c}if(z(Fa,a))return D.a(a,b);throw Error([B("nth not supported on this type "),B(ra(null==a?null:a.constructor))].join(""));}
function hc(a,b,c){if("number"!==typeof b)throw Error("index argument to nth must be a number.");if(null==a)return c;if(null!=a&&(a.i&16||a.jb))return a.ea(null,b,c);if(qa(a))return b<a.length?a[b]:c;if("string"===typeof a)return b<a.length?a.charAt(b):c;if(null!=a&&(a.i&64||a.Va))return gc(a,b,c);if(z(Fa,a))return D.a(a,b);throw Error([B("nth not supported on this type "),B(ra(null==a?null:a.constructor))].join(""));}
var I=function I(b){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 2:return I.a(arguments[0],arguments[1]);case 3:return I.g(arguments[0],arguments[1],arguments[2]);default:throw Error([B("Invalid arity: "),B(c.length)].join(""));}};I.a=function(a,b){return null==a?null:null!=a&&(a.i&256||a.qb)?a.L(null,b):qa(a)?b<a.length?a[b|0]:null:"string"===typeof a?b<a.length?a[b|0]:null:z(Ia,a)?Ja.a(a,b):null};
I.g=function(a,b,c){return null!=a?null!=a&&(a.i&256||a.qb)?a.C(null,b,c):qa(a)?b<a.length?a[b]:c:"string"===typeof a?b<a.length?a[b]:c:z(Ia,a)?Ja.g(a,b,c):c:c};I.N=3;var ic=function ic(b){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 3:return ic.g(arguments[0],arguments[1],arguments[2]);default:return ic.B(arguments[0],arguments[1],arguments[2],new K(c.slice(3),0,null))}};
ic.g=function(a,b,c){if(null!=a)a=Ka(a,b,c);else a:{a=[b];c=[c];b=a.length;var d=0,e;for(e=eb(jc);;)if(d<b){var g=d+1;e=e.Oa(null,a[d],c[d]);d=g}else{a=gb(e);break a}}return a};ic.B=function(a,b,c,d){for(;;)if(a=ic.g(a,b,c),y(d))b=L(d),c=L(M(d)),d=M(M(d));else return a};ic.J=function(a){var b=L(a),c=M(a);a=L(c);var d=M(c),c=L(d),d=M(d);return ic.B(b,a,c,d)};ic.N=3;function kc(a,b){this.f=a;this.m=b;this.i=393217;this.v=0}f=kc.prototype;f.G=function(){return this.m};
f.H=function(a,b){return new kc(this.f,b)};
f.call=function(){function a(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,w,G,N,ea){a=this;return mc.Ta?mc.Ta(a.f,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,w,G,N,ea):mc.call(null,a.f,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,w,G,N,ea)}function b(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,w,G,N){a=this;return a.f.wa?a.f.wa(b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,w,G,N):a.f.call(null,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,w,G,N)}function c(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,w,G){a=this;return a.f.va?a.f.va(b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,
w,G):a.f.call(null,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,w,G)}function d(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,w){a=this;return a.f.ua?a.f.ua(b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,w):a.f.call(null,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,w)}function e(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C){a=this;return a.f.ta?a.f.ta(b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C):a.f.call(null,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C)}function g(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x){a=this;return a.f.sa?a.f.sa(b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x):a.f.call(null,
b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x)}function h(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v){a=this;return a.f.ra?a.f.ra(b,c,d,e,g,h,k,l,m,n,p,q,r,u,v):a.f.call(null,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v)}function k(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u){a=this;return a.f.qa?a.f.qa(b,c,d,e,g,h,k,l,m,n,p,q,r,u):a.f.call(null,b,c,d,e,g,h,k,l,m,n,p,q,r,u)}function l(a,b,c,d,e,g,h,k,l,m,n,p,q,r){a=this;return a.f.pa?a.f.pa(b,c,d,e,g,h,k,l,m,n,p,q,r):a.f.call(null,b,c,d,e,g,h,k,l,m,n,p,q,r)}function m(a,b,c,d,e,g,h,k,l,m,n,p,q){a=this;
return a.f.oa?a.f.oa(b,c,d,e,g,h,k,l,m,n,p,q):a.f.call(null,b,c,d,e,g,h,k,l,m,n,p,q)}function n(a,b,c,d,e,g,h,k,l,m,n,p){a=this;return a.f.na?a.f.na(b,c,d,e,g,h,k,l,m,n,p):a.f.call(null,b,c,d,e,g,h,k,l,m,n,p)}function p(a,b,c,d,e,g,h,k,l,m,n){a=this;return a.f.ma?a.f.ma(b,c,d,e,g,h,k,l,m,n):a.f.call(null,b,c,d,e,g,h,k,l,m,n)}function q(a,b,c,d,e,g,h,k,l,m){a=this;return a.f.Aa?a.f.Aa(b,c,d,e,g,h,k,l,m):a.f.call(null,b,c,d,e,g,h,k,l,m)}function r(a,b,c,d,e,g,h,k,l){a=this;return a.f.za?a.f.za(b,c,
d,e,g,h,k,l):a.f.call(null,b,c,d,e,g,h,k,l)}function u(a,b,c,d,e,g,h,k){a=this;return a.f.ya?a.f.ya(b,c,d,e,g,h,k):a.f.call(null,b,c,d,e,g,h,k)}function v(a,b,c,d,e,g,h){a=this;return a.f.xa?a.f.xa(b,c,d,e,g,h):a.f.call(null,b,c,d,e,g,h)}function x(a,b,c,d,e,g){a=this;return a.f.W?a.f.W(b,c,d,e,g):a.f.call(null,b,c,d,e,g)}function C(a,b,c,d,e){a=this;return a.f.Z?a.f.Z(b,c,d,e):a.f.call(null,b,c,d,e)}function G(a,b,c,d){a=this;return a.f.g?a.f.g(b,c,d):a.f.call(null,b,c,d)}function N(a,b,c){a=this;
return a.f.a?a.f.a(b,c):a.f.call(null,b,c)}function ea(a,b){a=this;return a.f.b?a.f.b(b):a.f.call(null,b)}function Za(a){a=this;return a.f.A?a.f.A():a.f.call(null)}var w=null,w=function(w,U,X,Z,da,ga,ka,ma,oa,sa,ua,Ba,Ha,Oa,Ya,kb,vb,Tb,lc,Jc,Hd,pe){switch(arguments.length){case 1:return Za.call(this,w);case 2:return ea.call(this,w,U);case 3:return N.call(this,w,U,X);case 4:return G.call(this,w,U,X,Z);case 5:return C.call(this,w,U,X,Z,da);case 6:return x.call(this,w,U,X,Z,da,ga);case 7:return v.call(this,
w,U,X,Z,da,ga,ka);case 8:return u.call(this,w,U,X,Z,da,ga,ka,ma);case 9:return r.call(this,w,U,X,Z,da,ga,ka,ma,oa);case 10:return q.call(this,w,U,X,Z,da,ga,ka,ma,oa,sa);case 11:return p.call(this,w,U,X,Z,da,ga,ka,ma,oa,sa,ua);case 12:return n.call(this,w,U,X,Z,da,ga,ka,ma,oa,sa,ua,Ba);case 13:return m.call(this,w,U,X,Z,da,ga,ka,ma,oa,sa,ua,Ba,Ha);case 14:return l.call(this,w,U,X,Z,da,ga,ka,ma,oa,sa,ua,Ba,Ha,Oa);case 15:return k.call(this,w,U,X,Z,da,ga,ka,ma,oa,sa,ua,Ba,Ha,Oa,Ya);case 16:return h.call(this,
w,U,X,Z,da,ga,ka,ma,oa,sa,ua,Ba,Ha,Oa,Ya,kb);case 17:return g.call(this,w,U,X,Z,da,ga,ka,ma,oa,sa,ua,Ba,Ha,Oa,Ya,kb,vb);case 18:return e.call(this,w,U,X,Z,da,ga,ka,ma,oa,sa,ua,Ba,Ha,Oa,Ya,kb,vb,Tb);case 19:return d.call(this,w,U,X,Z,da,ga,ka,ma,oa,sa,ua,Ba,Ha,Oa,Ya,kb,vb,Tb,lc);case 20:return c.call(this,w,U,X,Z,da,ga,ka,ma,oa,sa,ua,Ba,Ha,Oa,Ya,kb,vb,Tb,lc,Jc);case 21:return b.call(this,w,U,X,Z,da,ga,ka,ma,oa,sa,ua,Ba,Ha,Oa,Ya,kb,vb,Tb,lc,Jc,Hd);case 22:return a.call(this,w,U,X,Z,da,ga,ka,ma,oa,sa,
ua,Ba,Ha,Oa,Ya,kb,vb,Tb,lc,Jc,Hd,pe)}throw Error("Invalid arity: "+arguments.length);};w.b=Za;w.a=ea;w.g=N;w.Z=G;w.W=C;w.xa=x;w.ya=v;w.za=u;w.Aa=r;w.ma=q;w.na=p;w.oa=n;w.pa=m;w.qa=l;w.ra=k;w.sa=h;w.ta=g;w.ua=e;w.va=d;w.wa=c;w.pb=b;w.Ta=a;return w}();f.apply=function(a,b){return this.call.apply(this,[this].concat(va(b)))};f.A=function(){return this.f.A?this.f.A():this.f.call(null)};f.b=function(a){return this.f.b?this.f.b(a):this.f.call(null,a)};
f.a=function(a,b){return this.f.a?this.f.a(a,b):this.f.call(null,a,b)};f.g=function(a,b,c){return this.f.g?this.f.g(a,b,c):this.f.call(null,a,b,c)};f.Z=function(a,b,c,d){return this.f.Z?this.f.Z(a,b,c,d):this.f.call(null,a,b,c,d)};f.W=function(a,b,c,d,e){return this.f.W?this.f.W(a,b,c,d,e):this.f.call(null,a,b,c,d,e)};f.xa=function(a,b,c,d,e,g){return this.f.xa?this.f.xa(a,b,c,d,e,g):this.f.call(null,a,b,c,d,e,g)};
f.ya=function(a,b,c,d,e,g,h){return this.f.ya?this.f.ya(a,b,c,d,e,g,h):this.f.call(null,a,b,c,d,e,g,h)};f.za=function(a,b,c,d,e,g,h,k){return this.f.za?this.f.za(a,b,c,d,e,g,h,k):this.f.call(null,a,b,c,d,e,g,h,k)};f.Aa=function(a,b,c,d,e,g,h,k,l){return this.f.Aa?this.f.Aa(a,b,c,d,e,g,h,k,l):this.f.call(null,a,b,c,d,e,g,h,k,l)};f.ma=function(a,b,c,d,e,g,h,k,l,m){return this.f.ma?this.f.ma(a,b,c,d,e,g,h,k,l,m):this.f.call(null,a,b,c,d,e,g,h,k,l,m)};
f.na=function(a,b,c,d,e,g,h,k,l,m,n){return this.f.na?this.f.na(a,b,c,d,e,g,h,k,l,m,n):this.f.call(null,a,b,c,d,e,g,h,k,l,m,n)};f.oa=function(a,b,c,d,e,g,h,k,l,m,n,p){return this.f.oa?this.f.oa(a,b,c,d,e,g,h,k,l,m,n,p):this.f.call(null,a,b,c,d,e,g,h,k,l,m,n,p)};f.pa=function(a,b,c,d,e,g,h,k,l,m,n,p,q){return this.f.pa?this.f.pa(a,b,c,d,e,g,h,k,l,m,n,p,q):this.f.call(null,a,b,c,d,e,g,h,k,l,m,n,p,q)};
f.qa=function(a,b,c,d,e,g,h,k,l,m,n,p,q,r){return this.f.qa?this.f.qa(a,b,c,d,e,g,h,k,l,m,n,p,q,r):this.f.call(null,a,b,c,d,e,g,h,k,l,m,n,p,q,r)};f.ra=function(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u){return this.f.ra?this.f.ra(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u):this.f.call(null,a,b,c,d,e,g,h,k,l,m,n,p,q,r,u)};f.sa=function(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v){return this.f.sa?this.f.sa(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v):this.f.call(null,a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v)};
f.ta=function(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x){return this.f.ta?this.f.ta(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x):this.f.call(null,a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x)};f.ua=function(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C){return this.f.ua?this.f.ua(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C):this.f.call(null,a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C)};
f.va=function(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G){return this.f.va?this.f.va(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G):this.f.call(null,a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G)};f.wa=function(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N){return this.f.wa?this.f.wa(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N):this.f.call(null,a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N)};
f.pb=function(a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N,ea){return mc.Ta?mc.Ta(this.f,a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N,ea):mc.call(null,this.f,a,b,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N,ea)};function nc(a,b){return"function"==t(a)?new kc(a,b):null==a?null:Ua(a,b)}function oc(a){var b=null!=a;return(b?null!=a?a.i&131072||a.tb||(a.i?0:z(Sa,a)):z(Sa,a):b)?Ta(a):null}function pc(a){return null!=a?a.i&16777216||a.Fb?!0:a.i?!1:z(cb,a):z(cb,a)}
function qc(a){return null==a?!1:null!=a?a.i&1024||a.rb?!0:a.i?!1:z(La,a):z(La,a)}function rc(a){return null!=a?a.i&16384||a.Gb?!0:a.i?!1:z(Qa,a):z(Qa,a)}function sc(a){return null!=a?a.v&512||a.Bb?!0:!1:!1}function tc(a){var b=[];ca(a,function(a,b){return function(a,c){return b.push(c)}}(a,b));return b}function uc(a,b,c,d,e){for(;0!==e;)c[d]=a[b],d+=1,--e,b+=1}var vc={};function wc(a){return null==a?!1:!1===a?!1:!0}
function xc(a,b){var c=J(b);if(c){var d=L(c),c=M(c);return za?za(a,d,c):Aa.call(null,a,d,c)}return a.A?a.A():a.call(null)}function yc(a,b,c){for(c=J(c);;)if(c){var d=L(c);b=a.a?a.a(b,d):a.call(null,b,d);c=M(c)}else return b}
function Aa(a){for(var b=[],c=arguments.length,d=0;;)if(d<c)b.push(arguments[d]),d+=1;else break;switch(b.length){case 2:return b=arguments[0],c=arguments[1],null!=c&&(c.i&524288||c.vb)?c.O(null,b):qa(c)?Ub(c,b):"string"===typeof c?Ub(c,b):z(Va,c)?Wa.a(c,b):xc(b,c);case 3:return za(arguments[0],arguments[1],arguments[2]);default:throw Error([B("Invalid arity: "),B(b.length)].join(""));}}
function za(a,b,c){return null!=c&&(c.i&524288||c.vb)?c.P(null,a,b):qa(c)?Vb(c,a,b):"string"===typeof c?Vb(c,a,b):z(Va,c)?Wa.g(c,a,b):yc(a,b,c)}function zc(a){return a}function Ac(a){a=(a-a%2)/2;return 0<=a?Math.floor(a):Math.ceil(a)}function Bc(a){a-=a>>1&1431655765;a=(a&858993459)+(a>>2&858993459);return 16843009*(a+(a>>4)&252645135)>>24}
var B=function B(b){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 0:return B.A();case 1:return B.b(arguments[0]);default:return B.B(arguments[0],new K(c.slice(1),0,null))}};B.A=function(){return""};B.b=function(a){return null==a?"":""+a};B.B=function(a,b){for(var c=new fa(""+B(a)),d=b;;)if(y(d))c=c.append(""+B(L(d))),d=M(d);else return c.toString()};B.J=function(a){var b=L(a);a=M(a);return B.B(b,a)};B.N=1;
function bc(a,b){var c;if(pc(b))if(Xb(a)&&Xb(b)&&R(a)!==R(b))c=!1;else a:{c=J(a);for(var d=J(b);;){if(null==c){c=null==d;break a}if(null!=d&&O.a(L(c),L(d)))c=M(c),d=M(d);else{c=!1;break a}}}else c=null;return wc(c)}function Cc(a,b,c,d,e){this.m=a;this.first=b;this.Ba=c;this.count=d;this.l=e;this.i=65937646;this.v=8192}f=Cc.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};
f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,this.count)}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.G=function(){return this.m};f.X=function(){return 1===this.count?null:this.Ba};f.T=function(){return this.count};f.F=function(){var a=this.l;return null!=a?a:this.l=a=Nb(this)};f.o=function(a,b){return bc(this,b)};
f.O=function(a,b){return xc(b,this)};f.P=function(a,b,c){return yc(b,c,this)};f.R=function(){return this.first};f.aa=function(){return 1===this.count?Kb:this.Ba};f.M=function(){return this};f.H=function(a,b){return new Cc(b,this.first,this.Ba,this.count,this.l)};f.K=function(a,b){return new Cc(this.m,b,this,this.count+1,null)};Cc.prototype[ta]=function(){return P(this)};function Dc(a){this.m=a;this.i=65937614;this.v=8192}f=Dc.prototype;f.toString=function(){return qb(this)};
f.equiv=function(a){return this.o(null,a)};f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R(this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.G=function(){return this.m};f.X=function(){return null};f.T=function(){return 0};f.F=function(){return Ob};f.o=function(a,b){return(null!=b?b.i&33554432||b.Eb||(b.i?0:z(db,b)):z(db,b))||pc(b)?null==J(b):!1};
f.O=function(a,b){return xc(b,this)};f.P=function(a,b,c){return yc(b,c,this)};f.R=function(){return null};f.aa=function(){return Kb};f.M=function(){return null};f.H=function(a,b){return new Dc(b)};f.K=function(a,b){return new Cc(this.m,b,null,1,null)};var Kb=new Dc(null);Dc.prototype[ta]=function(){return P(this)};
function Ec(a){for(var b=[],c=arguments.length,d=0;;)if(d<c)b.push(arguments[d]),d+=1;else break;a:{c=0<b.length?new K(b.slice(0),0,null):null;if(c instanceof K&&0===c.j)b=c.c;else b:for(b=[];;)if(null!=c)b.push(c.R(null)),c=c.X(null);else break b;for(var c=b.length,e=Kb;;)if(0<c)d=c-1,e=e.K(null,b[c-1]),c=d;else break a}return e}function Fc(a,b,c,d){this.m=a;this.first=b;this.Ba=c;this.l=d;this.i=65929452;this.v=8192}f=Fc.prototype;f.toString=function(){return qb(this)};
f.equiv=function(a){return this.o(null,a)};f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R(this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.G=function(){return this.m};f.X=function(){return null==this.Ba?null:J(this.Ba)};f.F=function(){var a=this.l;return null!=a?a:this.l=a=Nb(this)};f.o=function(a,b){return bc(this,b)};f.O=function(a,b){return xc(b,this)};
f.P=function(a,b,c){return yc(b,c,this)};f.R=function(){return this.first};f.aa=function(){return null==this.Ba?Kb:this.Ba};f.M=function(){return this};f.H=function(a,b){return new Fc(b,this.first,this.Ba,this.l)};f.K=function(a,b){return new Fc(null,b,this,null)};Fc.prototype[ta]=function(){return P(this)};function T(a,b){var c=null==b;return(c?c:null!=b&&(b.i&64||b.Va))?new Fc(null,a,b,null):new Fc(null,a,J(b),null)}
function V(a,b,c,d){this.Ra=a;this.name=b;this.Ea=c;this.La=d;this.i=2153775105;this.v=4096}f=V.prototype;f.toString=function(){return[B(":"),B(this.Ea)].join("")};f.equiv=function(a){return this.o(null,a)};f.o=function(a,b){return b instanceof V?this.Ea===b.Ea:!1};
f.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return I.a(c,this);case 3:return I.g(c,this,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return I.a(c,this)};a.g=function(a,c,d){return I.g(c,this,d)};return a}();f.apply=function(a,b){return this.call.apply(this,[this].concat(va(b)))};f.b=function(a){return I.a(a,this)};f.a=function(a,b){return I.g(a,this,b)};
f.F=function(){var a=this.La;return null!=a?a:this.La=a=Hb(Cb(this.name),Fb(this.Ra))+2654435769|0};f.I=function(a,b){return H(b,[B(":"),B(this.Ea)].join(""))};var Gc=function Gc(b){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 1:return Gc.b(arguments[0]);case 2:return Gc.a(arguments[0],arguments[1]);default:throw Error([B("Invalid arity: "),B(c.length)].join(""));}};
Gc.b=function(a){if(a instanceof V)return a;if(a instanceof Ib){var b;if(null!=a&&(a.v&4096||a.ub))b=a.Ra;else throw Error([B("Doesn't support namespace: "),B(a)].join(""));return new V(b,Hc.b?Hc.b(a):Hc.call(null,a),a.Ga,null)}return"string"===typeof a?(b=a.split("/"),2===b.length?new V(b[0],b[1],a,null):new V(null,b[0],a,null)):null};Gc.a=function(a,b){return new V(a,b,[B(y(a)?[B(a),B("/")].join(""):null),B(b)].join(""),null)};Gc.N=2;
function Ic(a,b,c,d){this.m=a;this.fn=b;this.u=c;this.l=d;this.i=32374988;this.v=1}f=Ic.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};function Kc(a){null!=a.fn&&(a.u=a.fn.A?a.fn.A():a.fn.call(null),a.fn=null);return a.u}
f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R(this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.G=function(){return this.m};f.X=function(){bb(this);return null==this.u?null:M(this.u)};f.F=function(){var a=this.l;return null!=a?a:this.l=a=Nb(this)};f.o=function(a,b){return bc(this,b)};f.O=function(a,b){return xc(b,this)};
f.P=function(a,b,c){return yc(b,c,this)};f.R=function(){bb(this);return null==this.u?null:L(this.u)};f.aa=function(){bb(this);return null!=this.u?Jb(this.u):Kb};f.M=function(){Kc(this);if(null==this.u)return null;for(var a=this.u;;)if(a instanceof Ic)a=Kc(a);else return this.u=a,J(this.u)};f.H=function(a,b){return new Ic(b,this.fn,this.u,this.l)};f.K=function(a,b){return T(b,this)};Ic.prototype[ta]=function(){return P(this)};function Lc(a,b){this.$a=a;this.end=b;this.i=2;this.v=0}
Lc.prototype.add=function(a){this.$a[this.end]=a;return this.end+=1};Lc.prototype.la=function(){var a=new Mc(this.$a,0,this.end);this.$a=null;return a};Lc.prototype.T=function(){return this.end};function Mc(a,b,c){this.c=a;this.off=b;this.end=c;this.i=524306;this.v=0}f=Mc.prototype;f.T=function(){return this.end-this.off};f.U=function(a,b){return this.c[this.off+b]};f.ea=function(a,b,c){return 0<=b&&b<this.end-this.off?this.c[this.off+b]:c};
f.ib=function(){if(this.off===this.end)throw Error("-drop-first of empty chunk");return new Mc(this.c,this.off+1,this.end)};f.O=function(a,b){return Wb(this.c,b,this.c[this.off],this.off+1)};f.P=function(a,b,c){return Wb(this.c,b,c,this.off)};function Nc(a,b,c,d){this.la=a;this.ja=b;this.m=c;this.l=d;this.i=31850732;this.v=1536}f=Nc.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};
f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R(this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.G=function(){return this.m};f.X=function(){if(1<Da(this.la))return new Nc(jb(this.la),this.ja,this.m,null);var a=bb(this.ja);return null==a?null:a};f.F=function(){var a=this.l;return null!=a?a:this.l=a=Nb(this)};
f.o=function(a,b){return bc(this,b)};f.R=function(){return D.a(this.la,0)};f.aa=function(){return 1<Da(this.la)?new Nc(jb(this.la),this.ja,this.m,null):null==this.ja?Kb:this.ja};f.M=function(){return this};f.bb=function(){return this.la};f.cb=function(){return null==this.ja?Kb:this.ja};f.H=function(a,b){return new Nc(this.la,this.ja,b,this.l)};f.K=function(a,b){return T(b,this)};f.ab=function(){return null==this.ja?null:this.ja};Nc.prototype[ta]=function(){return P(this)};
function Oc(a,b){return 0===Da(a)?b:new Nc(a,b,null,null)}function Pc(a,b){a.add(b)}function Qc(a){for(var b=[];;)if(J(a))b.push(L(a)),a=M(a);else return b}function Rc(a,b){if(Xb(a))return R(a);for(var c=a,d=b,e=0;;)if(0<d&&J(c))c=M(c),--d,e+=1;else return e}var Sc=function Sc(b){return null==b?null:null==M(b)?J(L(b)):T(L(b),Sc(M(b)))};
function Tc(a,b,c){var d=J(c);if(0===b)return a.A?a.A():a.call(null);c=E(d);var e=F(d);if(1===b)return a.b?a.b(c):a.b?a.b(c):a.call(null,c);var d=E(e),g=F(e);if(2===b)return a.a?a.a(c,d):a.a?a.a(c,d):a.call(null,c,d);var e=E(g),h=F(g);if(3===b)return a.g?a.g(c,d,e):a.g?a.g(c,d,e):a.call(null,c,d,e);var g=E(h),k=F(h);if(4===b)return a.Z?a.Z(c,d,e,g):a.Z?a.Z(c,d,e,g):a.call(null,c,d,e,g);var h=E(k),l=F(k);if(5===b)return a.W?a.W(c,d,e,g,h):a.W?a.W(c,d,e,g,h):a.call(null,c,d,e,g,h);var k=E(l),m=F(l);
if(6===b)return a.xa?a.xa(c,d,e,g,h,k):a.xa?a.xa(c,d,e,g,h,k):a.call(null,c,d,e,g,h,k);var l=E(m),n=F(m);if(7===b)return a.ya?a.ya(c,d,e,g,h,k,l):a.ya?a.ya(c,d,e,g,h,k,l):a.call(null,c,d,e,g,h,k,l);var m=E(n),p=F(n);if(8===b)return a.za?a.za(c,d,e,g,h,k,l,m):a.za?a.za(c,d,e,g,h,k,l,m):a.call(null,c,d,e,g,h,k,l,m);var n=E(p),q=F(p);if(9===b)return a.Aa?a.Aa(c,d,e,g,h,k,l,m,n):a.Aa?a.Aa(c,d,e,g,h,k,l,m,n):a.call(null,c,d,e,g,h,k,l,m,n);var p=E(q),r=F(q);if(10===b)return a.ma?a.ma(c,d,e,g,h,k,l,m,n,
p):a.ma?a.ma(c,d,e,g,h,k,l,m,n,p):a.call(null,c,d,e,g,h,k,l,m,n,p);var q=E(r),u=F(r);if(11===b)return a.na?a.na(c,d,e,g,h,k,l,m,n,p,q):a.na?a.na(c,d,e,g,h,k,l,m,n,p,q):a.call(null,c,d,e,g,h,k,l,m,n,p,q);var r=E(u),v=F(u);if(12===b)return a.oa?a.oa(c,d,e,g,h,k,l,m,n,p,q,r):a.oa?a.oa(c,d,e,g,h,k,l,m,n,p,q,r):a.call(null,c,d,e,g,h,k,l,m,n,p,q,r);var u=E(v),x=F(v);if(13===b)return a.pa?a.pa(c,d,e,g,h,k,l,m,n,p,q,r,u):a.pa?a.pa(c,d,e,g,h,k,l,m,n,p,q,r,u):a.call(null,c,d,e,g,h,k,l,m,n,p,q,r,u);var v=E(x),
C=F(x);if(14===b)return a.qa?a.qa(c,d,e,g,h,k,l,m,n,p,q,r,u,v):a.qa?a.qa(c,d,e,g,h,k,l,m,n,p,q,r,u,v):a.call(null,c,d,e,g,h,k,l,m,n,p,q,r,u,v);var x=E(C),G=F(C);if(15===b)return a.ra?a.ra(c,d,e,g,h,k,l,m,n,p,q,r,u,v,x):a.ra?a.ra(c,d,e,g,h,k,l,m,n,p,q,r,u,v,x):a.call(null,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x);var C=E(G),N=F(G);if(16===b)return a.sa?a.sa(c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C):a.sa?a.sa(c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C):a.call(null,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C);var G=E(N),ea=F(N);if(17===b)return a.ta?
a.ta(c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G):a.ta?a.ta(c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G):a.call(null,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G);var N=E(ea),Za=F(ea);if(18===b)return a.ua?a.ua(c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N):a.ua?a.ua(c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N):a.call(null,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N);ea=E(Za);Za=F(Za);if(19===b)return a.va?a.va(c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N,ea):a.va?a.va(c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N,ea):a.call(null,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N,ea);var w=
E(Za);F(Za);if(20===b)return a.wa?a.wa(c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N,ea,w):a.wa?a.wa(c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N,ea,w):a.call(null,c,d,e,g,h,k,l,m,n,p,q,r,u,v,x,C,G,N,ea,w);throw Error("Only up to 20 arguments supported on functions");}
function mc(a){for(var b=[],c=arguments.length,d=0;;)if(d<c)b.push(arguments[d]),d+=1;else break;switch(b.length){case 2:return Uc(arguments[0],arguments[1]);case 3:return Vc(arguments[0],arguments[1],arguments[2]);case 4:c=arguments[0];b=T(arguments[1],T(arguments[2],arguments[3]));d=c.N;if(c.J)var e=Rc(b,d+1),c=e<=d?Tc(c,e,b):c.J(b);else c=c.apply(c,Qc(b));return c;case 5:return c=arguments[0],b=T(arguments[1],T(arguments[2],T(arguments[3],arguments[4]))),d=c.N,c.J?(e=Rc(b,d+1),c=e<=d?Tc(c,e,b):
c.J(b)):c=c.apply(c,Qc(b)),c;default:return c=arguments[0],b=T(arguments[1],T(arguments[2],T(arguments[3],T(arguments[4],Sc(new K(b.slice(5),0,null)))))),d=c.N,c.J?(e=Rc(b,d+1),c=e<=d?Tc(c,e,b):c.J(b)):c=c.apply(c,Qc(b)),c}}function Uc(a,b){var c=a.N;if(a.J){var d=Rc(b,c+1);return d<=c?Tc(a,d,b):a.J(b)}return a.apply(a,Qc(b))}function Vc(a,b,c){b=T(b,c);c=a.N;if(a.J){var d=Rc(b,c+1);return d<=c?Tc(a,d,b):a.J(b)}return a.apply(a,Qc(b))}
var Wc=function Wc(){"undefined"===typeof ia&&(ia=function(b,c){this.zb=b;this.yb=c;this.i=393216;this.v=0},ia.prototype.H=function(b,c){return new ia(this.zb,c)},ia.prototype.G=function(){return this.yb},ia.prototype.fa=function(){return!1},ia.prototype.next=function(){return Error("No such element")},ia.prototype.remove=function(){return Error("Unsupported operation")},ia.Ib=function(){return new Xc(null,2,5,Yc,[nc(Zc,new rb(null,1,[$c,Ec(ad,Ec(fc))],null)),ha.Hb],null)},ia.mb=!0,ia.Ya="cljs.core/t_cljs$core14721",
ia.xb=function(b){return H(b,"cljs.core/t_cljs$core14721")});return new ia(Wc,bd)};function cd(a,b){for(;;){if(null==J(b))return!0;var c;c=L(b);c=a.b?a.b(c):a.call(null,c);if(y(c)){c=a;var d=M(b);a=c;b=d}else return!1}}
var W=function W(b){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 1:return W.b(arguments[0]);case 2:return W.a(arguments[0],arguments[1]);case 3:return W.g(arguments[0],arguments[1],arguments[2]);case 4:return W.Z(arguments[0],arguments[1],arguments[2],arguments[3]);default:return W.B(arguments[0],arguments[1],arguments[2],arguments[3],new K(c.slice(4),0,null))}};
W.b=function(a){return function(b){return function(){function c(c,d){var e=a.b?a.b(d):a.call(null,d);return b.a?b.a(c,e):b.call(null,c,e)}function d(a){return b.b?b.b(a):b.call(null,a)}function e(){return b.A?b.A():b.call(null)}var g=null,h=function(){function c(a,b,e){var g=null;if(2<arguments.length){for(var g=0,h=Array(arguments.length-2);g<h.length;)h[g]=arguments[g+2],++g;g=new K(h,0)}return d.call(this,a,b,g)}function d(c,e,g){e=Vc(a,e,g);return b.a?b.a(c,e):b.call(null,c,e)}c.N=2;c.J=function(a){var b=
L(a);a=M(a);var c=L(a);a=Jb(a);return d(b,c,a)};c.B=d;return c}(),g=function(a,b,g){switch(arguments.length){case 0:return e.call(this);case 1:return d.call(this,a);case 2:return c.call(this,a,b);default:var n=null;if(2<arguments.length){for(var n=0,p=Array(arguments.length-2);n<p.length;)p[n]=arguments[n+2],++n;n=new K(p,0)}return h.B(a,b,n)}throw Error("Invalid arity: "+arguments.length);};g.N=2;g.J=h.J;g.A=e;g.b=d;g.a=c;g.B=h.B;return g}()}};
W.a=function(a,b){return new Ic(null,function(){var c=J(b);if(c){if(sc(c)){for(var d=lb(c),e=R(d),g=new Lc(Array(e),0),h=0;;)if(h<e)Pc(g,function(){var b=D.a(d,h);return a.b?a.b(b):a.call(null,b)}()),h+=1;else break;return Oc(g.la(),W.a(a,mb(c)))}return T(function(){var b=L(c);return a.b?a.b(b):a.call(null,b)}(),W.a(a,Jb(c)))}return null},null,null)};
W.g=function(a,b,c){return new Ic(null,function(){var d=J(b),e=J(c);if(d&&e){var g=T,h;h=L(d);var k=L(e);h=a.a?a.a(h,k):a.call(null,h,k);d=g(h,W.g(a,Jb(d),Jb(e)))}else d=null;return d},null,null)};W.Z=function(a,b,c,d){return new Ic(null,function(){var e=J(b),g=J(c),h=J(d);if(e&&g&&h){var k=T,l;l=L(e);var m=L(g),n=L(h);l=a.g?a.g(l,m,n):a.call(null,l,m,n);e=k(l,W.Z(a,Jb(e),Jb(g),Jb(h)))}else e=null;return e},null,null)};
W.B=function(a,b,c,d,e){var g=function k(a){return new Ic(null,function(){var b=W.a(J,a);return cd(zc,b)?T(W.a(L,b),k(W.a(Jb,b))):null},null,null)};return W.a(function(){return function(b){return Uc(a,b)}}(g),g(ec.B(e,d,dc([c,b],0))))};W.J=function(a){var b=L(a),c=M(a);a=L(c);var d=M(c),c=L(d),e=M(d),d=L(e),e=M(e);return W.B(b,a,c,d,e)};W.N=4;function dd(a,b){this.w=a;this.c=b}
function ed(a){return new dd(a,[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null])}function fd(a){a=a.h;return 32>a?0:a-1>>>5<<5}function gd(a,b,c){for(;;){if(0===b)return c;var d=ed(a);d.c[0]=c;c=d;b-=5}}var hd=function hd(b,c,d,e){var g=new dd(d.w,va(d.c)),h=b.h-1>>>c&31;5===c?g.c[h]=e:(d=d.c[h],b=null!=d?hd(b,c-5,d,e):gd(null,c-5,e),g.c[h]=b);return g};
function id(a,b){throw Error([B("No item "),B(a),B(" in vector of length "),B(b)].join(""));}function jd(a,b){if(b>=fd(a))return a.S;for(var c=a.root,d=a.shift;;)if(0<d)var e=d-5,c=c.c[b>>>d&31],d=e;else return c.c}function kd(a,b){return 0<=b&&b<a.h?jd(a,b):id(b,a.h)}var ld=function ld(b,c,d,e,g){var h=new dd(d.w,va(d.c));if(0===c)h.c[e&31]=g;else{var k=e>>>c&31;b=ld(b,c-5,d.c[k],e,g);h.c[k]=b}return h};function md(a,b,c,d,e,g){this.j=a;this.Za=b;this.c=c;this.ka=d;this.start=e;this.end=g}
md.prototype.fa=function(){return this.j<this.end};md.prototype.next=function(){32===this.j-this.Za&&(this.c=jd(this.ka,this.j),this.Za+=32);var a=this.c[this.j&31];this.j+=1;return a};function Xc(a,b,c,d,e,g){this.m=a;this.h=b;this.shift=c;this.root=d;this.S=e;this.l=g;this.i=167668511;this.v=8196}f=Xc.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};
f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R(this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.L=function(a,b){return Ja.g(this,b,null)};f.C=function(a,b,c){return"number"===typeof b?D.g(this,b,c):c};f.U=function(a,b){return kd(this,b)[b&31]};f.ea=function(a,b,c){return 0<=b&&b<this.h?jd(this,b)[b&31]:c};
f.gb=function(a,b,c){if(0<=b&&b<this.h)return fd(this)<=b?(a=va(this.S),a[b&31]=c,new Xc(this.m,this.h,this.shift,this.root,a,null)):new Xc(this.m,this.h,this.shift,ld(this,this.shift,this.root,b,c),this.S,null);if(b===this.h)return Ea(this,c);throw Error([B("Index "),B(b),B(" out of bounds  [0,"),B(this.h),B("]")].join(""));};f.Ca=function(){var a=this.h;return new md(0,0,0<R(this)?jd(this,0):null,this,0,a)};f.G=function(){return this.m};f.T=function(){return this.h};
f.eb=function(){return D.a(this,0)};f.fb=function(){return D.a(this,1)};f.F=function(){var a=this.l;return null!=a?a:this.l=a=Nb(this)};f.o=function(a,b){if(b instanceof Xc)if(this.h===R(b))for(var c=ob(this),d=ob(b);;)if(y(c.fa())){var e=c.next(),g=d.next();if(!O.a(e,g))return!1}else return!0;else return!1;else return bc(this,b)};f.Sa=function(){return new nd(this.h,this.shift,od.b?od.b(this.root):od.call(null,this.root),pd.b?pd.b(this.S):pd.call(null,this.S))};f.O=function(a,b){return Rb(this,b)};
f.P=function(a,b,c){a=0;for(var d=c;;)if(a<this.h){var e=jd(this,a);c=e.length;a:for(var g=0;;)if(g<c)var h=e[g],d=b.a?b.a(d,h):b.call(null,d,h),g=g+1;else{e=d;break a}a+=c;d=e}else return d};f.Na=function(a,b,c){if("number"===typeof b)return Ra(this,b,c);throw Error("Vector's key for assoc must be a number.");};
f.M=function(){if(0===this.h)return null;if(32>=this.h)return new K(this.S,0,null);var a;a:{a=this.root;for(var b=this.shift;;)if(0<b)b-=5,a=a.c[0];else{a=a.c;break a}}return qd?qd(this,a,0,0):rd.call(null,this,a,0,0)};f.H=function(a,b){return new Xc(b,this.h,this.shift,this.root,this.S,this.l)};
f.K=function(a,b){if(32>this.h-fd(this)){for(var c=this.S.length,d=Array(c+1),e=0;;)if(e<c)d[e]=this.S[e],e+=1;else break;d[c]=b;return new Xc(this.m,this.h+1,this.shift,this.root,d,null)}c=(d=this.h>>>5>1<<this.shift)?this.shift+5:this.shift;d?(d=ed(null),d.c[0]=this.root,e=gd(null,this.shift,new dd(null,this.S)),d.c[1]=e):d=hd(this,this.shift,this.root,new dd(null,this.S));return new Xc(this.m,this.h+1,c,d,[b],null)};
f.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.U(null,c);case 3:return this.ea(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return this.U(null,c)};a.g=function(a,c,d){return this.ea(null,c,d)};return a}();f.apply=function(a,b){return this.call.apply(this,[this].concat(va(b)))};f.b=function(a){return this.U(null,a)};f.a=function(a,b){return this.ea(null,a,b)};
var Yc=new dd(null,[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]),fc=new Xc(null,0,5,Yc,[],Ob);Xc.prototype[ta]=function(){return P(this)};function sd(a,b,c,d,e,g){this.ca=a;this.node=b;this.j=c;this.off=d;this.m=e;this.l=g;this.i=32375020;this.v=1536}f=sd.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};
f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R(this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.G=function(){return this.m};f.X=function(){if(this.off+1<this.node.length){var a;a=this.ca;var b=this.node,c=this.j,d=this.off+1;a=qd?qd(a,b,c,d):rd.call(null,a,b,c,d);return null==a?null:a}return nb(this)};
f.F=function(){var a=this.l;return null!=a?a:this.l=a=Nb(this)};f.o=function(a,b){return bc(this,b)};f.O=function(a,b){var c;c=this.ca;var d=this.j+this.off,e=R(this.ca);c=td?td(c,d,e):ud.call(null,c,d,e);return Rb(c,b)};f.P=function(a,b,c){a=this.ca;var d=this.j+this.off,e=R(this.ca);a=td?td(a,d,e):ud.call(null,a,d,e);return Sb(a,b,c)};f.R=function(){return this.node[this.off]};
f.aa=function(){if(this.off+1<this.node.length){var a;a=this.ca;var b=this.node,c=this.j,d=this.off+1;a=qd?qd(a,b,c,d):rd.call(null,a,b,c,d);return null==a?Kb:a}return mb(this)};f.M=function(){return this};f.bb=function(){var a=this.node;return new Mc(a,this.off,a.length)};f.cb=function(){var a=this.j+this.node.length;if(a<Da(this.ca)){var b=this.ca,c=jd(this.ca,a);return qd?qd(b,c,a,0):rd.call(null,b,c,a,0)}return Kb};
f.H=function(a,b){return vd?vd(this.ca,this.node,this.j,this.off,b):rd.call(null,this.ca,this.node,this.j,this.off,b)};f.K=function(a,b){return T(b,this)};f.ab=function(){var a=this.j+this.node.length;if(a<Da(this.ca)){var b=this.ca,c=jd(this.ca,a);return qd?qd(b,c,a,0):rd.call(null,b,c,a,0)}return null};sd.prototype[ta]=function(){return P(this)};
function rd(a){for(var b=[],c=arguments.length,d=0;;)if(d<c)b.push(arguments[d]),d+=1;else break;switch(b.length){case 3:return b=arguments[0],c=arguments[1],d=arguments[2],new sd(b,kd(b,c),c,d,null,null);case 4:return qd(arguments[0],arguments[1],arguments[2],arguments[3]);case 5:return vd(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);default:throw Error([B("Invalid arity: "),B(b.length)].join(""));}}function qd(a,b,c,d){return new sd(a,b,c,d,null,null)}
function vd(a,b,c,d,e){return new sd(a,b,c,d,e,null)}function wd(a,b,c,d,e){this.m=a;this.ka=b;this.start=c;this.end=d;this.l=e;this.i=167666463;this.v=8192}f=wd.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};
f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R(this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.L=function(a,b){return Ja.g(this,b,null)};f.C=function(a,b,c){return"number"===typeof b?D.g(this,b,c):c};f.U=function(a,b){return 0>b||this.end<=this.start+b?id(b,this.end-this.start):D.a(this.ka,this.start+b)};
f.ea=function(a,b,c){return 0>b||this.end<=this.start+b?c:D.g(this.ka,this.start+b,c)};f.gb=function(a,b,c){var d=this.start+b;a=this.m;c=ic.g(this.ka,d,c);b=this.start;var e=this.end,d=d+1,d=e>d?e:d;return xd.W?xd.W(a,c,b,d,null):xd.call(null,a,c,b,d,null)};f.G=function(){return this.m};f.T=function(){return this.end-this.start};f.F=function(){var a=this.l;return null!=a?a:this.l=a=Nb(this)};f.o=function(a,b){return bc(this,b)};f.O=function(a,b){return Rb(this,b)};
f.P=function(a,b,c){return Sb(this,b,c)};f.Na=function(a,b,c){if("number"===typeof b)return Ra(this,b,c);throw Error("Subvec's key for assoc must be a number.");};f.M=function(){var a=this;return function(b){return function d(e){return e===a.end?null:T(D.a(a.ka,e),new Ic(null,function(){return function(){return d(e+1)}}(b),null,null))}}(this)(a.start)};f.H=function(a,b){return xd.W?xd.W(b,this.ka,this.start,this.end,this.l):xd.call(null,b,this.ka,this.start,this.end,this.l)};
f.K=function(a,b){var c=this.m,d=Ra(this.ka,this.end,b),e=this.start,g=this.end+1;return xd.W?xd.W(c,d,e,g,null):xd.call(null,c,d,e,g,null)};f.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.U(null,c);case 3:return this.ea(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return this.U(null,c)};a.g=function(a,c,d){return this.ea(null,c,d)};return a}();f.apply=function(a,b){return this.call.apply(this,[this].concat(va(b)))};
f.b=function(a){return this.U(null,a)};f.a=function(a,b){return this.ea(null,a,b)};wd.prototype[ta]=function(){return P(this)};function xd(a,b,c,d,e){for(;;)if(b instanceof wd)c=b.start+c,d=b.start+d,b=b.ka;else{var g=R(b);if(0>c||0>d||c>g||d>g)throw Error("Index out of bounds");return new wd(a,b,c,d,e)}}
function ud(a){for(var b=[],c=arguments.length,d=0;;)if(d<c)b.push(arguments[d]),d+=1;else break;switch(b.length){case 2:return b=arguments[0],td(b,arguments[1],R(b));case 3:return td(arguments[0],arguments[1],arguments[2]);default:throw Error([B("Invalid arity: "),B(b.length)].join(""));}}function td(a,b,c){return xd(null,a,b,c,null)}function yd(a,b){return a===b.w?b:new dd(a,va(b.c))}function od(a){return new dd({},va(a.c))}
function pd(a){var b=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];uc(a,0,b,0,a.length);return b}var zd=function zd(b,c,d,e){d=yd(b.root.w,d);var g=b.h-1>>>c&31;if(5===c)b=e;else{var h=d.c[g];b=null!=h?zd(b,c-5,h,e):gd(b.root.w,c-5,e)}d.c[g]=b;return d};function nd(a,b,c,d){this.h=a;this.shift=b;this.root=c;this.S=d;this.v=88;this.i=275}f=nd.prototype;
f.Wa=function(a,b){if(this.root.w){if(32>this.h-fd(this))this.S[this.h&31]=b;else{var c=new dd(this.root.w,this.S),d=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];d[0]=b;this.S=d;if(this.h>>>5>1<<this.shift){var d=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],e=this.shift+
5;d[0]=this.root;d[1]=gd(this.root.w,this.shift,c);this.root=new dd(this.root.w,d);this.shift=e}else this.root=zd(this,this.shift,this.root,c)}this.h+=1;return this}throw Error("conj! after persistent!");};f.Xa=function(){if(this.root.w){this.root.w=null;var a=this.h-fd(this),b=Array(a);uc(this.S,0,b,0,a);return new Xc(null,this.h,this.shift,this.root,b,null)}throw Error("persistent! called twice");};
f.Oa=function(a,b,c){if("number"===typeof b)return ib(this,b,c);throw Error("TransientVector's key for assoc! must be a number.");};
f.kb=function(a,b,c){var d=this;if(d.root.w){if(0<=b&&b<d.h)return fd(this)<=b?d.S[b&31]=c:(a=function(){return function g(a,k){var l=yd(d.root.w,k);if(0===a)l.c[b&31]=c;else{var m=b>>>a&31,n=g(a-5,l.c[m]);l.c[m]=n}return l}}(this).call(null,d.shift,d.root),d.root=a),this;if(b===d.h)return fb(this,c);throw Error([B("Index "),B(b),B(" out of bounds for TransientVector of length"),B(d.h)].join(""));}throw Error("assoc! after persistent!");};
f.T=function(){if(this.root.w)return this.h;throw Error("count after persistent!");};f.U=function(a,b){if(this.root.w)return kd(this,b)[b&31];throw Error("nth after persistent!");};f.ea=function(a,b,c){return 0<=b&&b<this.h?D.a(this,b):c};f.L=function(a,b){return Ja.g(this,b,null)};f.C=function(a,b,c){return"number"===typeof b?D.g(this,b,c):c};
f.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.L(null,c);case 3:return this.C(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return this.L(null,c)};a.g=function(a,c,d){return this.C(null,c,d)};return a}();f.apply=function(a,b){return this.call.apply(this,[this].concat(va(b)))};f.b=function(a){return this.L(null,a)};f.a=function(a,b){return this.C(null,a,b)};function Ad(){this.i=2097152;this.v=0}
Ad.prototype.equiv=function(a){return this.o(null,a)};Ad.prototype.o=function(){return!1};var Bd=new Ad;function Cd(a,b){return wc(qc(b)?R(a)===R(b)?cd(zc,W.a(function(a){return O.a(I.g(b,L(a),Bd),L(M(a)))},a)):null:null)}function Dd(a){this.u=a}Dd.prototype.next=function(){if(null!=this.u){var a=L(this.u),b=hc(a,0,null),a=hc(a,1,null);this.u=M(this.u);return{value:[b,a],done:!1}}return{value:null,done:!0}};function Ed(a){return new Dd(J(a))}
function Fd(a,b){var c;if(b instanceof V)a:{c=a.length;for(var d=b.Ea,e=0;;){if(c<=e){c=-1;break a}if(a[e]instanceof V&&d===a[e].Ea){c=e;break a}e+=2}}else if("string"==typeof b||"number"===typeof b)a:for(c=a.length,d=0;;){if(c<=d){c=-1;break a}if(b===a[d]){c=d;break a}d+=2}else if(b instanceof Ib)a:for(c=a.length,d=b.Ga,e=0;;){if(c<=e){c=-1;break a}if(a[e]instanceof Ib&&d===a[e].Ga){c=e;break a}e+=2}else if(null==b)a:for(c=a.length,d=0;;){if(c<=d){c=-1;break a}if(null==a[d]){c=d;break a}d+=2}else a:for(c=
a.length,d=0;;){if(c<=d){c=-1;break a}if(O.a(b,a[d])){c=d;break a}d+=2}return c}function Gd(a,b,c){this.c=a;this.j=b;this.da=c;this.i=32374990;this.v=0}f=Gd.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R(this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.G=function(){return this.da};f.X=function(){return this.j<this.c.length-2?new Gd(this.c,this.j+2,this.da):null};f.T=function(){return(this.c.length-this.j)/2};f.F=function(){return Nb(this)};
f.o=function(a,b){return bc(this,b)};f.O=function(a,b){return xc(b,this)};f.P=function(a,b,c){return yc(b,c,this)};f.R=function(){return new Xc(null,2,5,Yc,[this.c[this.j],this.c[this.j+1]],null)};f.aa=function(){return this.j<this.c.length-2?new Gd(this.c,this.j+2,this.da):Kb};f.M=function(){return this};f.H=function(a,b){return new Gd(this.c,this.j,b)};f.K=function(a,b){return T(b,this)};Gd.prototype[ta]=function(){return P(this)};function Id(a,b,c){this.c=a;this.j=b;this.h=c}
Id.prototype.fa=function(){return this.j<this.h};Id.prototype.next=function(){var a=new Xc(null,2,5,Yc,[this.c[this.j],this.c[this.j+1]],null);this.j+=2;return a};function rb(a,b,c,d){this.m=a;this.h=b;this.c=c;this.l=d;this.i=16647951;this.v=8196}f=rb.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};f.keys=function(){return P(Jd.b?Jd.b(this):Jd.call(null,this))};f.entries=function(){return Ed(J(this))};
f.values=function(){return P(Kd.b?Kd.b(this):Kd.call(null,this))};f.has=function(a){return I.g(this,a,vc)===vc?!1:!0};f.get=function(a,b){return this.C(null,a,b)};f.forEach=function(a){for(var b=J(this),c=null,d=0,e=0;;)if(e<d){var g=c.U(null,e),h=hc(g,0,null),g=hc(g,1,null);a.a?a.a(g,h):a.call(null,g,h);e+=1}else if(b=J(b))sc(b)?(c=lb(b),b=mb(b),h=c,d=R(c),c=h):(c=L(b),h=hc(c,0,null),g=hc(c,1,null),a.a?a.a(g,h):a.call(null,g,h),b=M(b),c=null,d=0),e=0;else return null};
f.L=function(a,b){return Ja.g(this,b,null)};f.C=function(a,b,c){a=Fd(this.c,b);return-1===a?c:this.c[a+1]};f.Ca=function(){return new Id(this.c,0,2*this.h)};f.G=function(){return this.m};f.T=function(){return this.h};f.F=function(){var a=this.l;return null!=a?a:this.l=a=Pb(this)};
f.o=function(a,b){if(null!=b&&(b.i&1024||b.rb)){var c=this.c.length;if(this.h===b.T(null))for(var d=0;;)if(d<c){var e=b.C(null,this.c[d],vc);if(e!==vc)if(O.a(this.c[d+1],e))d+=2;else return!1;else return!1}else return!0;else return!1}else return Cd(this,b)};f.Sa=function(){return new Ld({},this.c.length,va(this.c))};f.O=function(a,b){return xc(b,this)};f.P=function(a,b,c){return yc(b,c,this)};
f.Na=function(a,b,c){a=Fd(this.c,b);if(-1===a){if(this.h<Md){a=this.c;for(var d=a.length,e=Array(d+2),g=0;;)if(g<d)e[g]=a[g],g+=1;else break;e[d]=b;e[d+1]=c;return new rb(this.m,this.h+1,e,null)}a=jc;null!=a?null!=a&&(a.v&4||a.Cb)?(d=za(fb,eb(a),this),d=gb(d),a=nc(d,oc(a))):a=za(Ea,a,this):a=za(ec,Kb,this);return Ua(Ka(a,b,c),this.m)}if(c===this.c[a+1])return this;b=va(this.c);b[a+1]=c;return new rb(this.m,this.h,b,null)};f.M=function(){var a=this.c;return 0<=a.length-2?new Gd(a,0,null):null};
f.H=function(a,b){return new rb(b,this.h,this.c,this.l)};f.K=function(a,b){if(rc(b))return Ka(this,D.a(b,0),D.a(b,1));for(var c=this,d=J(b);;){if(null==d)return c;var e=L(d);if(rc(e))c=Ka(c,D.a(e,0),D.a(e,1)),d=M(d);else throw Error("conj on a map takes map entries or seqables of map entries");}};
f.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.L(null,c);case 3:return this.C(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return this.L(null,c)};a.g=function(a,c,d){return this.C(null,c,d)};return a}();f.apply=function(a,b){return this.call.apply(this,[this].concat(va(b)))};f.b=function(a){return this.L(null,a)};f.a=function(a,b){return this.C(null,a,b)};var bd=new rb(null,0,[],Qb),Md=8;rb.prototype[ta]=function(){return P(this)};
function Ld(a,b,c){this.Ma=a;this.Ka=b;this.c=c;this.i=258;this.v=56}f=Ld.prototype;f.T=function(){if(y(this.Ma))return Ac(this.Ka);throw Error("count after persistent!");};f.L=function(a,b){return Ja.g(this,b,null)};f.C=function(a,b,c){if(y(this.Ma))return a=Fd(this.c,b),-1===a?c:this.c[a+1];throw Error("lookup after persistent!");};
f.Wa=function(a,b){if(y(this.Ma)){if(null!=b?b.i&2048||b.sb||(b.i?0:z(Ma,b)):z(Ma,b))return hb(this,Nd.b?Nd.b(b):Nd.call(null,b),Od.b?Od.b(b):Od.call(null,b));for(var c=J(b),d=this;;){var e=L(c);if(y(e))c=M(c),d=hb(d,Nd.b?Nd.b(e):Nd.call(null,e),Od.b?Od.b(e):Od.call(null,e));else return d}}else throw Error("conj! after persistent!");};f.Xa=function(){if(y(this.Ma))return this.Ma=!1,new rb(null,Ac(this.Ka),this.c,null);throw Error("persistent! called twice");};
f.Oa=function(a,b,c){if(y(this.Ma)){a=Fd(this.c,b);if(-1===a){if(this.Ka+2<=2*Md)return this.Ka+=2,this.c.push(b),this.c.push(c),this;a=Pd.a?Pd.a(this.Ka,this.c):Pd.call(null,this.Ka,this.c);return hb(a,b,c)}c!==this.c[a+1]&&(this.c[a+1]=c);return this}throw Error("assoc! after persistent!");};function Pd(a,b){for(var c=eb(jc),d=0;;)if(d<a)c=hb(c,b[d],b[d+1]),d+=2;else return c}function Qd(){this.val=!1}
function Rd(a,b){return a===b?!0:a===b||a instanceof V&&b instanceof V&&a.Ea===b.Ea?!0:O.a(a,b)}function Sd(a,b,c){a=va(a);a[b]=c;return a}function Td(a,b,c,d){a=a.Ia(b);a.c[c]=d;return a}function Ud(a,b,c,d){this.c=a;this.j=b;this.Qa=c;this.ia=d}Ud.prototype.advance=function(){for(var a=this.c.length;;)if(this.j<a){var b=this.c[this.j],c=this.c[this.j+1];null!=b?b=this.Qa=new Xc(null,2,5,Yc,[b,c],null):null!=c?(b=ob(c),b=b.fa()?this.ia=b:!1):b=!1;this.j+=2;if(b)return!0}else return!1};
Ud.prototype.fa=function(){var a=null!=this.Qa;return a?a:(a=null!=this.ia)?a:this.advance()};Ud.prototype.next=function(){if(null!=this.Qa){var a=this.Qa;this.Qa=null;return a}if(null!=this.ia)return a=this.ia.next(),this.ia.fa()||(this.ia=null),a;if(this.advance())return this.next();throw Error("No such element");};Ud.prototype.remove=function(){return Error("Unsupported operation")};function Vd(a,b,c){this.w=a;this.D=b;this.c=c}f=Vd.prototype;
f.Ia=function(a){if(a===this.w)return this;var b=Bc(this.D),c=Array(0>b?4:2*(b+1));uc(this.c,0,c,0,2*b);return new Vd(a,this.D,c)};f.Pa=function(){return Wd?Wd(this.c):Xd.call(null,this.c)};f.Ja=function(a,b,c,d){var e=1<<(b>>>a&31);if(0===(this.D&e))return d;var g=Bc(this.D&e-1),e=this.c[2*g],g=this.c[2*g+1];return null==e?g.Ja(a+5,b,c,d):Rd(c,e)?g:d};
f.ha=function(a,b,c,d,e,g){var h=1<<(c>>>b&31),k=Bc(this.D&h-1);if(0===(this.D&h)){var l=Bc(this.D);if(2*l<this.c.length){a=this.Ia(a);b=a.c;g.val=!0;a:for(c=2*(l-k),g=2*k+(c-1),l=2*(k+1)+(c-1);;){if(0===c)break a;b[l]=b[g];--l;--c;--g}b[2*k]=d;b[2*k+1]=e;a.D|=h;return a}if(16<=l){k=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];k[c>>>b&31]=Yd.ha(a,b+5,c,d,e,g);for(e=d=0;;)if(32>d)0!==
(this.D>>>d&1)&&(k[d]=null!=this.c[e]?Yd.ha(a,b+5,Gb(this.c[e]),this.c[e],this.c[e+1],g):this.c[e+1],e+=2),d+=1;else break;return new Zd(a,l+1,k)}b=Array(2*(l+4));uc(this.c,0,b,0,2*k);b[2*k]=d;b[2*k+1]=e;uc(this.c,2*k,b,2*(k+1),2*(l-k));g.val=!0;a=this.Ia(a);a.c=b;a.D|=h;return a}l=this.c[2*k];h=this.c[2*k+1];if(null==l)return l=h.ha(a,b+5,c,d,e,g),l===h?this:Td(this,a,2*k+1,l);if(Rd(d,l))return e===h?this:Td(this,a,2*k+1,e);g.val=!0;g=b+5;d=$d?$d(a,g,l,h,c,d,e):ae.call(null,a,g,l,h,c,d,e);e=2*k;
k=2*k+1;a=this.Ia(a);a.c[e]=null;a.c[k]=d;return a};
f.ga=function(a,b,c,d,e){var g=1<<(b>>>a&31),h=Bc(this.D&g-1);if(0===(this.D&g)){var k=Bc(this.D);if(16<=k){h=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];h[b>>>a&31]=Yd.ga(a+5,b,c,d,e);for(d=c=0;;)if(32>c)0!==(this.D>>>c&1)&&(h[c]=null!=this.c[d]?Yd.ga(a+5,Gb(this.c[d]),this.c[d],this.c[d+1],e):this.c[d+1],d+=2),c+=1;else break;return new Zd(null,k+1,h)}a=Array(2*(k+1));uc(this.c,
0,a,0,2*h);a[2*h]=c;a[2*h+1]=d;uc(this.c,2*h,a,2*(h+1),2*(k-h));e.val=!0;return new Vd(null,this.D|g,a)}var l=this.c[2*h],g=this.c[2*h+1];if(null==l)return k=g.ga(a+5,b,c,d,e),k===g?this:new Vd(null,this.D,Sd(this.c,2*h+1,k));if(Rd(c,l))return d===g?this:new Vd(null,this.D,Sd(this.c,2*h+1,d));e.val=!0;e=this.D;k=this.c;a+=5;a=be?be(a,l,g,b,c,d):ae.call(null,a,l,g,b,c,d);c=2*h;h=2*h+1;d=va(k);d[c]=null;d[h]=a;return new Vd(null,e,d)};f.Ca=function(){return new Ud(this.c,0,null,null)};
var Yd=new Vd(null,0,[]);function ce(a,b,c){this.c=a;this.j=b;this.ia=c}ce.prototype.fa=function(){for(var a=this.c.length;;){if(null!=this.ia&&this.ia.fa())return!0;if(this.j<a){var b=this.c[this.j];this.j+=1;null!=b&&(this.ia=ob(b))}else return!1}};ce.prototype.next=function(){if(this.fa())return this.ia.next();throw Error("No such element");};ce.prototype.remove=function(){return Error("Unsupported operation")};function Zd(a,b,c){this.w=a;this.h=b;this.c=c}f=Zd.prototype;
f.Ia=function(a){return a===this.w?this:new Zd(a,this.h,va(this.c))};f.Pa=function(){return de?de(this.c):ee.call(null,this.c)};f.Ja=function(a,b,c,d){var e=this.c[b>>>a&31];return null!=e?e.Ja(a+5,b,c,d):d};f.ha=function(a,b,c,d,e,g){var h=c>>>b&31,k=this.c[h];if(null==k)return a=Td(this,a,h,Yd.ha(a,b+5,c,d,e,g)),a.h+=1,a;b=k.ha(a,b+5,c,d,e,g);return b===k?this:Td(this,a,h,b)};
f.ga=function(a,b,c,d,e){var g=b>>>a&31,h=this.c[g];if(null==h)return new Zd(null,this.h+1,Sd(this.c,g,Yd.ga(a+5,b,c,d,e)));a=h.ga(a+5,b,c,d,e);return a===h?this:new Zd(null,this.h,Sd(this.c,g,a))};f.Ca=function(){return new ce(this.c,0,null)};function fe(a,b,c){b*=2;for(var d=0;;)if(d<b){if(Rd(c,a[d]))return d;d+=2}else return-1}function ge(a,b,c,d){this.w=a;this.Da=b;this.h=c;this.c=d}f=ge.prototype;
f.Ia=function(a){if(a===this.w)return this;var b=Array(2*(this.h+1));uc(this.c,0,b,0,2*this.h);return new ge(a,this.Da,this.h,b)};f.Pa=function(){return Wd?Wd(this.c):Xd.call(null,this.c)};f.Ja=function(a,b,c,d){a=fe(this.c,this.h,c);return 0>a?d:Rd(c,this.c[a])?this.c[a+1]:d};
f.ha=function(a,b,c,d,e,g){if(c===this.Da){b=fe(this.c,this.h,d);if(-1===b){if(this.c.length>2*this.h)return b=2*this.h,c=2*this.h+1,a=this.Ia(a),a.c[b]=d,a.c[c]=e,g.val=!0,a.h+=1,a;c=this.c.length;b=Array(c+2);uc(this.c,0,b,0,c);b[c]=d;b[c+1]=e;g.val=!0;d=this.h+1;a===this.w?(this.c=b,this.h=d,a=this):a=new ge(this.w,this.Da,d,b);return a}return this.c[b+1]===e?this:Td(this,a,b+1,e)}return(new Vd(a,1<<(this.Da>>>b&31),[null,this,null,null])).ha(a,b,c,d,e,g)};
f.ga=function(a,b,c,d,e){return b===this.Da?(a=fe(this.c,this.h,c),-1===a?(a=2*this.h,b=Array(a+2),uc(this.c,0,b,0,a),b[a]=c,b[a+1]=d,e.val=!0,new ge(null,this.Da,this.h+1,b)):O.a(this.c[a],d)?this:new ge(null,this.Da,this.h,Sd(this.c,a+1,d))):(new Vd(null,1<<(this.Da>>>a&31),[null,this])).ga(a,b,c,d,e)};f.Ca=function(){return new Ud(this.c,0,null,null)};
function ae(a){for(var b=[],c=arguments.length,d=0;;)if(d<c)b.push(arguments[d]),d+=1;else break;switch(b.length){case 6:return be(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);case 7:return $d(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]);default:throw Error([B("Invalid arity: "),B(b.length)].join(""));}}
function be(a,b,c,d,e,g){var h=Gb(b);if(h===d)return new ge(null,h,2,[b,c,e,g]);var k=new Qd;return Yd.ga(a,h,b,c,k).ga(a,d,e,g,k)}function $d(a,b,c,d,e,g,h){var k=Gb(c);if(k===e)return new ge(null,k,2,[c,d,g,h]);var l=new Qd;return Yd.ha(a,b,k,c,d,l).ha(a,b,e,g,h,l)}function he(a,b,c,d,e){this.m=a;this.Fa=b;this.j=c;this.u=d;this.l=e;this.i=32374860;this.v=0}f=he.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};
f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R(this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.G=function(){return this.m};f.F=function(){var a=this.l;return null!=a?a:this.l=a=Nb(this)};f.o=function(a,b){return bc(this,b)};f.O=function(a,b){return xc(b,this)};f.P=function(a,b,c){return yc(b,c,this)};
f.R=function(){return null==this.u?new Xc(null,2,5,Yc,[this.Fa[this.j],this.Fa[this.j+1]],null):L(this.u)};f.aa=function(){if(null==this.u){var a=this.Fa,b=this.j+2;return ie?ie(a,b,null):Xd.call(null,a,b,null)}var a=this.Fa,b=this.j,c=M(this.u);return ie?ie(a,b,c):Xd.call(null,a,b,c)};f.M=function(){return this};f.H=function(a,b){return new he(b,this.Fa,this.j,this.u,this.l)};f.K=function(a,b){return T(b,this)};he.prototype[ta]=function(){return P(this)};
function Xd(a){for(var b=[],c=arguments.length,d=0;;)if(d<c)b.push(arguments[d]),d+=1;else break;switch(b.length){case 1:return Wd(arguments[0]);case 3:return ie(arguments[0],arguments[1],arguments[2]);default:throw Error([B("Invalid arity: "),B(b.length)].join(""));}}function Wd(a){return ie(a,0,null)}
function ie(a,b,c){if(null==c)for(c=a.length;;)if(b<c){if(null!=a[b])return new he(null,a,b,null,null);var d=a[b+1];if(y(d)&&(d=d.Pa(),y(d)))return new he(null,a,b+2,d,null);b+=2}else return null;else return new he(null,a,b,c,null)}function je(a,b,c,d,e){this.m=a;this.Fa=b;this.j=c;this.u=d;this.l=e;this.i=32374860;this.v=0}f=je.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};
f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R(this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.G=function(){return this.m};f.F=function(){var a=this.l;return null!=a?a:this.l=a=Nb(this)};f.o=function(a,b){return bc(this,b)};f.O=function(a,b){return xc(b,this)};f.P=function(a,b,c){return yc(b,c,this)};f.R=function(){return L(this.u)};
f.aa=function(){var a=this.Fa,b=this.j,c=M(this.u);return ke?ke(null,a,b,c):ee.call(null,null,a,b,c)};f.M=function(){return this};f.H=function(a,b){return new je(b,this.Fa,this.j,this.u,this.l)};f.K=function(a,b){return T(b,this)};je.prototype[ta]=function(){return P(this)};
function ee(a){for(var b=[],c=arguments.length,d=0;;)if(d<c)b.push(arguments[d]),d+=1;else break;switch(b.length){case 1:return de(arguments[0]);case 4:return ke(arguments[0],arguments[1],arguments[2],arguments[3]);default:throw Error([B("Invalid arity: "),B(b.length)].join(""));}}function de(a){return ke(null,a,0,null)}function ke(a,b,c,d){if(null==d)for(d=b.length;;)if(c<d){var e=b[c];if(y(e)&&(e=e.Pa(),y(e)))return new je(a,b,c+1,e,null);c+=1}else return null;else return new je(a,b,c,d,null)}
function le(a,b,c){this.Y=a;this.nb=b;this.hb=c}le.prototype.fa=function(){return this.hb&&this.nb.fa()};le.prototype.next=function(){if(this.hb)return this.nb.next();this.hb=!0;return this.Y};le.prototype.remove=function(){return Error("Unsupported operation")};function me(a,b,c,d,e,g){this.m=a;this.h=b;this.root=c;this.ba=d;this.Y=e;this.l=g;this.i=16123663;this.v=8196}f=me.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};
f.keys=function(){return P(Jd.b?Jd.b(this):Jd.call(null,this))};f.entries=function(){return Ed(J(this))};f.values=function(){return P(Kd.b?Kd.b(this):Kd.call(null,this))};f.has=function(a){return I.g(this,a,vc)===vc?!1:!0};f.get=function(a,b){return this.C(null,a,b)};
f.forEach=function(a){for(var b=J(this),c=null,d=0,e=0;;)if(e<d){var g=c.U(null,e),h=hc(g,0,null),g=hc(g,1,null);a.a?a.a(g,h):a.call(null,g,h);e+=1}else if(b=J(b))sc(b)?(c=lb(b),b=mb(b),h=c,d=R(c),c=h):(c=L(b),h=hc(c,0,null),g=hc(c,1,null),a.a?a.a(g,h):a.call(null,g,h),b=M(b),c=null,d=0),e=0;else return null};f.L=function(a,b){return Ja.g(this,b,null)};f.C=function(a,b,c){return null==b?this.ba?this.Y:c:null==this.root?c:this.root.Ja(0,Gb(b),b,c)};
f.Ca=function(){var a=this.root?ob(this.root):Wc;return this.ba?new le(this.Y,a,!1):a};f.G=function(){return this.m};f.T=function(){return this.h};f.F=function(){var a=this.l;return null!=a?a:this.l=a=Pb(this)};f.o=function(a,b){return Cd(this,b)};f.Sa=function(){return new ne({},this.root,this.h,this.ba,this.Y)};
f.Na=function(a,b,c){if(null==b)return this.ba&&c===this.Y?this:new me(this.m,this.ba?this.h:this.h+1,this.root,!0,c,null);a=new Qd;b=(null==this.root?Yd:this.root).ga(0,Gb(b),b,c,a);return b===this.root?this:new me(this.m,a.val?this.h+1:this.h,b,this.ba,this.Y,null)};f.M=function(){if(0<this.h){var a=null!=this.root?this.root.Pa():null;return this.ba?T(new Xc(null,2,5,Yc,[null,this.Y],null),a):a}return null};f.H=function(a,b){return new me(b,this.h,this.root,this.ba,this.Y,this.l)};
f.K=function(a,b){if(rc(b))return Ka(this,D.a(b,0),D.a(b,1));for(var c=this,d=J(b);;){if(null==d)return c;var e=L(d);if(rc(e))c=Ka(c,D.a(e,0),D.a(e,1)),d=M(d);else throw Error("conj on a map takes map entries or seqables of map entries");}};
f.call=function(){var a=null,a=function(a,c,d){switch(arguments.length){case 2:return this.L(null,c);case 3:return this.C(null,c,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a,c){return this.L(null,c)};a.g=function(a,c,d){return this.C(null,c,d)};return a}();f.apply=function(a,b){return this.call.apply(this,[this].concat(va(b)))};f.b=function(a){return this.L(null,a)};f.a=function(a,b){return this.C(null,a,b)};var jc=new me(null,0,null,!1,null,Qb);me.prototype[ta]=function(){return P(this)};
function ne(a,b,c,d,e){this.w=a;this.root=b;this.count=c;this.ba=d;this.Y=e;this.i=258;this.v=56}function oe(a,b,c){if(a.w){if(null==b)a.Y!==c&&(a.Y=c),a.ba||(a.count+=1,a.ba=!0);else{var d=new Qd;b=(null==a.root?Yd:a.root).ha(a.w,0,Gb(b),b,c,d);b!==a.root&&(a.root=b);d.val&&(a.count+=1)}return a}throw Error("assoc! after persistent!");}f=ne.prototype;f.T=function(){if(this.w)return this.count;throw Error("count after persistent!");};
f.L=function(a,b){return null==b?this.ba?this.Y:null:null==this.root?null:this.root.Ja(0,Gb(b),b)};f.C=function(a,b,c){return null==b?this.ba?this.Y:c:null==this.root?c:this.root.Ja(0,Gb(b),b,c)};
f.Wa=function(a,b){var c;a:if(this.w)if(null!=b?b.i&2048||b.sb||(b.i?0:z(Ma,b)):z(Ma,b))c=oe(this,Nd.b?Nd.b(b):Nd.call(null,b),Od.b?Od.b(b):Od.call(null,b));else{c=J(b);for(var d=this;;){var e=L(c);if(y(e))c=M(c),d=oe(d,Nd.b?Nd.b(e):Nd.call(null,e),Od.b?Od.b(e):Od.call(null,e));else{c=d;break a}}}else throw Error("conj! after persistent");return c};f.Xa=function(){var a;if(this.w)this.w=null,a=new me(null,this.count,this.root,this.ba,this.Y,null);else throw Error("persistent! called twice");return a};
f.Oa=function(a,b,c){return oe(this,b,c)};function qe(a,b){this.s=a;this.da=b;this.i=32374988;this.v=0}f=qe.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R(this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.G=function(){return this.da};f.X=function(){var a=(null!=this.s?this.s.i&128||this.s.Ua||(this.s.i?0:z(Ga,this.s)):z(Ga,this.s))?this.s.X(null):M(this.s);return null==a?null:new qe(a,this.da)};f.F=function(){return Nb(this)};
f.o=function(a,b){return bc(this,b)};f.O=function(a,b){return xc(b,this)};f.P=function(a,b,c){return yc(b,c,this)};f.R=function(){return this.s.R(null).eb()};f.aa=function(){var a=(null!=this.s?this.s.i&128||this.s.Ua||(this.s.i?0:z(Ga,this.s)):z(Ga,this.s))?this.s.X(null):M(this.s);return null!=a?new qe(a,this.da):Kb};f.M=function(){return this};f.H=function(a,b){return new qe(this.s,b)};f.K=function(a,b){return T(b,this)};qe.prototype[ta]=function(){return P(this)};
function Jd(a){return(a=J(a))?new qe(a,null):null}function Nd(a){return Na(a)}function re(a,b){this.s=a;this.da=b;this.i=32374988;this.v=0}f=re.prototype;f.toString=function(){return qb(this)};f.equiv=function(a){return this.o(null,a)};f.indexOf=function(){var a=null,a=function(a,c){switch(arguments.length){case 1:return Q(this,a,0);case 2:return Q(this,a,c)}throw Error("Invalid arity: "+arguments.length);};a.b=function(a){return Q(this,a,0)};a.a=function(a,c){return Q(this,a,c)};return a}();
f.lastIndexOf=function(){function a(a){return S(this,a,R(this))}var b=null,b=function(b,d){switch(arguments.length){case 1:return a.call(this,b);case 2:return S(this,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=a;b.a=function(a,b){return S(this,a,b)};return b}();f.G=function(){return this.da};f.X=function(){var a=(null!=this.s?this.s.i&128||this.s.Ua||(this.s.i?0:z(Ga,this.s)):z(Ga,this.s))?this.s.X(null):M(this.s);return null==a?null:new re(a,this.da)};f.F=function(){return Nb(this)};
f.o=function(a,b){return bc(this,b)};f.O=function(a,b){return xc(b,this)};f.P=function(a,b,c){return yc(b,c,this)};f.R=function(){return this.s.R(null).fb()};f.aa=function(){var a=(null!=this.s?this.s.i&128||this.s.Ua||(this.s.i?0:z(Ga,this.s)):z(Ga,this.s))?this.s.X(null):M(this.s);return null!=a?new re(a,this.da):Kb};f.M=function(){return this};f.H=function(a,b){return new re(this.s,b)};f.K=function(a,b){return T(b,this)};re.prototype[ta]=function(){return P(this)};
function Kd(a){return(a=J(a))?new re(a,null):null}function Od(a){return Pa(a)}function Hc(a){if(null!=a&&(a.v&4096||a.ub))return a.name;if("string"===typeof a)return a;throw Error([B("Doesn't support name: "),B(a)].join(""));}
function se(a,b,c,d,e,g,h){var k=na;na=null==na?null:na-1;try{if(null!=na&&0>na)return H(a,"#");H(a,c);if(0===xb.b(g))J(h)&&H(a,function(){var a=te.b(g);return y(a)?a:"..."}());else{if(J(h)){var l=L(h);b.g?b.g(l,a,g):b.call(null,l,a,g)}for(var m=M(h),n=xb.b(g)-1;;)if(!m||null!=n&&0===n){J(m)&&0===n&&(H(a,d),H(a,function(){var a=te.b(g);return y(a)?a:"..."}()));break}else{H(a,d);var p=L(m);c=a;h=g;b.g?b.g(p,c,h):b.call(null,p,c,h);var q=M(m);c=n-1;m=q;n=c}}return H(a,e)}finally{na=k}}
function ue(a,b){for(var c=J(b),d=null,e=0,g=0;;)if(g<e){var h=d.U(null,g);H(a,h);g+=1}else if(c=J(c))d=c,sc(d)?(c=lb(d),e=mb(d),d=c,h=R(c),c=e,e=h):(h=L(d),H(a,h),c=M(d),d=null,e=0),g=0;else return null}var ve={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"};function we(a){return[B('"'),B(a.replace(RegExp('[\\\\"\b\f\n\r\t]',"g"),function(a){return ve[a]})),B('"')].join("")}
function xe(a,b){var c=wc(I.a(a,ub));return c?(c=null!=b?b.i&131072||b.tb?!0:!1:!1)?null!=oc(b):c:c}
function ye(a,b,c){if(null==a)return H(b,"nil");if(xe(c,a)){H(b,"^");var d=oc(a);Y.g?Y.g(d,b,c):Y.call(null,d,b,c);H(b," ")}if(a.mb)return a.xb(b);if(null!=a&&(a.i&2147483648||a.V))return a.I(null,b,c);if(!0===a||!1===a||"number"===typeof a)return H(b,""+B(a));if(null!=a&&a.constructor===Object)return H(b,"#js "),d=W.a(function(b){return new Xc(null,2,5,Yc,[Gc.b(b),a[b]],null)},tc(a)),ze.Z?ze.Z(d,Y,b,c):ze.call(null,d,Y,b,c);if(qa(a))return se(b,Y,"#js ["," ","]",c,a);if("string"==typeof a)return y(tb.b(c))?
H(b,we(a)):H(b,a);if("function"==t(a)){var e=a.name;c=y(function(){var a=null==e;return a?a:/^[\s\xa0]*$/.test(e)}())?"Function":e;return ue(b,dc(["#object[",c,' "',""+B(a),'"]'],0))}if(a instanceof Date)return c=function(a,b){for(var c=""+B(a);;)if(R(c)<b)c=[B("0"),B(c)].join("");else return c},ue(b,dc(['#inst "',""+B(a.getUTCFullYear()),"-",c(a.getUTCMonth()+1,2),"-",c(a.getUTCDate(),2),"T",c(a.getUTCHours(),2),":",c(a.getUTCMinutes(),2),":",c(a.getUTCSeconds(),2),".",c(a.getUTCMilliseconds(),3),
"-",'00:00"'],0));if(a instanceof RegExp)return ue(b,dc(['#"',a.source,'"'],0));if(y(a.constructor.Ya))return ue(b,dc(["#object[",a.constructor.Ya.replace(RegExp("/","g"),"."),"]"],0));e=a.constructor.name;c=y(function(){var a=null==e;return a?a:/^[\s\xa0]*$/.test(e)}())?"Object":e;return ue(b,dc(["#object[",c," ",""+B(a),"]"],0))}function Y(a,b,c){var d=Ae.b(c);return y(d)?(c=ic.g(c,Be,ye),d.g?d.g(a,b,c):d.call(null,a,b,c)):ye(a,b,c)}
function ze(a,b,c,d){return se(c,function(a,c,d){var k=Na(a);b.g?b.g(k,c,d):b.call(null,k,c,d);H(c," ");a=Pa(a);return b.g?b.g(a,c,d):b.call(null,a,c,d)},"{",", ","}",d,J(a))}K.prototype.V=!0;K.prototype.I=function(a,b,c){return se(b,Y,"("," ",")",c,this)};Ic.prototype.V=!0;Ic.prototype.I=function(a,b,c){return se(b,Y,"("," ",")",c,this)};he.prototype.V=!0;he.prototype.I=function(a,b,c){return se(b,Y,"("," ",")",c,this)};Gd.prototype.V=!0;
Gd.prototype.I=function(a,b,c){return se(b,Y,"("," ",")",c,this)};sd.prototype.V=!0;sd.prototype.I=function(a,b,c){return se(b,Y,"("," ",")",c,this)};Fc.prototype.V=!0;Fc.prototype.I=function(a,b,c){return se(b,Y,"("," ",")",c,this)};me.prototype.V=!0;me.prototype.I=function(a,b,c){return ze(this,Y,b,c)};je.prototype.V=!0;je.prototype.I=function(a,b,c){return se(b,Y,"("," ",")",c,this)};wd.prototype.V=!0;wd.prototype.I=function(a,b,c){return se(b,Y,"["," ","]",c,this)};Nc.prototype.V=!0;
Nc.prototype.I=function(a,b,c){return se(b,Y,"("," ",")",c,this)};re.prototype.V=!0;re.prototype.I=function(a,b,c){return se(b,Y,"("," ",")",c,this)};Xc.prototype.V=!0;Xc.prototype.I=function(a,b,c){return se(b,Y,"["," ","]",c,this)};Dc.prototype.V=!0;Dc.prototype.I=function(a,b){return H(b,"()")};rb.prototype.V=!0;rb.prototype.I=function(a,b,c){return ze(this,Y,b,c)};qe.prototype.V=!0;qe.prototype.I=function(a,b,c){return se(b,Y,"("," ",")",c,this)};Cc.prototype.V=!0;
Cc.prototype.I=function(a,b,c){return se(b,Y,"("," ",")",c,this)};var ub=new V(null,"meta","meta",1499536964),wb=new V(null,"dup","dup",556298533),Be=new V(null,"fallback-impl","fallback-impl",-1501286995),sb=new V(null,"flush-on-newline","flush-on-newline",-151457939),tb=new V(null,"readably","readably",1129599760),te=new V(null,"more-marker","more-marker",-14717935),xb=new V(null,"print-length","print-length",1931866356),ad=new Ib(null,"quote","quote",1377916282,null),$c=new V(null,"arglists","arglists",1661989754),Zc=new Ib(null,"nil-iter","nil-iter",1101030523,
null),Ae=new V(null,"alt-impl","alt-impl",670969595);var ja=function(){function a(a){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new K(e,0)}return b.call(this,d)}function b(a){return console.log.apply(console,ya?xa(a):wa.call(null,a))}a.N=0;a.J=function(a){a=J(a);return b(a)};a.B=b;return a}(),la=function(){function a(a){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new K(e,0)}return b.call(this,d)}function b(a){return console.error.apply(console,
ya?xa(a):wa.call(null,a))}a.N=0;a.J=function(a){a=J(a);return b(a)};a.B=b;return a}(),Ce=new Worker("js/worker.js");Ce.onmessage=function(a){return document.getElementById("preview").contentWindow.replace_article.call(null,a.data.html)};if("undefined"===typeof De)var De=Ce;
window.onload=function(){var a=document.getElementById("editor"),b=CodeMirror.fromTextArea(a,{mode:"markdown",lineNumbers:!0,lineWrapping:!0,autofocus:!0,theme:"neo",size:{width:"100%",height:"100%"}}),a=function(a,b){return function(){var a=b.getValue();return De.postMessage(a)}}(a,b);b.on("change",a);return a()};
})();
