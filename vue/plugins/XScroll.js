/**
* Detect Element Resize
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
**/
(function () {
    var attachEvent = document.attachEvent,
        stylesCreated = false;

    let resetTriggers, checkTriggers, scrollListener;
    if (!attachEvent) {
        var requestFrame = (function(){
            var raf = window.requestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                                function(fn){ return window.setTimeout(fn, 20); };
            return function(fn){ return raf(fn); };
        })();

        var cancelFrame = (function(){
            var cancel = window.cancelAnimationFrame ||
                            window.mozCancelAnimationFrame ||
                                window.webkitCancelAnimationFrame ||
                                   window.clearTimeout;
          return function(id){ return cancel(id); };
        })();

        resetTriggers = function(element){
            var triggers = element.__resizeTriggers__,
                expand = triggers.firstElementChild,
                contract = triggers.lastElementChild,
                expandChild = expand.firstElementChild;
            contract.scrollLeft = contract.scrollWidth;
            contract.scrollTop = contract.scrollHeight;
            expandChild.style.width = expand.offsetWidth + 1 + 'px';
            expandChild.style.height = expand.offsetHeight + 1 + 'px';
            expand.scrollLeft = expand.scrollWidth;
            expand.scrollTop = expand.scrollHeight;
        };

        checkTriggers = function(element){
            return element.offsetWidth !== element.__resizeLast__.width ||
                         element.offsetHeight !== element.__resizeLast__.height;
        };

        scrollListener = function(e){
            var element = this;
            resetTriggers(this);
            if (this.__resizeRAF__) {
                cancelFrame(this.__resizeRAF__);
            }
            this.__resizeRAF__ = requestFrame(function(){
                if (checkTriggers(element)) {
                    element.__resizeLast__.width = element.offsetWidth;
                    element.__resizeLast__.height = element.offsetHeight;
                    element.__resizeListeners__.forEach(function(fn){
                        fn.call(element, e);
                    });
                }
            });
        };

        /* Detect CSS Animations support to detect element display/re-attach */
        var animation = false,
            animationstring = 'animation',
            keyframeprefix = '',
            animationstartevent = 'animationstart',
            domPrefixes = 'Webkit Moz O ms'.split(' '),
            startEvents = 'webkitAnimationStart animationstart oAnimationStart MSAnimationStart'.split(' '),
            pfx  = '';
        {
            var elm = document.createElement('fakeelement');
            if( elm.style.animationName !== undefined ) { animation = true; }

            if( animation === false ) {
                for( var i = 0; i < domPrefixes.length; i++ ) {
                    if( elm.style[ domPrefixes[i] + 'AnimationName' ] !== undefined ) {
                        pfx = domPrefixes[ i ];
                        animationstring = pfx + 'Animation';
                        keyframeprefix = '-' + pfx.toLowerCase() + '-';
                        animationstartevent = startEvents[ i ];
                        animation = true;
                        break;
                    }
                }
            }
        }

        var animationName = 'resizeanim';
        var animationKeyframes = '@' + keyframeprefix + 'keyframes ' + animationName + ' { from { opacity: 0; } to { opacity: 0; } } ';
        var animationStyle = keyframeprefix + 'animation: 1ms ' + animationName + '; ';
    }

    function createStyles() {
        if (!stylesCreated) {
            //opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
            var css = (animationKeyframes ? animationKeyframes : '') +
                    '.resize-triggers { ' + (animationStyle ? animationStyle : '') + 'visibility: hidden; opacity: 0; } ' +
                    '.resize-triggers, .resize-triggers > div, .contract-trigger:before { content: \" \"; display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden; } .resize-triggers > div { background: #eee; overflow: auto; } .contract-trigger:before { width: 200%; height: 200%; }',
                head = document.head || document.getElementsByTagName('head')[0],
                style = document.createElement('style');

            style.type = 'text/css';
            if (style.styleSheet) {
                style.styleSheet.cssText = css;
            } else {
                style.appendChild(document.createTextNode(css));
            }

            head.appendChild(style);
            stylesCreated = true;
        }
    }

    window.addResizeListener = function(elem, fn){
        if (attachEvent) {
            elem.attachEvent('onresize', fn);
        } else {
            if (!elem.__resizeTriggers__) {
                if (getComputedStyle(elem).position === 'static') {
                    elem.style.position = 'relative';
                }
                createStyles();
                elem.__resizeLast__ = {};
                elem.__resizeListeners__ = [];
                (elem.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
                elem.__resizeTriggers__.innerHTML = '<div class="expand-trigger"><div></div></div>' +
                                                                                        '<div class="contract-trigger"></div>';
                elem.appendChild(elem.__resizeTriggers__);
                resetTriggers(elem);
                elem.addEventListener('scroll', scrollListener, true);

                /* Listen for a css animation to detect element display/re-attach */
                animationstartevent && elem.__resizeTriggers__.addEventListener(animationstartevent, function(e) {
                    if(e.animationName === animationName){
                        resetTriggers(elem);
                    }
                });
            }
            elem.__resizeListeners__.push(fn);
        }
    };

    window.removeResizeListener = function(elem, fn){
        if (attachEvent) {
            elem.detachEvent('onresize', fn);
        } else {
            elem.__resizeListeners__.splice(elem.__resizeListeners__.indexOf(fn), 1);
            if (!elem.__resizeListeners__.length) {
                elem.removeEventListener('scroll', scrollListener);
                elem.__resizeTriggers__ = !elem.removeChild(elem.__resizeTriggers__);
            }
        }
    };
})();


const Evt = {
    fix: function(event) {
        if (event.wrapper === true) {
            return event;
        }
        // store a copy of the original event object
        // and "clone" to set read-only properties
        let originalEvent = event;
        event = {
            originalEvent: originalEvent
        };
        let props = 'altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target timeStamp toElement type view wheelDelta which'.split(' ');
        for (let i = props.length; i; i--) {
            event[props[i]] = originalEvent[props[i]];
        }
        // Mark it as fixed
        event.wrapper = true;
        // add preventDefault and stopPropagation since
        // they will not work on the clone
        event.preventDefault = function() {
            // if preventDefault exists run it on the original event
            if (originalEvent.preventDefault) {
                originalEvent.preventDefault();
            }
            // otherwise set the returnValue property of the original event to false (IE)
            originalEvent.returnValue = false;
        };
        event.stopPropagation = function() {
            // if stopPropagation exists run it on the original event
            if (originalEvent.stopPropagation) {
                originalEvent.stopPropagation();
            }
            // otherwise set the cancelBubble property of the original event to true (IE)
            originalEvent.cancelBubble = true;
        };
        // Fix timeStamp
        /*event.timeStamp = event.timeStamp || now();*/
        // Fix target property, if necessary
        if (!event.target) {
            event.target = event.srcElement || document; // Fixes #1925 where srcElement might not be defined either
        }
        // check if target is a textnode (safari)
        if (event.target.nodeType === 3) {
            event.target = event.target.parentNode;
        }
        // Add relatedTarget, if necessary
        if (!event.relatedTarget && event.fromElement) {
            event.relatedTarget = event.fromElement === event.target ? event.toElement : event.fromElement;
        }
        // Calculate pageX/Y if missing and clientX/Y available
        if (event.pageX === null && event.clientX !== null) {
            var doc = document.documentElement,
                body = document.body;
            event.pageX = event.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) - (doc.clientLeft || 0);
            event.pageY = event.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) - (doc.clientTop || 0);
        }
        // Add which for key events
        if (!event.which && ((event.charCode || event.charCode === 0) ? event.charCode : event.keyCode)) {
            event.which = event.charCode || event.keyCode;
        }
        // Add metaKey to non-Mac browsers (use ctrl for PC's and Meta for Macs)
        if (!event.metaKey && event.ctrlKey) {
            event.metaKey = event.ctrlKey;
        }
        // Add which for click: 1 == left; 2 == middle; 3 == right
        // Note: button is not normalized, so don't use it
        if (!event.which && event.button) {
            event.which = (event.button & 1 ? 1 : (event.button & 2 ? 3 : (event.button & 4 ? 2 : 0)));
        }
        return event;
    },
    on: function(elem, name, handler, params){
        // let wrapperHandler = handler;
        // if(params){
        //     function(){
        //     }
        // }
        if(elem.attachEvent){
            elem.attachEvent('on'+name, handler );
        } else if (elem.addEventListener){
            elem.addEventListener(name, handler, false);
        } else {
            elem['on'+name] = handler;
        }
        return this;
    },
    off: function(elem, name, handler) {
        if (elem.removeEventListener){
            elem.removeEventListener(name, handler, false);
        } else if (elem.detachEvent){
            elem.detachEvent('on'+name, handler);
        } else {
            delete elem['on'+name];
        }
        return this;
    },
    onresize: function(elem, handler){
        window.addResizeListener(elem, handler);
    },
    offresize: function(elem, handler){
        window.removeResizeListener(elem, handler);
    }
};

