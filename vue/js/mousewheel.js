import Evt          from '../js/evt.js';


const MouseWheel = (function() {
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

export default MouseWheel;