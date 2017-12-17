import Api                      from '_JS_/api.js';
import Prefix                   from './css-prefix.js';

//字体图标
function makeiconfont ( fontsize, fontfamily ) {
    return `
        font-family: ${fontfamily} !important;
        font-size: ${fontsize}px;
        font-style: normal;
        -webkit-font-smoothing: antialiased;
        // -webkit-text-stroke-width: 0.2px;
        -moz-osx-font-smoothing: grayscale;
    `;
}

const comm = {
    //字体大小
    font_size(state, rem) {
        return Prefix.font_size(state, rem );
    },
    //清除浮动
    clearfix(state, classes) {
        classes = Array.prototype.slice.call(arguments, 1);
        let arrbefore = [], arrafter = [];
        Api.each(classes, (classname, idx)=>{
            arrbefore.push(classname +'::before');
            arrafter.push(classname +'::after');
        });
        return `
            ${arrbefore.concat(arrafter).join(',')} {
                content: " ";
                display: table;
            }
            ${arrafter.join(',')} {
                clear: both;
            }
            ${classes} {
                *zoom: 1;
            }
        `;
    },
    //文字溢出处理
    text_overflow(state) {
        return `
            white-space: nowrap;
            text-overflow: ellipsis;
        `;
    },
    //消除inline-block 空白间隔（父元素使用）
    inlineblock_clearspace(state) {
        return `
            font-size: 0;
            white-space: nowrap;
        `;
    },
    iconfont( state, content, fontsize, fontfamily ) {
        fontsize = fontsize || 'inherit';
        fontfamily = fontfamily || state.data.basic.fontfamily.icon;
        return `
            ${makeiconfont( fontsize, fontfamily )}
            content: ${content};
        `;
    }
};

export default comm;


