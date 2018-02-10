const Evt = {
    fix(event) {
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
    on(elem, name, handler, params) {
        // let wrapperHandler = handler;
        // if(params){
        //     function(){
        //     }
        // }
        if(elem.attachEvent) {
            elem.attachEvent('on'+name, handler );
        } else if (elem.addEventListener){
            elem.addEventListener(name, handler, false);
        } else {
            elem['on'+name] = handler;
        }
        return this;
    },
    off(elem, name, handler) {
        if (elem.removeEventListener) {
            elem.removeEventListener(name, handler, false);
        } else if (elem.detachEvent){
            elem.detachEvent('on'+name, handler);
        } else {
            delete elem['on'+name];
        }
        return this;
    },
    onresize(elem, handler) {
        window.addResizeListener(elem, handler);
        return this;
    },
    offresize(elem, handler) {
        window.removeResizeListener(elem, handler);
        return this;
    },
    toggle(elem /* , fn1,fn2,fn3...fnN */) {
        let fns, len, cur;
        fns = [].slice.call(arguments);
        fns = fns.slice(1);
        len = fns.length;
        cur = -1;

        Evt.on(elem, 'click', (evt)=>{
            if( len === ++cur ) {
                cur = 0;
            }
            fns[cur].call(elem, evt);
        });
        return this;
    }
};

export default Evt;