const MouseWheel = (() => {
    var toFix = ['wheel', 'mousewheel', 'DOMMouseScroll', 'MozMousePixelScroll'],
        toBind = ('onwheel' in document || document.documentMode >= 9) ? ['wheel'] : ['mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'],
        slice = Array.prototype.slice,
        nullLowestDeltaTimeout, lowestDelta;


    let MouseWheel = (elem, handler) => {
        return new MouseWheel.prototype.init(elem, handler);
    };
    MouseWheel.prototype = {
        elem: null,
        handler: null,
        settings: {
            adjustOldDeltas: true, // see shouldAdjustOldDeltas() below
            normalizeOffset: true // calls getBoundingClientRect for each event
        },
        init(elem, handler) {
            this.elem = elem;
            this.handler = handler;
            this.bind();
            return this;
        },
        bind() {
            for (let i = toBind.length; i;) {
                Evt.on(this.elem, toBind[--i], (evt) => {
                    this.handler.apply(this.elem, this.getargs(evt));
                });
            }
        },
        getargs(event) {
            let orgEvent = event || window.event,
                args = slice.call(arguments, 1),
                delta = 0,
                deltaX = 0,
                deltaY = 0,
                absDelta = 0,
                offsetX = 0,
                offsetY = 0;
            event = Evt.fix(orgEvent);
            event.type = 'mousewheel';

            // Old school scrollwheel delta
            if ('detail' in orgEvent) { deltaY = orgEvent.detail * -1; }
            if ('wheelDelta' in orgEvent) { deltaY = orgEvent.wheelDelta; }
            if ('wheelDeltaY' in orgEvent) { deltaY = orgEvent.wheelDeltaY; }
            if ('wheelDeltaX' in orgEvent) { deltaX = orgEvent.wheelDeltaX * -1; }

            // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
            if ('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
                deltaX = deltaY * -1;
                deltaY = 0;
            }

            // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
            delta = deltaY === 0 ? deltaX : deltaY;

            // New school wheel delta (wheel event)
            if ('deltaY' in orgEvent) {
                deltaY = orgEvent.deltaY * -1;
                delta = deltaY;
            }
            if ('deltaX' in orgEvent) {
                deltaX = orgEvent.deltaX;
                if (deltaY === 0) { delta = deltaX * -1; }
            }

            // No change actually happened, no reason to go any further
            if (deltaY === 0 && deltaX === 0) { return; }

            // Need to convert lines and pages to pixels if we aren't already in pixels
            // There are three delta modes:
            //   * deltaMode 0 is by pixels, nothing to do
            //   * deltaMode 1 is by lines
            //   * deltaMode 2 is by pages
            /*if (orgEvent.deltaMode === 1) {
                var lineHeight = $.data(this, 'mousewheel-line-height');
                delta *= lineHeight;
                deltaY *= lineHeight;
                deltaX *= lineHeight;
            } else if (orgEvent.deltaMode === 2) {
                var pageHeight = $.data(this, 'mousewheel-page-height');
                delta *= pageHeight;
                deltaY *= pageHeight;
                deltaX *= pageHeight;
            }*/

            // Store lowest absolute delta to normalize the delta values
            absDelta = Math.max(Math.abs(deltaY), Math.abs(deltaX));

            if (!lowestDelta || absDelta < lowestDelta) {
                lowestDelta = absDelta;

                // Adjust older deltas if necessary
                if (this.shouldAdjustOldDeltas(orgEvent, absDelta)) {
                    lowestDelta /= 40;
                }
            }

            // Adjust older deltas if necessary
            if (this.shouldAdjustOldDeltas(orgEvent, absDelta)) {
                // Divide all the things by 40!
                delta /= 40;
                deltaX /= 40;
                deltaY /= 40;
            }

            // Get a whole, normalized value for the deltas
            delta = Math[delta >= 1 ? 'floor' : 'ceil'](delta / lowestDelta);
            deltaX = Math[deltaX >= 1 ? 'floor' : 'ceil'](deltaX / lowestDelta);
            deltaY = Math[deltaY >= 1 ? 'floor' : 'ceil'](deltaY / lowestDelta);

            // Normalise offsetX and offsetY properties
            if (this.settings.normalizeOffset && this.elem.getBoundingClientRect) {
                var boundingRect = this.elem.getBoundingClientRect();
                offsetX = event.clientX - boundingRect.left;
                offsetY = event.clientY - boundingRect.top;
            }

            // Add information to the event object
            event.deltaX = deltaX;
            event.deltaY = deltaY;
            event.deltaFactor = lowestDelta;
            event.offsetX = offsetX;
            event.offsetY = offsetY;
            // Go ahead and set deltaMode to 0 since we converted to pixels
            // Although this is a little odd since we overwrite the deltaX/Y
            // properties with normalized deltas.
            event.deltaMode = 0;

            // Add event and delta to the front of the arguments
            args.unshift(event, delta, deltaX, deltaY);

            // Clearout lowestDelta after sometime to better
            // handle multiple device types that give different
            // a different lowestDelta
            // Ex: trackpad = 3 and mouse wheel = 120
            if (nullLowestDeltaTimeout) { clearTimeout(nullLowestDeltaTimeout); }
            nullLowestDeltaTimeout = setTimeout(this.nullLowestDelta, 200);

            return args;
        },
        nullLowestDelta() {
            lowestDelta = null;
        },
        shouldAdjustOldDeltas(orgEvent, absDelta) {
            // If this is an older event and the delta is divisable by 120,
            // then we are assuming that the browser is treating this as an
            // older mouse wheel event and that we should divide the deltas
            // by 40 to try and get a more usable deltaFactor.
            // Side note, this actually impacts the reported scroll distance
            // in older browsers and can cause scrolling to be slower than native.
            // Turn this off by setting $.event.special.mousewheel.settings.adjustOldDeltas to false.
            return this.settings.adjustOldDeltas && orgEvent.type === 'mousewheel' && absDelta % 120 === 0;
        }
    };
    MouseWheel.prototype.init.prototype = MouseWheel.prototype;
    return MouseWheel;
})();

