const prefix = {
    //字体大小
    font_size(state, rem) {
        let basic = state.data.basic;
        return `font-size: ${rem/basic.rem2px}px; font-size: ${rem};`;
    },
    //边距和边框都将在已设定的宽度和高度内进行绘制
    box_sizing(state, mode) {
        mode = mode || 'border-box';
        return `
            -webkit-box-sizing: ${mode};
            -moz-box-sizing: ${mode};
            box-sizing: ${mode};
        `;
    },
    //圆角边框
    border_radius(state, angle) {
        return `
            -moz-border-radius: ${angle};
            -webkit-border-radius: ${angle};
            border-radius: ${angle};
        `;
    },
    //过渡
    transition(state, opt) {
        opt = opt || 'all linear .15s';
        return `
            -webkit-transition: ${opt};
            -ms-transition: ${opt};
            -moz-transition: ${opt};
            transition: ${opt};
        `;
    },
    //半透明
    opacity(state, percent) {
        let percent4ie = percent*100;
        return `
            -moz-opacity: ${percent};
            -khtml-opacity: ${percent};
            opacity: ${percent};
            /*for IE*/
            filter: ~"Alpha(Opacity=${percent4ie})";
        `;
    },
    //文本选取
    // none：文本不能被选择
    // text：可以选择文本
    // all：当所有内容作为一个整体时可以被选择。如果双击或者在上下文上点击子元素，那么被选择的部分将是以该子元素向上回溯的最高祖先元素。
    // element：可以选择文本，但选择范围受元素边界的约束
    // IE6-9不支持该属性，但支持使用标签属性 onselectstart="return false;" 来达到 user-select:none 的效果；
    user_select(state, mode) {
        mode = mode || 'none';
        return `
            -webkit-user-select: ${mode};
            -moz-user-select: ${mode};
            -ms-user-select: ${mode};
            user-select: ${mode};
        `;
    },
    //tab键切换焦点
    outline(state) {
        return `
            /*Default*/
            outline: thin dotted;
            /*WebKit*/
            outline: 2px auto -webkit-focus-ring-color;
            outline-offset: -2px;

            outline: none;
        `;
    },
    //投影
    // Drop shadows
    //
    // Note: Deprecated `.box-shadow()` as of v3.1.0 since all of Bootstrap's
    // supported browsers that have box shadow capabilities now support it.
    box_shadow(state, shadow) {
        return `
            -webkit-box-shadow: ${shadow};    /*iOS <4.3 & Android <4.1*/
            -ms-box-shadow: ${shadow};        /*IE11*/
            -moz-box-shadow: ${shadow};       /*firefox*/
            box-shadow: ${shadow};
        `;
    },
    //CSS逐帧动画
    keyframes (state, name, frames) {
        return `
            @-webkit-keyframes ${name} { ${frames}(); }
            @-moz-keyframes ${name} { ${frames}(); }
            @-ms-keyframes ${name} { ${frames}();}
            @-o-keyframes ${name} { ${frames}(); }
            @keyframes ${name} { ${frames}(); }
        `;
    },
    //CSS形变动画
    transform(state, attr) {
        return `
            -webkit-transform: ${attr};
            -moz-transform: ${attr};
            -o-transform: ${attr};
            -ms-transform: ${attr};
            transform: ${attr};
        `;
    },
    //CSS形变动画原地
    transform_origin(state, attr) {
        return `
            -webkit-transform-origin: ${attr};
            -moz-transform-origin: ${attr};
            -o-transform-origin: ${attr};
            -ms-transform-origin: ${attr};
            transform-origin: ${attr};
        `;
    },
    //CSS动画
    animation(state, attr){
        return `
            -webkit-animation: ${attr};
            -moz-animation: ${attr};
            -ms-animation: ${attr};
            -o-animation: ${attr};
            animation: ${attr};
        `;
    },
    //线性渐变背景
    gradient(state, opt){
        opt = opt || 'top, rgb(255,255,255), rgb(0,0,255)';
        return `
            background: -webkit-linear-gradient(${opt});
            background: -moz-linear-gradient(${opt});
            background: -o-linear-gradient(${opt});
            background: linear-gradient(${opt});
        `;
    },
    //镜像渐变背景
    gradient_radial(state, positionorangle, shapeorsize, color1, color2, color3 ) {
        positionorangle = positionorangle || 'bottom left';
        shapeorsize = shapeorsize || 'circle';
        color1 = color1 || '#000000';
        color2 = color2 || '#d2f726';
        color3 = color3 || '#dd2222';
        return `
            background: -moz-radial-gradient(${positionorangle}, ${shapeorsize}, ${color1}, ${color2}, ${color3});
            background: -webkit-radial-gradient(${positionorangle}, ${shapeorsize}, ${color1}, ${color2}, ${color3});
        `;
    }
};
export default prefix;
