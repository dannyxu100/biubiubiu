const prefix = {
    font_size(state, rem) {
        let basic = state.data.basic;
        return `font-size: ${rem/basic.rem2px}px; font-size: ${rem};`;
    },
    box_sizing(state, mode) {
        mode = mode || 'border-box';
        return `-webkit-box-sizing: ${mode};
            -moz-box-sizing: ${mode};
            box-sizing: ${mode};`;
    },
    border_radius(state, angle) {
        return `
            -moz-border-radius: ${angle};
            -webkit-border-radius: ${angle};
            border-radius: ${angle};
        `;
    }
};
export default prefix;