const XScroll = (() => {
    let domdiv, defstyle;
    domdiv = document.createElement('div');
    document.documentElement.appendChild(domdiv);

    //获取渲染后的style
    function getstyle(elem, prop) {
        let styles = elem.currentStyle? elem.currentStyle : window.getComputedStyle(elem, null);
        return prop ? styles[prop] : styles;
    }
    //设置样式
    function setstyle(elem, styles) {
        let style, newstyles;
        newstyles = {};
        for( let prop in styles ){
            style = getstyle(elem, prop);
            if ( styles.hasOwnProperty(prop) && defstyle.hasOwnProperty(prop) ) {
                if( style !== styles[prop] ){
                    newstyles[prop] = styles[prop];
                }
            }
        }
        Object.assign(elem.style, newstyles);           //统一设置，样式设置相互影响默认值，避免影响判断。
    }
    defstyle = getstyle(domdiv);
    defstyle = Object.assign({}, defstyle);
    document.documentElement.removeChild(domdiv);

    //
    function addclass(elem, classes){
        classes = classes.split(' ');
        let oldClasses, newClasses;
        oldClasses = elem.className.split(' ');
        newClasses = oldClasses.concat();
        for( let i=0; i<classes.length; i++ ){
            if( -1 === oldClasses.indexOf(classes[i]) ){
                newClasses.push(classes[i]);
            }
        }
        elem.className = newClasses.join(' ');
    }
    //
    function removeclass(elem, classes){
        classes = classes.split(' ');
        let oldClasses, newClasses;
        oldClasses = elem.className.split(' ');
        newClasses = [];
        for( let i=0; i<oldClasses.length; i++ ){
            if( -1 === classes.indexOf(oldClasses[i]) ){
                newClasses.push(oldClasses[i]);
            }
        }
        elem.className = newClasses.join(' ');
    }
    //
    function px(style) {
        let px = parseFloat(style);
        return isNaN(px) ? 0 : px;
    }
    //
    function outerwidth(elem) {
        if( elem.outerWidth ){
            return elem.outerWidth();
        } else {
            let styles = getstyle(elem);
            return elem.offsetWidth + px(styles.marginLeft) + px(styles.marginRight);
        }
    }
    //
    function outerheight(elem) {
        if( elem.outerHeight ){
            return elem.outerHeight();
        } else {
            let styles = getstyle(elem);
            return elem.offsetHeight + px(styles.marginTop) + px(styles.marginBottom);
        }
    }

    //降频处理器
    function later( fn, delay, immediate ) {
        let timer;
        return function() {
            let context=this, args=arguments, callnow=immediate && !timer;
            clearTimeout(timer);
            timer = setTimeout(function() {
                if ( !immediate ) {
                    fn.apply( context, args );
                }
                timer = null;
            }, delay);
            if ( callnow ) {
                fn.apply( context, args );
            }
        };
    }
    //
    function createcode() {
        return Math.random().toString().substring(2);
    }

    let XScroll = function( elem, setting ) {
        this.target = elem;
        this.code = createcode();
        elem.setAttribute('xscroll-code', this.code);
        Object.assign(this.setting, setting);
        // this.init();
        XScroll.cache(this.code, this);
        return this;
    };
    XScroll.cachestore = {};
    XScroll.cache = function( code, xscroll ) {
        if( xscroll ) {
            XScroll.cachestore[code] = xscroll;
        } else {
            return XScroll.cachestore[code];
        }
    };
    XScroll.get = function( elem ) {
        return elem.getAttribute ? XScroll.cache( elem.getAttribute('xscroll-code') ) : XScroll.cache( elem );
    };
    XScroll.prototype = {
        inited:         false,
        code:           '',
        setting: {
            class:          '',
            wheelspeed:     0.1,
            xbar:           true,
            ybar:           true
        },
        target:         null,
        wrapper:        null,
        container:      null,
        scroll_x:       null,
        scroll_y:       null,
        block_x:        null,
        block_y:        null,
        locked_x:       false,
        locked_y:       false,
        padding: {
            top:        0,
            bottom:     0,
            left:       0,
            right:      0
        },
        size: {
            content_width:       0,
            content_height:      0
        },
        //创建DOM
        create() {
            addclass(this.target, 'xscroll '+this.setting.class);
            this.target.innerHTML = '<div><div>'+ this.target.innerHTML +'</div></div>';

            this.wrapper = this.target.firstChild;
            this.container = this.wrapper.firstChild;
            this.scroll_x = document.createElement('div');
            this.block_x = document.createElement('div');
            this.scroll_y = document.createElement('div');
            this.block_y = document.createElement('div');

            this.scroll_x.appendChild(this.block_x);
            this.scroll_y.appendChild(this.block_y);
            this.target.appendChild(this.scroll_x);
            this.target.appendChild(this.scroll_y);

            this.wrapper.className = 'xscroll-wrapper';
            this.container.className = 'xscroll-container';
            this.scroll_x.className = 'xscroll-bar xscroll-x';
            this.scroll_y.className = 'xscroll-bar xscroll-y';
            this.block_x.className = 'xscroll-block';
            this.block_y.className = 'xscroll-block';
            return this;
        },
        //初始化
        init() {
            if( this.inited ) {
                return this;
            }
            let styles;
            styles = getstyle(this.target);
            this.padding.top = px(styles.paddingTop);
            this.padding.bottom = px(styles.paddingBottom);
            this.padding.left = px(styles.paddingLeft);
            this.padding.right = px(styles.paddingRight);
            this.getcontentsize();

            // debugger;
            setstyle(this.wrapper, {
                top:                this.padding.top +'px',
                bottom:             this.padding.bottom +'px',
                left:               this.padding.left +'px',
                right:              this.padding.right +'px'
            });

            setstyle(this.scroll_x, {
                // marginLeft:         (this.padding.left + px(styles.marginLeft)) +'px',
                // marginRight:        (this.padding.right + px(styles.marginRight)) +'px'
                marginLeft:         this.padding.left +'px',
                marginRight:        this.padding.right +'px'
            });

            setstyle(this.scroll_y, {
                // marginTop:          (this.padding.top + px(styles.marginTop)) +'px',
                // marginBottom:       (this.padding.bottom + px(styles.marginBottom)) +'px'
                marginTop:          this.padding.top +'px',
                marginBottom:       this.padding.bottom +'px'
            });

            this.event();
            this.resize();

            this.inited = true;
            return this;
        },
        //
        event() {
            let _this = this;
            this.wheelevent();
            this.dragevent(this.block_x);
            this.dragevent(this.block_y);
            Evt.on(window, 'resize', (evt) => {
                this.resize();
            });
            Evt.onresize(this.container, (evt) => {
                this.resize();
            });
            // Evt.on(this.wrapper, 'mouseenter', (evt) => {
            //     this.resize();
            // });
            // Evt.on(this.wrapper, 'mouseleave', (evt) => {
            //     this.resize();
            // });
            Evt.on(this.scroll_x, 'mouseover', (evt) => {
                addclass(this.scroll_x, 'active');
                setstyle(this.scroll_x, { zIndex: '2' });
            });
            Evt.on(this.scroll_y, 'mouseover', (evt) => {
                addclass(this.scroll_y, 'active');
                setstyle(this.scroll_y, { zIndex: '2' });
            });
            Evt.on(this.scroll_x, 'mouseleave', (evt) => {
                if( !this.locked_x ) {
                    removeclass(this.scroll_x, 'active');
                    setstyle(this.scroll_x, { zIndex: '1' });
                }
            });
            Evt.on(this.scroll_y, 'mouseleave', (evt) => {
                if( !this.locked_y ) {
                    removeclass(this.scroll_y, 'active');
                    setstyle(this.scroll_y, { zIndex: '1' });
                }
            });
            Evt.on(this.scroll_x, 'selectstart', (evt) => {
                return false;
            });
            Evt.on(this.scroll_y, 'selectstart', (evt) => {
                return false;
            });
        },
        //
        wheelevent() {
            MouseWheel(this.target, (evt, delta) => {
                // this.resize();
                if (!evt.shiftKey) {
                    let t, curtop, stepsize, mintop, maxtop, maxscroll, scrolltop, todown, toup;
                    curtop = this.block_y.offsetTop;
                    stepsize = Math.ceil(this.block_y.offsetHeight * this.setting.wheelspeed);
                    mintop = 0;
                    maxtop = this.wrapper.offsetHeight - this.block_y.offsetHeight;
                    maxscroll = this.size.content_height - this.wrapper.offsetHeight;
                    todown = delta < 0 && curtop < maxtop;          //向下
                    toup = 0 < delta && mintop < curtop;            //向上
                    if (todown || toup) {
                        t = this.block_y.offsetTop - delta * stepsize;
                        t = mintop <= t ? t : mintop;
                        t = t <= maxtop ? t : maxtop;
                        setstyle(this.block_y, { top: t+'px' });

                        scrolltop = t * maxscroll / maxtop;
                        this.wrapper.scrollTop = scrolltop;

                        if (!(mintop === t || t === maxtop)) {
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                    }
                } else {
                    let l, curleft, stepsize, minleft, maxleft, maxscroll, scrollleft, toleft, toright;
                    curleft = this.block_x.offsetLeft;
                    stepsize = Math.ceil(this.block_x.offsetWidth * this.setting.wheelspeed);
                    minleft = 0;
                    maxleft = this.wrapper.offsetWidth - this.block_x.offsetWidth;
                    maxscroll = this.size.content_width - this.wrapper.offsetWidth;
                    toleft = delta < 0 && curleft < maxleft;            //向左
                    toright = 0 < delta && minleft < curleft;           //向右
                    if (toleft || toright) {
                        l = this.block_x.offsetLeft - delta * stepsize;
                        l = minleft <= l ? l : minleft;
                        l = l <= maxleft ? l : maxleft;
                        setstyle(this.block_x, { left: l+'px' });

                        scrollleft = l * maxscroll / maxleft;
                        this.wrapper.scrollLeft = scrollleft;

                        if (!(minleft === l || l === maxleft)) {
                            evt.stopPropagation();
                            evt.preventDefault();
                        }
                    }
                }
            });
        },
        //
        dragevent(elem, locked) {
            let _this, isvertical, starttop, startleft, start, end, range, dist, t, l, scroll;
            _this = this;
            isvertical = this.block_y === elem;
            start = { x: 0, y: 0 };
            end = { x: 0, y: 0 };
            range = { minleft: 0, maxleft: 0, mintop: 0, maxtop: 0 };
            dist = { minx: 0, maxx: 0, miny:0, maxy:0, x: 0, y: 0 };
            scroll = { max: 0, top: 0, left: 0 };
            // to = { up: false, down: false, left: false, right: false };

            let dragstart, dragmove, dragend;
            dragstart = function(evt) {
                _this.resize();
                if (isvertical) {
                    _this.locked_y = true;
                    starttop = elem.offsetTop;
                    start.y = evt.clientY;
                    dist.maxy = _this.wrapper.offsetHeight - _this.block_y.offsetHeight - _this.block_y.offsetTop;
                    range.maxtop = _this.wrapper.offsetHeight - _this.block_y.offsetHeight;
                    scroll.max = _this.size.content_height - _this.wrapper.offsetHeight;

                } else {
                    _this.locked_x = true;
                    startleft = elem.offsetLeft;
                    start.x = evt.clientX;
                    dist.maxx = _this.wrapper.offsetWidth - _this.block_x.offsetWidth - _this.block_x.offsetLeft;
                    range.maxleft = _this.wrapper.offsetWidth - _this.block_x.offsetWidth;
                    scroll.max = _this.size.content_width - _this.wrapper.offsetWidth;

                }

                if( elem.setCapture ) {                     //设置鼠标捕获
                    elem.setCapture();
                } else {
                    evt.preventDefault();                   //阻止默认动作
                }

                Evt.on(document, 'mousemove', dragmove);
                Evt.on(document, 'mouseup', dragend);

                // console.log('start');
            };
            dragmove = function(evt) {
                if (isvertical) {
                    if (!_this.locked_y) {
                        return;
                    }

                    end.y = evt.clientY;
                    dist.y = end.y - start.y;

                    t = starttop + dist.y;
                    t = range.mintop <= t ? t : range.mintop;
                    t = t <= range.maxtop ? t : range.maxtop;
                    setstyle(_this.block_y, { top: t+'px' });

                    scroll.top = t * scroll.max / range.maxtop;
                    _this.wrapper.scrollTop = scroll.top;

                } else {
                    if (!_this.locked_x) {
                        return;
                    }

                    end.x = evt.clientX;
                    dist.x = end.x - start.x;

                    l = startleft + dist.x;
                    l = range.minleft <= l ? l : range.minleft;
                    l = l <= range.maxleft ? l : range.maxleft;
                    setstyle(_this.block_x, { left: l+'px' });

                    scroll.left = l * scroll.max / range.maxleft;
                    _this.wrapper.scrollLeft = scroll.left;
                }

                // console.log('mousemove');
            };
            dragend = function(evt) {
                if( isvertical ) {
                    _this.locked_y = false;
                    removeclass(_this.scroll_y, 'active');
                    setstyle(_this.scroll_y, { zIndex: '1' });
                } else {
                    _this.locked_x = false;
                    removeclass(_this.scroll_x, 'active');
                    setstyle(_this.scroll_x, { zIndex: '1' });
                }

                if( elem.releaseCapture ) {                 //设置鼠标捕获
                    elem.releaseCapture();
                }

                Evt.off(document, 'mousemove', dragmove);
                Evt.off(document, 'mouseup', dragend);

                // console.log('end');
            };

            Evt.on(elem, 'mousedown', dragstart);
        },
        //
        getcontentsize() {
            let styles;
            styles = getstyle(this.wrapper);
            this.size.content_width = this.wrapper.scrollWidth;// + px(styles.marginLeft) + px(styles.marginRight);
            this.size.content_height = this.wrapper.scrollHeight;// + px(styles.marginTop) + px(styles.marginBottom);
        },
        //
        resize() {
            this.getcontentsize();
            setstyle(this.block_x, { width: Math.pow(this.wrapper.offsetWidth, 2) / this.size.content_width + 'px' });
            setstyle(this.block_y, { height: Math.pow(this.wrapper.offsetHeight, 2) / this.size.content_height + 'px' });

            // this.setting.xbar  = this.size.content_width > this.wrapper.clientWidth ? true : false;
            // this.setting.ybar = this.size.content_height > this.wrapper.clientHidth ? true : false;
            if( this.setting.xbar && this.size.content_width > this.wrapper.clientWidth ) {
                setstyle(this.scroll_x, { display: 'block' });
            } else {
                setstyle(this.scroll_x, { display: 'none' });
            }

            // this.getcontentsize();
            if( this.setting.ybar && this.size.content_height > this.wrapper.clientHeight ) {
                setstyle(this.scroll_y, { display: 'block' });
            } else {
                setstyle(this.scroll_y, { display: 'none' });
            }
            // debugger;
        }
    };

    return XScroll;
})();

XScroll.install = function(Vue, options) {
    /*Vue.directive('changebind', {
        inserted(elem, binding, vnode, oldVnode) {
            // debugger;
            // new XScroll(elem, binding.value).init();
            // new XScroll(el, binding.value);
        },
        update(elem, binding, vnode, oldVnode) {
            debugger;
            XScroll.get(elem).resize();
            // new XScroll(el, binding.value);
        },
        componentUpdated(elem, binding, vnode, oldVnode) {
            debugger;
            XScroll.get(elem).resize();
            // let xscroll = XScroll.get( elem );
            // xscroll.resize();
        }
    });*/

    Vue.component('x-scroll', {
        props: {},
        template: `
            <div ref="target" class="xscroll">
                <div ref="wrapper" class="xscroll-wrapper">
                    <div ref="container" class="xscroll-container">
                        <slot></slot>
                    </div>
                </div>
                <div ref="scroll_x" class="xscroll-bar xscroll-x">
                    <div ref="block_x" class="xscroll-block"></div>
                </div>
                <div ref="scroll_y" class="xscroll-bar xscroll-y">
                    <div ref="block_y" class="xscroll-block"></div>
                </div>
            </div>
        `,
        data() {
            return {
                xscroll: null
            };
        },
        mounted() {
            this.xscroll = new XScroll( this.$refs.target );
            // this.xscroll.target = this.$refs.target;
            this.xscroll.wrapper = this.$refs.wrapper;
            this.xscroll.container = this.$refs.container;
            this.xscroll.scroll_x = this.$refs.scroll_x;
            this.xscroll.scroll_y = this.$refs.scroll_y;
            this.xscroll.block_x = this.$refs.block_x;
            this.xscroll.block_y = this.$refs.block_y;
            this.xscroll.init();
            // this.$refs;
        }
    });
};

export default XScroll;