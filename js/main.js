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
var g;
function l(b){var a=typeof b;if("object"==a)if(b){if(b instanceof Array)return"array";if(b instanceof Object)return a;var c=Object.prototype.toString.call(b);if("[object Window]"==c)return"object";if("[object Array]"==c||"number"==typeof b.length&&"undefined"!=typeof b.splice&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("splice"))return"array";if("[object Function]"==c||"undefined"!=typeof b.call&&"undefined"!=typeof b.propertyIsEnumerable&&!b.propertyIsEnumerable("call"))return"function"}else return"null";else if("function"==
a&&"undefined"==typeof b.call)return"object";return a}var aa="closure_uid_"+(1E9*Math.random()>>>0),ba=0;var da=String.prototype.repeat?function(b,a){return b.repeat(a)}:function(b,a){return Array(a+1).join(b)};function ea(b,a){for(var c in b)a.call(void 0,b[c],c,b)};function fa(b,a){null!=b&&this.append.apply(this,arguments)}g=fa.prototype;g.pb="";g.set=function(b){this.pb=""+b};g.append=function(b,a,c){this.pb+=b;if(null!=a)for(var d=1;d<arguments.length;d++)this.pb+=arguments[d];return this};g.clear=function(){this.pb=""};g.toString=function(){return this.pb};function ga(b,a){return b>a?1:b<a?-1:0};var ha={},ia;if("undefined"===typeof ja)var ja=function(){throw Error("No *print-fn* fn set for evaluation environment");};if("undefined"===typeof ka)var ka=function(){throw Error("No *print-err-fn* fn set for evaluation environment");};var la=!0,ma=null;if("undefined"===typeof na)var na=null;function oa(){return new p(null,5,[pa,!0,qa,!0,ra,!1,sa,!1,ta,null],null)}function q(b){return null!=b&&!1!==b}function ua(b){return b instanceof Array}function va(b){return null==b?!0:!1===b?!0:!1}
function r(b,a){return b[l(null==a?null:a)]?!0:b._?!0:!1}function t(b,a){var c=null==a?null:a.constructor,c=q(q(c)?c.tc:c)?c.Zb:l(a);return Error(["No protocol method ",b," defined for type ",c,": ",a].join(""))}function wa(b){var a=b.Zb;return q(a)?a:""+u(b)}var xa="undefined"!==typeof Symbol&&"function"===l(Symbol)?Symbol.iterator:"@@iterator";
function ya(){if("undefined"!==typeof performance&&null!=performance.now)return performance.now();if("undefined"!==typeof process&&null!=process.Sc){var b=process.Sc();return(1E9*b[0]+b[1])/1E6}return(new Date).getTime()}function za(b){for(var a=b.length,c=Array(a),d=0;;)if(d<a)c[d]=b[d],d+=1;else break;return c}
function Aa(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 1:return Ba(arguments[0]);case 2:return Ba(arguments[1]);default:throw Error([u("Invalid arity: "),u(a.length)].join(""));}}function Da(b){return Ba(b)}function Ba(b){function a(a,b){a.push(b);return a}var c=[];return Ea?Ea(a,c,b):Fa.call(null,a,c,b)}function Ga(){}
var Ha=function Ha(a){if(null!=a&&null!=a.Y)return a.Y(a);var c=Ha[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=Ha._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("ICounted.-count",a);},Ia=function Ia(a){if(null!=a&&null!=a.ba)return a.ba(a);var c=Ia[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=Ia._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IEmptyableCollection.-empty",a);},Ja=function Ja(a,c){if(null!=a&&null!=a.V)return a.V(a,c);var d=Ja[l(null==
a?null:a)];if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);d=Ja._;if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);throw t("ICollection.-conj",a);};function Ka(){}var w=function w(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 2:return w.b(arguments[0],arguments[1]);case 3:return w.c(arguments[0],arguments[1],arguments[2]);default:throw Error([u("Invalid arity: "),u(c.length)].join(""));}};
w.b=function(b,a){if(null!=b&&null!=b.R)return b.R(b,a);var c=w[l(null==b?null:b)];if(null!=c)return c.b?c.b(b,a):c.call(null,b,a);c=w._;if(null!=c)return c.b?c.b(b,a):c.call(null,b,a);throw t("IIndexed.-nth",b);};w.c=function(b,a,c){if(null!=b&&null!=b.va)return b.va(b,a,c);var d=w[l(null==b?null:b)];if(null!=d)return d.c?d.c(b,a,c):d.call(null,b,a,c);d=w._;if(null!=d)return d.c?d.c(b,a,c):d.call(null,b,a,c);throw t("IIndexed.-nth",b);};w.C=3;function La(){}
var Ma=function Ma(a){if(null!=a&&null!=a.ha)return a.ha(a);var c=Ma[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=Ma._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("ISeq.-first",a);},Na=function Na(a){if(null!=a&&null!=a.qa)return a.qa(a);var c=Na[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=Na._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("ISeq.-rest",a);};function Oa(){}function Pa(){}
var Qa=function Qa(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 2:return Qa.b(arguments[0],arguments[1]);case 3:return Qa.c(arguments[0],arguments[1],arguments[2]);default:throw Error([u("Invalid arity: "),u(c.length)].join(""));}};
Qa.b=function(b,a){if(null!=b&&null!=b.J)return b.J(b,a);var c=Qa[l(null==b?null:b)];if(null!=c)return c.b?c.b(b,a):c.call(null,b,a);c=Qa._;if(null!=c)return c.b?c.b(b,a):c.call(null,b,a);throw t("ILookup.-lookup",b);};Qa.c=function(b,a,c){if(null!=b&&null!=b.H)return b.H(b,a,c);var d=Qa[l(null==b?null:b)];if(null!=d)return d.c?d.c(b,a,c):d.call(null,b,a,c);d=Qa._;if(null!=d)return d.c?d.c(b,a,c):d.call(null,b,a,c);throw t("ILookup.-lookup",b);};Qa.C=3;
var Ra=function Ra(a,c){if(null!=a&&null!=a.Db)return a.Db(a,c);var d=Ra[l(null==a?null:a)];if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);d=Ra._;if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);throw t("IAssociative.-contains-key?",a);},Sa=function Sa(a,c,d){if(null!=a&&null!=a.Ia)return a.Ia(a,c,d);var e=Sa[l(null==a?null:a)];if(null!=e)return e.c?e.c(a,c,d):e.call(null,a,c,d);e=Sa._;if(null!=e)return e.c?e.c(a,c,d):e.call(null,a,c,d);throw t("IAssociative.-assoc",a);};function Ta(){}
var Ua=function Ua(a,c){if(null!=a&&null!=a.rb)return a.rb(a,c);var d=Ua[l(null==a?null:a)];if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);d=Ua._;if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);throw t("IMap.-dissoc",a);};function Va(){}
var Wa=function Wa(a){if(null!=a&&null!=a.Lb)return a.Lb(a);var c=Wa[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=Wa._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IMapEntry.-key",a);},Xa=function Xa(a){if(null!=a&&null!=a.Mb)return a.Mb(a);var c=Xa[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=Xa._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IMapEntry.-val",a);};function Ya(){}
var $a=function $a(a){if(null!=a&&null!=a.Sa)return a.Sa(a);var c=$a[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=$a._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IStack.-peek",a);},ab=function ab(a){if(null!=a&&null!=a.Ta)return a.Ta(a);var c=ab[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=ab._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IStack.-pop",a);};function bb(){}
var db=function db(a,c,d){if(null!=a&&null!=a.jb)return a.jb(a,c,d);var e=db[l(null==a?null:a)];if(null!=e)return e.c?e.c(a,c,d):e.call(null,a,c,d);e=db._;if(null!=e)return e.c?e.c(a,c,d):e.call(null,a,c,d);throw t("IVector.-assoc-n",a);},eb=function eb(a){if(null!=a&&null!=a.fc)return a.fc(a);var c=eb[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=eb._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IDeref.-deref",a);};function fb(){}
var hb=function hb(a){if(null!=a&&null!=a.S)return a.S(a);var c=hb[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=hb._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IMeta.-meta",a);};function ib(){}var jb=function jb(a,c){if(null!=a&&null!=a.T)return a.T(a,c);var d=jb[l(null==a?null:a)];if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);d=jb._;if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);throw t("IWithMeta.-with-meta",a);};function kb(){}
var nb=function nb(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 2:return nb.b(arguments[0],arguments[1]);case 3:return nb.c(arguments[0],arguments[1],arguments[2]);default:throw Error([u("Invalid arity: "),u(c.length)].join(""));}};
nb.b=function(b,a){if(null!=b&&null!=b.ja)return b.ja(b,a);var c=nb[l(null==b?null:b)];if(null!=c)return c.b?c.b(b,a):c.call(null,b,a);c=nb._;if(null!=c)return c.b?c.b(b,a):c.call(null,b,a);throw t("IReduce.-reduce",b);};nb.c=function(b,a,c){if(null!=b&&null!=b.ka)return b.ka(b,a,c);var d=nb[l(null==b?null:b)];if(null!=d)return d.c?d.c(b,a,c):d.call(null,b,a,c);d=nb._;if(null!=d)return d.c?d.c(b,a,c):d.call(null,b,a,c);throw t("IReduce.-reduce",b);};nb.C=3;
var ob=function ob(a,c){if(null!=a&&null!=a.A)return a.A(a,c);var d=ob[l(null==a?null:a)];if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);d=ob._;if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);throw t("IEquiv.-equiv",a);},pb=function pb(a){if(null!=a&&null!=a.P)return a.P(a);var c=pb[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=pb._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IHash.-hash",a);};function qb(){}
var sb=function sb(a){if(null!=a&&null!=a.X)return a.X(a);var c=sb[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=sb._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("ISeqable.-seq",a);};function tb(){}function ub(){}function vb(){}
var wb=function wb(a){if(null!=a&&null!=a.Fb)return a.Fb(a);var c=wb[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=wb._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IReversible.-rseq",a);},xb=function xb(a,c){if(null!=a&&null!=a.sc)return a.sc(0,c);var d=xb[l(null==a?null:a)];if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);d=xb._;if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);throw t("IWriter.-write",a);},yb=function yb(a,c,d){if(null!=a&&null!=a.M)return a.M(a,c,d);var e=
yb[l(null==a?null:a)];if(null!=e)return e.c?e.c(a,c,d):e.call(null,a,c,d);e=yb._;if(null!=e)return e.c?e.c(a,c,d):e.call(null,a,c,d);throw t("IPrintWithWriter.-pr-writer",a);},Ab=function Ab(a,c,d){if(null!=a&&null!=a.rc)return a.rc(0,c,d);var e=Ab[l(null==a?null:a)];if(null!=e)return e.c?e.c(a,c,d):e.call(null,a,c,d);e=Ab._;if(null!=e)return e.c?e.c(a,c,d):e.call(null,a,c,d);throw t("IWatchable.-notify-watches",a);},Bb=function Bb(a){if(null!=a&&null!=a.Eb)return a.Eb(a);var c=Bb[l(null==a?null:
a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=Bb._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IEditableCollection.-as-transient",a);},Cb=function Cb(a,c){if(null!=a&&null!=a.vb)return a.vb(a,c);var d=Cb[l(null==a?null:a)];if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);d=Cb._;if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);throw t("ITransientCollection.-conj!",a);},Db=function Db(a){if(null!=a&&null!=a.Gb)return a.Gb(a);var c=Db[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,
a);c=Db._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("ITransientCollection.-persistent!",a);},Eb=function Eb(a,c,d){if(null!=a&&null!=a.Nb)return a.Nb(a,c,d);var e=Eb[l(null==a?null:a)];if(null!=e)return e.c?e.c(a,c,d):e.call(null,a,c,d);e=Eb._;if(null!=e)return e.c?e.c(a,c,d):e.call(null,a,c,d);throw t("ITransientAssociative.-assoc!",a);},Fb=function Fb(a,c,d){if(null!=a&&null!=a.qc)return a.qc(0,c,d);var e=Fb[l(null==a?null:a)];if(null!=e)return e.c?e.c(a,c,d):e.call(null,a,c,d);e=Fb._;
if(null!=e)return e.c?e.c(a,c,d):e.call(null,a,c,d);throw t("ITransientVector.-assoc-n!",a);};function Gb(){}
var Ib=function Ib(a,c){if(null!=a&&null!=a.qb)return a.qb(a,c);var d=Ib[l(null==a?null:a)];if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);d=Ib._;if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);throw t("IComparable.-compare",a);},Jb=function Jb(a){if(null!=a&&null!=a.oc)return a.oc();var c=Jb[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=Jb._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IChunk.-drop-first",a);},Kb=function Kb(a){if(null!=a&&null!=a.dc)return a.dc(a);var c=
Kb[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=Kb._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IChunkedSeq.-chunked-first",a);},Lb=function Lb(a){if(null!=a&&null!=a.ec)return a.ec(a);var c=Lb[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=Lb._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IChunkedSeq.-chunked-rest",a);},Mb=function Mb(a){if(null!=a&&null!=a.cc)return a.cc(a);var c=Mb[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,
a);c=Mb._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IChunkedNext.-chunked-next",a);},Nb=function Nb(a,c){if(null!=a&&null!=a.Jc)return a.Jc(a,c);var d=Nb[l(null==a?null:a)];if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);d=Nb._;if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);throw t("IReset.-reset!",a);},Ob=function Ob(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 2:return Ob.b(arguments[0],arguments[1]);case 3:return Ob.c(arguments[0],
arguments[1],arguments[2]);case 4:return Ob.I(arguments[0],arguments[1],arguments[2],arguments[3]);case 5:return Ob.W(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);default:throw Error([u("Invalid arity: "),u(c.length)].join(""));}};Ob.b=function(b,a){if(null!=b&&null!=b.Lc)return b.Lc(b,a);var c=Ob[l(null==b?null:b)];if(null!=c)return c.b?c.b(b,a):c.call(null,b,a);c=Ob._;if(null!=c)return c.b?c.b(b,a):c.call(null,b,a);throw t("ISwap.-swap!",b);};
Ob.c=function(b,a,c){if(null!=b&&null!=b.Mc)return b.Mc(b,a,c);var d=Ob[l(null==b?null:b)];if(null!=d)return d.c?d.c(b,a,c):d.call(null,b,a,c);d=Ob._;if(null!=d)return d.c?d.c(b,a,c):d.call(null,b,a,c);throw t("ISwap.-swap!",b);};Ob.I=function(b,a,c,d){if(null!=b&&null!=b.Nc)return b.Nc(b,a,c,d);var e=Ob[l(null==b?null:b)];if(null!=e)return e.I?e.I(b,a,c,d):e.call(null,b,a,c,d);e=Ob._;if(null!=e)return e.I?e.I(b,a,c,d):e.call(null,b,a,c,d);throw t("ISwap.-swap!",b);};
Ob.W=function(b,a,c,d,e){if(null!=b&&null!=b.Oc)return b.Oc(b,a,c,d,e);var f=Ob[l(null==b?null:b)];if(null!=f)return f.W?f.W(b,a,c,d,e):f.call(null,b,a,c,d,e);f=Ob._;if(null!=f)return f.W?f.W(b,a,c,d,e):f.call(null,b,a,c,d,e);throw t("ISwap.-swap!",b);};Ob.C=5;var Pb=function Pb(a){if(null!=a&&null!=a.Ea)return a.Ea(a);var c=Pb[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=Pb._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("IIterable.-iterator",a);};
function Qb(b){this.Wc=b;this.m=1073741824;this.F=0}Qb.prototype.sc=function(b,a){return this.Wc.append(a)};function Rb(b){var a=new fa;b.M(null,new Qb(a),oa());return""+u(a)}var Tb="undefined"!==typeof Math.imul&&0!==Math.imul(4294967295,5)?function(b,a){return Math.imul(b,a)}:function(b,a){var c=b&65535,d=a&65535;return c*d+((b>>>16&65535)*d+c*(a>>>16&65535)<<16>>>0)|0};function Ub(b){b=Tb(b|0,-862048943);return Tb(b<<15|b>>>-15,461845907)}
function Vb(b,a){var c=(b|0)^(a|0);return Tb(c<<13|c>>>-13,5)+-430675100|0}function Xb(b,a){var c=(b|0)^a,c=Tb(c^c>>>16,-2048144789),c=Tb(c^c>>>13,-1028477387);return c^c>>>16}function Yb(b){var a;a:{a=1;for(var c=0;;)if(a<b.length){var d=a+2,c=Vb(c,Ub(b.charCodeAt(a-1)|b.charCodeAt(a)<<16));a=d}else{a=c;break a}}a=1===(b.length&1)?a^Ub(b.charCodeAt(b.length-1)):a;return Xb(a,Tb(2,b.length))}var Zb={},$b=0;
function ac(b){255<$b&&(Zb={},$b=0);var a=Zb[b];if("number"!==typeof a){a:if(null!=b)if(a=b.length,0<a)for(var c=0,d=0;;)if(c<a)var e=c+1,d=Tb(31,d)+b.charCodeAt(c),c=e;else{a=d;break a}else a=0;else a=0;Zb[b]=a;$b+=1}return b=a}
function bc(b){if(null!=b&&(b.m&4194304||b.Zc))return b.P(null);if("number"===typeof b){if(q(isFinite(b)))return Math.floor(b)%2147483647;switch(b){case Infinity:return 2146435072;case -Infinity:return-1048576;default:return 2146959360}}else return!0===b?b=1:!1===b?b=0:"string"===typeof b?(b=ac(b),0!==b&&(b=Ub(b),b=Vb(0,b),b=Xb(b,4))):b=b instanceof Date?b.valueOf():null==b?0:pb(b),b}function cc(b,a){return b^a+2654435769+(b<<6)+(b>>2)}
function dc(b,a){if(b.Va===a.Va)return 0;var c=va(b.ya);if(q(c?a.ya:c))return-1;if(q(b.ya)){if(va(a.ya))return 1;c=ga(b.ya,a.ya);return 0===c?ga(b.name,a.name):c}return ga(b.name,a.name)}function fc(b,a,c,d,e){this.ya=b;this.name=a;this.Va=c;this.Cb=d;this.za=e;this.m=2154168321;this.F=4096}g=fc.prototype;g.toString=function(){return this.Va};g.equiv=function(b){return this.A(null,b)};g.A=function(b,a){return a instanceof fc?this.Va===a.Va:!1};
g.call=function(){function b(a,b,c){return x.c?x.c(b,this,c):x.call(null,b,this,c)}function a(a,b){return x.b?x.b(b,this):x.call(null,b,this)}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return a.call(this,0,e);case 3:return b.call(this,0,e,f)}throw Error("Invalid arity: "+arguments.length);};c.b=a;c.c=b;return c}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};g.a=function(b){return x.b?x.b(b,this):x.call(null,b,this)};
g.b=function(b,a){return x.c?x.c(b,this,a):x.call(null,b,this,a)};g.S=function(){return this.za};g.T=function(b,a){return new fc(this.ya,this.name,this.Va,this.Cb,a)};g.P=function(){var b=this.Cb;return null!=b?b:this.Cb=b=cc(Yb(this.name),ac(this.ya))};g.M=function(b,a){return xb(a,this.Va)};
function y(b){if(null==b)return null;if(null!=b&&(b.m&8388608||b.Kc))return b.X(null);if(ua(b)||"string"===typeof b)return 0===b.length?null:new C(b,0,null);if(r(qb,b))return sb(b);throw Error([u(b),u(" is not ISeqable")].join(""));}function D(b){if(null==b)return null;if(null!=b&&(b.m&64||b.pa))return b.ha(null);b=y(b);return null==b?null:Ma(b)}function gc(b){return null!=b?null!=b&&(b.m&64||b.pa)?b.qa(null):(b=y(b))?Na(b):hc:hc}
function E(b){return null==b?null:null!=b&&(b.m&128||b.Yb)?b.wa(null):y(gc(b))}var G=function G(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 1:return G.a(arguments[0]);case 2:return G.b(arguments[0],arguments[1]);default:return G.h(arguments[0],arguments[1],new C(c.slice(2),0,null))}};G.a=function(){return!0};G.b=function(b,a){return null==b?null==a:b===a||ob(b,a)};
G.h=function(b,a,c){for(;;)if(G.b(b,a))if(E(c))b=a,a=D(c),c=E(c);else return G.b(a,D(c));else return!1};G.B=function(b){var a=D(b),c=E(b);b=D(c);c=E(c);return G.h(a,b,c)};G.C=2;function ic(b){this.L=b}ic.prototype.next=function(){if(null!=this.L){var b=D(this.L);this.L=E(this.L);return{value:b,done:!1}}return{value:null,done:!0}};function jc(b){return new ic(y(b))}function kc(b,a){var c=Ub(b),c=Vb(0,c);return Xb(c,a)}
function lc(b){var a=0,c=1;for(b=y(b);;)if(null!=b)a+=1,c=Tb(31,c)+bc(D(b))|0,b=E(b);else return kc(c,a)}var nc=kc(1,0);function oc(b){var a=0,c=0;for(b=y(b);;)if(null!=b)a+=1,c=c+bc(D(b))|0,b=E(b);else return kc(c,a)}var pc=kc(0,0);Ga["null"]=!0;Ha["null"]=function(){return 0};Date.prototype.A=function(b,a){return a instanceof Date&&this.valueOf()===a.valueOf()};Date.prototype.Kb=!0;
Date.prototype.qb=function(b,a){if(a instanceof Date)return ga(this.valueOf(),a.valueOf());throw Error([u("Cannot compare "),u(this),u(" to "),u(a)].join(""));};ob.number=function(b,a){return b===a};fb["function"]=!0;hb["function"]=function(){return null};pb._=function(b){return b[aa]||(b[aa]=++ba)};function qc(b){return eb(b)}function rc(b,a){var c=Ha(b);if(0===c)return a.G?a.G():a.call(null);for(var d=w.b(b,0),e=1;;)if(e<c)var f=w.b(b,e),d=a.b?a.b(d,f):a.call(null,d,f),e=e+1;else return d}
function sc(b,a,c){var d=Ha(b),e=c;for(c=0;;)if(c<d){var f=w.b(b,c),e=a.b?a.b(e,f):a.call(null,e,f);c+=1}else return e}function tc(b,a){var c=b.length;if(0===b.length)return a.G?a.G():a.call(null);for(var d=b[0],e=1;;)if(e<c)var f=b[e],d=a.b?a.b(d,f):a.call(null,d,f),e=e+1;else return d}function uc(b,a,c){var d=b.length,e=c;for(c=0;;)if(c<d){var f=b[c],e=a.b?a.b(e,f):a.call(null,e,f);c+=1}else return e}
function vc(b,a,c,d){for(var e=b.length;;)if(d<e){var f=b[d];c=a.b?a.b(c,f):a.call(null,c,f);d+=1}else return c}function xc(b){return null!=b?b.m&2||b.Ac?!0:b.m?!1:r(Ga,b):r(Ga,b)}function yc(b){return null!=b?b.m&16||b.pc?!0:b.m?!1:r(Ka,b):r(Ka,b)}function H(b,a,c){var d=J.a?J.a(b):J.call(null,b);if(c>=d)return-1;!(0<c)&&0>c&&(c+=d,c=0>c?0:c);for(;;)if(c<d){if(G.b(zc?zc(b,c):Ac.call(null,b,c),a))return c;c+=1}else return-1}
function K(b,a,c){var d=J.a?J.a(b):J.call(null,b);if(0===d)return-1;0<c?(--d,c=d<c?d:c):c=0>c?d+c:c;for(;;)if(0<=c){if(G.b(zc?zc(b,c):Ac.call(null,b,c),a))return c;--c}else return-1}function Bc(b,a){this.g=b;this.w=a}Bc.prototype.oa=function(){return this.w<this.g.length};Bc.prototype.next=function(){var b=this.g[this.w];this.w+=1;return b};function C(b,a,c){this.g=b;this.w=a;this.o=c;this.m=166592766;this.F=8192}g=C.prototype;g.toString=function(){return Rb(this)};
g.equiv=function(b){return this.A(null,b)};g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J.a?J.a(this):J.call(null,this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.R=function(b,a){var c=a+this.w;return c<this.g.length?this.g[c]:null};g.va=function(b,a,c){b=a+this.w;return b<this.g.length?this.g[b]:c};g.Ea=function(){return new Bc(this.g,this.w)};g.S=function(){return this.o};
g.wa=function(){return this.w+1<this.g.length?new C(this.g,this.w+1,null):null};g.Y=function(){var b=this.g.length-this.w;return 0>b?0:b};g.Fb=function(){var b=Ha(this);return 0<b?new Cc(this,b-1,null):null};g.P=function(){return lc(this)};g.A=function(b,a){return Dc.b?Dc.b(this,a):Dc.call(null,this,a)};g.ba=function(){return hc};g.ja=function(b,a){return vc(this.g,a,this.g[this.w],this.w+1)};g.ka=function(b,a,c){return vc(this.g,a,c,this.w)};g.ha=function(){return this.g[this.w]};
g.qa=function(){return this.w+1<this.g.length?new C(this.g,this.w+1,null):hc};g.X=function(){return this.w<this.g.length?this:null};g.T=function(b,a){return new C(this.g,this.w,a)};g.V=function(b,a){return L.b?L.b(a,this):L.call(null,a,this)};C.prototype[xa]=function(){return jc(this)};function Ec(b,a){return a<b.length?new C(b,a,null):null}
function M(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 1:return Ec(arguments[0],0);case 2:return Ec(arguments[0],arguments[1]);default:throw Error([u("Invalid arity: "),u(a.length)].join(""));}}function Cc(b,a,c){this.Wb=b;this.w=a;this.o=c;this.m=32374990;this.F=8192}g=Cc.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};
g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J.a?J.a(this):J.call(null,this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.o};g.wa=function(){return 0<this.w?new Cc(this.Wb,this.w-1,null):null};g.Y=function(){return this.w+1};g.P=function(){return lc(this)};
g.A=function(b,a){return Dc.b?Dc.b(this,a):Dc.call(null,this,a)};g.ba=function(){var b=this.o;return Fc.b?Fc.b(hc,b):Fc.call(null,hc,b)};g.ja=function(b,a){return Gc?Gc(a,this):Hc.call(null,a,this)};g.ka=function(b,a,c){return Ic?Ic(a,c,this):Hc.call(null,a,c,this)};g.ha=function(){return w.b(this.Wb,this.w)};g.qa=function(){return 0<this.w?new Cc(this.Wb,this.w-1,null):hc};g.X=function(){return this};g.T=function(b,a){return new Cc(this.Wb,this.w,a)};
g.V=function(b,a){return L.b?L.b(a,this):L.call(null,a,this)};Cc.prototype[xa]=function(){return jc(this)};function Jc(b){return D(E(b))}function Kc(b){for(;;){var a=E(b);if(null!=a)b=a;else return D(b)}}ob._=function(b,a){return b===a};
var Lc=function Lc(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 0:return Lc.G();case 1:return Lc.a(arguments[0]);case 2:return Lc.b(arguments[0],arguments[1]);default:return Lc.h(arguments[0],arguments[1],new C(c.slice(2),0,null))}};Lc.G=function(){return Mc};Lc.a=function(b){return b};Lc.b=function(b,a){return null!=b?Ja(b,a):Ja(hc,a)};Lc.h=function(b,a,c){for(;;)if(q(c))b=Lc.b(b,a),a=D(c),c=E(c);else return Lc.b(b,a)};
Lc.B=function(b){var a=D(b),c=E(b);b=D(c);c=E(c);return Lc.h(a,b,c)};Lc.C=2;function J(b){if(null!=b)if(null!=b&&(b.m&2||b.Ac))b=b.Y(null);else if(ua(b))b=b.length;else if("string"===typeof b)b=b.length;else if(null!=b&&(b.m&8388608||b.Kc))a:{b=y(b);for(var a=0;;){if(xc(b)){b=a+Ha(b);break a}b=E(b);a+=1}}else b=Ha(b);else b=0;return b}function Nc(b,a,c){for(;;){if(null==b)return c;if(0===a)return y(b)?D(b):c;if(yc(b))return w.c(b,a,c);if(y(b))b=E(b),--a;else return c}}
function Ac(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 2:return zc(arguments[0],arguments[1]);case 3:return N(arguments[0],arguments[1],arguments[2]);default:throw Error([u("Invalid arity: "),u(a.length)].join(""));}}
function zc(b,a){if("number"!==typeof a)throw Error("index argument to nth must be a number");if(null==b)return b;if(null!=b&&(b.m&16||b.pc))return b.R(null,a);if(ua(b))return a<b.length?b[a]:null;if("string"===typeof b)return a<b.length?b.charAt(a):null;if(null!=b&&(b.m&64||b.pa)){var c;a:{c=b;for(var d=a;;){if(null==c)throw Error("Index out of bounds");if(0===d){if(y(c)){c=D(c);break a}throw Error("Index out of bounds");}if(yc(c)){c=w.b(c,d);break a}if(y(c))c=E(c),--d;else throw Error("Index out of bounds");
}}return c}if(r(Ka,b))return w.b(b,a);throw Error([u("nth not supported on this type "),u(wa(null==b?null:b.constructor))].join(""));}
function N(b,a,c){if("number"!==typeof a)throw Error("index argument to nth must be a number.");if(null==b)return c;if(null!=b&&(b.m&16||b.pc))return b.va(null,a,c);if(ua(b))return a<b.length?b[a]:c;if("string"===typeof b)return a<b.length?b.charAt(a):c;if(null!=b&&(b.m&64||b.pa))return Nc(b,a,c);if(r(Ka,b))return w.b(b,a);throw Error([u("nth not supported on this type "),u(wa(null==b?null:b.constructor))].join(""));}
var x=function x(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 2:return x.b(arguments[0],arguments[1]);case 3:return x.c(arguments[0],arguments[1],arguments[2]);default:throw Error([u("Invalid arity: "),u(c.length)].join(""));}};x.b=function(b,a){return null==b?null:null!=b&&(b.m&256||b.Dc)?b.J(null,a):ua(b)?a<b.length?b[a|0]:null:"string"===typeof b?a<b.length?b[a|0]:null:r(Pa,b)?Qa.b(b,a):null};
x.c=function(b,a,c){return null!=b?null!=b&&(b.m&256||b.Dc)?b.H(null,a,c):ua(b)?a<b.length?b[a]:c:"string"===typeof b?a<b.length?b[a]:c:r(Pa,b)?Qa.c(b,a,c):c:c};x.C=3;var O=function O(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 3:return O.c(arguments[0],arguments[1],arguments[2]);default:return O.h(arguments[0],arguments[1],arguments[2],new C(c.slice(3),0,null))}};O.c=function(b,a,c){return null!=b?Sa(b,a,c):Oc([a],[c])};
O.h=function(b,a,c,d){for(;;)if(b=O.c(b,a,c),q(d))a=D(d),c=D(E(d)),d=E(E(d));else return b};O.B=function(b){var a=D(b),c=E(b);b=D(c);var d=E(c),c=D(d),d=E(d);return O.h(a,b,c,d)};O.C=3;var Qc=function Qc(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 1:return Qc.a(arguments[0]);case 2:return Qc.b(arguments[0],arguments[1]);default:return Qc.h(arguments[0],arguments[1],new C(c.slice(2),0,null))}};Qc.a=function(b){return b};
Qc.b=function(b,a){return null==b?null:Ua(b,a)};Qc.h=function(b,a,c){for(;;){if(null==b)return null;b=Qc.b(b,a);if(q(c))a=D(c),c=E(c);else return b}};Qc.B=function(b){var a=D(b),c=E(b);b=D(c);c=E(c);return Qc.h(a,b,c)};Qc.C=2;function Rc(b,a){this.j=b;this.o=a;this.m=393217;this.F=0}g=Rc.prototype;g.S=function(){return this.o};g.T=function(b,a){return new Rc(this.j,a)};
g.call=function(){function b(a,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Q,Ca,mb){a=this;return Sc.Xb?Sc.Xb(a.j,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Q,Ca,mb):Sc.call(null,a.j,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Q,Ca,mb)}function a(a,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Q,Ca){a=this;return a.j.hb?a.j.hb(b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Q,Ca):a.j.call(null,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Q,Ca)}function c(a,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Q){a=this;return a.j.gb?a.j.gb(b,c,d,e,f,h,k,m,n,v,
A,z,B,F,I,R,W,ca,Q):a.j.call(null,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Q)}function d(a,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca){a=this;return a.j.fb?a.j.fb(b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca):a.j.call(null,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca)}function e(a,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W){a=this;return a.j.eb?a.j.eb(b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W):a.j.call(null,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W)}function f(a,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R){a=this;return a.j.cb?a.j.cb(b,c,d,e,f,h,k,m,n,v,A,z,
B,F,I,R):a.j.call(null,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R)}function h(a,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I){a=this;return a.j.bb?a.j.bb(b,c,d,e,f,h,k,m,n,v,A,z,B,F,I):a.j.call(null,b,c,d,e,f,h,k,m,n,v,A,z,B,F,I)}function k(a,b,c,d,e,f,h,k,m,n,v,A,z,B,F){a=this;return a.j.ab?a.j.ab(b,c,d,e,f,h,k,m,n,v,A,z,B,F):a.j.call(null,b,c,d,e,f,h,k,m,n,v,A,z,B,F)}function m(a,b,c,d,e,f,h,k,m,n,v,A,z,B){a=this;return a.j.$a?a.j.$a(b,c,d,e,f,h,k,m,n,v,A,z,B):a.j.call(null,b,c,d,e,f,h,k,m,n,v,A,z,B)}function n(a,b,c,d,
e,f,h,k,m,n,v,A,z){a=this;return a.j.Za?a.j.Za(b,c,d,e,f,h,k,m,n,v,A,z):a.j.call(null,b,c,d,e,f,h,k,m,n,v,A,z)}function v(a,b,c,d,e,f,h,k,m,n,v,A){a=this;return a.j.Ya?a.j.Ya(b,c,d,e,f,h,k,m,n,v,A):a.j.call(null,b,c,d,e,f,h,k,m,n,v,A)}function A(a,b,c,d,e,f,h,k,m,n,v){a=this;return a.j.Xa?a.j.Xa(b,c,d,e,f,h,k,m,n,v):a.j.call(null,b,c,d,e,f,h,k,m,n,v)}function z(a,b,c,d,e,f,h,k,m,n){a=this;return a.j.ib?a.j.ib(b,c,d,e,f,h,k,m,n):a.j.call(null,b,c,d,e,f,h,k,m,n)}function B(a,b,c,d,e,f,h,k,m){a=this;
return a.j.Ra?a.j.Ra(b,c,d,e,f,h,k,m):a.j.call(null,b,c,d,e,f,h,k,m)}function F(a,b,c,d,e,f,h,k){a=this;return a.j.Qa?a.j.Qa(b,c,d,e,f,h,k):a.j.call(null,b,c,d,e,f,h,k)}function I(a,b,c,d,e,f,h){a=this;return a.j.Ja?a.j.Ja(b,c,d,e,f,h):a.j.call(null,b,c,d,e,f,h)}function R(a,b,c,d,e,f){a=this;return a.j.W?a.j.W(b,c,d,e,f):a.j.call(null,b,c,d,e,f)}function W(a,b,c,d,e){a=this;return a.j.I?a.j.I(b,c,d,e):a.j.call(null,b,c,d,e)}function ca(a,b,c,d){a=this;return a.j.c?a.j.c(b,c,d):a.j.call(null,b,c,
d)}function Ca(a,b,c){a=this;return a.j.b?a.j.b(b,c):a.j.call(null,b,c)}function mb(a,b){a=this;return a.j.a?a.j.a(b):a.j.call(null,b)}function gd(a){a=this;return a.j.G?a.j.G():a.j.call(null)}var Q=null,Q=function(Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb,ec,mc,wc,Pc,fd,Id,me,nf,kg,wh,Lj,Fl){switch(arguments.length){case 1:return gd.call(this,Q);case 2:return mb.call(this,Q,Za);case 3:return Ca.call(this,Q,Za,cb);case 4:return ca.call(this,Q,Za,cb,gb);case 5:return W.call(this,Q,Za,cb,gb,lb);case 6:return R.call(this,
Q,Za,cb,gb,lb,rb);case 7:return I.call(this,Q,Za,cb,gb,lb,rb,zb);case 8:return F.call(this,Q,Za,cb,gb,lb,rb,zb,Hb);case 9:return B.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb);case 10:return z.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb);case 11:return A.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb,ec);case 12:return v.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb,ec,mc);case 13:return n.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb,ec,mc,wc);case 14:return m.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb,ec,mc,wc,Pc);case 15:return k.call(this,
Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb,ec,mc,wc,Pc,fd);case 16:return h.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb,ec,mc,wc,Pc,fd,Id);case 17:return f.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb,ec,mc,wc,Pc,fd,Id,me);case 18:return e.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb,ec,mc,wc,Pc,fd,Id,me,nf);case 19:return d.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb,ec,mc,wc,Pc,fd,Id,me,nf,kg);case 20:return c.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb,ec,mc,wc,Pc,fd,Id,me,nf,kg,wh);case 21:return a.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb,
Wb,ec,mc,wc,Pc,fd,Id,me,nf,kg,wh,Lj);case 22:return b.call(this,Q,Za,cb,gb,lb,rb,zb,Hb,Sb,Wb,ec,mc,wc,Pc,fd,Id,me,nf,kg,wh,Lj,Fl)}throw Error("Invalid arity: "+arguments.length);};Q.a=gd;Q.b=mb;Q.c=Ca;Q.I=ca;Q.W=W;Q.Ja=R;Q.Qa=I;Q.Ra=F;Q.ib=B;Q.Xa=z;Q.Ya=A;Q.Za=v;Q.$a=n;Q.ab=m;Q.bb=k;Q.cb=h;Q.eb=f;Q.fb=e;Q.gb=d;Q.hb=c;Q.Cc=a;Q.Xb=b;return Q}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};g.G=function(){return this.j.G?this.j.G():this.j.call(null)};
g.a=function(b){return this.j.a?this.j.a(b):this.j.call(null,b)};g.b=function(b,a){return this.j.b?this.j.b(b,a):this.j.call(null,b,a)};g.c=function(b,a,c){return this.j.c?this.j.c(b,a,c):this.j.call(null,b,a,c)};g.I=function(b,a,c,d){return this.j.I?this.j.I(b,a,c,d):this.j.call(null,b,a,c,d)};g.W=function(b,a,c,d,e){return this.j.W?this.j.W(b,a,c,d,e):this.j.call(null,b,a,c,d,e)};g.Ja=function(b,a,c,d,e,f){return this.j.Ja?this.j.Ja(b,a,c,d,e,f):this.j.call(null,b,a,c,d,e,f)};
g.Qa=function(b,a,c,d,e,f,h){return this.j.Qa?this.j.Qa(b,a,c,d,e,f,h):this.j.call(null,b,a,c,d,e,f,h)};g.Ra=function(b,a,c,d,e,f,h,k){return this.j.Ra?this.j.Ra(b,a,c,d,e,f,h,k):this.j.call(null,b,a,c,d,e,f,h,k)};g.ib=function(b,a,c,d,e,f,h,k,m){return this.j.ib?this.j.ib(b,a,c,d,e,f,h,k,m):this.j.call(null,b,a,c,d,e,f,h,k,m)};g.Xa=function(b,a,c,d,e,f,h,k,m,n){return this.j.Xa?this.j.Xa(b,a,c,d,e,f,h,k,m,n):this.j.call(null,b,a,c,d,e,f,h,k,m,n)};
g.Ya=function(b,a,c,d,e,f,h,k,m,n,v){return this.j.Ya?this.j.Ya(b,a,c,d,e,f,h,k,m,n,v):this.j.call(null,b,a,c,d,e,f,h,k,m,n,v)};g.Za=function(b,a,c,d,e,f,h,k,m,n,v,A){return this.j.Za?this.j.Za(b,a,c,d,e,f,h,k,m,n,v,A):this.j.call(null,b,a,c,d,e,f,h,k,m,n,v,A)};g.$a=function(b,a,c,d,e,f,h,k,m,n,v,A,z){return this.j.$a?this.j.$a(b,a,c,d,e,f,h,k,m,n,v,A,z):this.j.call(null,b,a,c,d,e,f,h,k,m,n,v,A,z)};
g.ab=function(b,a,c,d,e,f,h,k,m,n,v,A,z,B){return this.j.ab?this.j.ab(b,a,c,d,e,f,h,k,m,n,v,A,z,B):this.j.call(null,b,a,c,d,e,f,h,k,m,n,v,A,z,B)};g.bb=function(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F){return this.j.bb?this.j.bb(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F):this.j.call(null,b,a,c,d,e,f,h,k,m,n,v,A,z,B,F)};g.cb=function(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I){return this.j.cb?this.j.cb(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I):this.j.call(null,b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I)};
g.eb=function(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R){return this.j.eb?this.j.eb(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R):this.j.call(null,b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R)};g.fb=function(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W){return this.j.fb?this.j.fb(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W):this.j.call(null,b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W)};
g.gb=function(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca){return this.j.gb?this.j.gb(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca):this.j.call(null,b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca)};g.hb=function(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca){return this.j.hb?this.j.hb(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca):this.j.call(null,b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca)};
g.Cc=function(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca,mb){return Sc.Xb?Sc.Xb(this.j,b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca,mb):Sc.call(null,this.j,b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca,mb)};function Fc(b,a){return"function"==l(b)?new Rc(b,a):null==b?null:jb(b,a)}function Tc(b){var a=null!=b;return(a?null!=b?b.m&131072||b.Gc||(b.m?0:r(fb,b)):r(fb,b):a)?hb(b):null}function Uc(b){return null==b?null:$a(b)}function Vc(b){return null==b?null:ab(b)}function Wc(b){return null==b||va(y(b))}
function Xc(b){return null==b?!1:null!=b?b.m&4096||b.cd?!0:b.m?!1:r(Ya,b):r(Ya,b)}function Yc(b){return null!=b?b.m&16777216||b.bd?!0:b.m?!1:r(tb,b):r(tb,b)}function Zc(b){return null==b?!1:null!=b?b.m&1024||b.Ec?!0:b.m?!1:r(Ta,b):r(Ta,b)}function $c(b){return null!=b?b.m&16384||b.dd?!0:b.m?!1:r(bb,b):r(bb,b)}function ad(b){return null!=b?b.F&512||b.Yc?!0:!1:!1}function bd(b){var a=[];ea(b,function(a,b){return function(a,c){return b.push(c)}}(b,a));return a}
function cd(b,a,c,d,e){for(;0!==e;)c[d]=b[a],d+=1,--e,a+=1}var dd={};function ed(b){return null==b?!1:!1===b?!1:!0}function hd(b){return"number"===typeof b&&!isNaN(b)&&Infinity!==b&&parseFloat(b)===parseInt(b,10)}function id(b,a){return x.c(b,a,dd)===dd?!1:!0}
function jd(b,a){if(b===a)return 0;if(null==b)return-1;if(null==a)return 1;if("number"===typeof b){if("number"===typeof a)return ga(b,a);throw Error([u("Cannot compare "),u(b),u(" to "),u(a)].join(""));}if(null!=b?b.F&2048||b.Kb||(b.F?0:r(Gb,b)):r(Gb,b))return Ib(b,a);if("string"!==typeof b&&!ua(b)&&!0!==b&&!1!==b||(null==b?null:b.constructor)!==(null==a?null:a.constructor))throw Error([u("Cannot compare "),u(b),u(" to "),u(a)].join(""));return ga(b,a)}
function kd(b,a){var c=J(b),d=J(a);if(c<d)c=-1;else if(c>d)c=1;else if(0===c)c=0;else a:for(d=0;;){var e=jd(zc(b,d),zc(a,d));if(0===e&&d+1<c)d+=1;else{c=e;break a}}return c}function ld(b){return G.b(b,jd)?jd:function(a,c){var d=b.b?b.b(a,c):b.call(null,a,c);return"number"===typeof d?d:q(d)?-1:q(b.b?b.b(c,a):b.call(null,c,a))?1:0}}
function Hc(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 2:return Gc(arguments[0],arguments[1]);case 3:return Ic(arguments[0],arguments[1],arguments[2]);default:throw Error([u("Invalid arity: "),u(a.length)].join(""));}}function Gc(b,a){var c=y(a);if(c){var d=D(c),c=E(c);return Ea?Ea(b,d,c):Fa.call(null,b,d,c)}return b.G?b.G():b.call(null)}
function Ic(b,a,c){for(c=y(c);;)if(c){var d=D(c);a=b.b?b.b(a,d):b.call(null,a,d);c=E(c)}else return a}function Fa(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 2:return md(arguments[0],arguments[1]);case 3:return Ea(arguments[0],arguments[1],arguments[2]);default:throw Error([u("Invalid arity: "),u(a.length)].join(""));}}
function md(b,a){return null!=a&&(a.m&524288||a.Ic)?a.ja(null,b):ua(a)?tc(a,b):"string"===typeof a?tc(a,b):r(kb,a)?nb.b(a,b):Gc(b,a)}function Ea(b,a,c){return null!=c&&(c.m&524288||c.Ic)?c.ka(null,b,a):ua(c)?uc(c,b,a):"string"===typeof c?uc(c,b,a):r(kb,c)?nb.c(c,b,a):Ic(b,a,c)}function nd(b){return b}function od(b,a,c,d){b=b.a?b.a(a):b.call(null,a);c=Ea(b,c,d);return b.a?b.a(c):b.call(null,c)}
var pd=function pd(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 1:return pd.a(arguments[0]);case 2:return pd.b(arguments[0],arguments[1]);default:return pd.h(arguments[0],arguments[1],new C(c.slice(2),0,null))}};pd.a=function(){return!0};pd.b=function(b,a){return b>a};pd.h=function(b,a,c){for(;;)if(b>a)if(E(c))b=a,a=D(c),c=E(c);else return a>D(c);else return!1};pd.B=function(b){var a=D(b),c=E(b);b=D(c);c=E(c);return pd.h(a,b,c)};pd.C=2;
function qd(b){if("number"===typeof b)return String.fromCharCode(b);if("string"===typeof b&&1===b.length)return b;throw Error("Argument to char must be a character or number");}function rd(b){return 0<=b?Math.floor(b):Math.ceil(b)}function sd(b){return rd((b-b%2)/2)}function td(b){b-=b>>1&1431655765;b=(b&858993459)+(b>>2&858993459);return 16843009*(b+(b>>4)&252645135)>>24}function ud(b){var a=1;for(b=y(b);;)if(b&&0<a)--a,b=E(b);else return b}
var u=function u(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 0:return u.G();case 1:return u.a(arguments[0]);default:return u.h(arguments[0],new C(c.slice(1),0,null))}};u.G=function(){return""};u.a=function(b){return null==b?"":""+b};u.h=function(b,a){for(var c=new fa(""+u(b)),d=a;;)if(q(d))c=c.append(""+u(D(d))),d=E(d);else return c.toString()};u.B=function(b){var a=D(b);b=E(b);return u.h(a,b)};u.C=1;
function vd(b,a){return b.substring(a)}function Dc(b,a){var c;if(Yc(a))if(xc(b)&&xc(a)&&J(b)!==J(a))c=!1;else a:{c=y(b);for(var d=y(a);;){if(null==c){c=null==d;break a}if(null!=d&&G.b(D(c),D(d)))c=E(c),d=E(d);else{c=!1;break a}}}else c=null;return ed(c)}function wd(b){var a=0;for(b=y(b);;)if(b){var c=D(b),a=(a+(bc(xd.a?xd.a(c):xd.call(null,c))^bc(yd.a?yd.a(c):yd.call(null,c))))%4503599627370496;b=E(b)}else return a}
function zd(b,a,c,d,e){this.o=b;this.first=a;this.nb=c;this.count=d;this.v=e;this.m=65937646;this.F=8192}g=zd.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,this.count)}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.o};g.wa=function(){return 1===this.count?null:this.nb};g.Y=function(){return this.count};g.Sa=function(){return this.first};g.Ta=function(){return Na(this)};
g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){return Dc(this,a)};g.ba=function(){return jb(hc,this.o)};g.ja=function(b,a){return Gc(a,this)};g.ka=function(b,a,c){return Ic(a,c,this)};g.ha=function(){return this.first};g.qa=function(){return 1===this.count?hc:this.nb};g.X=function(){return this};g.T=function(b,a){return new zd(a,this.first,this.nb,this.count,this.v)};g.V=function(b,a){return new zd(this.o,a,this,this.count+1,null)};zd.prototype[xa]=function(){return jc(this)};
function Ad(b){this.o=b;this.m=65937614;this.F=8192}g=Ad.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.o};g.wa=function(){return null};g.Y=function(){return 0};g.Sa=function(){return null};g.Ta=function(){throw Error("Can't pop empty list");};g.P=function(){return nc};
g.A=function(b,a){return(null!=a?a.m&33554432||a.$c||(a.m?0:r(ub,a)):r(ub,a))||Yc(a)?null==y(a):!1};g.ba=function(){return this};g.ja=function(b,a){return Gc(a,this)};g.ka=function(b,a,c){return Ic(a,c,this)};g.ha=function(){return null};g.qa=function(){return hc};g.X=function(){return null};g.T=function(b,a){return new Ad(a)};g.V=function(b,a){return new zd(this.o,a,null,1,null)};var hc=new Ad(null);Ad.prototype[xa]=function(){return jc(this)};
function Bd(b){return(null!=b?b.m&134217728||b.ad||(b.m?0:r(vb,b)):r(vb,b))?wb(b):Ea(Lc,hc,b)}var Cd=function Cd(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;return Cd.h(0<c.length?new C(c.slice(0),0,null):null)};Cd.h=function(b){var a;if(b instanceof C&&0===b.w)a=b.g;else a:for(a=[];;)if(null!=b)a.push(b.ha(null)),b=b.wa(null);else break a;b=a.length;for(var c=hc;;)if(0<b){var d=b-1,c=c.V(null,a[b-1]);b=d}else return c};Cd.C=0;Cd.B=function(b){return Cd.h(y(b))};
function Dd(b,a,c,d){this.o=b;this.first=a;this.nb=c;this.v=d;this.m=65929452;this.F=8192}g=Dd.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.o};g.wa=function(){return null==this.nb?null:y(this.nb)};g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(hc,this.o)};
g.ja=function(b,a){return Gc(a,this)};g.ka=function(b,a,c){return Ic(a,c,this)};g.ha=function(){return this.first};g.qa=function(){return null==this.nb?hc:this.nb};g.X=function(){return this};g.T=function(b,a){return new Dd(a,this.first,this.nb,this.v)};g.V=function(b,a){return new Dd(null,a,this,null)};Dd.prototype[xa]=function(){return jc(this)};function L(b,a){var c=null==a;return(c?c:null!=a&&(a.m&64||a.pa))?new Dd(null,b,a,null):new Dd(null,b,y(a),null)}
function Ed(b,a){if(b.ga===a.ga)return 0;var c=va(b.ya);if(q(c?a.ya:c))return-1;if(q(b.ya)){if(va(a.ya))return 1;c=ga(b.ya,a.ya);return 0===c?ga(b.name,a.name):c}return ga(b.name,a.name)}function P(b,a,c,d){this.ya=b;this.name=a;this.ga=c;this.Cb=d;this.m=2153775105;this.F=4096}g=P.prototype;g.toString=function(){return[u(":"),u(this.ga)].join("")};g.equiv=function(b){return this.A(null,b)};g.A=function(b,a){return a instanceof P?this.ga===a.ga:!1};
g.call=function(){var b=null,b=function(a,b,d){switch(arguments.length){case 2:return x.b(b,this);case 3:return x.c(b,this,d)}throw Error("Invalid arity: "+arguments.length);};b.b=function(a,b){return x.b(b,this)};b.c=function(a,b,d){return x.c(b,this,d)};return b}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};g.a=function(b){return x.b(b,this)};g.b=function(b,a){return x.c(b,this,a)};
g.P=function(){var b=this.Cb;return null!=b?b:this.Cb=b=cc(Yb(this.name),ac(this.ya))+2654435769|0};g.M=function(b,a){return xb(a,[u(":"),u(this.ga)].join(""))};function S(b,a){return b===a?!0:b instanceof P&&a instanceof P?b.ga===a.ga:!1}
var Fd=function Fd(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 1:return Fd.a(arguments[0]);case 2:return Fd.b(arguments[0],arguments[1]);default:throw Error([u("Invalid arity: "),u(c.length)].join(""));}};
Fd.a=function(b){if(b instanceof P)return b;if(b instanceof fc){var a;if(null!=b&&(b.F&4096||b.Hc))a=b.ya;else throw Error([u("Doesn't support namespace: "),u(b)].join(""));return new P(a,Gd.a?Gd.a(b):Gd.call(null,b),b.Va,null)}return"string"===typeof b?(a=b.split("/"),2===a.length?new P(a[0],a[1],b,null):new P(null,a[0],b,null)):null};Fd.b=function(b,a){return new P(b,a,[u(q(b)?[u(b),u("/")].join(""):null),u(a)].join(""),null)};Fd.C=2;
function Hd(b,a,c,d){this.o=b;this.fn=a;this.L=c;this.v=d;this.m=32374988;this.F=1}g=Hd.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};function Jd(b){null!=b.fn&&(b.L=b.fn.G?b.fn.G():b.fn.call(null),b.fn=null);return b.L}
g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.o};g.wa=function(){sb(this);return null==this.L?null:E(this.L)};g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(hc,this.o)};
g.ja=function(b,a){return Gc(a,this)};g.ka=function(b,a,c){return Ic(a,c,this)};g.ha=function(){sb(this);return null==this.L?null:D(this.L)};g.qa=function(){sb(this);return null!=this.L?gc(this.L):hc};g.X=function(){Jd(this);if(null==this.L)return null;for(var b=this.L;;)if(b instanceof Hd)b=Jd(b);else return this.L=b,y(this.L)};g.T=function(b,a){return new Hd(a,this.fn,this.L,this.v)};g.V=function(b,a){return L(a,this)};Hd.prototype[xa]=function(){return jc(this)};
function Kd(b,a){this.bc=b;this.end=a;this.m=2;this.F=0}Kd.prototype.add=function(b){this.bc[this.end]=b;return this.end+=1};Kd.prototype.ea=function(){var b=new Ld(this.bc,0,this.end);this.bc=null;return b};Kd.prototype.Y=function(){return this.end};function Md(b){return new Kd(Array(b),0)}function Ld(b,a,c){this.g=b;this.off=a;this.end=c;this.m=524306;this.F=0}g=Ld.prototype;g.Y=function(){return this.end-this.off};g.R=function(b,a){return this.g[this.off+a]};
g.va=function(b,a,c){return 0<=a&&a<this.end-this.off?this.g[this.off+a]:c};g.oc=function(){if(this.off===this.end)throw Error("-drop-first of empty chunk");return new Ld(this.g,this.off+1,this.end)};g.ja=function(b,a){return vc(this.g,a,this.g[this.off],this.off+1)};g.ka=function(b,a,c){return vc(this.g,a,c,this.off)};function Nd(b,a,c,d){this.ea=b;this.Ua=a;this.o=c;this.v=d;this.m=31850732;this.F=1536}g=Nd.prototype;g.toString=function(){return Rb(this)};
g.equiv=function(b){return this.A(null,b)};g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.o};g.wa=function(){if(1<Ha(this.ea))return new Nd(Jb(this.ea),this.Ua,this.o,null);var b=sb(this.Ua);return null==b?null:b};g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};
g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(hc,this.o)};g.ha=function(){return w.b(this.ea,0)};g.qa=function(){return 1<Ha(this.ea)?new Nd(Jb(this.ea),this.Ua,this.o,null):null==this.Ua?hc:this.Ua};g.X=function(){return this};g.dc=function(){return this.ea};g.ec=function(){return null==this.Ua?hc:this.Ua};g.T=function(b,a){return new Nd(this.ea,this.Ua,a,this.v)};g.V=function(b,a){return L(a,this)};g.cc=function(){return null==this.Ua?null:this.Ua};Nd.prototype[xa]=function(){return jc(this)};
function Od(b,a){return 0===Ha(b)?a:new Nd(b,a,null,null)}function Pd(b,a){b.add(a)}function Qd(b){for(var a=[];;)if(y(b))a.push(D(b)),b=E(b);else return a}function Rd(b,a){if(xc(b))return J(b);for(var c=b,d=a,e=0;;)if(0<d&&y(c))c=E(c),--d,e+=1;else return e}
var Sd=function Sd(a){return null==a?null:null==E(a)?y(D(a)):L(D(a),Sd(E(a)))},Td=function Td(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 0:return Td.G();case 1:return Td.a(arguments[0]);case 2:return Td.b(arguments[0],arguments[1]);default:return Td.h(arguments[0],arguments[1],new C(c.slice(2),0,null))}};Td.G=function(){return new Hd(null,function(){return null},null,null)};
Td.a=function(b){return new Hd(null,function(){return b},null,null)};Td.b=function(b,a){return new Hd(null,function(){var c=y(b);return c?ad(c)?Od(Kb(c),Td.b(Lb(c),a)):L(D(c),Td.b(gc(c),a)):a},null,null)};Td.h=function(b,a,c){return function e(a,b){return new Hd(null,function(){var c=y(a);return c?ad(c)?Od(Kb(c),e(Lb(c),b)):L(D(c),e(gc(c),b)):q(b)?e(D(b),E(b)):null},null,null)}(Td.b(b,a),c)};Td.B=function(b){var a=D(b),c=E(b);b=D(c);c=E(c);return Td.h(a,b,c)};Td.C=2;function Ud(b){return Db(b)}
var Vd=function Vd(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 0:return Vd.G();case 1:return Vd.a(arguments[0]);case 2:return Vd.b(arguments[0],arguments[1]);default:return Vd.h(arguments[0],arguments[1],new C(c.slice(2),0,null))}};Vd.G=function(){return Bb(Mc)};Vd.a=function(b){return b};Vd.b=function(b,a){return Cb(b,a)};Vd.h=function(b,a,c){for(;;)if(b=Cb(b,a),q(c))a=D(c),c=E(c);else return b};
Vd.B=function(b){var a=D(b),c=E(b);b=D(c);c=E(c);return Vd.h(a,b,c)};Vd.C=2;
function Wd(b,a,c){var d=y(c);if(0===a)return b.G?b.G():b.call(null);c=Ma(d);var e=Na(d);if(1===a)return b.a?b.a(c):b.a?b.a(c):b.call(null,c);var d=Ma(e),f=Na(e);if(2===a)return b.b?b.b(c,d):b.b?b.b(c,d):b.call(null,c,d);var e=Ma(f),h=Na(f);if(3===a)return b.c?b.c(c,d,e):b.c?b.c(c,d,e):b.call(null,c,d,e);var f=Ma(h),k=Na(h);if(4===a)return b.I?b.I(c,d,e,f):b.I?b.I(c,d,e,f):b.call(null,c,d,e,f);var h=Ma(k),m=Na(k);if(5===a)return b.W?b.W(c,d,e,f,h):b.W?b.W(c,d,e,f,h):b.call(null,c,d,e,f,h);var k=Ma(m),
n=Na(m);if(6===a)return b.Ja?b.Ja(c,d,e,f,h,k):b.Ja?b.Ja(c,d,e,f,h,k):b.call(null,c,d,e,f,h,k);var m=Ma(n),v=Na(n);if(7===a)return b.Qa?b.Qa(c,d,e,f,h,k,m):b.Qa?b.Qa(c,d,e,f,h,k,m):b.call(null,c,d,e,f,h,k,m);var n=Ma(v),A=Na(v);if(8===a)return b.Ra?b.Ra(c,d,e,f,h,k,m,n):b.Ra?b.Ra(c,d,e,f,h,k,m,n):b.call(null,c,d,e,f,h,k,m,n);var v=Ma(A),z=Na(A);if(9===a)return b.ib?b.ib(c,d,e,f,h,k,m,n,v):b.ib?b.ib(c,d,e,f,h,k,m,n,v):b.call(null,c,d,e,f,h,k,m,n,v);var A=Ma(z),B=Na(z);if(10===a)return b.Xa?b.Xa(c,
d,e,f,h,k,m,n,v,A):b.Xa?b.Xa(c,d,e,f,h,k,m,n,v,A):b.call(null,c,d,e,f,h,k,m,n,v,A);var z=Ma(B),F=Na(B);if(11===a)return b.Ya?b.Ya(c,d,e,f,h,k,m,n,v,A,z):b.Ya?b.Ya(c,d,e,f,h,k,m,n,v,A,z):b.call(null,c,d,e,f,h,k,m,n,v,A,z);var B=Ma(F),I=Na(F);if(12===a)return b.Za?b.Za(c,d,e,f,h,k,m,n,v,A,z,B):b.Za?b.Za(c,d,e,f,h,k,m,n,v,A,z,B):b.call(null,c,d,e,f,h,k,m,n,v,A,z,B);var F=Ma(I),R=Na(I);if(13===a)return b.$a?b.$a(c,d,e,f,h,k,m,n,v,A,z,B,F):b.$a?b.$a(c,d,e,f,h,k,m,n,v,A,z,B,F):b.call(null,c,d,e,f,h,k,m,
n,v,A,z,B,F);var I=Ma(R),W=Na(R);if(14===a)return b.ab?b.ab(c,d,e,f,h,k,m,n,v,A,z,B,F,I):b.ab?b.ab(c,d,e,f,h,k,m,n,v,A,z,B,F,I):b.call(null,c,d,e,f,h,k,m,n,v,A,z,B,F,I);var R=Ma(W),ca=Na(W);if(15===a)return b.bb?b.bb(c,d,e,f,h,k,m,n,v,A,z,B,F,I,R):b.bb?b.bb(c,d,e,f,h,k,m,n,v,A,z,B,F,I,R):b.call(null,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R);var W=Ma(ca),Ca=Na(ca);if(16===a)return b.cb?b.cb(c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W):b.cb?b.cb(c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W):b.call(null,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W);
var ca=Ma(Ca),mb=Na(Ca);if(17===a)return b.eb?b.eb(c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca):b.eb?b.eb(c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca):b.call(null,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca);var Ca=Ma(mb),gd=Na(mb);if(18===a)return b.fb?b.fb(c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca):b.fb?b.fb(c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca):b.call(null,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca);mb=Ma(gd);gd=Na(gd);if(19===a)return b.gb?b.gb(c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca,mb):b.gb?b.gb(c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,
ca,Ca,mb):b.call(null,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca,mb);var Q=Ma(gd);Na(gd);if(20===a)return b.hb?b.hb(c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca,mb,Q):b.hb?b.hb(c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca,mb,Q):b.call(null,c,d,e,f,h,k,m,n,v,A,z,B,F,I,R,W,ca,Ca,mb,Q);throw Error("Only up to 20 arguments supported on functions");}
function Sc(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 2:return Xd(arguments[0],arguments[1]);case 3:return Yd(arguments[0],arguments[1],arguments[2]);case 4:return Zd(arguments[0],arguments[1],arguments[2],arguments[3]);case 5:return $d(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);default:return ae(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],new C(a.slice(5),0,null))}}
function Xd(b,a){var c=b.C;if(b.B){var d=Rd(a,c+1);return d<=c?Wd(b,d,a):b.B(a)}return b.apply(b,Qd(a))}function Yd(b,a,c){a=L(a,c);c=b.C;if(b.B){var d=Rd(a,c+1);return d<=c?Wd(b,d,a):b.B(a)}return b.apply(b,Qd(a))}function Zd(b,a,c,d){a=L(a,L(c,d));c=b.C;return b.B?(d=Rd(a,c+1),d<=c?Wd(b,d,a):b.B(a)):b.apply(b,Qd(a))}function $d(b,a,c,d,e){a=L(a,L(c,L(d,e)));c=b.C;return b.B?(d=Rd(a,c+1),d<=c?Wd(b,d,a):b.B(a)):b.apply(b,Qd(a))}
function ae(b,a,c,d,e,f){a=L(a,L(c,L(d,L(e,Sd(f)))));c=b.C;return b.B?(d=Rd(a,c+1),d<=c?Wd(b,d,a):b.B(a)):b.apply(b,Qd(a))}function be(b,a){return!G.b(b,a)}function ce(b){return y(b)?b:null}
var de=function de(){"undefined"===typeof ia&&(ia=function(a,c){this.Uc=a;this.Tc=c;this.m=393216;this.F=0},ia.prototype.T=function(a,c){return new ia(this.Uc,c)},ia.prototype.S=function(){return this.Tc},ia.prototype.oa=function(){return!1},ia.prototype.next=function(){return Error("No such element")},ia.prototype.remove=function(){return Error("Unsupported operation")},ia.fd=function(){return new T(null,2,5,U,[Fc(ee,new p(null,1,[fe,Cd(ge,Cd(Mc))],null)),ha.ed],null)},ia.tc=!0,ia.Zb="cljs.core/t_cljs$core14721",
ia.Qc=function(a){return xb(a,"cljs.core/t_cljs$core14721")});return new ia(de,he)};function ie(b,a){for(;;){if(null==y(a))return!0;var c;c=D(a);c=b.a?b.a(c):b.call(null,c);if(q(c)){c=b;var d=E(a);b=c;a=d}else return!1}}function je(b){for(var a=nd;;)if(y(b)){var c;c=D(b);c=a.a?a.a(c):a.call(null,c);if(q(c))return c;b=E(b)}else return null}
function ke(b){return function(){function a(a,c){return va(b.b?b.b(a,c):b.call(null,a,c))}function c(a){return va(b.a?b.a(a):b.call(null,a))}function d(){return va(b.G?b.G():b.call(null))}var e=null,f=function(){function a(b,d,e){var f=null;if(2<arguments.length){for(var f=0,h=Array(arguments.length-2);f<h.length;)h[f]=arguments[f+2],++f;f=new C(h,0)}return c.call(this,b,d,f)}function c(a,d,e){return va(Zd(b,a,d,e))}a.C=2;a.B=function(a){var b=D(a);a=E(a);var d=D(a);a=gc(a);return c(b,d,a)};a.h=c;
return a}(),e=function(b,e,m){switch(arguments.length){case 0:return d.call(this);case 1:return c.call(this,b);case 2:return a.call(this,b,e);default:var n=null;if(2<arguments.length){for(var n=0,v=Array(arguments.length-2);n<v.length;)v[n]=arguments[n+2],++n;n=new C(v,0)}return f.h(b,e,n)}throw Error("Invalid arity: "+arguments.length);};e.C=2;e.B=f.B;e.G=d;e.a=c;e.b=a;e.h=f.h;return e}()}
var le=function le(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 0:return le.G();case 1:return le.a(arguments[0]);case 2:return le.b(arguments[0],arguments[1]);case 3:return le.c(arguments[0],arguments[1],arguments[2]);default:return le.h(arguments[0],arguments[1],arguments[2],new C(c.slice(3),0,null))}};le.G=function(){return nd};le.a=function(b){return b};
le.b=function(b,a){return function(){function c(c,d,e){c=a.c?a.c(c,d,e):a.call(null,c,d,e);return b.a?b.a(c):b.call(null,c)}function d(c,d){var e=a.b?a.b(c,d):a.call(null,c,d);return b.a?b.a(e):b.call(null,e)}function e(c){c=a.a?a.a(c):a.call(null,c);return b.a?b.a(c):b.call(null,c)}function f(){var c=a.G?a.G():a.call(null);return b.a?b.a(c):b.call(null,c)}var h=null,k=function(){function c(a,b,e,f){var h=null;if(3<arguments.length){for(var h=0,k=Array(arguments.length-3);h<k.length;)k[h]=arguments[h+
3],++h;h=new C(k,0)}return d.call(this,a,b,e,h)}function d(c,e,f,h){c=$d(a,c,e,f,h);return b.a?b.a(c):b.call(null,c)}c.C=3;c.B=function(a){var b=D(a);a=E(a);var c=D(a);a=E(a);var e=D(a);a=gc(a);return d(b,c,e,a)};c.h=d;return c}(),h=function(a,b,h,A){switch(arguments.length){case 0:return f.call(this);case 1:return e.call(this,a);case 2:return d.call(this,a,b);case 3:return c.call(this,a,b,h);default:var z=null;if(3<arguments.length){for(var z=0,B=Array(arguments.length-3);z<B.length;)B[z]=arguments[z+
3],++z;z=new C(B,0)}return k.h(a,b,h,z)}throw Error("Invalid arity: "+arguments.length);};h.C=3;h.B=k.B;h.G=f;h.a=e;h.b=d;h.c=c;h.h=k.h;return h}()};
le.c=function(b,a,c){return function(){function d(d,e,f){d=c.c?c.c(d,e,f):c.call(null,d,e,f);d=a.a?a.a(d):a.call(null,d);return b.a?b.a(d):b.call(null,d)}function e(d,e){var f;f=c.b?c.b(d,e):c.call(null,d,e);f=a.a?a.a(f):a.call(null,f);return b.a?b.a(f):b.call(null,f)}function f(d){d=c.a?c.a(d):c.call(null,d);d=a.a?a.a(d):a.call(null,d);return b.a?b.a(d):b.call(null,d)}function h(){var d;d=c.G?c.G():c.call(null);d=a.a?a.a(d):a.call(null,d);return b.a?b.a(d):b.call(null,d)}var k=null,m=function(){function d(a,
b,c,f){var h=null;if(3<arguments.length){for(var h=0,k=Array(arguments.length-3);h<k.length;)k[h]=arguments[h+3],++h;h=new C(k,0)}return e.call(this,a,b,c,h)}function e(d,f,h,k){d=$d(c,d,f,h,k);d=a.a?a.a(d):a.call(null,d);return b.a?b.a(d):b.call(null,d)}d.C=3;d.B=function(a){var b=D(a);a=E(a);var c=D(a);a=E(a);var d=D(a);a=gc(a);return e(b,c,d,a)};d.h=e;return d}(),k=function(a,b,c,k){switch(arguments.length){case 0:return h.call(this);case 1:return f.call(this,a);case 2:return e.call(this,a,b);
case 3:return d.call(this,a,b,c);default:var B=null;if(3<arguments.length){for(var B=0,F=Array(arguments.length-3);B<F.length;)F[B]=arguments[B+3],++B;B=new C(F,0)}return m.h(a,b,c,B)}throw Error("Invalid arity: "+arguments.length);};k.C=3;k.B=m.B;k.G=h;k.a=f;k.b=e;k.c=d;k.h=m.h;return k}()};
le.h=function(b,a,c,d){return function(a){return function(){function b(a){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new C(e,0)}return c.call(this,d)}function c(b){b=Xd(D(a),b);for(var d=E(a);;)if(d)b=D(d).call(null,b),d=E(d);else return b}b.C=0;b.B=function(a){a=y(a);return c(a)};b.h=c;return b}()}(Bd(L(b,L(a,L(c,d)))))};le.B=function(b){var a=D(b),c=E(b);b=D(c);var d=E(c),c=D(d),d=E(d);return le.h(a,b,c,d)};le.C=3;
function ne(b,a){return function(){function c(c,d,e){return b.I?b.I(a,c,d,e):b.call(null,a,c,d,e)}function d(c,d){return b.c?b.c(a,c,d):b.call(null,a,c,d)}function e(c){return b.b?b.b(a,c):b.call(null,a,c)}function f(){return b.a?b.a(a):b.call(null,a)}var h=null,k=function(){function c(a,b,e,f){var h=null;if(3<arguments.length){for(var h=0,k=Array(arguments.length-3);h<k.length;)k[h]=arguments[h+3],++h;h=new C(k,0)}return d.call(this,a,b,e,h)}function d(c,e,f,h){return ae(b,a,c,e,f,M([h],0))}c.C=
3;c.B=function(a){var b=D(a);a=E(a);var c=D(a);a=E(a);var e=D(a);a=gc(a);return d(b,c,e,a)};c.h=d;return c}(),h=function(a,b,h,A){switch(arguments.length){case 0:return f.call(this);case 1:return e.call(this,a);case 2:return d.call(this,a,b);case 3:return c.call(this,a,b,h);default:var z=null;if(3<arguments.length){for(var z=0,B=Array(arguments.length-3);z<B.length;)B[z]=arguments[z+3],++z;z=new C(B,0)}return k.h(a,b,h,z)}throw Error("Invalid arity: "+arguments.length);};h.C=3;h.B=k.B;h.G=f;h.a=e;
h.b=d;h.c=c;h.h=k.h;return h}()}
function oe(b,a){var c=pe;return function(){function d(d,e,f){return c.W?c.W(b,a,d,e,f):c.call(null,b,a,d,e,f)}function e(d,e){return c.I?c.I(b,a,d,e):c.call(null,b,a,d,e)}function f(d){return c.c?c.c(b,a,d):c.call(null,b,a,d)}function h(){return c.b?c.b(b,a):c.call(null,b,a)}var k=null,m=function(){function d(a,b,c,f){var h=null;if(3<arguments.length){for(var h=0,k=Array(arguments.length-3);h<k.length;)k[h]=arguments[h+3],++h;h=new C(k,0)}return e.call(this,a,b,c,h)}function e(d,f,h,k){return ae(c,
b,a,d,f,M([h,k],0))}d.C=3;d.B=function(a){var b=D(a);a=E(a);var c=D(a);a=E(a);var d=D(a);a=gc(a);return e(b,c,d,a)};d.h=e;return d}(),k=function(a,b,c,k){switch(arguments.length){case 0:return h.call(this);case 1:return f.call(this,a);case 2:return e.call(this,a,b);case 3:return d.call(this,a,b,c);default:var B=null;if(3<arguments.length){for(var B=0,F=Array(arguments.length-3);B<F.length;)F[B]=arguments[B+3],++B;B=new C(F,0)}return m.h(a,b,c,B)}throw Error("Invalid arity: "+arguments.length);};k.C=
3;k.B=m.B;k.G=h;k.a=f;k.b=e;k.c=d;k.h=m.h;return k}()}function qe(b,a,c,d){this.state=b;this.o=a;this.Xc=c;this.zc=d;this.F=16386;this.m=6455296}g=qe.prototype;g.equiv=function(b){return this.A(null,b)};g.A=function(b,a){return this===a};g.fc=function(){return this.state};g.S=function(){return this.o};
g.rc=function(b,a,c){b=y(this.zc);for(var d=null,e=0,f=0;;)if(f<e){var h=d.R(null,f),k=N(h,0,null),h=N(h,1,null);h.I?h.I(k,this,a,c):h.call(null,k,this,a,c);f+=1}else if(b=y(b))ad(b)?(d=Kb(b),b=Lb(b),k=d,e=J(d),d=k):(d=D(b),k=N(d,0,null),h=N(d,1,null),h.I?h.I(k,this,a,c):h.call(null,k,this,a,c),b=E(b),d=null,e=0),f=0;else return null};g.P=function(){return this[aa]||(this[aa]=++ba)};
function re(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 1:return se(arguments[0]);default:return c=arguments[0],a=new C(a.slice(1),0,null),d=null!=a&&(a.m&64||a.pa)?Xd(te,a):a,a=x.b(d,ra),d=x.b(d,ue),new qe(c,a,d,null)}}function se(b){return new qe(b,null,null,null)}
function ve(b,a){if(b instanceof qe){var c=b.Xc;if(null!=c&&!q(c.a?c.a(a):c.call(null,a)))throw Error([u("Assert failed: "),u("Validator rejected reference state"),u("\n"),u("(validate new-value)")].join(""));c=b.state;b.state=a;null!=b.zc&&Ab(b,c,a);return a}return Nb(b,a)}
var we=function we(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 2:return we.b(arguments[0],arguments[1]);case 3:return we.c(arguments[0],arguments[1],arguments[2]);case 4:return we.I(arguments[0],arguments[1],arguments[2],arguments[3]);default:return we.h(arguments[0],arguments[1],arguments[2],arguments[3],new C(c.slice(4),0,null))}};
we.b=function(b,a){var c;b instanceof qe?(c=b.state,c=a.a?a.a(c):a.call(null,c),c=ve(b,c)):c=Ob.b(b,a);return c};we.c=function(b,a,c){if(b instanceof qe){var d=b.state;a=a.b?a.b(d,c):a.call(null,d,c);b=ve(b,a)}else b=Ob.c(b,a,c);return b};we.I=function(b,a,c,d){if(b instanceof qe){var e=b.state;a=a.c?a.c(e,c,d):a.call(null,e,c,d);b=ve(b,a)}else b=Ob.I(b,a,c,d);return b};we.h=function(b,a,c,d,e){return b instanceof qe?ve(b,$d(a,b.state,c,d,e)):Ob.W(b,a,c,d,e)};
we.B=function(b){var a=D(b),c=E(b);b=D(c);var d=E(c),c=D(d),e=E(d),d=D(e),e=E(e);return we.h(a,b,c,d,e)};we.C=4;
var V=function V(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 1:return V.a(arguments[0]);case 2:return V.b(arguments[0],arguments[1]);case 3:return V.c(arguments[0],arguments[1],arguments[2]);case 4:return V.I(arguments[0],arguments[1],arguments[2],arguments[3]);default:return V.h(arguments[0],arguments[1],arguments[2],arguments[3],new C(c.slice(4),0,null))}};
V.a=function(b){return function(a){return function(){function c(c,d){var e=b.a?b.a(d):b.call(null,d);return a.b?a.b(c,e):a.call(null,c,e)}function d(b){return a.a?a.a(b):a.call(null,b)}function e(){return a.G?a.G():a.call(null)}var f=null,h=function(){function c(a,b,e){var f=null;if(2<arguments.length){for(var f=0,h=Array(arguments.length-2);f<h.length;)h[f]=arguments[f+2],++f;f=new C(h,0)}return d.call(this,a,b,f)}function d(c,e,f){e=Yd(b,e,f);return a.b?a.b(c,e):a.call(null,c,e)}c.C=2;c.B=function(a){var b=
D(a);a=E(a);var c=D(a);a=gc(a);return d(b,c,a)};c.h=d;return c}(),f=function(a,b,f){switch(arguments.length){case 0:return e.call(this);case 1:return d.call(this,a);case 2:return c.call(this,a,b);default:var v=null;if(2<arguments.length){for(var v=0,A=Array(arguments.length-2);v<A.length;)A[v]=arguments[v+2],++v;v=new C(A,0)}return h.h(a,b,v)}throw Error("Invalid arity: "+arguments.length);};f.C=2;f.B=h.B;f.G=e;f.a=d;f.b=c;f.h=h.h;return f}()}};
V.b=function(b,a){return new Hd(null,function(){var c=y(a);if(c){if(ad(c)){for(var d=Kb(c),e=J(d),f=Md(e),h=0;;)if(h<e)Pd(f,function(){var a=w.b(d,h);return b.a?b.a(a):b.call(null,a)}()),h+=1;else break;return Od(f.ea(),V.b(b,Lb(c)))}return L(function(){var a=D(c);return b.a?b.a(a):b.call(null,a)}(),V.b(b,gc(c)))}return null},null,null)};
V.c=function(b,a,c){return new Hd(null,function(){var d=y(a),e=y(c);if(d&&e){var f=L,h;h=D(d);var k=D(e);h=b.b?b.b(h,k):b.call(null,h,k);d=f(h,V.c(b,gc(d),gc(e)))}else d=null;return d},null,null)};V.I=function(b,a,c,d){return new Hd(null,function(){var e=y(a),f=y(c),h=y(d);if(e&&f&&h){var k=L,m;m=D(e);var n=D(f),v=D(h);m=b.c?b.c(m,n,v):b.call(null,m,n,v);e=k(m,V.I(b,gc(e),gc(f),gc(h)))}else e=null;return e},null,null)};
V.h=function(b,a,c,d,e){var f=function k(a){return new Hd(null,function(){var b=V.b(y,a);return ie(nd,b)?L(V.b(D,b),k(V.b(gc,b))):null},null,null)};return V.b(function(){return function(a){return Xd(b,a)}}(f),f(Lc.h(e,d,M([c,a],0))))};V.B=function(b){var a=D(b),c=E(b);b=D(c);var d=E(c),c=D(d),e=E(d),d=D(e),e=E(e);return V.h(a,b,c,d,e)};V.C=4;
function xe(b,a){if("number"!==typeof b)throw Error("Assert failed: (number? n)");return new Hd(null,function(){if(0<b){var c=y(a);return c?L(D(c),xe(b-1,gc(c))):null}return null},null,null)}function ye(b){return new Hd(null,function(a){return function(){return a(2,b)}}(function(a,b){for(;;){var d=y(b);if(0<a&&d){var e=a-1,d=gc(d);a=e;b=d}else return d}}),null,null)}function ze(b){return V.c(function(a){return a},b,ye(b))}
function Ae(b){return new Hd(null,function(){return L(b,Ae(b))},null,null)}function Be(b,a){return Xd(Td,Yd(V,b,a))}var Ce=function Ce(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 1:return Ce.a(arguments[0]);case 2:return Ce.b(arguments[0],arguments[1]);default:throw Error([u("Invalid arity: "),u(c.length)].join(""));}};
Ce.a=function(b){return function(a){return function(){function c(c,d){return q(b.a?b.a(d):b.call(null,d))?a.b?a.b(c,d):a.call(null,c,d):c}function d(b){return a.a?a.a(b):a.call(null,b)}function e(){return a.G?a.G():a.call(null)}var f=null,f=function(a,b){switch(arguments.length){case 0:return e.call(this);case 1:return d.call(this,a);case 2:return c.call(this,a,b)}throw Error("Invalid arity: "+arguments.length);};f.G=e;f.a=d;f.b=c;return f}()}};
Ce.b=function(b,a){return new Hd(null,function(){var c=y(a);if(c){if(ad(c)){for(var d=Kb(c),e=J(d),f=Md(e),h=0;;)if(h<e){var k;k=w.b(d,h);k=b.a?b.a(k):b.call(null,k);q(k)&&(k=w.b(d,h),f.add(k));h+=1}else break;return Od(f.ea(),Ce.b(b,Lb(c)))}d=D(c);c=gc(c);return q(b.a?b.a(d):b.call(null,d))?L(d,Ce.b(b,c)):Ce.b(b,c)}return null},null,null)};Ce.C=2;
function De(b){var a=ne(Ce,$c);return function d(b){return new Hd(null,function(){return L(b,q($c.a?$c.a(b):$c.call(null,b))?Be(d,M([a.a?a.a(b):a.call(null,b)],0)):null)},null,null)}(b)}var Ee=function Ee(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 2:return Ee.b(arguments[0],arguments[1]);case 3:return Ee.c(arguments[0],arguments[1],arguments[2]);default:throw Error([u("Invalid arity: "),u(c.length)].join(""));}};
Ee.b=function(b,a){return null!=b?null!=b&&(b.F&4||b.Bc)?Fc(Ud(Ea(Cb,Bb(b),a)),Tc(b)):Ea(Ja,b,a):Ea(Lc,hc,a)};Ee.c=function(b,a,c){return null!=b&&(b.F&4||b.Bc)?Fc(Ud(od(a,Vd,Bb(b),c)),Tc(b)):od(a,Lc,b,c)};Ee.C=3;function Fe(b,a){return Ea(x,b,a)}
var Ge=function Ge(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 3:return Ge.c(arguments[0],arguments[1],arguments[2]);case 4:return Ge.I(arguments[0],arguments[1],arguments[2],arguments[3]);case 5:return Ge.W(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);case 6:return Ge.Ja(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);default:return Ge.h(arguments[0],arguments[1],arguments[2],arguments[3],
arguments[4],arguments[5],new C(c.slice(6),0,null))}};Ge.c=function(b,a,c){var d=N(a,0,null);a=ud(a);return q(a)?O.c(b,d,Ge.c(x.b(b,d),a,c)):O.c(b,d,function(){var a=x.b(b,d);return c.a?c.a(a):c.call(null,a)}())};Ge.I=function(b,a,c,d){var e=N(a,0,null);a=ud(a);return q(a)?O.c(b,e,Ge.I(x.b(b,e),a,c,d)):O.c(b,e,function(){var a=x.b(b,e);return c.b?c.b(a,d):c.call(null,a,d)}())};
Ge.W=function(b,a,c,d,e){var f=N(a,0,null);a=ud(a);return q(a)?O.c(b,f,Ge.W(x.b(b,f),a,c,d,e)):O.c(b,f,function(){var a=x.b(b,f);return c.c?c.c(a,d,e):c.call(null,a,d,e)}())};Ge.Ja=function(b,a,c,d,e,f){var h=N(a,0,null);a=ud(a);return q(a)?O.c(b,h,Ge.Ja(x.b(b,h),a,c,d,e,f)):O.c(b,h,function(){var a=x.b(b,h);return c.I?c.I(a,d,e,f):c.call(null,a,d,e,f)}())};
Ge.h=function(b,a,c,d,e,f,h){var k=N(a,0,null);a=ud(a);return q(a)?O.c(b,k,ae(Ge,x.b(b,k),a,c,d,M([e,f,h],0))):O.c(b,k,ae(c,x.b(b,k),d,e,f,M([h],0)))};Ge.B=function(b){var a=D(b),c=E(b);b=D(c);var d=E(c),c=D(d),e=E(d),d=D(e),f=E(e),e=D(f),h=E(f),f=D(h),h=E(h);return Ge.h(a,b,c,d,e,f,h)};Ge.C=6;function He(b,a){return O.c(b,a,function(){var c=x.b(b,a);return Vc.a?Vc.a(c):Vc.call(null,c)}())}function Ie(b,a){this.aa=b;this.g=a}
function Je(b){return new Ie(b,[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null])}function Ke(b){return new Ie(b.aa,za(b.g))}function Le(b){b=b.l;return 32>b?0:b-1>>>5<<5}function Me(b,a,c){for(;;){if(0===a)return c;var d=Je(b);d.g[0]=c;c=d;a-=5}}var Ne=function Ne(a,c,d,e){var f=Ke(d),h=a.l-1>>>c&31;5===c?f.g[h]=e:(d=d.g[h],a=null!=d?Ne(a,c-5,d,e):Me(null,c-5,e),f.g[h]=a);return f};
function Oe(b,a){throw Error([u("No item "),u(b),u(" in vector of length "),u(a)].join(""));}function Pe(b,a){if(a>=Le(b))return b.ua;for(var c=b.root,d=b.shift;;)if(0<d)var e=d-5,c=c.g[a>>>d&31],d=e;else return c.g}function Qe(b,a){return 0<=a&&a<b.l?Pe(b,a):Oe(a,b.l)}
var Re=function Re(a,c,d,e,f){var h=Ke(d);if(0===c)h.g[e&31]=f;else{var k=e>>>c&31;a=Re(a,c-5,d.g[k],e,f);h.g[k]=a}return h},Se=function Se(a,c,d){var e=a.l-2>>>c&31;if(5<c){a=Se(a,c-5,d.g[e]);if(null==a&&0===e)return null;d=Ke(d);d.g[e]=a;return d}if(0===e)return null;d=Ke(d);d.g[e]=null;return d};function Te(b,a,c,d,e,f){this.w=b;this.ac=a;this.g=c;this.O=d;this.start=e;this.end=f}Te.prototype.oa=function(){return this.w<this.end};
Te.prototype.next=function(){32===this.w-this.ac&&(this.g=Pe(this.O,this.w),this.ac+=32);var b=this.g[this.w&31];this.w+=1;return b};function T(b,a,c,d,e,f){this.o=b;this.l=a;this.shift=c;this.root=d;this.ua=e;this.v=f;this.m=167668511;this.F=8196}g=T.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};
g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.J=function(b,a){return Qa.c(this,a,null)};g.H=function(b,a,c){return"number"===typeof a?w.c(this,a,c):c};g.R=function(b,a){return Qe(this,a)[a&31]};g.va=function(b,a,c){return 0<=a&&a<this.l?Pe(this,a)[a&31]:c};
g.jb=function(b,a,c){if(0<=a&&a<this.l)return Le(this)<=a?(b=za(this.ua),b[a&31]=c,new T(this.o,this.l,this.shift,this.root,b,null)):new T(this.o,this.l,this.shift,Re(this,this.shift,this.root,a,c),this.ua,null);if(a===this.l)return Ja(this,c);throw Error([u("Index "),u(a),u(" out of bounds  [0,"),u(this.l),u("]")].join(""));};g.Ea=function(){var b=this.l;return new Te(0,0,0<J(this)?Pe(this,0):null,this,0,b)};g.S=function(){return this.o};g.Y=function(){return this.l};
g.Lb=function(){return w.b(this,0)};g.Mb=function(){return w.b(this,1)};g.Sa=function(){return 0<this.l?w.b(this,this.l-1):null};
g.Ta=function(){if(0===this.l)throw Error("Can't pop empty vector");if(1===this.l)return jb(Mc,this.o);if(1<this.l-Le(this))return new T(this.o,this.l-1,this.shift,this.root,this.ua.slice(0,-1),null);var b=Pe(this,this.l-2),a=Se(this,this.shift,this.root),a=null==a?U:a,c=this.l-1;return 5<this.shift&&null==a.g[1]?new T(this.o,c,this.shift-5,a.g[0],b,null):new T(this.o,c,this.shift,a,b,null)};g.Fb=function(){return 0<this.l?new Cc(this,this.l-1,null):null};
g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){if(a instanceof T)if(this.l===J(a))for(var c=Pb(this),d=Pb(a);;)if(q(c.oa())){var e=c.next(),f=d.next();if(!G.b(e,f))return!1}else return!0;else return!1;else return Dc(this,a)};g.Eb=function(){return new Ue(this.l,this.shift,Ve.a?Ve.a(this.root):Ve.call(null,this.root),We.a?We.a(this.ua):We.call(null,this.ua))};g.ba=function(){return Fc(Mc,this.o)};g.ja=function(b,a){return rc(this,a)};
g.ka=function(b,a,c){b=0;for(var d=c;;)if(b<this.l){var e=Pe(this,b);c=e.length;a:for(var f=0;;)if(f<c)var h=e[f],d=a.b?a.b(d,h):a.call(null,d,h),f=f+1;else{e=d;break a}b+=c;d=e}else return d};g.Ia=function(b,a,c){if("number"===typeof a)return db(this,a,c);throw Error("Vector's key for assoc must be a number.");};
g.X=function(){if(0===this.l)return null;if(32>=this.l)return new C(this.ua,0,null);var b;a:{b=this.root;for(var a=this.shift;;)if(0<a)a-=5,b=b.g[0];else{b=b.g;break a}}return Xe?Xe(this,b,0,0):Ye.call(null,this,b,0,0)};g.T=function(b,a){return new T(a,this.l,this.shift,this.root,this.ua,this.v)};
g.V=function(b,a){if(32>this.l-Le(this)){for(var c=this.ua.length,d=Array(c+1),e=0;;)if(e<c)d[e]=this.ua[e],e+=1;else break;d[c]=a;return new T(this.o,this.l+1,this.shift,this.root,d,null)}c=(d=this.l>>>5>1<<this.shift)?this.shift+5:this.shift;d?(d=Je(null),d.g[0]=this.root,e=Me(null,this.shift,new Ie(null,this.ua)),d.g[1]=e):d=Ne(this,this.shift,this.root,new Ie(null,this.ua));return new T(this.o,this.l+1,c,d,[a],null)};
g.call=function(){var b=null,b=function(a,b,d){switch(arguments.length){case 2:return this.R(null,b);case 3:return this.va(null,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=function(a,b){return this.R(null,b)};b.c=function(a,b,d){return this.va(null,b,d)};return b}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};g.a=function(b){return this.R(null,b)};g.b=function(b,a){return this.va(null,b,a)};
var U=new Ie(null,[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null]),Mc=new T(null,0,5,U,[],nc);T.prototype[xa]=function(){return jc(this)};function Ze(b){if(ua(b))a:{var a=b.length;if(32>a)b=new T(null,a,5,U,b,null);else for(var c=32,d=(new T(null,32,5,U,b.slice(0,32),null)).Eb(null);;)if(c<a)var e=c+1,d=Vd.b(d,b[c]),c=e;else{b=Db(d);break a}}else b=Db(Ea(Cb,Bb(Mc),b));return b}
function $e(b,a,c,d,e,f){this.Ha=b;this.node=a;this.w=c;this.off=d;this.o=e;this.v=f;this.m=32375020;this.F=1536}g=$e.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.o};g.wa=function(){if(this.off+1<this.node.length){var b;b=this.Ha;var a=this.node,c=this.w,d=this.off+1;b=Xe?Xe(b,a,c,d):Ye.call(null,b,a,c,d);return null==b?null:b}return Mb(this)};
g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(Mc,this.o)};g.ja=function(b,a){var c;c=this.Ha;var d=this.w+this.off,e=J(this.Ha);c=af?af(c,d,e):bf.call(null,c,d,e);return rc(c,a)};g.ka=function(b,a,c){b=this.Ha;var d=this.w+this.off,e=J(this.Ha);b=af?af(b,d,e):bf.call(null,b,d,e);return sc(b,a,c)};g.ha=function(){return this.node[this.off]};
g.qa=function(){if(this.off+1<this.node.length){var b;b=this.Ha;var a=this.node,c=this.w,d=this.off+1;b=Xe?Xe(b,a,c,d):Ye.call(null,b,a,c,d);return null==b?hc:b}return Lb(this)};g.X=function(){return this};g.dc=function(){var b=this.node;return new Ld(b,this.off,b.length)};g.ec=function(){var b=this.w+this.node.length;if(b<Ha(this.Ha)){var a=this.Ha,c=Pe(this.Ha,b);return Xe?Xe(a,c,b,0):Ye.call(null,a,c,b,0)}return hc};
g.T=function(b,a){return cf?cf(this.Ha,this.node,this.w,this.off,a):Ye.call(null,this.Ha,this.node,this.w,this.off,a)};g.V=function(b,a){return L(a,this)};g.cc=function(){var b=this.w+this.node.length;if(b<Ha(this.Ha)){var a=this.Ha,c=Pe(this.Ha,b);return Xe?Xe(a,c,b,0):Ye.call(null,a,c,b,0)}return null};$e.prototype[xa]=function(){return jc(this)};
function Ye(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 3:return a=arguments[0],c=arguments[1],d=arguments[2],new $e(a,Qe(a,c),c,d,null,null);case 4:return Xe(arguments[0],arguments[1],arguments[2],arguments[3]);case 5:return cf(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]);default:throw Error([u("Invalid arity: "),u(a.length)].join(""));}}function Xe(b,a,c,d){return new $e(b,a,c,d,null,null)}
function cf(b,a,c,d,e){return new $e(b,a,c,d,e,null)}function df(b,a,c,d,e){this.o=b;this.O=a;this.start=c;this.end=d;this.v=e;this.m=167666463;this.F=8192}g=df.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};
g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.J=function(b,a){return Qa.c(this,a,null)};g.H=function(b,a,c){return"number"===typeof a?w.c(this,a,c):c};g.R=function(b,a){return 0>a||this.end<=this.start+a?Oe(a,this.end-this.start):w.b(this.O,this.start+a)};
g.va=function(b,a,c){return 0>a||this.end<=this.start+a?c:w.c(this.O,this.start+a,c)};g.jb=function(b,a,c){var d=this.start+a;b=this.o;c=O.c(this.O,d,c);a=this.start;var e=this.end,d=d+1,d=e>d?e:d;return ef.W?ef.W(b,c,a,d,null):ef.call(null,b,c,a,d,null)};g.S=function(){return this.o};g.Y=function(){return this.end-this.start};g.Sa=function(){return w.b(this.O,this.end-1)};
g.Ta=function(){if(this.start===this.end)throw Error("Can't pop empty vector");var b=this.o,a=this.O,c=this.start,d=this.end-1;return ef.W?ef.W(b,a,c,d,null):ef.call(null,b,a,c,d,null)};g.Fb=function(){return this.start!==this.end?new Cc(this,this.end-this.start-1,null):null};g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(Mc,this.o)};g.ja=function(b,a){return rc(this,a)};g.ka=function(b,a,c){return sc(this,a,c)};
g.Ia=function(b,a,c){if("number"===typeof a)return db(this,a,c);throw Error("Subvec's key for assoc must be a number.");};g.X=function(){var b=this;return function(a){return function d(e){return e===b.end?null:L(w.b(b.O,e),new Hd(null,function(){return function(){return d(e+1)}}(a),null,null))}}(this)(b.start)};g.T=function(b,a){return ef.W?ef.W(a,this.O,this.start,this.end,this.v):ef.call(null,a,this.O,this.start,this.end,this.v)};
g.V=function(b,a){var c=this.o,d=db(this.O,this.end,a),e=this.start,f=this.end+1;return ef.W?ef.W(c,d,e,f,null):ef.call(null,c,d,e,f,null)};g.call=function(){var b=null,b=function(a,b,d){switch(arguments.length){case 2:return this.R(null,b);case 3:return this.va(null,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=function(a,b){return this.R(null,b)};b.c=function(a,b,d){return this.va(null,b,d)};return b}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};
g.a=function(b){return this.R(null,b)};g.b=function(b,a){return this.va(null,b,a)};df.prototype[xa]=function(){return jc(this)};function ef(b,a,c,d,e){for(;;)if(a instanceof df)c=a.start+c,d=a.start+d,a=a.O;else{var f=J(a);if(0>c||0>d||c>f||d>f)throw Error("Index out of bounds");return new df(b,a,c,d,e)}}
function bf(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 2:return a=arguments[0],af(a,arguments[1],J(a));case 3:return af(arguments[0],arguments[1],arguments[2]);default:throw Error([u("Invalid arity: "),u(a.length)].join(""));}}function af(b,a,c){return ef(null,b,a,c,null)}function ff(b,a){return b===a.aa?a:new Ie(b,za(a.g))}function Ve(b){return new Ie({},za(b.g))}
function We(b){var a=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];cd(b,0,a,0,b.length);return a}var gf=function gf(a,c,d,e){d=ff(a.root.aa,d);var f=a.l-1>>>c&31;if(5===c)a=e;else{var h=d.g[f];a=null!=h?gf(a,c-5,h,e):Me(a.root.aa,c-5,e)}d.g[f]=a;return d};function Ue(b,a,c,d){this.l=b;this.shift=a;this.root=c;this.ua=d;this.F=88;this.m=275}g=Ue.prototype;
g.vb=function(b,a){if(this.root.aa){if(32>this.l-Le(this))this.ua[this.l&31]=a;else{var c=new Ie(this.root.aa,this.ua),d=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];d[0]=a;this.ua=d;if(this.l>>>5>1<<this.shift){var d=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],e=this.shift+
5;d[0]=this.root;d[1]=Me(this.root.aa,this.shift,c);this.root=new Ie(this.root.aa,d);this.shift=e}else this.root=gf(this,this.shift,this.root,c)}this.l+=1;return this}throw Error("conj! after persistent!");};g.Gb=function(){if(this.root.aa){this.root.aa=null;var b=this.l-Le(this),a=Array(b);cd(this.ua,0,a,0,b);return new T(null,this.l,this.shift,this.root,a,null)}throw Error("persistent! called twice");};
g.Nb=function(b,a,c){if("number"===typeof a)return Fb(this,a,c);throw Error("TransientVector's key for assoc! must be a number.");};
g.qc=function(b,a,c){var d=this;if(d.root.aa){if(0<=a&&a<d.l)return Le(this)<=a?d.ua[a&31]=c:(b=function(){return function f(b,k){var m=ff(d.root.aa,k);if(0===b)m.g[a&31]=c;else{var n=a>>>b&31,v=f(b-5,m.g[n]);m.g[n]=v}return m}}(this).call(null,d.shift,d.root),d.root=b),this;if(a===d.l)return Cb(this,c);throw Error([u("Index "),u(a),u(" out of bounds for TransientVector of length"),u(d.l)].join(""));}throw Error("assoc! after persistent!");};
g.Y=function(){if(this.root.aa)return this.l;throw Error("count after persistent!");};g.R=function(b,a){if(this.root.aa)return Qe(this,a)[a&31];throw Error("nth after persistent!");};g.va=function(b,a,c){return 0<=a&&a<this.l?w.b(this,a):c};g.J=function(b,a){return Qa.c(this,a,null)};g.H=function(b,a,c){return"number"===typeof a?w.c(this,a,c):c};
g.call=function(){var b=null,b=function(a,b,d){switch(arguments.length){case 2:return this.J(null,b);case 3:return this.H(null,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=function(a,b){return this.J(null,b)};b.c=function(a,b,d){return this.H(null,b,d)};return b}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};g.a=function(b){return this.J(null,b)};g.b=function(b,a){return this.H(null,b,a)};function hf(b,a){this.Jb=b;this.Tb=a}
hf.prototype.oa=function(){var b=null!=this.Jb&&y(this.Jb);return b?b:(b=null!=this.Tb)?this.Tb.oa():b};hf.prototype.next=function(){if(null!=this.Jb){var b=D(this.Jb);this.Jb=E(this.Jb);return b}if(null!=this.Tb&&this.Tb.oa())return this.Tb.next();throw Error("No such element");};hf.prototype.remove=function(){return Error("Unsupported operation")};function jf(b,a,c,d){this.o=b;this.Ca=a;this.Pa=c;this.v=d;this.m=31850572;this.F=0}g=jf.prototype;g.toString=function(){return Rb(this)};
g.equiv=function(b){return this.A(null,b)};g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.o};g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(hc,this.o)};g.ha=function(){return D(this.Ca)};
g.qa=function(){var b=E(this.Ca);return b?new jf(this.o,b,this.Pa,null):null==this.Pa?Ia(this):new jf(this.o,this.Pa,null,null)};g.X=function(){return this};g.T=function(b,a){return new jf(a,this.Ca,this.Pa,this.v)};g.V=function(b,a){return L(a,this)};jf.prototype[xa]=function(){return jc(this)};function kf(b,a,c,d,e){this.o=b;this.count=a;this.Ca=c;this.Pa=d;this.v=e;this.m=31858766;this.F=8192}g=kf.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};
g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,this.count.a?this.count.a(this):this.count.call(null,this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.Ea=function(){return new hf(this.Ca,Pb(this.Pa))};g.S=function(){return this.o};g.Y=function(){return this.count};g.Sa=function(){return D(this.Ca)};
g.Ta=function(){if(q(this.Ca)){var b=E(this.Ca);return b?new kf(this.o,this.count-1,b,this.Pa,null):new kf(this.o,this.count-1,y(this.Pa),Mc,null)}return this};g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(lf,this.o)};g.ha=function(){return D(this.Ca)};g.qa=function(){return gc(y(this))};g.X=function(){var b=y(this.Pa),a=this.Ca;return q(q(a)?a:b)?new jf(null,this.Ca,y(b),null):null};
g.T=function(b,a){return new kf(a,this.count,this.Ca,this.Pa,this.v)};g.V=function(b,a){var c;q(this.Ca)?(c=this.Pa,c=new kf(this.o,this.count+1,this.Ca,Lc.b(q(c)?c:Mc,a),null)):c=new kf(this.o,this.count+1,Lc.b(this.Ca,a),Mc,null);return c};var lf=new kf(null,0,null,Mc,nc);kf.prototype[xa]=function(){return jc(this)};function mf(){this.m=2097152;this.F=0}mf.prototype.equiv=function(b){return this.A(null,b)};mf.prototype.A=function(){return!1};var of=new mf;
function pf(b,a){return ed(Zc(a)?J(b)===J(a)?ie(nd,V.b(function(b){return G.b(x.c(a,D(b),of),D(E(b)))},b)):null:null)}function qf(b,a,c,d,e){this.w=b;this.Vc=a;this.nc=c;this.Rc=d;this.vc=e}qf.prototype.oa=function(){var b=this.w<this.nc;return b?b:this.vc.oa()};qf.prototype.next=function(){if(this.w<this.nc){var b=zc(this.Rc,this.w);this.w+=1;return new T(null,2,5,U,[b,Qa.b(this.Vc,b)],null)}return this.vc.next()};qf.prototype.remove=function(){return Error("Unsupported operation")};
function rf(b){this.L=b}rf.prototype.next=function(){if(null!=this.L){var b=D(this.L),a=N(b,0,null),b=N(b,1,null);this.L=E(this.L);return{value:[a,b],done:!1}}return{value:null,done:!0}};function sf(b){return new rf(y(b))}function tf(b){this.L=b}tf.prototype.next=function(){if(null!=this.L){var b=D(this.L);this.L=E(this.L);return{value:[b,b],done:!1}}return{value:null,done:!0}};
function uf(b,a){var c;if(a instanceof P)a:{c=b.length;for(var d=a.ga,e=0;;){if(c<=e){c=-1;break a}if(b[e]instanceof P&&d===b[e].ga){c=e;break a}e+=2}}else if("string"==typeof a||"number"===typeof a)a:for(c=b.length,d=0;;){if(c<=d){c=-1;break a}if(a===b[d]){c=d;break a}d+=2}else if(a instanceof fc)a:for(c=b.length,d=a.Va,e=0;;){if(c<=e){c=-1;break a}if(b[e]instanceof fc&&d===b[e].Va){c=e;break a}e+=2}else if(null==a)a:for(c=b.length,d=0;;){if(c<=d){c=-1;break a}if(null==b[d]){c=d;break a}d+=2}else a:for(c=
b.length,d=0;;){if(c<=d){c=-1;break a}if(G.b(a,b[d])){c=d;break a}d+=2}return c}function vf(b,a,c){this.g=b;this.w=a;this.za=c;this.m=32374990;this.F=0}g=vf.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.za};g.wa=function(){return this.w<this.g.length-2?new vf(this.g,this.w+2,this.za):null};g.Y=function(){return(this.g.length-this.w)/2};g.P=function(){return lc(this)};
g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(hc,this.za)};g.ja=function(b,a){return Gc(a,this)};g.ka=function(b,a,c){return Ic(a,c,this)};g.ha=function(){return new T(null,2,5,U,[this.g[this.w],this.g[this.w+1]],null)};g.qa=function(){return this.w<this.g.length-2?new vf(this.g,this.w+2,this.za):hc};g.X=function(){return this};g.T=function(b,a){return new vf(this.g,this.w,a)};g.V=function(b,a){return L(a,this)};vf.prototype[xa]=function(){return jc(this)};
function wf(b,a,c){this.g=b;this.w=a;this.l=c}wf.prototype.oa=function(){return this.w<this.l};wf.prototype.next=function(){var b=new T(null,2,5,U,[this.g[this.w],this.g[this.w+1]],null);this.w+=2;return b};function p(b,a,c,d){this.o=b;this.l=a;this.g=c;this.v=d;this.m=16647951;this.F=8196}g=p.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};g.keys=function(){return jc(xf.a?xf.a(this):xf.call(null,this))};g.entries=function(){return sf(y(this))};
g.values=function(){return jc(yf.a?yf.a(this):yf.call(null,this))};g.has=function(b){return id(this,b)};g.get=function(b,a){return this.H(null,b,a)};g.forEach=function(b){for(var a=y(this),c=null,d=0,e=0;;)if(e<d){var f=c.R(null,e),h=N(f,0,null),f=N(f,1,null);b.b?b.b(f,h):b.call(null,f,h);e+=1}else if(a=y(a))ad(a)?(c=Kb(a),a=Lb(a),h=c,d=J(c),c=h):(c=D(a),h=N(c,0,null),f=N(c,1,null),b.b?b.b(f,h):b.call(null,f,h),a=E(a),c=null,d=0),e=0;else return null};g.J=function(b,a){return Qa.c(this,a,null)};
g.H=function(b,a,c){b=uf(this.g,a);return-1===b?c:this.g[b+1]};g.Ea=function(){return new wf(this.g,0,2*this.l)};g.S=function(){return this.o};g.Y=function(){return this.l};g.P=function(){var b=this.v;return null!=b?b:this.v=b=oc(this)};g.A=function(b,a){if(null!=a&&(a.m&1024||a.Ec)){var c=this.g.length;if(this.l===a.Y(null))for(var d=0;;)if(d<c){var e=a.H(null,this.g[d],dd);if(e!==dd)if(G.b(this.g[d+1],e))d+=2;else return!1;else return!1}else return!0;else return!1}else return pf(this,a)};
g.Eb=function(){return new zf({},this.g.length,za(this.g))};g.ba=function(){return jb(he,this.o)};g.ja=function(b,a){return Gc(a,this)};g.ka=function(b,a,c){return Ic(a,c,this)};g.rb=function(b,a){if(0<=uf(this.g,a)){var c=this.g.length,d=c-2;if(0===d)return Ia(this);for(var d=Array(d),e=0,f=0;;){if(e>=c)return new p(this.o,this.l-1,d,null);G.b(a,this.g[e])||(d[f]=this.g[e],d[f+1]=this.g[e+1],f+=2);e+=2}}else return this};
g.Ia=function(b,a,c){b=uf(this.g,a);if(-1===b){if(this.l<Af){b=this.g;for(var d=b.length,e=Array(d+2),f=0;;)if(f<d)e[f]=b[f],f+=1;else break;e[d]=a;e[d+1]=c;return new p(this.o,this.l+1,e,null)}return jb(Sa(Ee.b(Bf,this),a,c),this.o)}if(c===this.g[b+1])return this;a=za(this.g);a[b+1]=c;return new p(this.o,this.l,a,null)};g.Db=function(b,a){return-1!==uf(this.g,a)};g.X=function(){var b=this.g;return 0<=b.length-2?new vf(b,0,null):null};g.T=function(b,a){return new p(a,this.l,this.g,this.v)};
g.V=function(b,a){if($c(a))return Sa(this,w.b(a,0),w.b(a,1));for(var c=this,d=y(a);;){if(null==d)return c;var e=D(d);if($c(e))c=Sa(c,w.b(e,0),w.b(e,1)),d=E(d);else throw Error("conj on a map takes map entries or seqables of map entries");}};
g.call=function(){var b=null,b=function(a,b,d){switch(arguments.length){case 2:return this.J(null,b);case 3:return this.H(null,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=function(a,b){return this.J(null,b)};b.c=function(a,b,d){return this.H(null,b,d)};return b}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};g.a=function(b){return this.J(null,b)};g.b=function(b,a){return this.H(null,b,a)};var he=new p(null,0,[],pc),Af=8;
function Cf(b){for(var a=[],c=0;;)if(c<b.length){var d=b[c],e=b[c+1];-1===uf(a,d)&&(a.push(d),a.push(e));c+=2}else break;return new p(null,a.length/2,a,null)}p.prototype[xa]=function(){return jc(this)};function zf(b,a,c){this.Ib=b;this.zb=a;this.g=c;this.m=258;this.F=56}g=zf.prototype;g.Y=function(){if(q(this.Ib))return sd(this.zb);throw Error("count after persistent!");};g.J=function(b,a){return Qa.c(this,a,null)};
g.H=function(b,a,c){if(q(this.Ib))return b=uf(this.g,a),-1===b?c:this.g[b+1];throw Error("lookup after persistent!");};g.vb=function(b,a){if(q(this.Ib)){if(null!=a?a.m&2048||a.Fc||(a.m?0:r(Va,a)):r(Va,a))return Eb(this,xd.a?xd.a(a):xd.call(null,a),yd.a?yd.a(a):yd.call(null,a));for(var c=y(a),d=this;;){var e=D(c);if(q(e))c=E(c),d=Eb(d,xd.a?xd.a(e):xd.call(null,e),yd.a?yd.a(e):yd.call(null,e));else return d}}else throw Error("conj! after persistent!");};
g.Gb=function(){if(q(this.Ib))return this.Ib=!1,new p(null,sd(this.zb),this.g,null);throw Error("persistent! called twice");};g.Nb=function(b,a,c){if(q(this.Ib)){b=uf(this.g,a);if(-1===b){if(this.zb+2<=2*Af)return this.zb+=2,this.g.push(a),this.g.push(c),this;b=Df.b?Df.b(this.zb,this.g):Df.call(null,this.zb,this.g);return Eb(b,a,c)}c!==this.g[b+1]&&(this.g[b+1]=c);return this}throw Error("assoc! after persistent!");};
function Df(b,a){for(var c=Bb(Bf),d=0;;)if(d<b)c=Eb(c,a[d],a[d+1]),d+=2;else return c}function Ef(){this.val=!1}function Ff(b,a){return b===a?!0:S(b,a)?!0:G.b(b,a)}function Gf(b,a,c){b=za(b);b[a]=c;return b}function Hf(b,a){var c=Array(b.length-2);cd(b,0,c,0,2*a);cd(b,2*(a+1),c,2*a,c.length-2*a);return c}function If(b,a,c,d){b=b.wb(a);b.g[c]=d;return b}function Jf(b,a,c,d){this.g=b;this.w=a;this.Rb=c;this.Oa=d}
Jf.prototype.advance=function(){for(var b=this.g.length;;)if(this.w<b){var a=this.g[this.w],c=this.g[this.w+1];null!=a?a=this.Rb=new T(null,2,5,U,[a,c],null):null!=c?(a=Pb(c),a=a.oa()?this.Oa=a:!1):a=!1;this.w+=2;if(a)return!0}else return!1};Jf.prototype.oa=function(){var b=null!=this.Rb;return b?b:(b=null!=this.Oa)?b:this.advance()};
Jf.prototype.next=function(){if(null!=this.Rb){var b=this.Rb;this.Rb=null;return b}if(null!=this.Oa)return b=this.Oa.next(),this.Oa.oa()||(this.Oa=null),b;if(this.advance())return this.next();throw Error("No such element");};Jf.prototype.remove=function(){return Error("Unsupported operation")};function Kf(b,a,c){this.aa=b;this.da=a;this.g=c}g=Kf.prototype;g.wb=function(b){if(b===this.aa)return this;var a=td(this.da),c=Array(0>a?4:2*(a+1));cd(this.g,0,c,0,2*a);return new Kf(b,this.da,c)};
g.Pb=function(){return Lf?Lf(this.g):Mf.call(null,this.g)};g.sb=function(b,a,c,d){var e=1<<(a>>>b&31);if(0===(this.da&e))return d;var f=td(this.da&e-1),e=this.g[2*f],f=this.g[2*f+1];return null==e?f.sb(b+5,a,c,d):Ff(c,e)?f:d};
g.Na=function(b,a,c,d,e,f){var h=1<<(c>>>a&31),k=td(this.da&h-1);if(0===(this.da&h)){var m=td(this.da);if(2*m<this.g.length){b=this.wb(b);a=b.g;f.val=!0;a:for(c=2*(m-k),f=2*k+(c-1),m=2*(k+1)+(c-1);;){if(0===c)break a;a[m]=a[f];--m;--c;--f}a[2*k]=d;a[2*k+1]=e;b.da|=h;return b}if(16<=m){k=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];k[c>>>a&31]=Nf.Na(b,a+5,c,d,e,f);for(e=d=0;;)if(32>
d)0!==(this.da>>>d&1)&&(k[d]=null!=this.g[e]?Nf.Na(b,a+5,bc(this.g[e]),this.g[e],this.g[e+1],f):this.g[e+1],e+=2),d+=1;else break;return new Of(b,m+1,k)}a=Array(2*(m+4));cd(this.g,0,a,0,2*k);a[2*k]=d;a[2*k+1]=e;cd(this.g,2*k,a,2*(k+1),2*(m-k));f.val=!0;b=this.wb(b);b.g=a;b.da|=h;return b}m=this.g[2*k];h=this.g[2*k+1];if(null==m)return m=h.Na(b,a+5,c,d,e,f),m===h?this:If(this,b,2*k+1,m);if(Ff(d,m))return e===h?this:If(this,b,2*k+1,e);f.val=!0;f=a+5;d=Pf?Pf(b,f,m,h,c,d,e):Qf.call(null,b,f,m,h,c,d,e);
e=2*k;k=2*k+1;b=this.wb(b);b.g[e]=null;b.g[k]=d;return b};
g.Ma=function(b,a,c,d,e){var f=1<<(a>>>b&31),h=td(this.da&f-1);if(0===(this.da&f)){var k=td(this.da);if(16<=k){h=[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];h[a>>>b&31]=Nf.Ma(b+5,a,c,d,e);for(d=c=0;;)if(32>c)0!==(this.da>>>c&1)&&(h[c]=null!=this.g[d]?Nf.Ma(b+5,bc(this.g[d]),this.g[d],this.g[d+1],e):this.g[d+1],d+=2),c+=1;else break;return new Of(null,k+1,h)}b=Array(2*(k+1));cd(this.g,
0,b,0,2*h);b[2*h]=c;b[2*h+1]=d;cd(this.g,2*h,b,2*(h+1),2*(k-h));e.val=!0;return new Kf(null,this.da|f,b)}var m=this.g[2*h],f=this.g[2*h+1];if(null==m)return k=f.Ma(b+5,a,c,d,e),k===f?this:new Kf(null,this.da,Gf(this.g,2*h+1,k));if(Ff(c,m))return d===f?this:new Kf(null,this.da,Gf(this.g,2*h+1,d));e.val=!0;e=this.da;k=this.g;b+=5;b=Rf?Rf(b,m,f,a,c,d):Qf.call(null,b,m,f,a,c,d);c=2*h;h=2*h+1;d=za(k);d[c]=null;d[h]=b;return new Kf(null,e,d)};
g.Qb=function(b,a,c){var d=1<<(a>>>b&31);if(0===(this.da&d))return this;var e=td(this.da&d-1),f=this.g[2*e],h=this.g[2*e+1];return null==f?(b=h.Qb(b+5,a,c),b===h?this:null!=b?new Kf(null,this.da,Gf(this.g,2*e+1,b)):this.da===d?null:new Kf(null,this.da^d,Hf(this.g,e))):Ff(c,f)?new Kf(null,this.da^d,Hf(this.g,e)):this};g.Ea=function(){return new Jf(this.g,0,null,null)};var Nf=new Kf(null,0,[]);function Sf(b,a,c){this.g=b;this.w=a;this.Oa=c}
Sf.prototype.oa=function(){for(var b=this.g.length;;){if(null!=this.Oa&&this.Oa.oa())return!0;if(this.w<b){var a=this.g[this.w];this.w+=1;null!=a&&(this.Oa=Pb(a))}else return!1}};Sf.prototype.next=function(){if(this.oa())return this.Oa.next();throw Error("No such element");};Sf.prototype.remove=function(){return Error("Unsupported operation")};function Of(b,a,c){this.aa=b;this.l=a;this.g=c}g=Of.prototype;g.wb=function(b){return b===this.aa?this:new Of(b,this.l,za(this.g))};
g.Pb=function(){return Tf?Tf(this.g):Uf.call(null,this.g)};g.sb=function(b,a,c,d){var e=this.g[a>>>b&31];return null!=e?e.sb(b+5,a,c,d):d};g.Na=function(b,a,c,d,e,f){var h=c>>>a&31,k=this.g[h];if(null==k)return b=If(this,b,h,Nf.Na(b,a+5,c,d,e,f)),b.l+=1,b;a=k.Na(b,a+5,c,d,e,f);return a===k?this:If(this,b,h,a)};
g.Ma=function(b,a,c,d,e){var f=a>>>b&31,h=this.g[f];if(null==h)return new Of(null,this.l+1,Gf(this.g,f,Nf.Ma(b+5,a,c,d,e)));b=h.Ma(b+5,a,c,d,e);return b===h?this:new Of(null,this.l,Gf(this.g,f,b))};
g.Qb=function(b,a,c){var d=a>>>b&31,e=this.g[d];if(null!=e){b=e.Qb(b+5,a,c);if(b===e)d=this;else if(null==b)if(8>=this.l)a:{e=this.g;b=e.length;a=Array(2*(this.l-1));c=0;for(var f=1,h=0;;)if(c<b)c!==d&&null!=e[c]&&(a[f]=e[c],f+=2,h|=1<<c),c+=1;else{d=new Kf(null,h,a);break a}}else d=new Of(null,this.l-1,Gf(this.g,d,b));else d=new Of(null,this.l,Gf(this.g,d,b));return d}return this};g.Ea=function(){return new Sf(this.g,0,null)};
function Vf(b,a,c){a*=2;for(var d=0;;)if(d<a){if(Ff(c,b[d]))return d;d+=2}else return-1}function Wf(b,a,c,d){this.aa=b;this.kb=a;this.l=c;this.g=d}g=Wf.prototype;g.wb=function(b){if(b===this.aa)return this;var a=Array(2*(this.l+1));cd(this.g,0,a,0,2*this.l);return new Wf(b,this.kb,this.l,a)};g.Pb=function(){return Lf?Lf(this.g):Mf.call(null,this.g)};g.sb=function(b,a,c,d){b=Vf(this.g,this.l,c);return 0>b?d:Ff(c,this.g[b])?this.g[b+1]:d};
g.Na=function(b,a,c,d,e,f){if(c===this.kb){a=Vf(this.g,this.l,d);if(-1===a){if(this.g.length>2*this.l)return a=2*this.l,c=2*this.l+1,b=this.wb(b),b.g[a]=d,b.g[c]=e,f.val=!0,b.l+=1,b;c=this.g.length;a=Array(c+2);cd(this.g,0,a,0,c);a[c]=d;a[c+1]=e;f.val=!0;d=this.l+1;b===this.aa?(this.g=a,this.l=d,b=this):b=new Wf(this.aa,this.kb,d,a);return b}return this.g[a+1]===e?this:If(this,b,a+1,e)}return(new Kf(b,1<<(this.kb>>>a&31),[null,this,null,null])).Na(b,a,c,d,e,f)};
g.Ma=function(b,a,c,d,e){return a===this.kb?(b=Vf(this.g,this.l,c),-1===b?(b=2*this.l,a=Array(b+2),cd(this.g,0,a,0,b),a[b]=c,a[b+1]=d,e.val=!0,new Wf(null,this.kb,this.l+1,a)):G.b(this.g[b],d)?this:new Wf(null,this.kb,this.l,Gf(this.g,b+1,d))):(new Kf(null,1<<(this.kb>>>b&31),[null,this])).Ma(b,a,c,d,e)};g.Qb=function(b,a,c){b=Vf(this.g,this.l,c);return-1===b?this:1===this.l?null:new Wf(null,this.kb,this.l-1,Hf(this.g,sd(b)))};g.Ea=function(){return new Jf(this.g,0,null,null)};
function Qf(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 6:return Rf(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);case 7:return Pf(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6]);default:throw Error([u("Invalid arity: "),u(a.length)].join(""));}}
function Rf(b,a,c,d,e,f){var h=bc(a);if(h===d)return new Wf(null,h,2,[a,c,e,f]);var k=new Ef;return Nf.Ma(b,h,a,c,k).Ma(b,d,e,f,k)}function Pf(b,a,c,d,e,f,h){var k=bc(c);if(k===e)return new Wf(null,k,2,[c,d,f,h]);var m=new Ef;return Nf.Na(b,a,k,c,d,m).Na(b,a,e,f,h,m)}function Xf(b,a,c,d,e){this.o=b;this.U=a;this.w=c;this.L=d;this.v=e;this.m=32374860;this.F=0}g=Xf.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};
g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.o};g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(hc,this.o)};g.ja=function(b,a){return Gc(a,this)};
g.ka=function(b,a,c){return Ic(a,c,this)};g.ha=function(){return null==this.L?new T(null,2,5,U,[this.U[this.w],this.U[this.w+1]],null):D(this.L)};g.qa=function(){if(null==this.L){var b=this.U,a=this.w+2;return Yf?Yf(b,a,null):Mf.call(null,b,a,null)}var b=this.U,a=this.w,c=E(this.L);return Yf?Yf(b,a,c):Mf.call(null,b,a,c)};g.X=function(){return this};g.T=function(b,a){return new Xf(a,this.U,this.w,this.L,this.v)};g.V=function(b,a){return L(a,this)};Xf.prototype[xa]=function(){return jc(this)};
function Mf(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 1:return Lf(arguments[0]);case 3:return Yf(arguments[0],arguments[1],arguments[2]);default:throw Error([u("Invalid arity: "),u(a.length)].join(""));}}function Lf(b){return Yf(b,0,null)}
function Yf(b,a,c){if(null==c)for(c=b.length;;)if(a<c){if(null!=b[a])return new Xf(null,b,a,null,null);var d=b[a+1];if(q(d)&&(d=d.Pb(),q(d)))return new Xf(null,b,a+2,d,null);a+=2}else return null;else return new Xf(null,b,a,c,null)}function Zf(b,a,c,d,e){this.o=b;this.U=a;this.w=c;this.L=d;this.v=e;this.m=32374860;this.F=0}g=Zf.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};
g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.o};g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(hc,this.o)};g.ja=function(b,a){return Gc(a,this)};
g.ka=function(b,a,c){return Ic(a,c,this)};g.ha=function(){return D(this.L)};g.qa=function(){var b=this.U,a=this.w,c=E(this.L);return $f?$f(null,b,a,c):Uf.call(null,null,b,a,c)};g.X=function(){return this};g.T=function(b,a){return new Zf(a,this.U,this.w,this.L,this.v)};g.V=function(b,a){return L(a,this)};Zf.prototype[xa]=function(){return jc(this)};
function Uf(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 1:return Tf(arguments[0]);case 4:return $f(arguments[0],arguments[1],arguments[2],arguments[3]);default:throw Error([u("Invalid arity: "),u(a.length)].join(""));}}function Tf(b){return $f(null,b,0,null)}function $f(b,a,c,d){if(null==d)for(d=a.length;;)if(c<d){var e=a[c];if(q(e)&&(e=e.Pb(),q(e)))return new Zf(b,a,c+1,e,null);c+=1}else return null;else return new Zf(b,a,c,d,null)}
function ag(b,a,c){this.Aa=b;this.yc=a;this.ic=c}ag.prototype.oa=function(){return this.ic&&this.yc.oa()};ag.prototype.next=function(){if(this.ic)return this.yc.next();this.ic=!0;return this.Aa};ag.prototype.remove=function(){return Error("Unsupported operation")};function bg(b,a,c,d,e,f){this.o=b;this.l=a;this.root=c;this.xa=d;this.Aa=e;this.v=f;this.m=16123663;this.F=8196}g=bg.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};
g.keys=function(){return jc(xf.a?xf.a(this):xf.call(null,this))};g.entries=function(){return sf(y(this))};g.values=function(){return jc(yf.a?yf.a(this):yf.call(null,this))};g.has=function(b){return id(this,b)};g.get=function(b,a){return this.H(null,b,a)};
g.forEach=function(b){for(var a=y(this),c=null,d=0,e=0;;)if(e<d){var f=c.R(null,e),h=N(f,0,null),f=N(f,1,null);b.b?b.b(f,h):b.call(null,f,h);e+=1}else if(a=y(a))ad(a)?(c=Kb(a),a=Lb(a),h=c,d=J(c),c=h):(c=D(a),h=N(c,0,null),f=N(c,1,null),b.b?b.b(f,h):b.call(null,f,h),a=E(a),c=null,d=0),e=0;else return null};g.J=function(b,a){return Qa.c(this,a,null)};g.H=function(b,a,c){return null==a?this.xa?this.Aa:c:null==this.root?c:this.root.sb(0,bc(a),a,c)};
g.Ea=function(){var b=this.root?Pb(this.root):de;return this.xa?new ag(this.Aa,b,!1):b};g.S=function(){return this.o};g.Y=function(){return this.l};g.P=function(){var b=this.v;return null!=b?b:this.v=b=oc(this)};g.A=function(b,a){return pf(this,a)};g.Eb=function(){return new cg({},this.root,this.l,this.xa,this.Aa)};g.ba=function(){return jb(Bf,this.o)};
g.rb=function(b,a){if(null==a)return this.xa?new bg(this.o,this.l-1,this.root,!1,null,null):this;if(null==this.root)return this;var c=this.root.Qb(0,bc(a),a);return c===this.root?this:new bg(this.o,this.l-1,c,this.xa,this.Aa,null)};g.Ia=function(b,a,c){if(null==a)return this.xa&&c===this.Aa?this:new bg(this.o,this.xa?this.l:this.l+1,this.root,!0,c,null);b=new Ef;a=(null==this.root?Nf:this.root).Ma(0,bc(a),a,c,b);return a===this.root?this:new bg(this.o,b.val?this.l+1:this.l,a,this.xa,this.Aa,null)};
g.Db=function(b,a){return null==a?this.xa:null==this.root?!1:this.root.sb(0,bc(a),a,dd)!==dd};g.X=function(){if(0<this.l){var b=null!=this.root?this.root.Pb():null;return this.xa?L(new T(null,2,5,U,[null,this.Aa],null),b):b}return null};g.T=function(b,a){return new bg(a,this.l,this.root,this.xa,this.Aa,this.v)};
g.V=function(b,a){if($c(a))return Sa(this,w.b(a,0),w.b(a,1));for(var c=this,d=y(a);;){if(null==d)return c;var e=D(d);if($c(e))c=Sa(c,w.b(e,0),w.b(e,1)),d=E(d);else throw Error("conj on a map takes map entries or seqables of map entries");}};
g.call=function(){var b=null,b=function(a,b,d){switch(arguments.length){case 2:return this.J(null,b);case 3:return this.H(null,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=function(a,b){return this.J(null,b)};b.c=function(a,b,d){return this.H(null,b,d)};return b}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};g.a=function(b){return this.J(null,b)};g.b=function(b,a){return this.H(null,b,a)};var Bf=new bg(null,0,null,!1,null,pc);
function Oc(b,a){for(var c=b.length,d=0,e=Bb(Bf);;)if(d<c)var f=d+1,e=e.Nb(null,b[d],a[d]),d=f;else return Db(e)}bg.prototype[xa]=function(){return jc(this)};function cg(b,a,c,d,e){this.aa=b;this.root=a;this.count=c;this.xa=d;this.Aa=e;this.m=258;this.F=56}
function dg(b,a,c){if(b.aa){if(null==a)b.Aa!==c&&(b.Aa=c),b.xa||(b.count+=1,b.xa=!0);else{var d=new Ef;a=(null==b.root?Nf:b.root).Na(b.aa,0,bc(a),a,c,d);a!==b.root&&(b.root=a);d.val&&(b.count+=1)}return b}throw Error("assoc! after persistent!");}g=cg.prototype;g.Y=function(){if(this.aa)return this.count;throw Error("count after persistent!");};g.J=function(b,a){return null==a?this.xa?this.Aa:null:null==this.root?null:this.root.sb(0,bc(a),a)};
g.H=function(b,a,c){return null==a?this.xa?this.Aa:c:null==this.root?c:this.root.sb(0,bc(a),a,c)};g.vb=function(b,a){var c;a:if(this.aa)if(null!=a?a.m&2048||a.Fc||(a.m?0:r(Va,a)):r(Va,a))c=dg(this,xd.a?xd.a(a):xd.call(null,a),yd.a?yd.a(a):yd.call(null,a));else{c=y(a);for(var d=this;;){var e=D(c);if(q(e))c=E(c),d=dg(d,xd.a?xd.a(e):xd.call(null,e),yd.a?yd.a(e):yd.call(null,e));else{c=d;break a}}}else throw Error("conj! after persistent");return c};
g.Gb=function(){var b;if(this.aa)this.aa=null,b=new bg(null,this.count,this.root,this.xa,this.Aa,null);else throw Error("persistent! called twice");return b};g.Nb=function(b,a,c){return dg(this,a,c)};function eg(b,a,c){for(var d=a;;)if(null!=b)a=c?b.left:b.right,d=Lc.b(d,b),b=a;else return d}function fg(b,a,c,d,e){this.o=b;this.stack=a;this.Ub=c;this.l=d;this.v=e;this.m=32374862;this.F=0}g=fg.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};
g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.o};g.Y=function(){return 0>this.l?J(E(this))+1:this.l};g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(hc,this.o)};
g.ja=function(b,a){return Gc(a,this)};g.ka=function(b,a,c){return Ic(a,c,this)};g.ha=function(){return Uc(this.stack)};g.qa=function(){var b=D(this.stack),b=eg(this.Ub?b.right:b.left,E(this.stack),this.Ub);return null!=b?new fg(null,b,this.Ub,this.l-1,null):hc};g.X=function(){return this};g.T=function(b,a){return new fg(a,this.stack,this.Ub,this.l,this.v)};g.V=function(b,a){return L(a,this)};fg.prototype[xa]=function(){return jc(this)};
function gg(b,a,c){return new fg(null,eg(b,null,a),a,c,null)}function hg(b,a,c,d){return c instanceof X?c.left instanceof X?new X(c.key,c.val,c.left.Wa(),new ig(b,a,c.right,d,null),null):c.right instanceof X?new X(c.right.key,c.right.val,new ig(c.key,c.val,c.left,c.right.left,null),new ig(b,a,c.right.right,d,null),null):new ig(b,a,c,d,null):new ig(b,a,c,d,null)}
function jg(b,a,c,d){return d instanceof X?d.right instanceof X?new X(d.key,d.val,new ig(b,a,c,d.left,null),d.right.Wa(),null):d.left instanceof X?new X(d.left.key,d.left.val,new ig(b,a,c,d.left.left,null),new ig(d.key,d.val,d.left.right,d.right,null),null):new ig(b,a,c,d,null):new ig(b,a,c,d,null)}
function lg(b,a,c,d){if(c instanceof X)return new X(b,a,c.Wa(),d,null);if(d instanceof ig)return jg(b,a,c,d.Sb());if(d instanceof X&&d.left instanceof ig)return new X(d.left.key,d.left.val,new ig(b,a,c,d.left.left,null),jg(d.key,d.val,d.left.right,d.right.Sb()),null);throw Error("red-black tree invariant violation");}function ig(b,a,c,d,e){this.key=b;this.val=a;this.left=c;this.right=d;this.v=e;this.m=32402207;this.F=0}g=ig.prototype;
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();
g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();g.kc=function(b){return b.mc(this)};g.Sb=function(){return new X(this.key,this.val,this.left,this.right,null)};g.Wa=function(){return this};g.jc=function(b){return b.lc(this)};g.replace=function(b,a,c,d){return new ig(b,a,c,d,null)};
g.lc=function(b){return new ig(b.key,b.val,this,b.right,null)};g.mc=function(b){return new ig(b.key,b.val,b.left,this,null)};g.J=function(b,a){return w.c(this,a,null)};g.H=function(b,a,c){return w.c(this,a,c)};g.R=function(b,a){return 0===a?this.key:1===a?this.val:null};g.va=function(b,a,c){return 0===a?this.key:1===a?this.val:c};g.jb=function(b,a,c){return(new T(null,2,5,U,[this.key,this.val],null)).jb(null,a,c)};g.S=function(){return null};g.Y=function(){return 2};g.Lb=function(){return this.key};
g.Mb=function(){return this.val};g.Sa=function(){return this.val};g.Ta=function(){return new T(null,1,5,U,[this.key],null)};g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Mc};g.ja=function(b,a){return rc(this,a)};g.ka=function(b,a,c){return sc(this,a,c)};g.Ia=function(b,a,c){return O.c(new T(null,2,5,U,[this.key,this.val],null),a,c)};g.X=function(){return Ja(Ja(hc,this.val),this.key)};
g.T=function(b,a){return Fc(new T(null,2,5,U,[this.key,this.val],null),a)};g.V=function(b,a){return new T(null,3,5,U,[this.key,this.val,a],null)};g.call=function(){var b=null,b=function(a,b,d){switch(arguments.length){case 2:return this.J(null,b);case 3:return this.H(null,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=function(a,b){return this.J(null,b)};b.c=function(a,b,d){return this.H(null,b,d)};return b}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};
g.a=function(b){return this.J(null,b)};g.b=function(b,a){return this.H(null,b,a)};ig.prototype[xa]=function(){return jc(this)};function X(b,a,c,d,e){this.key=b;this.val=a;this.left=c;this.right=d;this.v=e;this.m=32402207;this.F=0}g=X.prototype;
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();
g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();g.kc=function(b){return new X(this.key,this.val,this.left,b,null)};g.Sb=function(){throw Error("red-black tree invariant violation");};g.Wa=function(){return new ig(this.key,this.val,this.left,this.right,null)};
g.jc=function(b){return new X(this.key,this.val,b,this.right,null)};g.replace=function(b,a,c,d){return new X(b,a,c,d,null)};g.lc=function(b){return this.left instanceof X?new X(this.key,this.val,this.left.Wa(),new ig(b.key,b.val,this.right,b.right,null),null):this.right instanceof X?new X(this.right.key,this.right.val,new ig(this.key,this.val,this.left,this.right.left,null),new ig(b.key,b.val,this.right.right,b.right,null),null):new ig(b.key,b.val,this,b.right,null)};
g.mc=function(b){return this.right instanceof X?new X(this.key,this.val,new ig(b.key,b.val,b.left,this.left,null),this.right.Wa(),null):this.left instanceof X?new X(this.left.key,this.left.val,new ig(b.key,b.val,b.left,this.left.left,null),new ig(this.key,this.val,this.left.right,this.right,null),null):new ig(b.key,b.val,b.left,this,null)};g.J=function(b,a){return w.c(this,a,null)};g.H=function(b,a,c){return w.c(this,a,c)};g.R=function(b,a){return 0===a?this.key:1===a?this.val:null};
g.va=function(b,a,c){return 0===a?this.key:1===a?this.val:c};g.jb=function(b,a,c){return(new T(null,2,5,U,[this.key,this.val],null)).jb(null,a,c)};g.S=function(){return null};g.Y=function(){return 2};g.Lb=function(){return this.key};g.Mb=function(){return this.val};g.Sa=function(){return this.val};g.Ta=function(){return new T(null,1,5,U,[this.key],null)};g.P=function(){var b=this.v;return null!=b?b:this.v=b=lc(this)};g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Mc};
g.ja=function(b,a){return rc(this,a)};g.ka=function(b,a,c){return sc(this,a,c)};g.Ia=function(b,a,c){return O.c(new T(null,2,5,U,[this.key,this.val],null),a,c)};g.X=function(){return Ja(Ja(hc,this.val),this.key)};g.T=function(b,a){return Fc(new T(null,2,5,U,[this.key,this.val],null),a)};g.V=function(b,a){return new T(null,3,5,U,[this.key,this.val,a],null)};
g.call=function(){var b=null,b=function(a,b,d){switch(arguments.length){case 2:return this.J(null,b);case 3:return this.H(null,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=function(a,b){return this.J(null,b)};b.c=function(a,b,d){return this.H(null,b,d)};return b}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};g.a=function(b){return this.J(null,b)};g.b=function(b,a){return this.H(null,b,a)};X.prototype[xa]=function(){return jc(this)};
var mg=function mg(a,c,d,e,f){if(null==c)return new X(d,e,null,null,null);var h;h=c.key;h=a.b?a.b(d,h):a.call(null,d,h);if(0===h)return f[0]=c,null;if(0>h)return a=mg(a,c.left,d,e,f),null!=a?c.jc(a):null;a=mg(a,c.right,d,e,f);return null!=a?c.kc(a):null},ng=function ng(a,c){if(null==a)return c;if(null==c)return a;if(a instanceof X){if(c instanceof X){var d=ng(a.right,c.left);return d instanceof X?new X(d.key,d.val,new X(a.key,a.val,a.left,d.left,null),new X(c.key,c.val,d.right,c.right,null),null):
new X(a.key,a.val,a.left,new X(c.key,c.val,d,c.right,null),null)}return new X(a.key,a.val,a.left,ng(a.right,c),null)}if(c instanceof X)return new X(c.key,c.val,ng(a,c.left),c.right,null);d=ng(a.right,c.left);return d instanceof X?new X(d.key,d.val,new ig(a.key,a.val,a.left,d.left,null),new ig(c.key,c.val,d.right,c.right,null),null):lg(a.key,a.val,a.left,new ig(c.key,c.val,d,c.right,null))},og=function og(a,c,d,e){if(null!=c){var f;f=c.key;f=a.b?a.b(d,f):a.call(null,d,f);if(0===f)return e[0]=c,ng(c.left,
c.right);if(0>f)return a=og(a,c.left,d,e),null!=a||null!=e[0]?c.left instanceof ig?lg(c.key,c.val,a,c.right):new X(c.key,c.val,a,c.right,null):null;a=og(a,c.right,d,e);if(null!=a||null!=e[0])if(c.right instanceof ig)if(e=c.key,d=c.val,c=c.left,a instanceof X)c=new X(e,d,c,a.Wa(),null);else if(c instanceof ig)c=hg(e,d,c.Sb(),a);else if(c instanceof X&&c.right instanceof ig)c=new X(c.right.key,c.right.val,hg(c.key,c.val,c.left.Sb(),c.right.left),new ig(e,d,c.right.right,a,null),null);else throw Error("red-black tree invariant violation");
else c=new X(c.key,c.val,c.left,a,null);else c=null;return c}return null},pg=function pg(a,c,d,e){var f=c.key,h=a.b?a.b(d,f):a.call(null,d,f);return 0===h?c.replace(f,e,c.left,c.right):0>h?c.replace(f,c.val,pg(a,c.left,d,e),c.right):c.replace(f,c.val,c.left,pg(a,c.right,d,e))};function qg(b,a,c,d,e){this.La=b;this.Ab=a;this.l=c;this.o=d;this.v=e;this.m=418776847;this.F=8192}g=qg.prototype;
g.forEach=function(b){for(var a=y(this),c=null,d=0,e=0;;)if(e<d){var f=c.R(null,e),h=N(f,0,null),f=N(f,1,null);b.b?b.b(f,h):b.call(null,f,h);e+=1}else if(a=y(a))ad(a)?(c=Kb(a),a=Lb(a),h=c,d=J(c),c=h):(c=D(a),h=N(c,0,null),f=N(c,1,null),b.b?b.b(f,h):b.call(null,f,h),a=E(a),c=null,d=0),e=0;else return null};g.get=function(b,a){return this.H(null,b,a)};g.entries=function(){return sf(y(this))};g.toString=function(){return Rb(this)};g.keys=function(){return jc(xf.a?xf.a(this):xf.call(null,this))};
g.values=function(){return jc(yf.a?yf.a(this):yf.call(null,this))};g.equiv=function(b){return this.A(null,b)};function rg(b,a){for(var c=b.Ab;;)if(null!=c){var d;d=c.key;d=b.La.b?b.La.b(a,d):b.La.call(null,a,d);if(0===d)return c;c=0>d?c.left:c.right}else return null}g.has=function(b){return id(this,b)};g.J=function(b,a){return Qa.c(this,a,null)};g.H=function(b,a,c){b=rg(this,a);return null!=b?b.val:c};g.S=function(){return this.o};g.Y=function(){return this.l};
g.Fb=function(){return 0<this.l?gg(this.Ab,!1,this.l):null};g.P=function(){var b=this.v;return null!=b?b:this.v=b=oc(this)};g.A=function(b,a){return pf(this,a)};g.ba=function(){return new qg(this.La,null,0,this.o,0)};g.rb=function(b,a){var c=[null],d=og(this.La,this.Ab,a,c);return null==d?null==zc(c,0)?this:new qg(this.La,null,0,this.o,null):new qg(this.La,d.Wa(),this.l-1,this.o,null)};
g.Ia=function(b,a,c){b=[null];var d=mg(this.La,this.Ab,a,c,b);return null==d?(b=zc(b,0),G.b(c,b.val)?this:new qg(this.La,pg(this.La,this.Ab,a,c),this.l,this.o,null)):new qg(this.La,d.Wa(),this.l+1,this.o,null)};g.Db=function(b,a){return null!=rg(this,a)};g.X=function(){return 0<this.l?gg(this.Ab,!0,this.l):null};g.T=function(b,a){return new qg(this.La,this.Ab,this.l,a,this.v)};
g.V=function(b,a){if($c(a))return Sa(this,w.b(a,0),w.b(a,1));for(var c=this,d=y(a);;){if(null==d)return c;var e=D(d);if($c(e))c=Sa(c,w.b(e,0),w.b(e,1)),d=E(d);else throw Error("conj on a map takes map entries or seqables of map entries");}};
g.call=function(){var b=null,b=function(a,b,d){switch(arguments.length){case 2:return this.J(null,b);case 3:return this.H(null,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=function(a,b){return this.J(null,b)};b.c=function(a,b,d){return this.H(null,b,d)};return b}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};g.a=function(b){return this.J(null,b)};g.b=function(b,a){return this.H(null,b,a)};qg.prototype[xa]=function(){return jc(this)};
var te=function te(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;return te.h(0<c.length?new C(c.slice(0),0,null):null)};te.h=function(b){for(var a=y(b),c=Bb(Bf);;)if(a){b=E(E(a));var d=D(a),a=D(E(a)),c=Eb(c,d,a),a=b}else return Db(c)};te.C=0;te.B=function(b){return te.h(y(b))};
function sg(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;a:for(c=arguments[0],a=y(1<a.length?new C(a.slice(1),0,null):null),d=new qg(ld(c),null,0,null,0);;)if(a)c=E(E(a)),d=O.c(d,D(a),D(E(a))),a=c;else break a;return d}function tg(b,a){this.N=b;this.za=a;this.m=32374988;this.F=0}g=tg.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};
g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.za};g.wa=function(){var b=(null!=this.N?this.N.m&128||this.N.Yb||(this.N.m?0:r(Oa,this.N)):r(Oa,this.N))?this.N.wa(null):E(this.N);return null==b?null:new tg(b,this.za)};g.P=function(){return lc(this)};
g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(hc,this.za)};g.ja=function(b,a){return Gc(a,this)};g.ka=function(b,a,c){return Ic(a,c,this)};g.ha=function(){return this.N.ha(null).Lb(null)};g.qa=function(){var b=(null!=this.N?this.N.m&128||this.N.Yb||(this.N.m?0:r(Oa,this.N)):r(Oa,this.N))?this.N.wa(null):E(this.N);return null!=b?new tg(b,this.za):hc};g.X=function(){return this};g.T=function(b,a){return new tg(this.N,a)};g.V=function(b,a){return L(a,this)};tg.prototype[xa]=function(){return jc(this)};
function xf(b){return(b=y(b))?new tg(b,null):null}function xd(b){return Wa(b)}function ug(b,a){this.N=b;this.za=a;this.m=32374988;this.F=0}g=ug.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};g.indexOf=function(){var b=null,b=function(a,b){switch(arguments.length){case 1:return H(this,a,0);case 2:return H(this,a,b)}throw Error("Invalid arity: "+arguments.length);};b.a=function(a){return H(this,a,0)};b.b=function(a,b){return H(this,a,b)};return b}();
g.lastIndexOf=function(){function b(a){return K(this,a,J(this))}var a=null,a=function(a,d){switch(arguments.length){case 1:return b.call(this,a);case 2:return K(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=b;a.b=function(a,b){return K(this,a,b)};return a}();g.S=function(){return this.za};g.wa=function(){var b=(null!=this.N?this.N.m&128||this.N.Yb||(this.N.m?0:r(Oa,this.N)):r(Oa,this.N))?this.N.wa(null):E(this.N);return null==b?null:new ug(b,this.za)};g.P=function(){return lc(this)};
g.A=function(b,a){return Dc(this,a)};g.ba=function(){return Fc(hc,this.za)};g.ja=function(b,a){return Gc(a,this)};g.ka=function(b,a,c){return Ic(a,c,this)};g.ha=function(){return this.N.ha(null).Mb(null)};g.qa=function(){var b=(null!=this.N?this.N.m&128||this.N.Yb||(this.N.m?0:r(Oa,this.N)):r(Oa,this.N))?this.N.wa(null):E(this.N);return null!=b?new ug(b,this.za):hc};g.X=function(){return this};g.T=function(b,a){return new ug(this.N,a)};g.V=function(b,a){return L(a,this)};ug.prototype[xa]=function(){return jc(this)};
function yf(b){return(b=y(b))?new ug(b,null):null}function yd(b){return Xa(b)}var vg=function vg(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;return vg.h(0<c.length?new C(c.slice(0),0,null):null)};vg.h=function(b){return q(je(b))?md(function(a,b){return Lc.b(q(a)?a:he,b)},b):null};vg.C=0;vg.B=function(b){return vg.h(y(b))};
var wg=function wg(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;return wg.h(arguments[0],1<c.length?new C(c.slice(1),0,null):null)};wg.h=function(b,a){return q(je(a))?md(function(a){return function(b,e){return Ea(a,q(b)?b:he,y(e))}}(function(a,d){var e=D(d),f=D(E(d));return id(a,e)?O.c(a,e,function(){var d=x.b(a,e);return b.b?b.b(d,f):b.call(null,d,f)}()):O.c(a,e,f)}),a):null};wg.C=1;wg.B=function(b){var a=D(b);b=E(b);return wg.h(a,b)};
function xg(b){this.hc=b}xg.prototype.oa=function(){return this.hc.oa()};xg.prototype.next=function(){if(this.hc.oa())return this.hc.next().ua[0];throw Error("No such element");};xg.prototype.remove=function(){return Error("Unsupported operation")};function yg(b,a,c){this.o=b;this.xb=a;this.v=c;this.m=15077647;this.F=8196}g=yg.prototype;g.toString=function(){return Rb(this)};g.equiv=function(b){return this.A(null,b)};g.keys=function(){return jc(y(this))};g.entries=function(){var b=y(this);return new tf(y(b))};
g.values=function(){return jc(y(this))};g.has=function(b){return id(this,b)};g.forEach=function(b){for(var a=y(this),c=null,d=0,e=0;;)if(e<d){var f=c.R(null,e),h=N(f,0,null),f=N(f,1,null);b.b?b.b(f,h):b.call(null,f,h);e+=1}else if(a=y(a))ad(a)?(c=Kb(a),a=Lb(a),h=c,d=J(c),c=h):(c=D(a),h=N(c,0,null),f=N(c,1,null),b.b?b.b(f,h):b.call(null,f,h),a=E(a),c=null,d=0),e=0;else return null};g.J=function(b,a){return Qa.c(this,a,null)};g.H=function(b,a,c){return Ra(this.xb,a)?a:c};g.Ea=function(){return new xg(Pb(this.xb))};
g.S=function(){return this.o};g.Y=function(){return Ha(this.xb)};g.P=function(){var b=this.v;return null!=b?b:this.v=b=oc(this)};g.A=function(b,a){return Xc(a)&&J(this)===J(a)&&ie(function(a){return function(b){return id(a,b)}}(this),a)};g.Eb=function(){return new zg(Bb(this.xb))};g.ba=function(){return Fc(Ag,this.o)};g.X=function(){return xf(this.xb)};g.T=function(b,a){return new yg(a,this.xb,this.v)};g.V=function(b,a){return new yg(this.o,O.c(this.xb,a,null),null)};
g.call=function(){var b=null,b=function(a,b,d){switch(arguments.length){case 2:return this.J(null,b);case 3:return this.H(null,b,d)}throw Error("Invalid arity: "+arguments.length);};b.b=function(a,b){return this.J(null,b)};b.c=function(a,b,d){return this.H(null,b,d)};return b}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};g.a=function(b){return this.J(null,b)};g.b=function(b,a){return this.H(null,b,a)};var Ag=new yg(null,he,pc);
function Bg(){var b=[Cg],a=b.length;if(a<=Af)for(var c=0,d=Bb(he);;)if(c<a)var e=c+1,d=Eb(d,b[c],null),c=e;else return new yg(null,Db(d),null);else for(c=0,d=Bb(Ag);;)if(c<a)e=c+1,d=Cb(d,b[c]),c=e;else return Db(d)}yg.prototype[xa]=function(){return jc(this)};function zg(b){this.ob=b;this.F=136;this.m=259}g=zg.prototype;g.vb=function(b,a){this.ob=Eb(this.ob,a,null);return this};g.Gb=function(){return new yg(null,Db(this.ob),null)};g.Y=function(){return J(this.ob)};
g.J=function(b,a){return Qa.c(this,a,null)};g.H=function(b,a,c){return Qa.c(this.ob,a,dd)===dd?c:a};g.call=function(){function b(a,b,c){return Qa.c(this.ob,b,dd)===dd?c:b}function a(a,b){return Qa.c(this.ob,b,dd)===dd?null:b}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return a.call(this,c,e);case 3:return b.call(this,c,e,f)}throw Error("Invalid arity: "+arguments.length);};c.b=a;c.c=b;return c}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};
g.a=function(b){return Qa.c(this.ob,b,dd)===dd?null:b};g.b=function(b,a){return Qa.c(this.ob,b,dd)===dd?a:b};function Dg(b){return function c(b,e){return new Hd(null,function(){return function(b,d){for(;;){var e=b,m=N(e,0,null);if(e=y(e))if(id(d,m))m=gc(e),e=d,b=m,d=e;else return L(m,c(gc(e),Lc.b(d,m)));else return null}}.call(null,b,e)},null,null)}(b,Ag)}
function Gd(b){if(null!=b&&(b.F&4096||b.Hc))return b.name;if("string"===typeof b)return b;throw Error([u("Doesn't support name: "),u(b)].join(""));}var Eg=function Eg(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 2:return Eg.b(arguments[0],arguments[1]);case 3:return Eg.c(arguments[0],arguments[1],arguments[2]);default:return Eg.h(arguments[0],arguments[1],arguments[2],new C(c.slice(3),0,null))}};Eg.b=function(b,a){return a};
Eg.c=function(b,a,c){return(b.a?b.a(a):b.call(null,a))>(b.a?b.a(c):b.call(null,c))?a:c};Eg.h=function(b,a,c,d){return Ea(function(a,c){return Eg.c(b,a,c)},Eg.c(b,a,c),d)};Eg.B=function(b){var a=D(b),c=E(b);b=D(c);var d=E(c),c=D(d),d=E(d);return Eg.h(a,b,c,d)};Eg.C=3;function Fg(b,a){return new Hd(null,function(){var c=y(a);if(c){var d;d=D(c);d=b.a?b.a(d):b.call(null,d);c=q(d)?L(D(c),Fg(b,gc(c))):null}else c=null;return c},null,null)}
function Gg(b,a){if("string"===typeof a){var c=b.exec(a);return G.b(D(c),a)?1===J(c)?D(c):Ze(c):null}throw new TypeError("re-matches must match against a string.");}function Hg(b,a){if("string"===typeof a){var c=b.exec(a);return null==c?null:1===J(c)?D(c):Ze(c)}throw new TypeError("re-find must match against a string.");}function Ig(b){if(b instanceof RegExp)return b;var a=Hg(/^\(\?([idmsux]*)\)/,b),c=N(a,0,null),a=N(a,1,null);b=vd(b,J(c));return new RegExp(b,q(a)?a:"")}
function Jg(b,a,c,d,e,f,h){var k=ma;ma=null==ma?null:ma-1;try{if(null!=ma&&0>ma)return xb(b,"#");xb(b,c);if(0===ta.a(f))y(h)&&xb(b,function(){var a=Kg.a(f);return q(a)?a:"..."}());else{if(y(h)){var m=D(h);a.c?a.c(m,b,f):a.call(null,m,b,f)}for(var n=E(h),v=ta.a(f)-1;;)if(!n||null!=v&&0===v){y(n)&&0===v&&(xb(b,d),xb(b,function(){var a=Kg.a(f);return q(a)?a:"..."}()));break}else{xb(b,d);var A=D(n);c=b;h=f;a.c?a.c(A,c,h):a.call(null,A,c,h);var z=E(n);c=v-1;n=z;v=c}}return xb(b,e)}finally{ma=k}}
function Lg(b,a){for(var c=y(a),d=null,e=0,f=0;;)if(f<e){var h=d.R(null,f);xb(b,h);f+=1}else if(c=y(c))d=c,ad(d)?(c=Kb(d),e=Lb(d),d=c,h=J(c),c=e,e=h):(h=D(d),xb(b,h),c=E(d),d=null,e=0),f=0;else return null}function Mg(b){ja.a?ja.a(b):ja.call(null,b);return null}var Ng={'"':'\\"',"\\":"\\\\","\b":"\\b","\f":"\\f","\n":"\\n","\r":"\\r","\t":"\\t"};function Og(b){return[u('"'),u(b.replace(RegExp('[\\\\"\b\f\n\r\t]',"g"),function(a){return Ng[a]})),u('"')].join("")}
function Pg(b,a){var c=ed(x.b(b,ra));return c?(c=null!=a?a.m&131072||a.Gc?!0:!1:!1)?null!=Tc(a):c:c}
function Qg(b,a,c){if(null==b)return xb(a,"nil");if(Pg(c,b)){xb(a,"^");var d=Tc(b);Rg.c?Rg.c(d,a,c):Rg.call(null,d,a,c);xb(a," ")}if(b.tc)return b.Qc(a);if(null!=b&&(b.m&2147483648||b.Z))return b.M(null,a,c);if(!0===b||!1===b||"number"===typeof b)return xb(a,""+u(b));if(null!=b&&b.constructor===Object)return xb(a,"#js "),d=V.b(function(a){return new T(null,2,5,U,[Fd.a(a),b[a]],null)},bd(b)),Sg.I?Sg.I(d,Rg,a,c):Sg.call(null,d,Rg,a,c);if(ua(b))return Jg(a,Rg,"#js ["," ","]",c,b);if("string"==typeof b)return q(qa.a(c))?
xb(a,Og(b)):xb(a,b);if("function"==l(b)){var e=b.name;c=q(function(){var a=null==e;return a?a:/^[\s\xa0]*$/.test(e)}())?"Function":e;return Lg(a,M(["#object[",c,' "',""+u(b),'"]'],0))}if(b instanceof Date)return c=function(a,b){for(var c=""+u(a);;)if(J(c)<b)c=[u("0"),u(c)].join("");else return c},Lg(a,M(['#inst "',""+u(b.getUTCFullYear()),"-",c(b.getUTCMonth()+1,2),"-",c(b.getUTCDate(),2),"T",c(b.getUTCHours(),2),":",c(b.getUTCMinutes(),2),":",c(b.getUTCSeconds(),2),".",c(b.getUTCMilliseconds(),3),
"-",'00:00"'],0));if(b instanceof RegExp)return Lg(a,M(['#"',b.source,'"'],0));if(q(b.constructor.Zb))return Lg(a,M(["#object[",b.constructor.Zb.replace(RegExp("/","g"),"."),"]"],0));e=b.constructor.name;c=q(function(){var a=null==e;return a?a:/^[\s\xa0]*$/.test(e)}())?"Object":e;return Lg(a,M(["#object[",c," ",""+u(b),"]"],0))}function Rg(b,a,c){var d=Tg.a(c);return q(d)?(c=O.c(c,Ug,Qg),d.c?d.c(b,a,c):d.call(null,b,a,c)):Qg(b,a,c)}
function Vg(b,a){var c;if(Wc(b))c="";else{c=u;var d=new fa;a:{var e=new Qb(d);Rg(D(b),e,a);for(var f=y(E(b)),h=null,k=0,m=0;;)if(m<k){var n=h.R(null,m);xb(e," ");Rg(n,e,a);m+=1}else if(f=y(f))h=f,ad(h)?(f=Kb(h),k=Lb(h),h=f,n=J(f),f=k,k=n):(n=D(h),xb(e," "),Rg(n,e,a),f=E(h),h=null,k=0),m=0;else break a}c=""+c(d)}return Mg(c)}function Wg(){var b=oa();Mg("\n");x.b(b,pa)}function Xg(b){Vg(b,oa())}
var Yg=function(){function b(b){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new C(e,0)}return a.call(this,d)}function a(a){return Vg(a,O.c(oa(),qa,!1))}b.C=0;b.B=function(b){b=y(b);return a(b)};b.h=a;return b}();function Zg(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;$g(0<a.length?new C(a.slice(0),0,null):null)}function $g(b){Vg(b,O.c(oa(),qa,!1));q(la)&&Wg()}
function Sg(b,a,c,d){return Jg(c,function(b,c,d){var k=Wa(b);a.c?a.c(k,c,d):a.call(null,k,c,d);xb(c," ");b=Xa(b);return a.c?a.c(b,c,d):a.call(null,b,c,d)},"{",", ","}",d,y(b))}C.prototype.Z=!0;C.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};Hd.prototype.Z=!0;Hd.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};fg.prototype.Z=!0;fg.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};Xf.prototype.Z=!0;
Xf.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};ig.prototype.Z=!0;ig.prototype.M=function(b,a,c){return Jg(a,Rg,"["," ","]",c,this)};vf.prototype.Z=!0;vf.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};$e.prototype.Z=!0;$e.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};Dd.prototype.Z=!0;Dd.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};Cc.prototype.Z=!0;Cc.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};
bg.prototype.Z=!0;bg.prototype.M=function(b,a,c){return Sg(this,Rg,a,c)};Zf.prototype.Z=!0;Zf.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};df.prototype.Z=!0;df.prototype.M=function(b,a,c){return Jg(a,Rg,"["," ","]",c,this)};qg.prototype.Z=!0;qg.prototype.M=function(b,a,c){return Sg(this,Rg,a,c)};yg.prototype.Z=!0;yg.prototype.M=function(b,a,c){return Jg(a,Rg,"#{"," ","}",c,this)};Nd.prototype.Z=!0;Nd.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};
qe.prototype.Z=!0;qe.prototype.M=function(b,a,c){xb(a,"#object [cljs.core.Atom ");Rg(new p(null,1,[ah,this.state],null),a,c);return xb(a,"]")};ug.prototype.Z=!0;ug.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};X.prototype.Z=!0;X.prototype.M=function(b,a,c){return Jg(a,Rg,"["," ","]",c,this)};T.prototype.Z=!0;T.prototype.M=function(b,a,c){return Jg(a,Rg,"["," ","]",c,this)};jf.prototype.Z=!0;jf.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};Ad.prototype.Z=!0;
Ad.prototype.M=function(b,a){return xb(a,"()")};kf.prototype.Z=!0;kf.prototype.M=function(b,a,c){return Jg(a,Rg,"#queue ["," ","]",c,y(this))};p.prototype.Z=!0;p.prototype.M=function(b,a,c){return Sg(this,Rg,a,c)};tg.prototype.Z=!0;tg.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};zd.prototype.Z=!0;zd.prototype.M=function(b,a,c){return Jg(a,Rg,"("," ",")",c,this)};fc.prototype.Kb=!0;
fc.prototype.qb=function(b,a){if(a instanceof fc)return dc(this,a);throw Error([u("Cannot compare "),u(this),u(" to "),u(a)].join(""));};P.prototype.Kb=!0;P.prototype.qb=function(b,a){if(a instanceof P)return Ed(this,a);throw Error([u("Cannot compare "),u(this),u(" to "),u(a)].join(""));};df.prototype.Kb=!0;df.prototype.qb=function(b,a){if($c(a))return kd(this,a);throw Error([u("Cannot compare "),u(this),u(" to "),u(a)].join(""));};T.prototype.Kb=!0;
T.prototype.qb=function(b,a){if($c(a))return kd(this,a);throw Error([u("Cannot compare "),u(this),u(" to "),u(a)].join(""));};function bh(b,a){this.Ob=b;this.value=a;this.m=32768;this.F=1}bh.prototype.fc=function(){q(this.Ob)&&(this.value=this.Ob.G?this.Ob.G():this.Ob.call(null),this.Ob=null);return this.value};function ch(b,a){this.Bb=b;this.v=a;this.m=2153775104;this.F=2048}g=ch.prototype;g.toString=function(){return this.Bb};g.equiv=function(b){return this.A(null,b)};
g.A=function(b,a){return a instanceof ch&&this.Bb===a.Bb};g.M=function(b,a){return xb(a,[u('#uuid "'),u(this.Bb),u('"')].join(""))};g.P=function(){null==this.v&&(this.v=bc(this.Bb));return this.v};g.qb=function(b,a){return ga(this.Bb,a.Bb)};var dh=new P(null,"neg","neg",1800032960),eh=new P(null,"parser2","parser2",1013754688),fh=new P(null,"full-results","full-results",-1500225407),gh=new P(null,"cat","cat",-1457810207),hh=new P(null,"tags","tags",1771418977),ih=new P(null,"end-of-string","end-of-string",1567354241),jh=new P(null,"min","min",444991522),kh=new P(null,"문단","문단",1796048130),lh=new P(null,"각주문단","각주문단",1569078850),mh=new P(null,"msg-cache","msg-cache",-733775070),nh=new P(null,"NOT","NOT",-1689245341),oh=new P(null,"full-listeners",
"full-listeners",50621827),ph=new P(null,"일반목록","일반목록",-1076338013),qh=new P(null,"ord","ord",1142548323),rh=new P(null,"CRLF","CRLF",11418756),sh=new P(null,"negative-listeners","negative-listeners",55241092),th=new P(null,"generation","generation",-2132542044),ra=new P(null,"meta","meta",1499536964),uh=new P(null,"HTAB","HTAB",11392612),vh=new P(null,"소스언어","소스언어",1699036836),xh=new P(null,"full","full",436801220),sa=new P(null,"dup","dup",556298533),yh=new P(null,"rule-separator","rule-separator",
1539322213),zh=new P(null,"key","key",-1516042587),Ah=new P(null,"hide-tag-rule","hide-tag-rule",150267589),Bh=new P(null,"index","index",-1531685915),Ch=new P(null,"LWSP","LWSP",782998598),Dh=new P(null,"LF","LF",1177033158),Eh=new P(null,"참조이름","참조이름",-810571290),Fh=new P(null,"코드","코드",431087398),Gh=new P(null,"alt","alt",-3214426),Hh=new P(null,"lookahead","lookahead",-400102393),Ih=new P(null,"failure","failure",720415879),Jh=new P(null,"input-format","input-format",-422703481),Kh=new P(null,
"작은제목","작은제목",-1414480153),Lh=new P(null,"look","look",-539441433),Mh=new P(null,"bin-char","bin-char",-1662780697),Nh=new P("instaparse.gll","end-index","instaparse.gll/end-index",-1851404441),ue=new P(null,"validator","validator",-1966190681),Oh=new P(null,"content","content",15833224),Ph=new P(null,"raw","raw",1604651272),Qh=new P(null,"start-production","start-production",687546537),Rh=new P(null,"rule","rule",729973257),Sh=new P(null,"rulename-right","rulename-right",1125609193),Th=new P(null,
"큰제목","큰제목",-1359440055),Uh=new P(null,"comma","comma",1699024745),Vh=new P(null,"VCHAR","VCHAR",1962437706),Wh=new P(null,"DIGIT","DIGIT",341251338),Xh=new P(null,"memory","memory",-1449401430),Yh=new P(null,"start","start",-355208981),Zh=new P(null,"fail-index","fail-index",248726923),$h=new P(null,"nt","nt",-835425781),ai=new P(null,"grammar","grammar",1881328267),bi=new P(null,"hide-nt","hide-nt",-228813845),ci=new P(null,"rep","rep",-1226820564),di=new P(null,"output-format","output-format",
-1826382676),ah=new P(null,"val","val",128701612),ei=new P(null,"SP","SP",124290284),fi=new P(null,"NUM","NUM",-218662260),gi=new P(null,"inside-comment","inside-comment",1258069708),Ug=new P(null,"fallback-impl","fallback-impl",-1501286995),hi=new P(null,"star","star",279424429),ii=new P(null,"char-val","char-val",1408617933),pa=new P(null,"flush-on-newline","flush-on-newline",-151457939),ji=new P(null,"string","string",-1989541586),ki=new P(null,"all","all",892129742),li=new P(null,"소스내용","소스내용",
-681829618),mi=new P(null,"hiccup","hiccup",1218876238),ni=new P(null,"rules","rules",1198912366),oi=new P(null,"lo","lo",-931799889),pi=new P(null,"column","column",2078222095),qi=new P(null,"expecting","expecting",-57706705),ri=new P("instaparse","failure","instaparse/failure",1422918607),si=new P(null,"hide","hide",-596913169),ti=new P(null,"high","high",2027297808),ui=new P(null,"paren","paren",-294107600),vi=new P(null,"HEXDIG","HEXDIG",-200221072),wi=new P(null,"CTL","CTL",-9995632),xi=new P(null,
"option","option",65132272),qa=new P(null,"readably","readably",1129599760),yi=new P(null,"hex-char","hex-char",764443568),zi=new P(null,"DQUOTE","DQUOTE",-571169808),Ai=new P(null,"항목","항목",653027345),Kg=new P(null,"more-marker","more-marker",-14717935),Bi=new P(null,"unhide","unhide",-413983695),Ci=new P(null,"bin-val","bin-val",1705209105),Di=new P(null,"reason","reason",-2070751759),Ei=new P(null,"ebnf","ebnf",31967825),Fi=new P(null,"enlive","enlive",1679023921),Gi=new P(null,"alt-or-ord","alt-or-ord",
310249425),Hi=new P(null,"partial","partial",241141745),Ii=new P(null,"dec-val","dec-val",-1263870894),Ji=new P(null,"concatenation","concatenation",-951369614),Ki=new P(null,"total","total",1916810418),Li=new P(null,"alternation","alternation",-1162147630),Mi=new P(null,"링크","링크",851570994),Ni=new P(null,"parser","parser",-1543495310),Oi=new P(null,"각주이름","각주이름",2142158290),Pi=new P(null,"regexp","regexp",-541372782),Qi=new P(null,"parser1","parser1",-439601422),Ri=new P(null,"주소","주소",887186322),
Si=new P(null,"success","success",1890645906),Ti=new P(null,"repetition","repetition",1938392115),Ui=new P(null,"negative-lookahead","negative-lookahead",874382387),Vi=new P(null,"nodes","nodes",-2099585805),Wi=new P(null,"node-builder","node-builder",-1956562605),Xi=new P(null,"line","line",212345235),Yi=new P(null,"keyword","keyword",811389747),Zi=new P(null,"result","result",1415092211),$i=new P(null,"WSP","WSP",-1046948716),aj=new P(null,"segment","segment",-964921196),ta=new P(null,"print-length",
"print-length",1931866356),bj=new P(null,"max","max",61366548),cj=new P(null,"rulename-left","rulename-left",-1824251564),dj=new P(null,"factor","factor",-2103172748),ej=new P(null,"Epsilon","Epsilon",133418452),fj=new P("instaparse.gll","start-index","instaparse.gll/start-index",404653620),gj=new P(null,"red","red",-969428204),hj=new P(null,"링크타이틀","링크타이틀",1242553204),ij=new P(null,"링크텍스트","링크텍스트",1186401236),jj=new P(null,"optional","optional",2053951509),kj=new P(null,"CR","CR",-1654295403),lj=
new P(null,"comment","comment",532206069),mj=new P(null,"plus","plus",211540661),nj=new P(null,"OCTET","OCTET",-743420682),oj=new P(null,"굵게","굵게",492914166),pj=new P(null,"stack","stack",-793405930),qj=new P(null,"epsilon","epsilon",-730158570),rj=new P(null,"reduction-type","reduction-type",-488293450),sj=new P(null,"rulelist","rulelist",-1871218473),tj=new P(null,"opt-whitespace","opt-whitespace",1115207927),uj=new P(null,"각주","각주",-1305766633),vj=new P(null,"low","low",-1601362409),wj=new P(null,
"repeat","repeat",832692087),xj=new P(null,"ALPHA","ALPHA",-1463859144),yj=new P(null,"숫자목록","숫자목록",-415820616),zj=new P(null,"optimize","optimize",-1912349448),Aj=new P(null,"타이틀","타이틀",-356040424),Bj=new P(null,"next-stack","next-stack",-481930728),Cj=new P(null,"standard","standard",-1769206695),Y=new P(null,"tag","tag",-1290361223),Dj=new P(null,"hex-val","hex-val",1267737401),ge=new fc(null,"quote","quote",1377916282,null),Ej=new P(null,"CHAR","CHAR",-1280338086),fe=new P(null,"arglists","arglists",
1661989754),Fj=new P(null,"기울임","기울임",-673000421),ee=new fc(null,"nil-iter","nil-iter",1101030523,null),Gj=new P(null,"각주주소","각주주소",-939478885),Tg=new P(null,"alt-impl","alt-impl",670969595),Hj=new P(null,"abnf","abnf",-152462052),Ij=new P(null,"BIT","BIT",-1854474115),Jj=new P(null,"parsers","parsers",-804353827),Kj=new P(null,"listeners","listeners",394544445),Mj=new P(null,"string-ci","string-ci",374631805),Nj=new P(null,"auto-whitespace","auto-whitespace",741152317),Oj=new P(null,"char-range",
"char-range",1443391389),Pj=new P(null,"dec-char","dec-char",-646625154),Qj=new P(null,"문장","문장",1060037918),Rj=new P(null,"hi","hi",-1821422114),Sj=new P(null,"char","char",-641587586),Tj=new P(null,"각주링크","각주링크",-1512886049),Uj=new P(null,"opt","opt",-794706369),Vj=new P(null,"text","text",-1790561697),Wj=new P(null,"results","results",-1134170113);function Xj(b,a){var c=J(a);a:if(0===c)c=1;else for(var d=c|0,c=1,e=31;;){var f;f=d;if(hd(f))f=0===(f&1);else throw Error([u("Argument must be an integer: "),u(f)].join(""));d=sd(d);if(!f){if(0===d){c=Tb(e,c);break a}c=Tb(e,c)}e=Tb(e,e)}c|=0;return(Tb(c,b.$b)|0)+(a.$b-c)}function Yj(b,a){for(var c=Fe(b,a),d=a;;)if(q(Zj.a?Zj.a(c):Zj.call(null,c)))c=x.b(c,0),d=Lc.b(d,0);else return d}
function ak(b,a){return new Hd(null,function(){var c=L,d=Fe(b,a),e;a:{e=b;for(var f=a;;){if(G.b(J(f),1)){e=Uc(f)<(bk.a?bk.a(e):bk.call(null,e))-1?Yj(e,new T(null,1,5,U,[Uc(f)+1],null)):null;break a}var h=Uc(f),k;k=Fe(e,Vc(f));k=bk.a?bk.a(k):bk.call(null,k);if(h<k-1){e=Yj(e,Lc.b(Vc(f),Uc(f)+1));break a}f=Vc(f)}}return c(d,q(e)?ak(b,e):null)},null,null)}
var ck=function ck(a,c){if(null!=a&&null!=a.wc)return a.wc(0,c);var d=ck[l(null==a?null:a)];if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);d=ck._;if(null!=d)return d.b?d.b(a,c):d.call(null,a,c);throw t("ConjFlat.conj-flat",a);};function dk(b,a,c,d,e,f){this.O=b;this.$b=a;this.mb=c;this.l=d;this.Hb=e;this.Vb=f;this.m=31850958;this.F=0}g=dk.prototype;g.toString=function(){return Rb(y(this))};g.J=function(b,a){return this.O.J(null,a)};g.H=function(b,a,c){return this.O.H(null,a,c)};g.S=function(){return Tc(this.O)};
g.wa=function(){return E(y(this))};g.Y=function(){return this.l};g.P=function(){return this.mb};g.A=function(b,a){return G.b(this.mb,bc(a))&&G.b(this.l,J(a))&&(G.b(this.l,0)||G.b(y(this),a))};g.ba=function(){return Fc(ek,Tc(this))};g.ha=function(){return D(y(this))};g.qa=function(){return gc(y(this))};g.X=function(){if(!q(this.Vb)){var b;this.Hb?(b=this.O,b=0<J(b)?ak(b,Yj(b,new T(null,1,5,U,[0],null))):null):b=y(this.O);this.Vb=b}return this.Vb};
g.T=function(b,a){return new dk(Fc(this.O,a),this.$b,this.mb,this.l,this.Hb,null)};g.V=function(b,a){return L(a,this)};
g.wc=function(b,a){if(null==a)return this;if(q(Zj.a?Zj.a(a):Zj.call(null,a))){if(0===this.l)return a;if(32>=J(a)){var c=Xj(this,a),d=this.l+J(a),e=Ee.b(this.O,a),f=c,c=kc(c,d),h=this.Hb;return new dk(e,f,c,d,h?h:a.Hb,null)}c=Xj(this,a);d=this.l+J(a);return new dk(Lc.b(this.O,a),c,kc(c,d),d,!0,null)}c=Tb(31,this.$b)+bc(a)|0;d=this.l+1;return new dk(Lc.b(this.O,a),c,kc(c,d),d,this.Hb,null)};g.Z=!0;g.M=function(b,a,c){return yb(y(this),a,c)};
function fk(b){b=Ze(b);var a=J(b),c;a:{c=1;for(var d=y(b);;)if(null!=d)c=Tb(31,c)+bc(D(d))|0,d=E(d);else break a}return new dk(b,c,kc(c,a),a,!1,null)}var ek=fk(Mc);function Zj(b){return b instanceof dk}function bk(b){return q(Zj(b))?J(b.O):J(b)}
var gk=function gk(a,c){for(;;)if(y(c)){var d=D(c);if(q(Zj(d)))var d=gk(a,d),e=E(c);else d=Vd.b(a,d),e=E(c);a=d;c=e}else return a},hk=function hk(a){if(null!=a&&null!=a.yb)return a.yb();var c=hk[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=hk._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("GetVec.get-vec",a);};function ik(b,a,c,d){this.O=b;this.mb=a;this.l=c;this.Ba=d;this.m=167142175;this.F=2048}g=ik.prototype;g.toString=function(){return Rb(this.yb())};
g.J=function(b,a){return hk(this).J(null,a)};g.H=function(b,a,c){return hk(this).H(null,a,c)};g.yb=function(){var b=this;va(qc.a?qc.a(b.Ba):qc.call(null,b.Ba))&&(we.b(b.Ba,function(){return function(){var a;a=qc.a?qc.a(b.O):qc.call(null,b.O);var c;c=Bb(Mc);a=Ud(gk(c,a));return Fc(a,Tc(qc.a?qc.a(b.O):qc.call(null,b.O)))}}(this)),we.b(b.O,function(){return function(){return null}}(this)));return qc.a?qc.a(b.Ba):qc.call(null,b.Ba)};g.R=function(b,a){return hk(this).R(null,a)};
g.va=function(b,a,c){return hk(this).va(null,a,c)};g.jb=function(b,a,c){return hk(this).jb(null,a,c)};g.S=function(){return q(qc.a?qc.a(this.Ba):qc.call(null,this.Ba))?Tc(qc.a?qc.a(this.Ba):qc.call(null,this.Ba)):Tc(qc.a?qc.a(this.O):qc.call(null,this.O))};g.Y=function(){return this.l};g.Sa=function(){return hk(this).Sa(null)};g.Ta=function(){return hk(this).Ta(null)};g.Fb=function(){var b;0<this.l?(b=hk(this),b=wb(b)):b=null;return b};g.P=function(){return this.mb};
g.A=function(b,a){return G.b(this.mb,bc(a))&&G.b(this.l,J(a))&&G.b(hk(this),a)};g.ba=function(){return Fc(Mc,Tc(this))};g.Ia=function(b,a,c){return O.c(hk(this),a,c)};g.Db=function(b,a){return hk(this).Db(null,a)};g.X=function(){return y(hk(this))};
g.T=function(b,a){var c=this;return q(qc.a?qc.a(c.Ba):qc.call(null,c.Ba))?new ik(function(){var a=qc.a?qc.a(c.O):qc.call(null,c.O);return se?se(a):re.call(null,a)}(),c.mb,c.l,function(){var b=Fc(qc.a?qc.a(c.Ba):qc.call(null,c.Ba),a);return se?se(b):re.call(null,b)}()):new ik(function(){var b=Fc(qc.a?qc.a(c.O):qc.call(null,c.O),a);return se?se(b):re.call(null,b)}(),c.mb,c.l,function(){var a=qc.a?qc.a(c.Ba):qc.call(null,c.Ba);return se?se(a):re.call(null,a)}())};
g.V=function(b,a){return Lc.b(hk(this),a)};g.call=function(){function b(a,b,c){return this.yb().c(null,b,c)}function a(a,b){return this.yb().b(null,b)}var c=null,c=function(c,e,f){switch(arguments.length){case 2:return a.call(this,0,e);case 3:return b.call(this,0,e,f)}throw Error("Invalid arity: "+arguments.length);};c.b=a;c.c=b;return c}();g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};g.a=function(b){return this.yb().b(null,b)};
g.b=function(b,a){return this.yb().c(null,b,a)};g.qb=function(b,a){return Ib(hk(this),a)};g.Z=!0;g.M=function(b,a,c){return yb(hk(this),a,c)};function jk(b){if(q(b.Hb))if(q(b.Vb))b=Ze(y(b));else{var a;a=b.O;a=se?se(a):re.call(null,a);b=new ik(a,b.mb,b.l,se?se(null):re.call(null,null))}else b=b.O;return b};function kk(b){return y(b)&&va(E(b))}var lk=new p(null,1,[rj,Ph],null),mk=new p(null,2,[mi,function(b){return new p(null,2,[rj,mi,zh,b],null)},Fi,function(b){return new p(null,2,[rj,Fi,zh,b],null)}],null),nk=new p(null,2,[Fi,function(b,a){return new p(null,2,[Y,b,Oh,Ja(hc,a)],null)},mi,function(b,a){return new T(null,2,5,U,[b,a],null)}],null);
function ok(b,a){switch(rj.a(b)instanceof P?rj.a(b).ga:null){case "raw":return ck(ek,a);case "hiccup":return jk(ck(fk(new T(null,1,5,U,[zh.a(b)],null)),a));case "enlive":var c=ck(ek,a);return new p(null,2,[Y,zh.a(b),Oh,0===J(c)?null:c],null);default:return b.a?b.a(a):b.call(null,a)}}
function pk(b,a){var c=mk.a?mk.a(b):mk.call(null,b);if(q(c))return Ee.b(he,function(){return function(a,b){return function h(c){return new Hd(null,function(a){return function(){for(;;){var b=y(c);if(b){if(ad(b)){var d=Kb(b),e=J(d),z=Md(e);a:for(var B=0;;)if(B<e){var F=w.b(d,B),I=N(F,0,null),F=N(F,1,null),I=q(gj.a(F))?new T(null,2,5,U,[I,F],null):new T(null,2,5,U,[I,O.c(F,gj,a.a?a.a(I):a.call(null,I))],null);z.add(I);B+=1}else{d=!0;break a}return d?Od(z.ea(),h(Lb(b))):Od(z.ea(),null)}d=D(b);z=N(d,
0,null);d=N(d,1,null);return L(q(gj.a(d))?new T(null,2,5,U,[z,d],null):new T(null,2,5,U,[z,O.c(d,gj,a.a?a.a(z):a.call(null,z))],null),h(gc(b)))}return null}}}(a,b),null,null)}}(c,c)(a)}());throw[u("Invalid output format"),u(b),u(". Use :enlive or :hiccup.")].join("");};var Cg=new p(null,1,[Y,qj],null);function qk(b){return G.b(b,Cg)?Cg:new p(null,2,[Y,Uj,Ni,b],null)}function rk(b){return G.b(b,Cg)?Cg:new p(null,2,[Y,mj,Ni,b],null)}function sk(b){return G.b(b,Cg)?Cg:new p(null,2,[Y,hi,Ni,b],null)}function tk(b,a,c){if(!(b<=a))throw Error("Assert failed: (\x3c\x3d m n)");return G.b(c,Cg)?Cg:new p(null,4,[Y,ci,Ni,c,jh,b,bj,a],null)}
var uk=function uk(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;return uk.h(0<c.length?new C(c.slice(0),0,null):null)};uk.h=function(b){return ie(ne(G,Cg),b)?Cg:q(kk(b))?D(b):new p(null,2,[Y,Gh,Jj,b],null)};uk.C=0;uk.B=function(b){return uk.h(y(b))};var vk=function vk(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 0:return vk.G();default:return vk.h(arguments[0],new C(c.slice(1),0,null))}};vk.G=function(){return Cg};
vk.h=function(b,a){var c;G.b(b,Cg)?(c=Bg(),c=Ce.b(ke(c),a)):c=a;y(c)?(c=Xd(vk,c),c=new p(null,3,[Y,qh,Qi,b,eh,c],null)):c=b;return c};vk.B=function(b){var a=D(b);b=E(b);return vk.h(a,b)};vk.C=1;var wk=function wk(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;return wk.h(0<c.length?new C(c.slice(0),0,null):null)};wk.h=function(b){if(ie(ne(G,Cg),b))return Cg;var a=Bg();b=Ce.b(ke(a),b);return q(kk(b))?D(b):new p(null,2,[Y,gh,Jj,b],null)};wk.C=0;wk.B=function(b){return wk.h(y(b))};
function xk(b){return G.b(b,"")?Cg:new p(null,2,[Y,ji,ji,b],null)}function yk(b){return G.b(b,"")?Cg:new p(null,2,[Y,Mj,ji,b],null)}function zk(b,a){if(!(b<=a))throw Error([u("Assert failed: "),u("Character range minimum must be less than or equal the maximum"),u("\n"),u("(\x3c\x3d lo hi)")].join(""));return new p(null,3,[Y,Sj,oi,b,Rj,a],null)}function Ak(b){if(b instanceof RegExp){b=""+u(b);var a=J(b)-1;return b.substring(1,a)}return b}
function Bk(b){b=[u("^"),u(Ak(b))].join("");return G.b(b,"^")?Cg:new p(null,2,[Y,Pi,Pi,Ig(b)],null)}function Z(b){return new p(null,2,[Y,$h,Yi,b],null)}function Ck(b){return new p(null,2,[Y,Lh,Ni,b],null)}function Dk(b){return new p(null,2,[Y,dh,Ni,b],null)}function Ek(b){return O.c(b,si,!0)}function Fk(b){return O.c(b,gj,lk)}
var Gk=function Gk(a){a=q(si.a(a))?Qc.b(a,si):a;return q(Ni.a(a))?O.c(a,Ni,Gk(Ni.a(a))):q(Jj.a(a))?O.c(a,Jj,V.b(Gk,Jj.a(a))):G.b(Y.a(a),qh)?O.h(a,Qi,Gk(Qi.a(a)),M([eh,Gk(eh.a(a))],0)):a};
function Hk(b){return Ee.b(he,function(){return function c(b){return new Hd(null,function(){for(;;){var e=y(b);if(e){if(ad(e)){var f=Kb(e),h=J(f),k=Md(h);a:for(var m=0;;)if(m<h){var n=w.b(f,m),v=N(n,0,null),n=N(n,1,null),v=new T(null,2,5,U,[v,Gk(n)],null);k.add(v);m+=1}else{f=!0;break a}return f?Od(k.ea(),c(Lb(e))):Od(k.ea(),null)}f=D(e);k=N(f,0,null);f=N(f,1,null);return L(new T(null,2,5,U,[k,Gk(f)],null),c(gc(e)))}return null}},null,null)}(b)}())}
function Ik(b,a){var c=mk.a?mk.a(b):mk.call(null,b);if(q(c))return Ee.b(he,function(){return function(a,b){return function h(c){return new Hd(null,function(a){return function(){for(;;){var b=y(c);if(b){if(ad(b)){var d=Kb(b),e=J(d),z=Md(e);a:for(var B=0;;)if(B<e){var F=w.b(d,B),I=N(F,0,null),F=N(F,1,null),I=new T(null,2,5,U,[I,O.c(F,gj,a.a?a.a(I):a.call(null,I))],null);z.add(I);B+=1}else{d=!0;break a}return d?Od(z.ea(),h(Lb(b))):Od(z.ea(),null)}d=D(b);z=N(d,0,null);d=N(d,1,null);return L(new T(null,
2,5,U,[z,O.c(d,gj,a.a?a.a(z):a.call(null,z))],null),h(gc(b)))}return null}}}(a,b),null,null)}}(c,c)(a)}());throw[u("Invalid output format"),u(b),u(". Use :enlive or :hiccup.")].join("");}
function Jk(b,a){var c=mk.a?mk.a(b):mk.call(null,b);if(q(c))return Ee.b(he,function(){return function(a,b){return function h(c){return new Hd(null,function(a){return function(){for(;;){var b=y(c);if(b){if(ad(b)){var d=Kb(b),e=J(d),z=Md(e);a:for(var B=0;;)if(B<e){var F=w.b(d,B),I=N(F,0,null),F=N(F,1,null),I=new T(null,2,5,U,[I,O.c(Gk(F),gj,a.a?a.a(I):a.call(null,I))],null);z.add(I);B+=1}else{d=!0;break a}return d?Od(z.ea(),h(Lb(b))):Od(z.ea(),null)}d=D(b);z=N(d,0,null);d=N(d,1,null);return L(new T(null,
2,5,U,[z,O.c(Gk(d),gj,a.a?a.a(z):a.call(null,z))],null),h(gc(b)))}return null}}}(a,b),null,null)}}(c,c)(a)}());throw[u("Invalid output format"),u(b),u(". Use :enlive or :hiccup.")].join("");}
var Kk=function Kk(a,c){var d=Y.a(a)instanceof P?Y.a(a).ga:null;switch(d){case "neg":return Ge.I(a,new T(null,1,5,U,[Ni],null),Kk,c);case "cat":return O.c(a,Jj,V.b(function(){return function(a){return Kk(a,c)}}(d),Jj.a(a)));case "ord":return O.h(a,Qi,Kk(Qi.a(a),c),M([eh,Kk(eh.a(a),c)],0));case "alt":return O.c(a,Jj,V.b(function(){return function(a){return Kk(a,c)}}(d),Jj.a(a)));case "look":return Ge.I(a,new T(null,1,5,U,[Ni],null),Kk,c);case "nt":return a;case "rep":return Ge.I(a,new T(null,1,5,U,
[Ni],null),Kk,c);case "star":return Ge.I(a,new T(null,1,5,U,[Ni],null),Kk,c);case "string":return q(gj.a(a))?O.c(wk.h(M([c,Qc.b(a,gj)],0)),gj,gj.a(a)):wk.h(M([c,a],0));case "regexp":return q(gj.a(a))?O.c(wk.h(M([c,Qc.b(a,gj)],0)),gj,gj.a(a)):wk.h(M([c,a],0));case "plus":return Ge.I(a,new T(null,1,5,U,[Ni],null),Kk,c);case "epsilon":return a;case "string-ci":return q(gj.a(a))?O.c(wk.h(M([c,Qc.b(a,gj)],0)),gj,gj.a(a)):wk.h(M([c,a],0));case "opt":return Ge.I(a,new T(null,1,5,U,[Ni],null),Kk,c);default:throw Error([u("No matching clause: "),
u(Y.a(a))].join(""));}};
function Lk(b,a,c,d){var e=Ek(qk(Z(d))),f=O.c(c,d,Fk(c.a?c.a(d):c.call(null,d)));c=Ee.b(he,function(){return function(a,b){return function n(c){return new Hd(null,function(a){return function(){for(;;){var b=y(c);if(b){if(ad(b)){var d=Kb(b),e=J(d),f=Md(e);a:for(var h=0;;)if(h<e){var k=w.b(d,h),ca=N(k,0,null),k=N(k,1,null),ca=new T(null,2,5,U,[ca,Kk(k,a)],null);f.add(ca);h+=1}else{d=!0;break a}return d?Od(f.ea(),n(Lb(b))):Od(f.ea(),null)}d=D(b);f=N(d,0,null);d=N(d,1,null);return L(new T(null,2,5,U,
[f,Kk(d,a)],null),n(gc(b)))}return null}}}(a,b),null,null)}}(e,f)(b)}());a=O.c(c,a,O.c(wk.h(M([Qc.b(c.a?c.a(a):c.call(null,a),gj),e],0)),gj,gj.a(c.a?c.a(a):c.call(null,a))));return vg.h(M([a,f],0))};function Mk(b){return function(){function a(a){var b=null;if(0<arguments.length){for(var b=0,f=Array(arguments.length-0);b<f.length;)f[b]=arguments[b+0],++b;b=new C(f,0)}return c.call(this,b)}function c(a){a=ze(a);if(G.b(J(a),1))return a=D(a),b.a?b.a(a):b.call(null,a);a=Ze(a);return b.a?b.a(a):b.call(null,a)}a.C=0;a.B=function(a){a=y(a);return c(a)};a.h=c;return a}()}
function Nk(b,a,c){if("string"===typeof a)return b.replace(new RegExp(String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g,"\\$1").replace(/\x08/g,"\\x08"),"g"),c);if(a instanceof RegExp)return"string"===typeof c?b.replace(new RegExp(a.source,"g"),c):b.replace(new RegExp(a.source,"g"),Mk(c));throw[u("Invalid match arg: "),u(a)].join("");}function Ok(b,a){for(var c=new fa,d=y(a);;)if(null!=d)c.append(""+u(D(d))),d=E(d),null!=d&&c.append(b);else return c.toString()}
function Pk(b){return b.toUpperCase()};function pe(b,a,c){(a=va(a))?(a=c.a?c.a(Y):c.call(null,Y),b=b.a?b.a(a):b.call(null,a)):b=a;return q(b)?[u("("),u(Qk?Qk(c,!1):Rk.call(null,c,!1)),u(")")].join(""):Qk?Qk(c,!1):Rk.call(null,c,!1)}var Sk=ne(pe,new yg(null,new p(null,3,[gh,null,qh,null,Gh,null],null),null));function Tk(b){switch(b){case "\n":return"\\n";case "\b":return"\\b";case "\f":return"\\f";case "\r":return"\\r";case "\t":return"\\t";default:return b}}
function Uk(b){return Nk([u('#"'),u(b.source.substring(1)),u('"')].join(""),/[\s]/,Tk)}function Vk(b){return 4095>=b?[u("0000"),u(b.toString(16))].join("").substr(-4):b.toString(16)}function Wk(b){var a=null!=b&&(b.m&64||b.pa)?Xd(te,b):b;b=x.b(a,oi);a=x.b(a,Rj);return G.b(b,a)?[u("%x"),u(Vk(b))].join(""):[u("%x"),u(Vk(b)),u("-"),u(Vk(a))].join("")}
function Rk(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;switch(a.length){case 1:return Qk(arguments[0],!1);case 2:return Qk(arguments[0],arguments[1]);default:throw Error([u("Invalid arity: "),u(a.length)].join(""));}}
function Qk(b,a){var c=null!=b&&(b.m&64||b.pa)?Xd(te,b):b,d=x.b(c,Ni),e=x.b(c,Qi),f=x.b(c,eh),h=x.b(c,Jj),k=x.b(c,Y);if(q(function(){var b=va(a);return b?si.a(c):b}()))return[u("\x3c"),u(Qk(c,!0)),u("\x3e")].join("");var m=k instanceof P?k.ga:null;switch(m){case "neg":return[u("!"),u(Sk.b?Sk.b(a,d):Sk.call(null,a,d))].join("");case "cat":return Ok(" ",V.b(oe(new yg(null,new p(null,2,[qh,null,Gh,null],null),null),a),h));case "ord":return[u(pe(new yg(null,new p(null,1,[Gh,null],null),null),a,e)),u(" / "),
u(pe(new yg(null,new p(null,1,[Gh,null],null),null),a,f))].join("");case "alt":return Ok(" | ",V.b(oe(new yg(null,new p(null,1,[qh,null],null),null),a),h));case "look":return[u("\x26"),u(Sk.b?Sk.b(a,d):Sk.call(null,a,d))].join("");case "nt":return vd(""+u(Yi.a(c)),1);case "rep":return be(jh.a(c),bj.a(c))?[u(Sk.b?Sk.b(a,d):Sk.call(null,a,d)),u("{"),u(jh.a(c)),u(","),u(bj.a(c)),u("}")].join(""):[u(Sk.b?Sk.b(a,d):Sk.call(null,a,d)),u("{"),u(jh.a(c)),u("}")].join("");case "star":return[u(Sk.b?Sk.b(a,
d):Sk.call(null,a,d)),u("*")].join("");case "string":var n=new fa,v=la,A=ja;la=!0;ja=function(a,b,c){return function(a){return c.append(a)}}(v,A,n,m,b,c,c,d,e,f,h,k);try{Xg(M([ji.a(c)],0))}finally{ja=A,la=v}return""+u(n);case "regexp":return Uk(Pi.a(c));case "plus":return[u(Sk.b?Sk.b(a,d):Sk.call(null,a,d)),u("+")].join("");case "epsilon":return"ε";case "string-ci":n=new fa;v=la;A=ja;la=!0;ja=function(a,b,c){return function(a){return c.append(a)}}(v,A,n,m,b,c,c,d,e,f,h,k);try{Xg(M([ji.a(c)],0))}finally{ja=
A,la=v}return""+u(n);case "char":return Wk(c);case "opt":return[u(Sk.b?Sk.b(a,d):Sk.call(null,a,d)),u("?")].join("");default:throw Error([u("No matching clause: "),u(k)].join(""));}}function Xk(b,a){return G.b(rj.a(gj.a(a)),Ph)?[u("\x3c"),u(Gd(b)),u("\x3e"),u(" \x3d "),u(Qk(a,!1))].join(""):[u(Gd(b)),u(" \x3d "),u(Qk(a,!1))].join("")}
function Yk(b){var a=null!=b&&(b.m&64||b.pa)?Xd(te,b):b,c=x.b(a,ai),d=x.b(a,Qh);return Ok("\n",L(Xk(d,c.a?c.a(d):c.call(null,d)),function(){return function(a,b,c,d){return function n(v){return new Hd(null,function(a,b,c,d){return function(){for(var a=v;;)if(a=y(a)){if(ad(a)){var b=Kb(a),c=J(b),e=Md(c);a:for(var f=0;;)if(f<c){var h=w.b(b,f),k=N(h,0,null),h=N(h,1,null);be(k,d)&&(k=Xk(k,h),e.add(k));f+=1}else{b=!0;break a}return b?Od(e.ea(),n(Lb(a))):Od(e.ea(),null)}b=D(a);e=N(b,0,null);b=N(b,1,null);
if(be(e,d))return L(Xk(e,b),n(gc(a)));a=gc(a)}else return null}}(a,b,c,d),null,null)}}(b,a,c,d)(c)}()))};function Zk(b){return null!=b&&0<=b&&1114111>=b?65536<=b&&1114111>=b?String.fromCharCode((b>>10)+55232)+String.fromCharCode((b&1023)+56320):String.fromCharCode(b):null}
function $k(b,a){var c=b.charCodeAt(a);if(55296<=c&&56319>=c&&a+1<b.length){var d=b.charCodeAt(a+1);if(56320<=d&&57343>=d)return 55296<=c&&56319>=c&&56320<=d&&57343>=d?(c<<10)-56623104+(d-56320+65536):null}else if(56320<=c&&57343>=c&&0<a&&(d=b.charCodeAt(a-1),55296<=d&&56319>=d))return-(55296<=d&&56319>=d&&56320<=c&&57343>=c?(d<<10)-56623104+(c-56320+65536):0);return c};function al(b){return ed((new yg(null,new p(null,2,["\n",null,"\r",null],null),null)).call(null,b))}function bl(b,a){for(var c=y(Nk(a,"\r\n","\n")),d=b;;){if(Wc(c))return"";if(G.b(d,1))return Xd(u,Fg(ke(al),c));q(al(D(c)))?(c=E(c),--d):c=E(c)}}function cl(b){q(nh.a(b))?(Yg.h(M(["NOT "],0)),Yg.h(M([nh.a(b)],0))):q(Oj.a(b))?Yg.h(M([Wk(b)],0)):b instanceof RegExp?Yg.h(M([Uk(b)],0)):Xg(M([b],0))}
function dl(b){var a=null!=b&&(b.m&64||b.pa)?Xd(te,b):b;b=x.b(a,Xi);var c=x.b(a,pi),d=x.b(a,Vj),a=x.b(a,Di);$g(M(["Parse error at line",b,", column",c,":\n"],0));$g(M([d],0));$g(M([hd(c)?1>=c?"^":Xd(u,Td.b(xe(c-1,Ae(" ")),new T(null,1,5,U,["^"],null))):null],0));c=Dg(V.b(qi,Ce.b(xh,a)));b=Dg(V.b(qi,Ce.b(ke(xh),a)));d=J(c)+J(b);0!==d&&(G.b(1,d)?$g(M(["Expected:"],0)):$g(M(["Expected one of:"],0)));for(var c=y(c),d=null,e=a=0;;)if(e<a){var f=d.R(null,e);cl(f);$g(M([" (followed by end-of-string)"],0));
e+=1}else if(c=y(c))d=c,ad(d)?(c=Kb(d),e=Lb(d),d=c,a=J(c),c=e):(c=D(d),cl(c),$g(M([" (followed by end-of-string)"],0)),c=E(d),d=null,a=0),e=0;else break;b=y(b);c=null;for(e=a=0;;)if(e<a)d=c.R(null,e),cl(d),Zg(),e+=1;else if(b=y(b))c=b,ad(c)?(b=Kb(c),a=Lb(c),c=b,d=J(b),b=a,a=d):(d=D(c),cl(d),Zg(),b=E(c),c=null,a=0),e=0;else break};var el=function el(a){if(null!=a&&null!=a.xc)return a.xc();var c=el[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=el._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("ISegment.toString",a);};function fl(b,a,c){this.text=b;this.offset=a;this.count=c;this.m=2;this.F=0}fl.prototype.xc=function(){return this.text.substring(this.offset,this.offset+this.count)};fl.prototype.Y=function(){return this.count};
function gl(b,a,c){switch(Y.a(b)instanceof P?Y.a(b).ga:null){case "neg":return hl.c?hl.c(b,a,c):hl.call(null,b,a,c);case "cat":return il.c?il.c(b,a,c):il.call(null,b,a,c);case "ord":return jl.c?jl.c(b,a,c):jl.call(null,b,a,c);case "alt":return kl.c?kl.c(b,a,c):kl.call(null,b,a,c);case "look":return ll.c?ll.c(b,a,c):ll.call(null,b,a,c);case "nt":return ml.c?ml.c(b,a,c):ml.call(null,b,a,c);case "rep":return nl.c?nl.c(b,a,c):nl.call(null,b,a,c);case "star":return ol.c?ol.c(b,a,c):ol.call(null,b,a,c);
case "string":return pl.c?pl.c(b,a,c):pl.call(null,b,a,c);case "regexp":return ql.c?ql.c(b,a,c):ql.call(null,b,a,c);case "plus":return rl.c?rl.c(b,a,c):rl.call(null,b,a,c);case "epsilon":return sl.c?sl.c(b,a,c):sl.call(null,b,a,c);case "string-ci":return tl.c?tl.c(b,a,c):tl.call(null,b,a,c);case "char":return ul.c?ul.c(b,a,c):ul.call(null,b,a,c);case "opt":return vl.c?vl.c(b,a,c):vl.call(null,b,a,c);default:throw Error([u("No matching clause: "),u(Y.a(b))].join(""));}}
function wl(b,a,c){switch(Y.a(b)instanceof P?Y.a(b).ga:null){case "neg":return hl.c?hl.c(b,a,c):hl.call(null,b,a,c);case "cat":return xl.c?xl.c(b,a,c):xl.call(null,b,a,c);case "ord":return yl.c?yl.c(b,a,c):yl.call(null,b,a,c);case "alt":return zl.c?zl.c(b,a,c):zl.call(null,b,a,c);case "look":return Al.c?Al.c(b,a,c):Al.call(null,b,a,c);case "nt":return Bl.c?Bl.c(b,a,c):Bl.call(null,b,a,c);case "rep":return Cl.c?Cl.c(b,a,c):Cl.call(null,b,a,c);case "star":return Dl.c?Dl.c(b,a,c):Dl.call(null,b,a,c);
case "string":return El.c?El.c(b,a,c):El.call(null,b,a,c);case "regexp":return Gl.c?Gl.c(b,a,c):Gl.call(null,b,a,c);case "plus":return Hl.c?Hl.c(b,a,c):Hl.call(null,b,a,c);case "epsilon":return Il.c?Il.c(b,a,c):Il.call(null,b,a,c);case "string-ci":return Jl.c?Jl.c(b,a,c):Jl.call(null,b,a,c);case "char":return Kl.c?Kl.c(b,a,c):Kl.call(null,b,a,c);case "opt":return Ll.c?Ll.c(b,a,c):Ll.call(null,b,a,c);default:throw Error([u("No matching clause: "),u(Y.a(b))].join(""));}}
function Ml(b,a,c,d,e){this.index=b;this.reason=a;this.K=c;this.D=d;this.v=e;this.m=2229667594;this.F=8192}g=Ml.prototype;g.J=function(b,a){return Qa.c(this,a,null)};g.H=function(b,a,c){switch(a instanceof P?a.ga:null){case "index":return this.index;case "reason":return this.reason;default:return x.c(this.D,a,c)}};
g.M=function(b,a,c){return Jg(a,function(){return function(b){return Jg(a,Rg,""," ","",c,b)}}(this),"#instaparse.gll.Failure{",", ","}",c,Td.b(new T(null,2,5,U,[new T(null,2,5,U,[Bh,this.index],null),new T(null,2,5,U,[Di,this.reason],null)],null),this.D))};g.Ea=function(){return new qf(0,this,2,new T(null,2,5,U,[Bh,Di],null),Pb(this.D))};g.S=function(){return this.K};g.Y=function(){return 2+J(this.D)};g.P=function(){var b=this.v;return null!=b?b:this.v=b=wd(this)};
g.A=function(b,a){var c;c=q(a)?(c=this.constructor===a.constructor)?pf(this,a):c:a;return q(c)?!0:!1};g.rb=function(b,a){return id(new yg(null,new p(null,2,[Bh,null,Di,null],null),null),a)?Qc.b(Fc(Ee.b(he,this),this.K),a):new Ml(this.index,this.reason,this.K,ce(Qc.b(this.D,a)),null)};
g.Ia=function(b,a,c){return q(S.b?S.b(Bh,a):S.call(null,Bh,a))?new Ml(c,this.reason,this.K,this.D,null):q(S.b?S.b(Di,a):S.call(null,Di,a))?new Ml(this.index,c,this.K,this.D,null):new Ml(this.index,this.reason,this.K,O.c(this.D,a,c),null)};g.X=function(){return y(Td.b(new T(null,2,5,U,[new T(null,2,5,U,[Bh,this.index],null),new T(null,2,5,U,[Di,this.reason],null)],null),this.D))};g.T=function(b,a){return new Ml(this.index,this.reason,a,this.D,this.v)};
g.V=function(b,a){return $c(a)?Sa(this,w.b(a,0),w.b(a,1)):Ea(Ja,this,a)};g.Z=!0;g.M=function(b,a){var c=this;return xb(a,function(){var a=new fa,b=la,f=ja;la=!0;ja=function(a,b,c){return function(a){return c.append(a)}}(b,f,a,c);try{dl(c)}finally{ja=f,la=b}return""+u(a)}())};function Nl(b){return new fl(b,0,J(b))}
function Ol(b,a,c,d,e,f,h,k,m,n,v,A,z,B,F,I){this.ca=b;this.text=a;this.ta=c;this.ra=d;this.sa=e;this.stack=f;this.ia=h;this.ma=k;this.fa=m;this.na=n;this.U=v;this.success=A;this.la=z;this.K=B;this.D=F;this.v=I;this.m=2229667594;this.F=8192}g=Ol.prototype;g.J=function(b,a){return Qa.c(this,a,null)};
g.H=function(b,a,c){switch(a instanceof P?a.ga:null){case "msg-cache":return this.na;case "negative-listeners":return this.fa;case "generation":return this.ma;case "failure":return this.la;case "fail-index":return this.ra;case "grammar":return this.ca;case "success":return this.success;case "nodes":return this.U;case "node-builder":return this.sa;case "segment":return this.ta;case "stack":return this.stack;case "next-stack":return this.ia;case "text":return this.text;default:return x.c(this.D,a,c)}};
g.M=function(b,a,c){return Jg(a,function(){return function(b){return Jg(a,Rg,""," ","",c,b)}}(this),"#instaparse.gll.Tramp{",", ","}",c,Td.b(new T(null,13,5,U,[new T(null,2,5,U,[ai,this.ca],null),new T(null,2,5,U,[Vj,this.text],null),new T(null,2,5,U,[aj,this.ta],null),new T(null,2,5,U,[Zh,this.ra],null),new T(null,2,5,U,[Wi,this.sa],null),new T(null,2,5,U,[pj,this.stack],null),new T(null,2,5,U,[Bj,this.ia],null),new T(null,2,5,U,[th,this.ma],null),new T(null,2,5,U,[sh,this.fa],null),new T(null,2,
5,U,[mh,this.na],null),new T(null,2,5,U,[Vi,this.U],null),new T(null,2,5,U,[Si,this.success],null),new T(null,2,5,U,[Ih,this.la],null)],null),this.D))};g.Ea=function(){return new qf(0,this,13,new T(null,13,5,U,[ai,Vj,aj,Zh,Wi,pj,Bj,th,sh,mh,Vi,Si,Ih],null),Pb(this.D))};g.S=function(){return this.K};g.Y=function(){return 13+J(this.D)};g.P=function(){var b=this.v;return null!=b?b:this.v=b=wd(this)};g.A=function(b,a){var c;c=q(a)?(c=this.constructor===a.constructor)?pf(this,a):c:a;return q(c)?!0:!1};
g.rb=function(b,a){return id(new yg(null,new p(null,13,[mh,null,sh,null,th,null,Ih,null,Zh,null,ai,null,Si,null,Vi,null,Wi,null,aj,null,pj,null,Bj,null,Vj,null],null),null),a)?Qc.b(Fc(Ee.b(he,this),this.K),a):new Ol(this.ca,this.text,this.ta,this.ra,this.sa,this.stack,this.ia,this.ma,this.fa,this.na,this.U,this.success,this.la,this.K,ce(Qc.b(this.D,a)),null)};
g.Ia=function(b,a,c){return q(S.b?S.b(ai,a):S.call(null,ai,a))?new Ol(c,this.text,this.ta,this.ra,this.sa,this.stack,this.ia,this.ma,this.fa,this.na,this.U,this.success,this.la,this.K,this.D,null):q(S.b?S.b(Vj,a):S.call(null,Vj,a))?new Ol(this.ca,c,this.ta,this.ra,this.sa,this.stack,this.ia,this.ma,this.fa,this.na,this.U,this.success,this.la,this.K,this.D,null):q(S.b?S.b(aj,a):S.call(null,aj,a))?new Ol(this.ca,this.text,c,this.ra,this.sa,this.stack,this.ia,this.ma,this.fa,this.na,this.U,this.success,
this.la,this.K,this.D,null):q(S.b?S.b(Zh,a):S.call(null,Zh,a))?new Ol(this.ca,this.text,this.ta,c,this.sa,this.stack,this.ia,this.ma,this.fa,this.na,this.U,this.success,this.la,this.K,this.D,null):q(S.b?S.b(Wi,a):S.call(null,Wi,a))?new Ol(this.ca,this.text,this.ta,this.ra,c,this.stack,this.ia,this.ma,this.fa,this.na,this.U,this.success,this.la,this.K,this.D,null):q(S.b?S.b(pj,a):S.call(null,pj,a))?new Ol(this.ca,this.text,this.ta,this.ra,this.sa,c,this.ia,this.ma,this.fa,this.na,this.U,this.success,
this.la,this.K,this.D,null):q(S.b?S.b(Bj,a):S.call(null,Bj,a))?new Ol(this.ca,this.text,this.ta,this.ra,this.sa,this.stack,c,this.ma,this.fa,this.na,this.U,this.success,this.la,this.K,this.D,null):q(S.b?S.b(th,a):S.call(null,th,a))?new Ol(this.ca,this.text,this.ta,this.ra,this.sa,this.stack,this.ia,c,this.fa,this.na,this.U,this.success,this.la,this.K,this.D,null):q(S.b?S.b(sh,a):S.call(null,sh,a))?new Ol(this.ca,this.text,this.ta,this.ra,this.sa,this.stack,this.ia,this.ma,c,this.na,this.U,this.success,
this.la,this.K,this.D,null):q(S.b?S.b(mh,a):S.call(null,mh,a))?new Ol(this.ca,this.text,this.ta,this.ra,this.sa,this.stack,this.ia,this.ma,this.fa,c,this.U,this.success,this.la,this.K,this.D,null):q(S.b?S.b(Vi,a):S.call(null,Vi,a))?new Ol(this.ca,this.text,this.ta,this.ra,this.sa,this.stack,this.ia,this.ma,this.fa,this.na,c,this.success,this.la,this.K,this.D,null):q(S.b?S.b(Si,a):S.call(null,Si,a))?new Ol(this.ca,this.text,this.ta,this.ra,this.sa,this.stack,this.ia,this.ma,this.fa,this.na,this.U,
c,this.la,this.K,this.D,null):q(S.b?S.b(Ih,a):S.call(null,Ih,a))?new Ol(this.ca,this.text,this.ta,this.ra,this.sa,this.stack,this.ia,this.ma,this.fa,this.na,this.U,this.success,c,this.K,this.D,null):new Ol(this.ca,this.text,this.ta,this.ra,this.sa,this.stack,this.ia,this.ma,this.fa,this.na,this.U,this.success,this.la,this.K,O.c(this.D,a,c),null)};
g.X=function(){return y(Td.b(new T(null,13,5,U,[new T(null,2,5,U,[ai,this.ca],null),new T(null,2,5,U,[Vj,this.text],null),new T(null,2,5,U,[aj,this.ta],null),new T(null,2,5,U,[Zh,this.ra],null),new T(null,2,5,U,[Wi,this.sa],null),new T(null,2,5,U,[pj,this.stack],null),new T(null,2,5,U,[Bj,this.ia],null),new T(null,2,5,U,[th,this.ma],null),new T(null,2,5,U,[sh,this.fa],null),new T(null,2,5,U,[mh,this.na],null),new T(null,2,5,U,[Vi,this.U],null),new T(null,2,5,U,[Si,this.success],null),new T(null,2,
5,U,[Ih,this.la],null)],null),this.D))};g.T=function(b,a){return new Ol(this.ca,this.text,this.ta,this.ra,this.sa,this.stack,this.ia,this.ma,this.fa,this.na,this.U,this.success,this.la,a,this.D,this.v)};g.V=function(b,a){return $c(a)?Sa(this,w.b(a,0),w.b(a,1)):Ea(Ja,this,a)};function Pl(b,a,c,d,e){return new Ol(b,a,c,d,e,Mc,Mc,0,sg(pd),he,he,null,new Ml(0,Mc,null,null,null),null,null,null)}function Ql(b,a){return new p(null,2,[Zi,b,Bh,a],null)}
function Rl(b,a,c,d,e,f,h){this.Fa=b;this.Ka=a;this.Ga=c;this.Da=d;this.K=e;this.D=f;this.v=h;this.m=2229667594;this.F=8192}g=Rl.prototype;g.J=function(b,a){return Qa.c(this,a,null)};g.H=function(b,a,c){switch(a instanceof P?a.ga:null){case "listeners":return this.Fa;case "full-listeners":return this.Ka;case "results":return this.Ga;case "full-results":return this.Da;default:return x.c(this.D,a,c)}};
g.M=function(b,a,c){return Jg(a,function(){return function(b){return Jg(a,Rg,""," ","",c,b)}}(this),"#instaparse.gll.Node{",", ","}",c,Td.b(new T(null,4,5,U,[new T(null,2,5,U,[Kj,this.Fa],null),new T(null,2,5,U,[oh,this.Ka],null),new T(null,2,5,U,[Wj,this.Ga],null),new T(null,2,5,U,[fh,this.Da],null)],null),this.D))};g.Ea=function(){return new qf(0,this,4,new T(null,4,5,U,[Kj,oh,Wj,fh],null),Pb(this.D))};g.S=function(){return this.K};g.Y=function(){return 4+J(this.D)};
g.P=function(){var b=this.v;return null!=b?b:this.v=b=wd(this)};g.A=function(b,a){var c;c=q(a)?(c=this.constructor===a.constructor)?pf(this,a):c:a;return q(c)?!0:!1};g.rb=function(b,a){return id(new yg(null,new p(null,4,[fh,null,oh,null,Kj,null,Wj,null],null),null),a)?Qc.b(Fc(Ee.b(he,this),this.K),a):new Rl(this.Fa,this.Ka,this.Ga,this.Da,this.K,ce(Qc.b(this.D,a)),null)};
g.Ia=function(b,a,c){return q(S.b?S.b(Kj,a):S.call(null,Kj,a))?new Rl(c,this.Ka,this.Ga,this.Da,this.K,this.D,null):q(S.b?S.b(oh,a):S.call(null,oh,a))?new Rl(this.Fa,c,this.Ga,this.Da,this.K,this.D,null):q(S.b?S.b(Wj,a):S.call(null,Wj,a))?new Rl(this.Fa,this.Ka,c,this.Da,this.K,this.D,null):q(S.b?S.b(fh,a):S.call(null,fh,a))?new Rl(this.Fa,this.Ka,this.Ga,c,this.K,this.D,null):new Rl(this.Fa,this.Ka,this.Ga,this.Da,this.K,O.c(this.D,a,c),null)};
g.X=function(){return y(Td.b(new T(null,4,5,U,[new T(null,2,5,U,[Kj,this.Fa],null),new T(null,2,5,U,[oh,this.Ka],null),new T(null,2,5,U,[Wj,this.Ga],null),new T(null,2,5,U,[fh,this.Da],null)],null),this.D))};g.T=function(b,a){return new Rl(this.Fa,this.Ka,this.Ga,this.Da,a,this.D,this.v)};g.V=function(b,a){return $c(a)?Sa(this,w.b(a,0),w.b(a,1)):Ea(Ja,this,a)};function Sl(b,a){return b.stack=Lc.b(b.stack,a)}
function Tl(b,a,c){var d=b.na,e=Bh.a(c),f=new T(null,2,5,U,[a,e],null),h=x.c(d,f,0),d=function(){return function(){return a.a?a.a(c):a.call(null,c)}}(d,e,f,h);h>b.ma?b.ia=Lc.b(b.ia,d):b.stack=Lc.b(b.stack,d);b.na=O.c(b.na,f,h+1)}function Ul(b,a){var c=b.U,c=c.a?c.a(a):c.call(null,a);return q(c)?0<J(c.Fa):null}function Vl(b,a){var c=b.U,c=c.a?c.a(a):c.call(null,a);return q(c)?0<J(c.Ka)||0<J(c.Fa):null}function Wl(b,a){var c=b.U,c=c.a?c.a(a):c.call(null,a);return q(c)?0<J(c.Da)||0<J(c.Ga):null}
function Xl(b,a){var c=b.U,c=c.a?c.a(a):c.call(null,a);q(c)||(c=new Rl(Mc,Mc,Ag,Ag,null,null,null),b.U=O.c(b.U,a,c));return c}function Yl(b,a){return(null!=b?b.m&262144||b.Pc||(b.m?0:r(ib,b)):r(ib,b))?Fc(b,a):b}
function Zl(b,a,c){var d=Xl(b,a),e=a.a?a.a(1):a.call(null,1);c=q(si.a(e))?O.c(c,Zi,null):c;e=gj.a(e);a=q(e)?Ql(Yl(ok(e,Zi.a(c)),new p(null,2,[fj,a.a?a.a(0):a.call(null,0),Nh,Bh.a(c)],null)),Bh.a(c)):c;e=G.b(J(b.text),Bh.a(a));c=q(e)?d.Da:d.Ga;if(va(c.a?c.a(a):c.call(null,a))){q(e)?d.Da=Lc.b(d.Da,a):d.Ga=Lc.b(d.Ga,a);c=y(d.Fa);for(var f=null,h=0,k=0;;)if(k<h){var m=f.R(null,k);Tl(b,m,a);k+=1}else if(c=y(c))f=c,ad(f)?(c=Kb(f),k=Lb(f),f=c,h=J(c),c=k):(c=D(f),Tl(b,c,a),c=E(f),f=null,h=0),k=0;else break;
if(q(e))for(d=y(d.Ka),e=null,h=f=0;;)if(h<f)c=e.R(null,h),Tl(b,c,a),h+=1;else if(d=y(d))e=d,ad(e)?(d=Kb(e),f=Lb(e),e=d,c=J(d),d=f,f=c):(c=D(e),Tl(b,c,a),d=E(e),e=null,f=0),h=0;else return null;else return null}else return null}
function $l(b,a,c){var d=Ul(b,a),e=Xl(b,a);e.Fa=Lc.b(e.Fa,c);for(var f=y(e.Ga),h=null,k=0,m=0;;)if(m<k){var n=h.R(null,m);Tl(b,c,n);m+=1}else if(f=y(f))h=f,ad(h)?(f=Kb(h),m=Lb(h),h=f,k=J(f),f=m):(f=D(h),Tl(b,c,f),f=E(h),h=null,k=0),m=0;else break;f=y(e.Da);h=null;for(m=k=0;;)if(m<k)n=h.R(null,m),Tl(b,c,n),m+=1;else if(f=y(f))h=f,ad(h)?(f=Kb(h),m=Lb(h),h=f,k=J(f),f=m):(f=D(h),Tl(b,c,f),f=E(h),h=null,k=0),m=0;else break;return va(d)?Sl(b,function(){return function(){return gl(a.a?a.a(1):a.call(null,
1),a.a?a.a(0):a.call(null,0),b)}}(d,e)):null}function am(b,a,c){var d=Vl(b,a),e=Xl(b,a);e.Ka=Lc.b(e.Ka,c);for(var f=y(e.Da),h=null,k=0,m=0;;)if(m<k){var n=h.R(null,m);Tl(b,c,n);m+=1}else if(f=y(f))h=f,ad(h)?(f=Kb(h),m=Lb(h),h=f,k=J(f),f=m):(f=D(h),Tl(b,c,f),f=E(h),h=null,k=0),m=0;else break;return va(d)?Sl(b,function(){return function(){return wl(a.a?a.a(1):a.call(null,1),a.a?a.a(0):a.call(null,0),b)}}(d,e)):null}var bm=ne(wg,Ee);
function cm(b,a,c){var d;d=b.fa;a=Cf([a.a?a.a(0):a.call(null,0),new T(null,1,5,U,[c],null)]);d=bm.b?bm.b(d,a):bm.call(null,d,a);return b.fa=d}
function dm(b,a,c,d){b.la=function(a){var b=Bh.a(a);switch(jd(c,b)){case 1:return new Ml(c,new T(null,1,5,U,[d],null),null,null,null);case 0:return new Ml(c,Lc.b(Di.a(a),d),null,null,null);case -1:return a;default:throw Error([u("No matching clause: "),u(jd(c,b))].join(""));}}.call(null,b.la);return G.b(c,b.ra)?Zl(b,a,Ql(function(){var a=b.sa,d=b.text.substring(c),h=J(b.text);return em.W?em.W(a,ri,d,c,h):em.call(null,a,ri,d,c,h)}(),J(b.text))):null}
function fm(b){var a=Uc(b.stack);b.stack=Vc(b.stack);a.G?a.G():a.call(null)}function gm(b,a){for(;;){var c=b.stack;if(q(b.success))return L(Zi.a(b.success),new Hd(null,function(a){return function(){a.success=null;return gm(a,!0)}}(b,a,c),null,null));if(0<J(c))fm(b);else if(0<J(b.fa)){var d=D(b.fa),c=N(d,0,null),d=N(d,1,null),e=Uc(d);e.G?e.G():e.call(null);G.b(J(d),1)?b.fa=Qc.b(b.fa,c):b.fa=He(b.fa,c)}else if(q(a))b.stack=b.ia,b.ia=Mc,b.ma+=1,a=null;else return null}}
function hm(b,a){return function(c){return Zl(a,b,c)}}function im(b,a){return function(){return Zl(a,b,Ql(null,b.a?b.a(0):b.call(null,0)))}}
var jm=function jm(a,c,d,e){return function(f){var h=null!=f&&(f.m&64||f.pa)?Xd(te,f):f;f=x.b(h,Zi);h=x.b(h,Bh);f=ck(a,f);return y(c)?$l(e,new T(null,2,5,U,[h,D(c)],null),jm(f,E(c),d,e)):Zl(e,d,Ql(f,h))}},km=function km(a,c,d,e){return function(f){var h=null!=f&&(f.m&64||f.pa)?Xd(te,f):f;f=x.b(h,Zi);h=x.b(h,Bh);f=ck(a,f);return q(kk(c))?am(e,new T(null,2,5,U,[h,D(c)],null),km(f,E(c),d,e)):y(c)?$l(e,new T(null,2,5,U,[h,D(c)],null),km(f,E(c),d,e)):Zl(e,d,Ql(f,h))}},lm=function lm(a,c,d,e,f){return function(h){var k=
null!=h&&(h.m&64||h.pa)?Xd(te,h):h;h=x.b(k,Zi);k=x.b(k,Bh);if(G.b(k,d))return 0===J(a)?Zl(f,e,Ql(null,k)):null;h=ck(a,h);$l(f,new T(null,2,5,U,[k,c],null),lm(h,c,k,e,f));return Zl(f,e,Ql(h,k))}},mm=function mm(a,c,d,e,f){return function(h){var k=null!=h&&(h.m&64||h.pa)?Xd(te,h):h;h=x.b(k,Zi);k=x.b(k,Bh);if(G.b(k,d))return 0===J(a)?Zl(f,e,Ql(null,k)):null;h=ck(a,h);return G.b(k,J(Vj.a(f)))?Zl(f,e,Ql(h,k)):$l(f,new T(null,2,5,U,[k,c],null),mm(h,c,k,e,f))}},nm=function nm(a,c,d,e,f,h,k){return function(f){var n=
null!=f&&(f.m&64||f.pa)?Xd(te,f):f;f=x.b(n,Zi);n=x.b(n,Bh);f=ck(a,f);d<=J(f)&&J(f)<=e&&Zl(k,h,Ql(f,n));return J(f)<e?$l(k,new T(null,2,5,U,[n,c],null),nm(f,c,d,e,n,h,k)):null}},om=function om(a,c,d,e,f,h,k){return function(f){var n=null!=f&&(f.m&64||f.pa)?Xd(te,f):f;f=x.b(n,Zi);n=x.b(n,Bh);f=ck(a,f);return G.b(n,J(Vj.a(k)))?d<=J(f)&&J(f)<=e?Zl(k,h,Ql(f,n)):null:J(f)<e?$l(k,new T(null,2,5,U,[n,c],null),om(f,c,d,e,n,h,k)):null}};function pm(b){return function(a){return b.success=a}}
function pl(b,a,c){var d=ji.a(b),e=c.text,f;f=J(e);var h=a+J(d);f=f<h?f:h;return G.b(d,e.substring(a,f))?Zl(c,new T(null,2,5,U,[a,b],null),Ql(d,f)):dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,2,[Y,ji,qi,d],null))}function El(b,a,c){var d=ji.a(b),e=c.text,f;f=J(e);var h=a+J(d);f=f<h?f:h;h=e.substring(a,f);return G.b(f,J(e))&&G.b(d,h)?Zl(c,new T(null,2,5,U,[a,b],null),Ql(d,f)):dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,3,[Y,ji,qi,d,xh,!0],null))}
function tl(b,a,c){var d=ji.a(b),e=c.text,f;f=J(e);var h=a+J(d);f=f<h?f:h;return q(G.b(d.toUpperCase(),e.substring(a,f).toUpperCase()))?Zl(c,new T(null,2,5,U,[a,b],null),Ql(d,f)):dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,2,[Y,ji,qi,d],null))}
function Jl(b,a,c){var d=ji.a(b),e=c.text,f=function(){var b=J(e),c=a+J(d);return b<c?b:c}(),h=e.substring(a,f);return q(function(){var a=G.b(f,J(e));return a?G.b(d.toUpperCase(),h.toUpperCase()):a}())?Zl(c,new T(null,2,5,U,[a,b],null),Ql(d,f)):dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,3,[Y,ji,qi,d,xh,!0],null))}
function ul(b,a,c){var d=oi.a(b),e=Rj.a(b),f=Vj.a(c);if(a>=J(f))return dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,2,[Y,Sj,qi,new p(null,3,[Oj,!0,oi,d,Rj,e],null)],null));if(65535>=e)return f=f.charCodeAt(a),d<=f&&f<=e?Zl(c,new T(null,2,5,U,[a,b],null),Ql(qd(f),a+1)):dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,2,[Y,Sj,qi,new p(null,3,[Oj,!0,oi,d,Rj,e],null)],null));var f=$k(f,a|0),h=Zk(f);return d<=f&&f<=e?Zl(c,new T(null,2,5,U,[a,b],null),Ql(h,a+J(h))):dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,
2,[Y,Sj,qi,new p(null,3,[Oj,!0,oi,d,Rj,e],null)],null))}
function Kl(b,a,c){var d=oi.a(b),e=Rj.a(b),f=Vj.a(c),h=J(f);if(a>=J(f))return dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,3,[Y,Sj,qi,new p(null,3,[Oj,!0,oi,d,Rj,e],null),xh,!0],null));if(65535>=e)return f=f.charCodeAt(a),G.b(a+1,h)&&d<=f&&f<=e?Zl(c,new T(null,2,5,U,[a,b],null),Ql(qd(f),h)):dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,3,[Y,Sj,qi,new p(null,3,[Oj,!0,oi,d,Rj,e],null),xh,!0],null));var f=$k(f,a|0),k=Zk(f);return G.b(a+J(k),h)&&d<=f&&f<=e?Zl(c,new T(null,2,5,U,[a,b],null),Ql(k,h)):
dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,3,[Y,Sj,qi,new p(null,3,[Oj,!0,oi,d,Rj,e],null),xh,!0],null))}function qm(b,a){var c=(new RegExp(b.source,"g")).exec(a);return q(q(c)?0===c.index:c)?D(c):null}function ql(b,a,c){var d=Pi.a(b),e=c.ta,f=J(e),e=el(new fl(e.text,e.offset+a,f-a)),e=qm(d,e);return q(e)?Zl(c,new T(null,2,5,U,[a,b],null),Ql(e,a+J(e))):dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,2,[Y,Pi,qi,d],null))}
function Gl(b,a,c){var d=Pi.a(b),e=aj.a(c),f=J(e),f=el(new fl(e.text,e.offset+a,f-a)),f=qm(d,f),h=J(e)-a;return q(q(f)?G.b(J(f),h):f)?Zl(c,new T(null,2,5,U,[a,b],null),Ql(f,J(e))):dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,3,[Y,Pi,qi,d,xh,!0],null))}
var il=function(b){return function(a,c,d){var e=Jj.a(a);return $l(d,new T(null,2,5,U,[c,D(e)],null),jm(b,E(e),new T(null,2,5,U,[c,a],null),d))}}(ek),xl=function(b){return function(a,c,d){var e=Jj.a(a);return $l(d,new T(null,2,5,U,[c,D(e)],null),km(b,E(e),new T(null,2,5,U,[c,a],null),d))}}(ek),rl=function(b){return function(a,c,d){var e=Ni.a(a);return $l(d,new T(null,2,5,U,[c,e],null),lm(b,e,c,new T(null,2,5,U,[c,a],null),d))}}(ek),Hl=function(b){return function(a,c,d){var e=Ni.a(a);return $l(d,new T(null,
2,5,U,[c,e],null),mm(b,e,c,new T(null,2,5,U,[c,a],null),d))}}(ek),nl=function(b){return function(a,c,d){var e=Ni.a(a),f=jh.a(a),h=bj.a(a);return 0===f?(Zl(d,new T(null,2,5,U,[c,a],null),Ql(null,c)),1<=h?$l(d,new T(null,2,5,U,[c,e],null),nm(b,e,1,h,c,new T(null,2,5,U,[c,a],null),d)):null):$l(d,new T(null,2,5,U,[c,e],null),nm(b,e,f,h,c,new T(null,2,5,U,[c,a],null),d))}}(ek),Cl=function(b){return function(a,c,d){var e=Ni.a(a),f=jh.a(a),h=bj.a(a);return 0===f?(Zl(d,new T(null,2,5,U,[c,a],null),Ql(null,
c)),1<=h?$l(d,new T(null,2,5,U,[c,e],null),om(b,e,1,h,c,new T(null,2,5,U,[c,a],null),d)):null):$l(d,new T(null,2,5,U,[c,e],null),om(b,e,f,h,c,new T(null,2,5,U,[c,a],null),d))}}(ek),ol=function(b){return function(a,c,d){var e=Ni.a(a);$l(d,new T(null,2,5,U,[c,e],null),lm(b,e,c,new T(null,2,5,U,[c,a],null),d));return Zl(d,new T(null,2,5,U,[c,a],null),Ql(null,c))}}(ek),Dl=function(b){return function(a,c,d){var e=Ni.a(a);return G.b(c,J(Vj.a(d)))?Zl(d,new T(null,2,5,U,[c,a],null),Ql(null,c)):$l(d,new T(null,
2,5,U,[c,e],null),mm(b,e,c,new T(null,2,5,U,[c,a],null),d))}}(ek);function kl(b,a,c){for(var d=Jj.a(b),d=y(d),e=null,f=0,h=0;;)if(h<f){var k=e.R(null,h);$l(c,new T(null,2,5,U,[a,k],null),hm(new T(null,2,5,U,[a,b],null),c));h+=1}else if(d=y(d))e=d,ad(e)?(d=Kb(e),f=Lb(e),e=d,k=J(d),d=f,f=k):(k=D(e),$l(c,new T(null,2,5,U,[a,k],null),hm(new T(null,2,5,U,[a,b],null),c)),d=E(e),e=null,f=0),h=0;else return null}
function zl(b,a,c){for(var d=Jj.a(b),d=y(d),e=null,f=0,h=0;;)if(h<f){var k=e.R(null,h);am(c,new T(null,2,5,U,[a,k],null),hm(new T(null,2,5,U,[a,b],null),c));h+=1}else if(d=y(d))e=d,ad(e)?(d=Kb(e),f=Lb(e),e=d,k=J(d),d=f,f=k):(k=D(e),am(c,new T(null,2,5,U,[a,k],null),hm(new T(null,2,5,U,[a,b],null),c)),d=E(e),e=null,f=0),h=0;else return null}
function jl(b,a,c){var d=Qi.a(b),e=eh.a(b),f=new T(null,2,5,U,[a,d],null),h=new T(null,2,5,U,[a,e],null);b=hm(new T(null,2,5,U,[a,b],null),c);$l(c,f,b);return cm(c,f,function(a,b,d,e,f){return function(){return $l(c,e,f)}}(d,e,f,h,b))}function yl(b,a,c){var d=Qi.a(b),e=eh.a(b),f=new T(null,2,5,U,[a,d],null),h=new T(null,2,5,U,[a,e],null);b=hm(new T(null,2,5,U,[a,b],null),c);am(c,f,b);return cm(c,f,function(a,b,d,e,f){return function(){return am(c,e,f)}}(d,e,f,h,b))}
function vl(b,a,c){var d=Ni.a(b);$l(c,new T(null,2,5,U,[a,d],null),hm(new T(null,2,5,U,[a,b],null),c));return Zl(c,new T(null,2,5,U,[a,b],null),Ql(null,a))}function Ll(b,a,c){var d=Ni.a(b);am(c,new T(null,2,5,U,[a,d],null),hm(new T(null,2,5,U,[a,b],null),c));return G.b(a,J(Vj.a(c)))?Zl(c,new T(null,2,5,U,[a,b],null),Ql(null,a)):dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,2,[Y,jj,qi,ih],null))}
function ml(b,a,c){var d;d=ai.a(c);var e=Yi.a(b);d=x.c(d,e,e);return $l(c,new T(null,2,5,U,[a,d],null),hm(new T(null,2,5,U,[a,b],null),c))}function Bl(b,a,c){var d;d=ai.a(c);var e=Yi.a(b);d=x.c(d,e,e);return am(c,new T(null,2,5,U,[a,d],null),hm(new T(null,2,5,U,[a,b],null),c))}function ll(b,a,c){var d=Ni.a(b);return $l(c,new T(null,2,5,U,[a,d],null),im(new T(null,2,5,U,[a,b],null),c))}
function Al(b,a,c){return G.b(a,J(Vj.a(c)))?ll(b,a,c):dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,2,[Y,Hh,qi,ih],null))}
function hl(b,a,c){var d=Ni.a(b),e=new T(null,2,5,U,[a,d],null);if(q(Wl(c,e)))return dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,1,[Y,Ui],null));$l(c,e,function(){return function(a){return function(){return a instanceof bh?qc.a?qc.a(a):qc.call(null,a):a}}(new bh(function(d){return function(){return dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,2,[Y,Ui,qi,new p(null,1,[nh,Qk(d,!1)],null)],null))}}(d,e),null),d,e)}());return cm(c,e,function(d,e){return function(){return va(Wl(c,e))?Zl(c,new T(null,
2,5,U,[a,b],null),Ql(null,a)):null}}(d,e))}function sl(b,a,c){return Zl(c,new T(null,2,5,U,[a,b],null),Ql(null,a))}function Il(b,a,c){return G.b(a,J(Vj.a(c)))?Zl(c,new T(null,2,5,U,[a,b],null),Ql(null,a)):dm(c,new T(null,2,5,U,[a,b],null),a,new p(null,2,[Y,ej,qi,ih],null))}function rm(b,a,c){q(c)?$l(b,new T(null,2,5,U,[0,a],null),pm(b)):am(b,new T(null,2,5,U,[0,a],null),pm(b))}
function sm(b,a,c,d){b=Pl(b,c,Nl(c),-1,null);rm(b,Z(a),d);a=gm(b,null);if(q(a))c=D(a);else{a=b.la;a:{d=Bh.a(a);for(var e=b=1,f=0;;){if(G.b(d,f)){d=new p(null,2,[Xi,b,pi,e],null);break a}G.b("\n",x.b(c,f))?(f+=1,b+=1,e=1):(f+=1,e+=1)}}c=vg.h(M([a,d,new p(null,1,[Vj,bl(Xi.a(d),c)],null)],0))}return c}function em(b,a,c,d,e){return Fc(b.b?b.b(a,c):b.call(null,a,c),new p(null,2,[fj,d,Nh,e],null))};function tm(b,a){return(null!=b?b.m&262144||b.Pc||(b.m?0:r(ib,b)):r(ib,b))?Fc(b,vg.h(M([a,Tc(b)],0))):b}
var um=function um(a,c){var d;d=Y.a(c);d=a.a?a.a(d):a.call(null,d);return q(d)?tm(Xd(d,V.b(ne(um,a),Oh.a(c))),Tc(c)):q(Y.a(c))?O.c(c,Oh,V.b(ne(um,a),Oh.a(c))):c},vm=function vm(a,c){if(Yc(c)&&y(c)){var d;d=D(c);d=a.a?a.a(d):a.call(null,d);return q(d)?tm(Xd(d,V.b(ne(vm,a),E(c))),Tc(c)):Fc(Ee.b(new T(null,1,5,U,[D(c)],null),V.b(ne(vm,a),E(c))),Tc(c))}return c},wm=function wm(a,c){var d;d=(d=Zc(c))?Y.a(c):d;if(q(d))return um(a,c);if($c(c)&&D(c)instanceof P)return vm(a,c);if(Yc(c))return Fc(V.b(ne(wm,
a),c),Tc(c));if(c instanceof Ml)return c;throw"Invalid parse-tree, not recognized as either enlive or hiccup format.";};var xm=function xm(a){if(null!=a&&null!=a.uc)return a.uc();var c=xm[l(null==a?null:a)];if(null!=c)return c.a?c.a(a):c.call(null,a);c=xm._;if(null!=c)return c.a?c.a(a):c.call(null,a);throw t("PushbackReader.read-char",a);};function ym(b,a,c){this.L=b;this.buffer=a;this.gc=c}ym.prototype.uc=function(){return 0===this.buffer.length?(this.gc+=1,this.L[this.gc]):this.buffer.pop()};function zm(b){throw Error(Xd(u,b));}Ig("^([-+]?)(?:(0)|([1-9][0-9]*)|0[xX]([0-9A-Fa-f]+)|0([0-7]+)|([1-9][0-9]?)[rR]([0-9A-Za-z]+))(N)?$");
Ig("^([-+]?[0-9]+)/([0-9]+)$");Ig("^([-+]?[0-9]+(\\.[0-9]*)?([eE][-+]?[0-9]+)?)(M)?$");Ig("^[:]?([^0-9/].*/)?([^0-9/][^/]*)$");var Am=Ig("^[0-9A-Fa-f]{2}$"),Bm=Ig("^[0-9A-Fa-f]{4}$");function Cm(b,a,c){return q(Gg(b,c))?c:zm(M(["Unexpected unicode escape \\",a,c],0))}function Dm(b){return String.fromCharCode(parseInt(b,16))}
function Em(b){var a=xm(b),c="t"===a?"\t":"r"===a?"\r":"n"===a?"\n":"\\"===a?"\\":'"'===a?'"':"b"===a?"\b":"f"===a?"\f":null;q(c)?a=c:"x"===a?(b=(new fa(xm(b),xm(b))).toString(),a=Dm(Cm(Am,a,b))):"u"===a?(b=(new fa(xm(b),xm(b),xm(b),xm(b))).toString(),a=Dm(Cm(Bm,a,b))):a=/[^0-9]/.test(a)?zm(M(["Unexpected unicode escape \\",a],0)):String.fromCharCode(a);return a}
var Fm=function(b,a){return function(c,d){return x.b(q(d)?a:b,c)}}(new T(null,13,5,U,[null,31,28,31,30,31,30,31,31,30,31,30,31],null),new T(null,13,5,U,[null,31,29,31,30,31,30,31,31,30,31,30,31],null)),Gm=/(\d\d\d\d)(?:-(\d\d)(?:-(\d\d)(?:[T](\d\d)(?::(\d\d)(?::(\d\d)(?:[.](\d+))?)?)?)?)?)?(?:[Z]|([-+])(\d\d):(\d\d))?/;function Hm(b){b=parseInt(b,10);return va(isNaN(b))?b:null}
function Im(b,a,c,d){b<=a&&a<=c||zm(M([[u(d),u(" Failed:  "),u(b),u("\x3c\x3d"),u(a),u("\x3c\x3d"),u(c)].join("")],0));return a}
function Jm(b){var a=Gg(Gm,b);N(a,0,null);var c=N(a,1,null),d=N(a,2,null),e=N(a,3,null),f=N(a,4,null),h=N(a,5,null),k=N(a,6,null),m=N(a,7,null),n=N(a,8,null),v=N(a,9,null),A=N(a,10,null);if(va(a))return zm(M([[u("Unrecognized date/time syntax: "),u(b)].join("")],0));var z=Hm(c),B=function(){var a=Hm(d);return q(a)?a:1}();b=function(){var a=Hm(e);return q(a)?a:1}();var a=function(){var a=Hm(f);return q(a)?a:0}(),c=function(){var a=Hm(h);return q(a)?a:0}(),F=function(){var a=Hm(k);return q(a)?a:0}(),
I=function(){var a;a:if(G.b(3,J(m)))a=m;else if(3<J(m))a=m.substring(0,3);else for(a=new fa(m);;)if(3>a.pb.length)a=a.append("0");else{a=a.toString();break a}a=Hm(a);return q(a)?a:0}(),n=(G.b(n,"-")?-1:1)*(60*function(){var a=Hm(v);return q(a)?a:0}()+function(){var a=Hm(A);return q(a)?a:0}());return new T(null,8,5,U,[z,Im(1,B,12,"timestamp month field must be in range 1..12"),Im(1,b,function(){var a;a=0===(z%4+4)%4;q(a)&&(a=va(0===(z%100+100)%100),a=q(a)?a:0===(z%400+400)%400);return Fm.b?Fm.b(B,
a):Fm.call(null,B,a)}(),"timestamp day field must be in range 1..last day in month"),Im(0,a,23,"timestamp hour field must be in range 0..23"),Im(0,c,59,"timestamp minute field must be in range 0..59"),Im(0,F,G.b(c,59)?60:59,"timestamp second field must be in range 0..60"),Im(0,I,999,"timestamp millisecond field must be in range 0..999"),n],null)}
var Km=new p(null,4,["inst",function(b){var a;if("string"===typeof b)if(a=Jm(b),q(a)){b=N(a,0,null);var c=N(a,1,null),d=N(a,2,null),e=N(a,3,null),f=N(a,4,null),h=N(a,5,null),k=N(a,6,null);a=N(a,7,null);a=new Date(Date.UTC(b,c-1,d,e,f,h,k)-6E4*a)}else a=zm(M([[u("Unrecognized date/time syntax: "),u(b)].join("")],0));else a=zm(M(["Instance literal expects a string for its timestamp."],0));return a},"uuid",function(b){return"string"===typeof b?new ch(b,null):zm(M(["UUID literal expects a string as its representation."],
0))},"queue",function(b){return $c(b)?Ee.b(lf,b):zm(M(["Queue literal expects a vector for its elements."],0))},"js",function(b){if($c(b)){var a=[];b=y(b);for(var c=null,d=0,e=0;;)if(e<d){var f=c.R(null,e);a.push(f);e+=1}else if(b=y(b))c=b,ad(c)?(b=Kb(c),e=Lb(c),c=b,d=J(b),b=e):(b=D(c),a.push(b),b=E(c),c=null,d=0),e=0;else break;return a}if(Zc(b)){a={};b=y(b);c=null;for(e=d=0;;)if(e<d){var h=c.R(null,e),f=N(h,0,null),h=N(h,1,null);a[Gd(f)]=h;e+=1}else if(b=y(b))ad(b)?(d=Kb(b),b=Lb(b),c=d,d=J(d)):
(d=D(b),c=N(d,0,null),d=N(d,1,null),a[Gd(c)]=d,b=E(b),c=null,d=0),e=0;else break;return a}return zm(M([[u("JS literal expects a vector or map containing "),u("only string or unqualified keyword keys")].join("")],0))}],null);se||re.call(null,Km);se||re.call(null,null);var Lm=!1,Mm=/(?:(?!(?:\(\*|\*\)))[\s\S])*/,Nm=Ek(Z(tj)),Om=pk(mi,Oc([dh,gh,qh,yh,Gh,Lh,Rh,$h,bi,gi,hi,ji,ni,si,ui,Gi,Pi,dj,lj,mj,qj,tj,Uj],[wk.h(M([Ek(xk("!")),Nm,Z(dj)],0)),rk(wk.h(M([Nm,uk.h(M([Z(dj),Z(Lh),Z(dh)],0)),Nm],0))),wk.h(M([Z(gh),rk(wk.h(M([Nm,Ek(xk("/")),Nm,Z(gh)],0)))],0)),uk.h(M([xk(":"),xk(":\x3d"),xk("::\x3d"),xk("\x3d")],0)),wk.h(M([Z(gh),sk(wk.h(M([Nm,Ek(xk("|")),Nm,Z(gh)],0)))],0)),wk.h(M([Ek(xk("\x26")),Nm,Z(dj)],0)),wk.h(M([uk.h(M([Z($h),Z(bi)],0)),Nm,Ek(Z(yh)),Nm,Z(Gi),Ek(uk.h(M([Z(tj),
wk.h(M([Z(tj),uk.h(M([xk(";"),xk(".")],0)),Z(tj)],0))],0)))],0)),wk.h(M([Dk(Z(qj)),Bk("[^, \\r\\t\\n\x3c\x3e(){}\\[\\]+*?:\x3d|'\"#\x26!;./]+")],0)),wk.h(M([Ek(xk("\x3c")),Nm,Z($h),Nm,Ek(xk("\x3e"))],0)),wk.h(M([Bk(Mm),sk(wk.h(M([Z(lj),Bk(Mm)],0)))],0)),uk.h(M([wk.h(M([Ek(xk("{")),Nm,Z(Gi),Nm,Ek(xk("}"))],0)),wk.h(M([Z(dj),Nm,Ek(xk("*"))],0))],0)),uk.h(M([Bk(/'[^'\\]*(?:\\.[^'\\]*)*'/),Bk(/\"[^\"\\]*(?:\\.[^\"\\]*)*\"/)],0)),Fk(wk.h(M([Nm,rk(Z(Rh))],0))),wk.h(M([Ek(xk("\x3c")),Nm,Z(Gi),Nm,Ek(xk("\x3e"))],
0)),wk.h(M([Ek(xk("(")),Nm,Z(Gi),Nm,Ek(xk(")"))],0)),Fk(uk.h(M([Z(Gh),Z(qh)],0))),uk.h(M([Bk(/#'[^'\\]*(?:\\.[^'\\]*)*'/),Bk(/#\"[^\"\\]*(?:\\.[^\"\\]*)*\"/)],0)),Fk(uk.h(M([Z($h),Z(ji),Z(Pi),Z(Uj),Z(hi),Z(mj),Z(ui),Z(si),Z(qj)],0))),wk.h(M([xk("(*"),Z(gi),xk("*)")],0)),wk.h(M([Z(dj),Nm,Ek(xk("+"))],0)),uk.h(M([xk("Epsilon"),xk("epsilon"),xk("EPSILON"),xk("eps"),xk("ε")],0)),wk.h(M([Bk("[,\\s]*"),sk(wk.h(M([Z(lj),Bk("[,\\s]*")],0)))],0)),uk.h(M([wk.h(M([Ek(xk("[")),Nm,Z(Gi),Nm,Ek(xk("]"))],0)),wk.h(M([Z(dj),
Nm,Ek(xk("?"))],0))],0))]));function Pm(b){for(var a=y(b),c=Mc;;){var d=D(a);if(q(d))switch(d){case "\\":var e=D(E(a));if(q(e)){G.b(e,"'")?(a=ye(a),c=Lc.b(c,e)):(a=ye(a),c=Lc.h(c,d,M([e],0)));continue}else throw[u("Encountered backslash character at end of string:"),u(b)].join("");case '"':a=E(a);c=Lc.h(c,"\\",M(['"'],0));continue;default:a=E(a),c=Lc.b(c,d)}else return Xd(u,c)}}
function Qm(b){var a=J(b)-1;b=Pm(b.substring(1,a));b=[u(b),u('"')].join("");a:{b=new ym(b,[],-1);for(var a=new fa,c=xm(b);;){if(null==c){b=zm(M(["EOF while reading"],0));break a}if("\\"===c)a.append(Em(b));else{if('"'===c){b=a.toString();break a}a.append(c)}c=xm(b)}}return b}function Rm(b){var a=J(b)-1;b=Pm(b.substring(2,a));return Ig(b)}
var Sm=function Sm(a){for(;;)switch((D.a?D.a(a):D.call(null,a))instanceof P?(D.a?D.a(a):D.call(null,a)).ga:null){case "neg":return Dk(Sm(Jc.a?Jc.a(a):Jc.call(null,a)));case "cat":return Xd(wk,V.b(Sm,E.a?E.a(a):E.call(null,a)));case "ord":return Xd(vk,V.b(Sm,E.a?E.a(a):E.call(null,a)));case "alt":return Xd(uk,V.b(Sm,E.a?E.a(a):E.call(null,a)));case "look":return Ck(Sm(Jc.a?Jc.a(a):Jc.call(null,a)));case "rule":a=E.a?E.a(a):E.call(null,a);var c=N(a,0,null);a=N(a,1,null);return G.b(D.a?D.a(c):D.call(null,
c),bi)?new T(null,2,5,U,[Fd.a(function(){var a=Jc.a?Jc.a(c):Jc.call(null,c);return Jc.a?Jc.a(a):Jc.call(null,a)}()),Fk(Sm(a))],null):new T(null,2,5,U,[Fd.a(Jc.a?Jc.a(c):Jc.call(null,c)),Sm(a)],null);case "nt":return Z(Fd.a(Jc.a?Jc.a(a):Jc.call(null,a)));case "star":return sk(Sm(Jc.a?Jc.a(a):Jc.call(null,a)));case "string":return(q(Lm)?yk:xk).call(null,Qm(Jc.a?Jc.a(a):Jc.call(null,a)));case "hide":return Ek(Sm(Jc.a?Jc.a(a):Jc.call(null,a)));case "paren":a=Jc.a?Jc.a(a):Jc.call(null,a);continue;case "regexp":return Bk(Rm(Jc.a?
Jc.a(a):Jc.call(null,a)));case "plus":return rk(Sm(Jc.a?Jc.a(a):Jc.call(null,a)));case "epsilon":return Cg;case "opt":return qk(Sm(Jc.a?Jc.a(a):Jc.call(null,a)));default:throw Error([u("No matching clause: "),u(D.a?D.a(a):D.call(null,a))].join(""));}},Tm=function Tm(a){for(;;)switch(Y.a(a)instanceof P?Y.a(a).ga:null){case "neg":a=Ni.a(a);continue;case "cat":return Be(Tm,M([Jj.a(a)],0));case "ord":return Be(Tm,M([new T(null,2,5,U,[Qi.a(a),eh.a(a)],null)],0));case "alt":return Be(Tm,M([Jj.a(a)],0));
case "look":a=Ni.a(a);continue;case "nt":return new T(null,1,5,U,[Yi.a(a)],null);case "rep":a=Ni.a(a);continue;case "star":a=Ni.a(a);continue;case "string":return Mc;case "regexp":return Mc;case "plus":a=Ni.a(a);continue;case "epsilon":return Mc;case "string-ci":return Mc;case "char":return Mc;case "opt":a=Ni.a(a);continue;default:throw Error([u("No matching clause: "),u(Y.a(a))].join(""));}};
function Um(b){var a;a:if(a=xf(b),a=y(a),null==a)a=Ag;else if(a instanceof C&&0===a.w){a=a.g;b:for(var c=0,d=Bb(Ag);;)if(c<a.length)var e=c+1,d=d.vb(null,a[c]),c=e;else break b;a=d.Gb(null)}else for(e=Bb(Ag);;)if(null!=a)c=E(a),e=e.vb(null,a.ha(null)),a=c;else{a=Db(e);break a}for(var c=y(Dg(Be(Tm,M([yf(b)],0)))),e=null,f=d=0;;)if(f<d){var h=e.R(null,f);if(!q(a.a?a.a(h):a.call(null,h)))throw[u(vd(""+u(h),1)),u(" occurs on the right-hand side of your grammar, but not on the left")].join("");f+=1}else if(c=
y(c)){e=c;if(ad(e))c=Kb(e),f=Lb(e),e=c,d=J(c),c=f;else{c=D(e);if(!q(a.a?a.a(c):a.call(null,c)))throw[u(vd(""+u(c),1)),u(" occurs on the right-hand side of your grammar, but not on the left")].join("");c=E(e);e=null;d=0}f=0}else break;return b}
function Vm(b,a){var c=sm(Om,ni,b,!1);if(c instanceof Ml)throw[u("Error parsing grammar specification:\n"),u(function(){var a=new fa,b=la,d=ja;la=!0;ja=function(a,b,c){return function(a){return c.append(a)}}(b,d,a,c);try{$g(M([c],0))}finally{ja=d,la=b}return""+u(a)}())].join("");var d=V.b(Sm,c),e=D(D(d));return new p(null,3,[ai,Um(pk(a,Ee.b(he,d))),Qh,e,di,a],null)}
function Wm(b,a,c){if(null==c)throw"When you build a parser from a map of parser combinators, you must provide a start production using the :start keyword argument.";return new p(null,3,[ai,Um(pk(a,b)),Qh,c,di,a],null)};function Xm(b,a){var c=Array.prototype.slice.call(arguments),d=c.shift();if("undefined"==typeof d)throw Error("[goog.string.format] Template required");return d.replace(/%([0\-\ \+]*)(\d+)?(\.(\d+))?([%sfdiu])/g,function(a,b,d,k,m,n,v,A){if("%"==n)return"%";var z=c.shift();if("undefined"==typeof z)throw Error("[goog.string.format] Not enough arguments");arguments[0]=z;return Xm.lb[n].apply(null,arguments)})}Xm.lb={};
Xm.lb.s=function(b,a,c){return isNaN(c)||""==c||b.length>=c?b:b=-1<a.indexOf("-",0)?b+da(" ",c-b.length):da(" ",c-b.length)+b};Xm.lb.f=function(b,a,c,d,e){d=b.toString();isNaN(e)||""==e||(d=parseFloat(b).toFixed(e));var f;f=0>b?"-":0<=a.indexOf("+")?"+":0<=a.indexOf(" ")?" ":"";0<=b&&(d=f+d);if(isNaN(c)||d.length>=c)return d;d=isNaN(e)?Math.abs(b).toString():Math.abs(b).toFixed(e);b=c-d.length-f.length;0<=a.indexOf("-",0)?d=f+d+da(" ",b):(a=0<=a.indexOf("0",0)?"0":" ",d=f+da(a,b)+d);return d};
Xm.lb.d=function(b,a,c,d,e,f,h,k){return Xm.lb.f(parseInt(b,10),a,c,d,0,f,h,k)};Xm.lb.i=Xm.lb.d;Xm.lb.u=Xm.lb.d;var Ym=Oc([rh,uh,Ch,Dh,Vh,Wh,ei,vi,wi,zi,$i,kj,nj,xj,Ej,Ij],[xk("\r\n"),xk("\t"),uk.h(M([uk.h(M([xk(" "),xk("\t")],0)),sk(wk.h(M([xk("\r\n"),uk.h(M([xk(" "),xk("\t")],0))],0)))],0)),xk("\n"),Bk("[\\u0021-\\u007E]"),Bk("[0-9]"),xk(" "),Bk("[0-9a-fA-F]"),Bk("[\\u0000-\\u001F|\\u007F]"),xk('"'),uk.h(M([xk(" "),xk("\t")],0)),xk("\r"),Bk("[\\u0000-\\u00FF]"),Bk("[a-zA-Z]"),Bk("[\\u0001-\\u007F]"),Bk("[01]")]),Zm=function Zm(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;
return Zm.h(0<c.length?new C(c.slice(0),0,null):null)};Zm.h=function(b){if(G.b("-",D(E(b)))){var a=N(b,0,null);N(b,1,null);var c=N(b,2,null);return zk(a,c)}return Xd(wk,function(){return function e(a){return new Hd(null,function(){for(;;){var b=y(a);if(b){if(ad(b)){var c=Kb(b),m=J(c),n=Md(m);a:for(var v=0;;)if(v<m){var A=w.b(c,v),A=zk(A,A);n.add(A);v+=1}else{c=!0;break a}return c?Od(n.ea(),e(Lb(b))):Od(n.ea(),null)}n=D(b);return L(zk(n,n),e(gc(b)))}return null}},null,null)}(b)}())};Zm.C=0;Zm.B=function(b){return Zm.h(y(b))};
function $m(b,a){return Ee.b(he,function(){return function d(a){return new Hd(null,function(){for(var f=a;;)if(f=y(f)){if(ad(f)){var h=Kb(f),k=J(h),m=Md(k);a:for(var n=0;;)if(n<k){var v=w.b(h,n);id(b,v)&&(v=new T(null,2,5,U,[v,b.a?b.a(v):b.call(null,v)],null),m.add(v));n+=1}else{h=!0;break a}return h?Od(m.ea(),d(Lb(f))):Od(m.ea(),null)}m=D(f);if(id(b,m))return L(new T(null,2,5,U,[m,b.a?b.a(m):b.call(null,m)],null),d(gc(f)));f=gc(f)}else return null},null,null)}(a)}())}
function an(b){return vg.h(M([$m(Ym,Dg(Be(Tm,M([yf(b)],0)))),b],0))}function bn(b,a){var c=G.b(gj.a(b),lk),d=G.b(gj.a(a),lk);return q(q(c)?d:c)?Fk(uk.h(M([Qc.b(b,gj),Qc.b(a,gj)],0))):q(c)?Fk(uk.h(M([Qc.b(b,gj),a],0))):q(d)?Fk(uk.h(M([b,Qc.b(a,gj)],0))):uk.h(M([b,a],0))}
var cn=Oc([dh,Ah,Lh,Mh,Rh,Sh,fi,ii,si,xi,yi,Ci,Ii,Ji,Li,Pi,Ti,cj,wj,Dj,Pj],[Dk,function(b,a){return Cf([b,Fk(a)])},Ck,function(){function b(b){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new C(e,0)}return a.call(this,d)}function a(a){a=Xd(u,a);return parseInt(a,2)}b.C=0;b.B=function(b){b=y(b);return a(b)};b.h=a;return b}(),te,function(){function b(b){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=
arguments[d+0],++d;d=new C(e,0)}return a.call(this,d)}function a(a){return q(!1)?Z(Fd.a(Pk(Xd(u,a)))):Z(Fd.a(Xd(u,a)))}b.C=0;b.B=function(b){b=y(b);return a(b)};b.h=a;return b}(),function(){function b(b){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new C(e,0)}return a.call(this,d)}function a(a){a=Xd(u,a);return parseInt(a)}b.C=0;b.B=function(b){b=y(b);return a(b)};b.h=a;return b}(),function(){function b(b){var d=null;if(0<arguments.length){for(var d=
0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new C(e,0)}return a.call(this,d)}function a(a){return yk(Xd(u,a))}b.C=0;b.B=function(b){b=y(b);return a(b)};b.h=a;return b}(),Ek,qk,function(){function b(b){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new C(e,0)}return a.call(this,d)}function a(a){a=Xd(u,a);return parseInt(a,16)}b.C=0;b.B=function(b){b=y(b);return a(b)};b.h=a;return b}(),Zm,Zm,wk,uk,le.b(Bk,Rm),function(){function b(a,
b){return Wc(a)?sk(b):G.b(J(a),2)?tk(vj.a(a),ti.a(a),b):G.b(vj.a(a),1)?rk(b):G.b(ti.a(a),1)?qk(b):tk(function(){var b=vj.a(a);return q(b)?b:0}(),function(){var b=ti.a(a);return q(b)?b:Infinity}(),b)}var a=null,a=function(a,d){switch(arguments.length){case 1:return a;case 2:return b.call(this,a,d)}throw Error("Invalid arity: "+arguments.length);};a.a=function(a){return a};a.b=b;return a}(),function(){function b(b){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=
arguments[d+0],++d;d=new C(e,0)}return a.call(this,d)}function a(a){return q(!1)?Fd.a(Pk(Xd(u,a))):Fd.a(Xd(u,a))}b.C=0;b.B=function(b){b=y(b);return a(b)};b.h=a;return b}(),function(){function b(b){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new C(e,0)}return a.call(this,d)}function a(a){switch(J(a)){case 1:return G.b(D(a),"*")?he:new p(null,2,[vj,D(a),ti,D(a)],null);case 2:return G.b(D(a),"*")?new p(null,1,[ti,D(E(a))],null):new p(null,
1,[vj,D(a)],null);case 3:return new p(null,2,[vj,D(a),ti,zc(a,2)],null);default:throw Error([u("No matching clause: "),u(J(a))].join(""));}}b.C=0;b.B=function(b){b=y(b);return a(b)};b.h=a;return b}(),Zm,function(){function b(b){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new C(e,0)}return a.call(this,d)}function a(a){a=Xd(u,a);return parseInt(a)}b.C=0;b.B=function(b){b=y(b);return a(b)};b.h=a;return b}()]),dn=pk(mi,function(b){if(q(Hg(/[:=]/,
b))){var a=sm(Om,ni,b,!1);if(a instanceof Ml)throw[u("Error parsing grammar specification:\n"),u(function(){var b=new fa,c=la,f=ja;la=!0;ja=function(a,b,c){return function(a){return c.append(a)}}(c,f,b,a);try{$g(M([a],0))}finally{ja=f,la=c}return""+u(b)}())].join("");return Ee.b(he,V.b(Sm,a))}var c=sm(Om,Gi,b,!1);if(c instanceof Ml)throw[u("Error parsing grammar specification:\n"),u(function(){var a=new fa,b=la,f=ja;la=!0;ja=function(a,b,c){return function(a){return c.append(a)}}(b,f,a,c);try{$g(M([c],
0))}finally{ja=f,la=b}return""+u(a)}())].join("");return Sm(D(c))}("\n\x3crulelist\x3e \x3d \x3copt-whitespace\x3e (rule | hide-tag-rule)+;\nrule \x3d rulename-left \x3cdefined-as\x3e alternation \x3copt-whitespace\x3e;\nhide-tag-rule \x3d hide-tag \x3cdefined-as\x3e alternation \x3copt-whitespace\x3e;\nrulename-left \x3d rulename;\nrulename-right \x3d rulename;\n\x3crulename\x3e \x3d #'[a-zA-Z][-a-zA-Z0-9]*';\n\x3chide-tag\x3e \x3d \x3c'\x3c' opt-whitespace\x3e rulename-left \x3copt-whitespace '\x3e'\x3e;\ndefined-as \x3d \x3copt-whitespace\x3e ('\x3d' | '\x3d/') \x3copt-whitespace\x3e;\nalternation \x3d concatenation (\x3copt-whitespace '/' opt-whitespace\x3e concatenation)*;\nconcatenation \x3d repetition (\x3cwhitespace\x3e repetition)*;\nrepetition \x3d [repeat] \x3copt-whitespace\x3e element;\nrepeat \x3d NUM | (NUM? '*' NUM?);\n\x3celement\x3e \x3d rulename-right | group | hide | option | char-val | num-val\n          | look | neg | regexp;\nlook \x3d \x3c'\x26' opt-whitespace\x3e element;\nneg \x3d \x3c'!' opt-whitespace\x3e element;\n\x3cgroup\x3e \x3d \x3c'(' opt-whitespace\x3e alternation \x3copt-whitespace ')'\x3e;\noption \x3d \x3c'[' opt-whitespace\x3e alternation \x3copt-whitespace ']'\x3e;\nhide \x3d \x3c'\x3c' opt-whitespace\x3e alternation \x3copt-whitespace '\x3e'\x3e;\nchar-val \x3d \x3c'\\u0022'\x3e #'[\\u0020-\\u0021\\u0023-\\u007E]'* \x3c'\\u0022'\x3e (* double-quoted strings *)\n         | \x3c'\\u0027'\x3e #'[\\u0020-\\u0026(-~]'* \x3c'\\u0027'\x3e;  (* single-quoted strings *)\n\x3cnum-val\x3e \x3d \x3c'%'\x3e (bin-val | dec-val | hex-val);\nbin-val \x3d \x3c'b'\x3e bin-char\n          [ (\x3c'.'\x3e bin-char)+ | ('-' bin-char) ];\nbin-char \x3d ('0' | '1')+;\ndec-val \x3d \x3c'd'\x3e dec-char\n          [ (\x3c'.'\x3e dec-char)+ | ('-' dec-char) ];\ndec-char \x3d DIGIT+;\nhex-val \x3d \x3c'x'\x3e hex-char\n          [ (\x3c'.'\x3e hex-char)+ | ('-' hex-char) ];\nhex-char \x3d HEXDIG+;\nNUM \x3d DIGIT+;\n\x3cDIGIT\x3e \x3d #'[0-9]';\n\x3cHEXDIG\x3e \x3d #'[0-9a-fA-F]';\nopt-whitespace \x3d #'\\s*(?:;.*?(?:\\u000D?\\u000A\\s*|$))*';\nwhitespace \x3d #'\\s+(?:;.*?\\u000D?\\u000A\\s*)*';\nregexp \x3d #\"#'[^'\\\\]*(?:\\\\.[^'\\\\]*)*'\"\n       | #\"#\\\"[^\\\"\\\\]*(?:\\\\.[^\\\"\\\\]*)*\\\"\"\n"));
function en(b,a){var c=sm(dn,sj,b,!1);if(c instanceof Ml)throw[u("Error parsing grammar specification:\n"),u(function(){var a=new fa,b=la,d=ja;la=!0;ja=function(a,b,c){return function(a){return c.append(a)}}(b,d,a,c);try{$g(M([c],0))}finally{ja=d,la=b}return""+u(a)}())].join("");var d=wm(cn,c),e=an(Yd(wg,bn,d)),d=D(D(D(d)));return new p(null,3,[ai,Um(pk(a,e)),Qh,d,di,a],null)};function fn(b){var a=Tc(b);b=fj.a(a);a=Nh.a(a);return q(q(b)?a:b)?new T(null,2,5,U,[b,a],null):null};function gn(b){return $c(b)&&G.b(J(b),1)||Zc(b)&&id(b,Y)&&Wc(x.b(b,Oh))||Wc(b)}var hn=new Ml(null,null,null,null,null),jn=function jn(a){for(var c=[],d=arguments.length,e=0;;)if(e<d)c.push(arguments[e]),e+=1;else break;switch(c.length){case 1:return jn.a(arguments[0]);case 2:return jn.b(arguments[0],arguments[1]);default:throw Error([u("Invalid arity: "),u(c.length)].join(""));}};jn.a=function(b){var a=fn(b);N(a,0,null);a=N(a,1,null);return q(a)?rd(a):J(b)};
jn.b=function(b,a){var c=fn(b);N(c,0,null);c=N(c,1,null);return q(c)?rd(c):a+J(b)};jn.C=2;function kn(b,a,c,d,e){b=Pl(b,c,d,-1,null);$l(b,new T(null,2,5,U,[e,a],null),pm(b));return gm(b,null)}function ln(b,a,c,d,e,f){var h=J(c);for(f=y(f);;)if(f){var k=D(f),m=fn(k);N(m,0,null);m=N(m,1,null);m=q(m)?m:e+J(k);if(G.b(m,h))return new T(null,3,5,U,[k,m,null],null);var n=y(kn(b,a,c,d,m));if(n)return new T(null,3,5,U,[k,m,n],null);f=E(f)}else return null}
function mn(b,a,c,d,e){var f=J(c),h=kn(b,a,c,d,e);e=rd(e);var k=ln(b,a,c,d,e,h);N(k,0,null);N(k,1,null);N(k,2,null);h=e;for(e=ek;;){var m=k,n=N(m,0,null),k=N(m,1,null),v=N(m,2,null);if(null==m||G.b(h,k))return hn;if(null==v)return Yl(ck(e,n),new p(null,3,[zj,Xh,fj,0,Nh,f],null));h=rd(k);e=ck(e,n);k=ln(b,a,c,d,k,v)}}
function nn(b,a,c,d,e){if(!q((new yg(null,new p(null,2,[mi,null,Fi,null],null),null)).call(null,c)))throw Error("Assert failed: (#{:hiccup :enlive} output-format)");if(G.b(c,mi))a:{c=Nl(e);var f=J(e),h=kn(b,a,e,c,0),k=rd(0),m=fk(new T(null,1,5,U,[d],null)),h=ln(b,a,e,c,k,h);N(h,0,null);N(h,1,null);N(h,2,null);d=k;k=m;for(m=h;;){var n=m,v=N(n,0,null),m=N(n,1,null),h=N(n,2,null);if(null==n||G.b(d,m)){b=hn;break a}if(null==h){b=Yl(jk(ck(k,v)),new p(null,3,[zj,Xh,fj,0,Nh,f],null));break a}d=rd(m);k=ck(k,
v);m=ln(b,a,e,c,m,h)}}else if(G.b(c,Fi))a:for(c=Nl(e),f=J(e),m=kn(b,a,e,c,0),k=rd(0),h=ln(b,a,e,c,k,m),N(h,0,null),N(h,1,null),N(h,2,null),m=ek;;){var A=h,n=N(A,0,null),h=N(A,1,null),v=N(A,2,null);if(null==A||G.b(k,h)){b=hn;break a}if(null==v){b=Yl(new p(null,2,[Y,d,Oh,y(ck(m,n))],null),new p(null,3,[zj,Xh,fj,0,Nh,f],null));break a}k=rd(h);m=ck(m,n);h=ln(b,a,e,c,h,v)}else b=null;return b}
function on(b,a,c,d,e,f){var h=Nl(f),k=J(f),m=kn(b,a,f,h,0);if(q(function(){var b=Wc(m);return b?b:si.a(a)}()))return hn;var n=Yd(Eg,jn,m),v=jn.a(n),A=mn(b,Ni.a(c),f,h,v);b=new p(null,3,[zj,Xh,fj,0,Nh,k],null);if(q(function(){var a=A instanceof Ml;return a?a:(a=G.b(Y.a(c),hi))?gn(A):a}()))return hn;switch(d instanceof P?d.ga:null){case "enlive":return Yl(new p(null,2,[Y,e,Oh,ck(ck(ek,n),A)],null),b);case "hiccup":return Yl(jk(ck(ck(fk(new T(null,1,5,U,[e],null)),n),A)),b);default:return Yl(ck(ck(ek,
n),A),b)}}function pn(b,a,c,d,e){var f=Jj.a(d),h=Kc(f),k;if(k=G.b(Y.a(d),gh))k=(new yg(null,new p(null,2,[hi,null,mj,null],null),null)).call(null,Y.a(h)),k=q(k)?va(si.a(h))&&va(si.a(Ni.a(h))):k;if(va(k))return hn;a:for(k=Mc;;)if(E(f))k=Lc.b(k,D(f)),f=E(f);else{f=y(k);break a}f=Xd(wk,f);return G.b(gj.a(d),lk)?on(b,f,h,null,c,a):on(b,f,h,e,c,a)}
function qn(b,a,c){var d=ai.a(b);b=di.a(b);var e=x.b(d,c);return G.b(si.a(e),!0)?hn:G.b(gj.a(e),lk)?G.b(Y.a(e),hi)?(c=Ni.a(e),b=Nl(a),mn(d,c,a,b,0)):G.b(Y.a(e),mj)?(c=Ni.a(e),b=Nl(a),a=mn(d,c,a,b,0),q(gn(a))?hn:a):pn(d,a,c,e,b):G.b(Y.a(e),hi)?nn(d,Ni.a(e),b,c,a):G.b(Y.a(e),mj)?(a=nn(d,Ni.a(e),b,c,a),q(gn(a))?hn:a):pn(d,a,c,e,b)};function rn(b,a){if(G.b(null,a))return b;if(G.b(Oh,a))return O.c(b,ai,Hk(ai.a(b)));if(G.b(hh,a))return O.c(b,ai,Ik(di.a(b),ai.a(b)));if(G.b(ki,a))return O.c(b,ai,Jk(di.a(b),ai.a(b)));throw Error([u("No matching clause: "),u(a)].join(""));}function sn(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;return tn(arguments[0],arguments[1],2<a.length?new C(a.slice(2),0,null):null)}
function tn(b,a,c){var d=null!=c&&(c.m&64||c.pa)?Xd(te,c):c;if(!id(new yg(null,new p(null,4,[null,null,hh,null,Oh,null,ki,null],null),null),x.b(d,Bi)))throw Error("Assert failed: (contains? #{nil :tags :content :all} (get options :unhide))");if(!id(new yg(null,new p(null,2,[null,null,Xh,null],null),null),x.b(d,zj)))throw Error("Assert failed: (contains? #{nil :memory} (get options :optimize))");c=x.c(d,Yh,Qh.a(b));var e=x.c(d,Hi,!1),f=x.c(d,zj,!1),h=x.b(d,Bi);b=rn(b,h);return q(Ki.a(d))?(f=ai.a(b),
b=di.a(b),d=nk.a?nk.a(b):nk.call(null,b),b=sm(f,c,a,e),b instanceof Ml?(h=Bh.a(b),f=Pl(f,a,Nl(a),h,d),rm(f,Z(c),e),e=gm(f,null),q(e)?a=D(e):(e=em(d,ri,a,0,J(a)),a=em(d,c,e,0,J(a))),a=Fc(a,vg.h(M([b,Tc(a)],0)))):a=b,a):q(q(f)?va(e):f)?(d=qn(b,a,c),q(un.a?un.a(d):un.call(null,d))?sm(ai.a(b),c,a,e):d):sm(ai.a(b),c,a,e)}function vn(b,a,c,d,e,f){this.ca=b;this.ub=a;this.tb=c;this.K=d;this.D=e;this.v=f;this.m=2229667595;this.F=8192}g=vn.prototype;g.J=function(b,a){return Qa.c(this,a,null)};
g.H=function(b,a,c){switch(a instanceof P?a.ga:null){case "grammar":return this.ca;case "start-production":return this.ub;case "output-format":return this.tb;default:return x.c(this.D,a,c)}};g.M=function(b,a,c){return Jg(a,function(){return function(b){return Jg(a,Rg,""," ","",c,b)}}(this),"#instaparse.core.Parser{",", ","}",c,Td.b(new T(null,3,5,U,[new T(null,2,5,U,[ai,this.ca],null),new T(null,2,5,U,[Qh,this.ub],null),new T(null,2,5,U,[di,this.tb],null)],null),this.D))};
g.Ea=function(){return new qf(0,this,3,new T(null,3,5,U,[ai,Qh,di],null),Pb(this.D))};g.S=function(){return this.K};g.Y=function(){return 3+J(this.D)};g.P=function(){var b=this.v;return null!=b?b:this.v=b=wd(this)};g.A=function(b,a){var c;c=q(a)?(c=this.constructor===a.constructor)?pf(this,a):c:a;return q(c)?!0:!1};
g.rb=function(b,a){return id(new yg(null,new p(null,3,[Qh,null,ai,null,di,null],null),null),a)?Qc.b(Fc(Ee.b(he,this),this.K),a):new vn(this.ca,this.ub,this.tb,this.K,ce(Qc.b(this.D,a)),null)};
g.Ia=function(b,a,c){return q(S.b?S.b(ai,a):S.call(null,ai,a))?new vn(c,this.ub,this.tb,this.K,this.D,null):q(S.b?S.b(Qh,a):S.call(null,Qh,a))?new vn(this.ca,c,this.tb,this.K,this.D,null):q(S.b?S.b(di,a):S.call(null,di,a))?new vn(this.ca,this.ub,c,this.K,this.D,null):new vn(this.ca,this.ub,this.tb,this.K,O.c(this.D,a,c),null)};g.X=function(){return y(Td.b(new T(null,3,5,U,[new T(null,2,5,U,[ai,this.ca],null),new T(null,2,5,U,[Qh,this.ub],null),new T(null,2,5,U,[di,this.tb],null)],null),this.D))};
g.T=function(b,a){return new vn(this.ca,this.ub,this.tb,a,this.D,this.v)};g.V=function(b,a){return $c(a)?Sa(this,w.b(a,0),w.b(a,1)):Ea(Ja,this,a)};
g.call=function(){var b=null,b=function(a,b,d,e,f,h,k,m){switch(arguments.length){case 2:return sn(this,b);case 4:return tn(this,b,M([d,e],0));case 6:return tn(this,b,M([d,e,f,h],0));case 8:return tn(this,b,M([d,e,f,h,k,m],0))}throw Error("Invalid arity: "+arguments.length);};b.b=function(a,b){return sn(this,b)};b.I=function(a,b,d,e){return tn(this,b,M([d,e],0))};b.Ja=function(a,b,d,e,f,h){return tn(this,b,M([d,e,f,h],0))};b.Ra=function(a,b,d,e,f,h,k,m){return tn(this,b,M([d,e,f,h,k,m],0))};return b}();
g.apply=function(b,a){return this.call.apply(this,[this].concat(za(a)))};g.a=function(b){return sn(this,b)};g.c=function(b,a,c){return tn(this,b,M([a,c],0))};g.W=function(b,a,c,d,e){return tn(this,b,M([a,c,d,e],0))};g.Qa=function(b,a,c,d,e,f,h){return tn(this,b,M([a,c,d,e,f,h],0))};function wn(b){return new vn(ai.a(b),Qh.a(b),di.a(b),null,Qc.h(b,ai,M([Qh,di],0)),null)}g.Z=!0;g.M=function(b,a){return xb(a,Yk(this))};
function xn(b){for(var a=[],c=arguments.length,d=0;;)if(d<c)a.push(arguments[d]),d+=1;else break;return yn(arguments[0],1<a.length?new C(a.slice(1),0,null):null)}
function yn(b,a){var c=null!=a&&(a.m&64||a.pa)?Xd(te,a):a;if(!id(new yg(null,new p(null,3,[null,null,Ei,null,Hj,null],null),null),x.b(c,Jh)))throw Error("Assert failed: (contains? #{nil :ebnf :abnf} (get options :input-format))");if(!id(new yg(null,new p(null,3,[null,null,mi,null,Fi,null],null),null),x.b(c,di)))throw Error("Assert failed: (contains? #{nil :hiccup :enlive} (get options :output-format))");if(!function(){var a=x.b(c,Nj);return null==a||id(zn,a)||Zc(a)&&id(a,ai)&&id(a,Qh)}())throw Error("Assert failed: (let [ws-parser (get options :auto-whitespace)] (or (nil? ws-parser) (contains? standard-whitespace-parsers ws-parser) (and (map? ws-parser) (contains? ws-parser :grammar) (contains? ws-parser :start-production))))");
var d=x.c(c,Jh,Ei),e=function(){var b=d instanceof P?d.ga:null;switch(b){case "abnf":return en;case "ebnf":return q(x.b(c,Mj))?function(){return function(a,b){var c=Lm;Lm=!0;try{return Vm(a,b)}finally{Lm=c}}}(b,d,a,c,c):Vm;default:throw Error([u("No matching clause: "),u(d)].join(""));}}(),f=x.c(c,di,mi),h=x.c(c,Yh,null),k="string"===typeof b?function(){var a=e.b?e.b(b,f):e.call(null,b,f);return q(h)?wn(O.c(a,Qh,h)):wn(a)}():Zc(b)?function(){var a=Wm(b,f,h);return wn(a)}():$c(b)?function(){var a=
q(h)?h:b.a?b.a(0):b.call(null,0),a=Wm(Xd(te,b),f,a);return wn(a)}():null,m=x.b(c,Nj),m=m instanceof P?x.b(zn,m):m;if(q(m)){var n=null!=m&&(m.m&64||m.pa)?Xd(te,m):m,m=x.b(n,ai),n=x.b(n,Qh);return O.c(k,ai,Lk(ai.a(k),Qh.a(k),m,n))}return k}function un(b){return b instanceof Ml||Tc(b)instanceof Ml}var zn=new p(null,2,[Cj,xn("whitespace \x3d #'\\s+'"),Uh,xn("whitespace \x3d #'[,\\s]+'")],null);var An=xn("문장       :\x3d (링크 / 측주 / 강조 / #'[^\\[\x3c*`_]+' / ANY)+\n\n    (* 링크 *)\n    \x3c링크\x3e     :\x3d 일반링크 / 자동링크 / 참조링크\n    일반링크   :\x3d \x3c'['\x3e 링크텍스트 \x3c']('\x3e 주소 \x3c')'\x3e\n    링크텍스트 :\x3d #'[^\\]]+'\n    주소       :\x3d #'[^\\)]+'\n\n    자동링크   :\x3d \x3c'\x3c'\x3e #'.+://[^\x3e]+' \x3c'\x3e'\x3e\n\n    참조링크   :\x3d \x3c'['\x3e 링크텍스트 \x3c']' 공백? '['\x3e 참조이름 \x3c']'\x3e / \x3c'['\x3e 참조이름 \x3c'][]'\x3e\n    참조이름   :\x3d #'[^\\]]+'\n\n    (* 각주 *)\n    측주       :\x3d \x3c'[\x3e'\x3e 참조이름 \x3c']'\x3e\n\n    (* 강조 *)\n    \x3c강조\x3e     :\x3d 굵게 / 기울임 / 코드\n    굵게       :\x3d \x3c'**'\x3e ANY+ \x3c'**'\x3e / \x3c'__'\x3e ANY+ \x3c'__'\x3e\n    기울임     :\x3d \x3c'*'\x3e ANY+ \x3c'*'\x3e / \x3c'_'\x3e ANY+ \x3c'_'\x3e\n    코드       :\x3d \x3c'``'\x3e #'[^`]+' \x3c'``'\x3e / \x3c'`'\x3e #'[^`]+' \x3c'`'\x3e\n\n    (* 이스케이프: 미처리 *)\n    \x3ceTXT\x3e     :\x3d (ESC / ANY)+\n    ESC        :\x3d \x3c'\\\\'\x3e escaped\n    \x3cescaped\x3e  :\x3d #'[\\`*_{}\\[\\]()#+\\-.!]'\n\n    \x3cANY\x3e      :\x3d #'.'\n    공백       :\x3d ' '\n    \x3cLF\x3e       :\x3d '\\n'\n   ");var Bn=xn("문서         :\x3d (블럭 / 각주 / 문단)+\n    \x3c블럭\x3e       :\x3d 구분줄 / 제목 / 목록 / 인용 / 원문 / 소스코드\n\n    (* 제목 *)\n    \x3c제목\x3e       :\x3d 일반제목 \x3cLF\x3e / 밑줄제목\n    \x3c일반제목\x3e     :\x3d \x3c'##' 공백\x3e 작은제목 \x3c#' #+'\x3e? / \x3c'# '\x3e 큰제목 \x3c#' #+'\x3e?\n    \x3c밑줄제목\x3e   :\x3d 큰제목 \x3cLF '\x3d'+ LF\x3e / 작은제목 \x3cLF '-'+ LF\x3e\n    큰제목       :\x3d 문장\n    작은제목     :\x3d 문장\n\n    (* 목록 *)\n    \x3c목록\x3e       :\x3d 일반목록 / 숫자목록\n    일반목록     :\x3d (일반마커 항목 \x3cLF\x3e)+ \x3cLF\x3e?\n    숫자목록     :\x3d (숫자마커 항목 \x3cLF\x3e)+ \x3cLF\x3e?\n    \x3c일반마커\x3e   :\x3d \x3c공백? 공백? 공백? ('*' | '+' | '-') 공백+\x3e\n    \x3c숫자마커\x3e   :\x3d \x3c공백? 공백? 공백? 숫자+ '.' 공백+\x3e\n    항목         :\x3d 문장 (\x3cLF\x3e !(빈줄 | 일반마커 | 숫자마커) \x3c#'[ ]*'\x3e 문장)*\n\n    (* 인용 *)\n    인용         :\x3d (\x3c'\x3e' 공백?\x3e (빈줄 / 문장 \x3cLF\x3e))+\n\n    (* 원문 *)\n    원문         :\x3d (\x3c공백4\x3e #'.*' LF)+\n\n    (* 소스코드 *)\n    소스코드     :\x3d \x3c\"```\" 공백*\x3e (\x3cLF\x3e 소스내용 / 소스언어 \x3cLF\x3e 소스내용) \x3c\"```\" LF LF?\x3e\n    소스언어     :\x3d ANYS\n    소스내용     :\x3d (ANYS LF)*\n\n    (* 구분줄 *)\n    구분줄       :\x3d \x3c구분줄표시 LF\x3e\n    구분줄표시   :\x3d #'(- ?){3,}' / #'(\\* ?){3,}' / #'(_ ?){3,}'\n\n    (* 각주 *)\n    \x3c각주\x3e       :\x3d 각주문단 / 각주링크\n\n    각주문단     :\x3d \x3c'['\x3e ('^' | '\x3e') 각주이름 \x3c']:' 공백+\x3e 문장\n\n    각주링크     :\x3d \x3c'['\x3e 각주이름 \x3c']:' 공백+\x3e 각주주소 링크타이틀? \x3cLF\x3e\n    각주이름     :\x3d #'[^\\]]+'\n    각주주소     :\x3d #'[^\\s]+'\n    링크타이틀   :\x3d \x3c공백+ '\"'\x3e #'[^\"]+' \x3c'\"'\x3e\n\n    (* 문단 *)\n    문단         :\x3d (문장 \x3cLF\x3e / 빈줄)* \x3cLF\x3e?\n    빈줄         :\x3d 공백* \x3cLF\x3e\n    문장         :\x3d ANYS\n    \x3cANYS\x3e       :\x3d #'.+'\n    \x3cANY\x3e        :\x3d #'.'\n    공백         :\x3d #' '\n    공백4        :\x3d 공백 공백 공백 공백\n    \x3cLF\x3e         :\x3d '\\n'\n    \x3c숫자\x3e       :\x3d #'[0-9]'\n   ");function Cn(b){function a(a){return An.a?An.a(a):An.call(null,a)}var c=new p(null,1,[ij,a],null),d=function(){var c=new p(null,1,[Qj,a],null),d;d=G.b("\n",Kc(b))?b:[u(b),u("\n")].join("");d=Bn.a?Bn.a(d):Bn.call(null,d);return wm.b?wm.b(c,d):wm.call(null,c,d)}();return wm.b?wm.b(c,d):wm.call(null,c,d)}function Dn(b,a){return Ce.b(function(b){return $c(b)&&G.b(a,D(b))},b)}var En=le.b(D,Dn);function Fn(b,a){var c=En.b?En.b(b,a):En.call(null,b,a);return q(c)?Xd(u,gc(c)):null}
function Gn(b){b=De(b);var a=Dn(b,Tj),c=Dn(b,lh);return new p(null,2,[Mi,md(vg,V.b(function(){return function(a){a=ne(Fn,a);return Cf([a.a?a.a(Oi):a.call(null,Oi),new p(null,2,[Ri,a.a?a.a(Gj):a.call(null,Gj),Aj,a.a?a.a(hj):a.call(null,hj)],null)])}}(b,a,c),a)),uj,md(vg,V.b(function(){return function(a){return Cf([Fn(a,Oi),En.b?En.b(a,Qj):En.call(null,a,Qj)])}}(b,a,c),c))],null)}var Hn=he;
function In(b){var a=N(b,0,null),c=ud(b),d=Oc([kh,ph,Fh,Kh,Th,Ai,oj,yj,Fj],"p ul code h2 h1 li b ol i".split(" ")),e=ne(En,c),f=ne(Fn,c),h=function(){return function(a){return[u("\x3c정보없음: "),u(a),u("\x3e")].join("")}}(d,e,f,b,a,c,b),k=a instanceof P?a.ga:null;switch(k){case "측주":return c=f.a?f.a(Eh):f.call(null,Eh),b=Fe(Hn,new T(null,2,5,U,[uj,c],null)),q(b)?(h=b,[u('\x3clabel for\x3d"'),u(c),u('" class\x3d"margin-toggle sidenote-number"\x3e\x3c/label\x3e'),u('\x3cinput type\x3d"checkbox" id\x3d"'),
u(c),u('" class\x3d"margin-toggle"/\x3e'),u('\x3cspan class\x3d"sidenote"\x3e'),u(Jn.a?Jn.a(h):Jn.call(null,h)),u("\x3c/span\x3e")].join("")):h(c);case "각주문단":return"";case "소스코드":return[u("\x3cpre\x3e\x3ccode"),u(function(){var a=f.a?f.a(vh):f.call(null,vh);return q(a)?[u(' data-lang\x3d"'),u(a),u('"')].join(""):null}()),u("\x3e"),u(function(){var a=f.a?f.a(li):f.call(null,li);return Jn.a?Jn.a(a):Jn.call(null,a)}()),u("\x3c/code\x3e\x3c/pre\x3e")].join("");case "빈줄":return"\x3cbr/\x3e";case "구분줄":return"\x3chr/\x3e";
case "참조링크":b=Fe(Hn,new T(null,2,5,U,[Mi,f.a?f.a(Eh):f.call(null,Eh)],null));if(q(b)){var m=b;return[u('\x3ca href\x3d"'),u(m.a?m.a(Ri):m.call(null,Ri)),u('"\x3e'),u(function(){var a;a=e.a?e.a(Qj):e.call(null,Qj);q(a)||(a=m.a?m.a(Aj):m.call(null,Aj),a=q(a)?a:f.a?f.a(Eh):f.call(null,Eh));return Jn.a?Jn.a(a):Jn.call(null,a)}()),u("\x3c/a\x3e")].join("")}return h(f.a?f.a(Eh):f.call(null,Eh));case "원문":return[u('\x3cpre class\x3d"code"\x3e'),u(Jn.a?Jn.a(c):Jn.call(null,c)),u("\x3c/pre\x3e")].join("");
case "자동링크":return c=Xd(u,c),[u('\x3ca href\x3d"'),u(c),u('"\x3e'),u(c),u("\x3c/a\x3e")].join("");case "일반링크":return[u('\x3ca href\x3d"'),u(f.a?f.a(Ri):f.call(null,Ri)),u('"\x3e'),u(function(){var a=e.a?e.a(Qj):e.call(null,Qj);return Jn.a?Jn.a(a):Jn.call(null,a)}()),u("\x3c/a\x3e")].join("");case "인용":return[u("\x3cblockquote\x3e"),u(Xd(u,V.b(function(){return function(a){return[u("\x3cp\x3e"),u(Jn.a?Jn.a(a):Jn.call(null,a)),u("\x3c/p\x3e")].join("")}}(k,d,e,f,h,b,a,c,b),Dn(b,Qj)))),u("\x3c/blockquote\x3e")].join("");
case "각주링크":return"";default:return b=d.a?d.a(a):d.call(null,a),q(b)?(h=b,[u("\x3c"),u(h),u("\x3e"),u(Jn.a?Jn.a(c):Jn.call(null,c)),u("\x3c/"),u(h),u("\x3e")].join("")):Jn.a?Jn.a(c):Jn.call(null,c)}}
var Jn=function Jn(a){for(;;){if($c(a))return In(a);if("string"===typeof a)return(""+u(a)).replace("\x26","\x26amp;").replace("\x3c","\x26lt;").replace("\x3e","\x26gt;").replace('"',"\x26quot;").replace("'","\x26apos;");var c=a;if(null==c?0:null!=c?c.m&64||c.pa||(c.m?0:r(La,c)):r(La,c))return Xd(u,V.b(Jn,a));if(null==a)return"";a=""+u(a)}};la=!1;ja=function(){function b(b){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new C(e,0)}return a.call(this,d)}function a(a){return console.log.apply(console,Da?Ba(a):Aa.call(null,a))}b.C=0;b.B=function(b){b=y(b);return a(b)};b.h=a;return b}();
ka=function(){function b(b){var d=null;if(0<arguments.length){for(var d=0,e=Array(arguments.length-0);d<e.length;)e[d]=arguments[d+0],++d;d=new C(e,0)}return a.call(this,d)}function a(a){return console.error.apply(console,Da?Ba(a):Aa.call(null,a))}b.C=0;b.B=function(b){b=y(b);return a(b)};b.h=a;return b}();function Kn(b){return document.getElementById("preview").contentWindow.replace_article.call(null,b)}var Ln=new Worker("js/worker.js");Ln.onmessage=function(b){b=b.data;console.log(b.time);return Kn(b.html)};
if("undefined"===typeof Mn)var Mn=Ln;
window.onload=function(){var b=document.getElementById("editor"),a=CodeMirror.fromTextArea(b,{mode:"markdown",lineNumbers:!0,lineWrapping:!0,autofocus:!0,theme:"neo",size:{width:"100%",height:"100%"}}),b=function(a,b){return function(){var a=b.getValue();return Mn.postMessage(a)}}(b,a,function(a,b){return function(){var a=b.getValue(),c=ya(),h;a:{var a=Cn(a),k=Hn;Hn=Gn(a);try{h=Jn(a);break a}finally{Hn=k}h=void 0}c=M([[u("Elapsed time: "),u((ya()-c).toFixed(6)),u(" msecs")].join("")],0);Vg(c,oa());
q(la)&&Wg();return Kn(h)}}(b,a));a.on("change",b);return b()};
})();
