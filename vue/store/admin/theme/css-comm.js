import Prefix                       from './css-prefix.js';

const comm = {
    font_size(state, rem) {
        return Prefix.font_size(state, rem );
    },
    clearfix(state, classname) {
        return `
            ${classname}::before,
            ${classname}::after {
                content: " ";
                display: table;
            }
            ${classname}::after {
                clear: both;
            }
            ${classname} {
                *zoom: 1;
            }
        `;
    }
};

export default comm;


