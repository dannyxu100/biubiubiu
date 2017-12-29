import Vue                      from 'vue';
import MT                       from './mutations-types.js';
import Prefix                   from './css-prefix.js';
import Comm                     from './css-comm.js';

export default {
    [MT.CSS_MASK]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                  mask

            ====================================================*/
            .${namespace}mask {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: ${basic.mask.zindex};
                background-color: ${basic.mask.bgcolor};
                ${Prefix.opacity(state, 0.25)};
            }
        `;
    },
    [MT.CSS_DLG]( state ) {
        let basic, namespace;
        basic = state.data.basic;
        namespace = basic.namespace;
        state.data.csstext += `
            /*====================================================

                  dlg

            ====================================================*/
            .${namespace}dlg {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: ${basic.dlg.zindex.def};
                overflow-x: hidden;
                overflow-y: auto;
            }
            .${namespace}dlg > .${namespace}mask {
                position: absolute;
                z-index: ${basic.dlg.zindex.mask};
            }
            .${namespace}dlg .${namespace}dlg-container {
                position: relative;
                width: 60%;
                margin: 10% auto;
                background-color: ${basic.dlg.bgcolor};
                z-index: ${basic.dlg.zindex.wrapper};
                ${Prefix.border_radius(state, basic.dlg.radius)}
                ${Prefix.box_shadow(state, basic.dlg.shadow)}
            }
            .${namespace}dlg .${namespace}dlg-container .${namespace}dlg-head,
            .${namespace}dlg .${namespace}dlg-container .${namespace}dlg-foot {
                position: relative;
            }
            ${Comm.clearfix(
                state,
                '.${namespace}dlg .${namespace}dlg-container .${namespace}dlg-head',
                '.${namespace}dlg .${namespace}dlg-container .${namespace}dlg-foot'
            )}
            .${namespace}dlg .${namespace}dlg-container .${namespace}dlg-head {
                min-height: ${basic.dlg.head.minheight}px;
                padding: ${basic.dlg.head.padding.top}px ${basic.dlg.head.padding.right}px ${basic.dlg.head.padding.bottom}px ${basic.dlg.head.padding.right}px;
                border-bottom: ${basic.dlg.head.borderwidth}px solid ${basic.dlg.head.bordercolor};
            }
            .${namespace}dlg .${namespace}dlg-container .${namespace}dlg-head .${namespace}dlg-title {
                position: relative;
                z-index: ${basic.dlg.title.zindex};
                color: ${basic.dlg.title.color};
                font-size: ${basic.dlg.title.fontsize}em;
                font-weight: ${basic.dlg.title.fontweight};
                padding-right: ${basic.dlg.close.width}px;
                overflow: hidden;
                ${Comm.text_overflow(state)}
            }
            .${namespace}dlg .${namespace}dlg-container .${namespace}dlg-head .${namespace}dlg-close {
                position: absolute;
                z-index: ${basic.dlg.close.zindex};
                top: 0;
                right: 0;
                width: ${basic.dlg.close.width}px;
                height: ${basic.dlg.close.height}px;
                padding: ${basic.dlg.close.padding.top}px ${basic.dlg.close.padding.right}px ${basic.dlg.close.padding.bottom}px ${basic.dlg.close.padding.right}px;
                margin: 0;
                border: none;
                background: none;
                cursor: ${basic.cursor.pointer};
            }
            .${namespace}dlg .${namespace}dlg-container .${namespace}dlg-head .${namespace}dlg-close,
            .${namespace}dlg .${namespace}dlg-container .${namespace}dlg-head .${namespace}dlg-close:focus {
                ${Prefix.outline(state)}
            }
            .${namespace}dlg .${namespace}dlg-container .${namespace}dlg-head .${namespace}dlg-close:after {
                display: block;
                height: ${basic.dlg.close.height}px;
                line-height: ${basic.dlg.close.height}px;
                color: ${basic.dlg.close.color.def};
                text-align: center;
                ${Comm.iconfont(state, basic.dlg.close.icon)}
                ${Prefix.transition(state)}
            }
            .${namespace}dlg .${namespace}dlg-container .${namespace}dlg-head .${namespace}dlg-close:hover:after {
                color: ${basic.dlg.close.color.hover};
                ${Prefix.transform(state, 'rotate(-90deg) scale(1.2)')}
            }
            .${namespace}dlg .${namespace}dlg-container .${namespace}dlg-foot {
                min-height: ${basic.dlg.foot.minheight}px;
                padding: ${basic.dlg.foot.padding.top}px ${basic.dlg.foot.padding.right}px ${basic.dlg.foot.padding.bottom}px ${basic.dlg.foot.padding.right}px;
                border-top: ${basic.dlg.foot.borderwidth}px solid ${basic.dlg.foot.bordercolor};
            }
            .${namespace}dlg .${namespace}dlg-container .${namespace}dlg-body {
                min-height: ${basic.dlg.body.minheight}px;
                padding: ${basic.dlg.body.padding.top}px ${basic.dlg.body.padding.right}px ${basic.dlg.body.padding.bottom}px ${basic.dlg.body.padding.right}px;
            }
            .${namespace}dlg-nomask > .${namespace}mask {
                display: none;
            }
            .${namespace}dlg-nomask .${namespace}dlg-container {
                border: 1px solid rgba(150,150,150, .2);
            }
            .${namespace}dlg-alert .${namespace}dlg-container {
                padding: 15px;
            }
            .${namespace}dlg-alert .${namespace}dlg-container .${namespace}dlg-body {
                padding-bottom: 30px;
            }
            .${namespace}dlg-alert .${namespace}dlg-container .${namespace}dlg-foot {
                min-height: auto;
                border: none;
                padding: 0px;
            }
            .${namespace}dlg-alert .${namespace}dlg-container .${namespace}dlg-foot .${namespace}dlg-ok {
                width: 100%;
            }
            .${namespace}dlg-confirm .${namespace}dlg-container,
            .${namespace}dlg-prompt .${namespace}dlg-container {
                padding: 15px;
            }
            .${namespace}dlg-confirm .${namespace}dlg-container .${namespace}dlg-body,
            .${namespace}dlg-prompt .${namespace}dlg-container .${namespace}dlg-body {
                padding-bottom: 30px;
            }
            .${namespace}dlg-confirm .${namespace}dlg-container .${namespace}dlg-foot,
            .${namespace}dlg-prompt .${namespace}dlg-container .${namespace}dlg-foot {
                min-height: auto;
                border: none;
                padding: 0px;
                ${Comm.inlineblock_clearspace(state)}
            }
            .${namespace}dlg-confirm .${namespace}dlg-container .${namespace}dlg-foot .${namespace}dlg-cancel,
            .${namespace}dlg-prompt .${namespace}dlg-container .${namespace}dlg-foot .${namespace}dlg-cancel,
            .${namespace}dlg-confirm .${namespace}dlg-container .${namespace}dlg-foot .${namespace}dlg-yes,
            .${namespace}dlg-prompt .${namespace}dlg-container .${namespace}dlg-foot .${namespace}dlg-yes {
                width: 50%;
                padding-left: 0;
                padding-right: 0;
            }
            .${namespace}dlg-confirm .${namespace}dlg-container .${namespace}dlg-foot .${namespace}dlg-cancel,
            .${namespace}dlg-prompt .${namespace}dlg-container .${namespace}dlg-foot .${namespace}dlg-cancel {
                ${Prefix.border_radius(state, basic.btn.radius +'em 0 0 '+ basic.btn.radius +'em')}
            }
            .${namespace}dlg-confirm .${namespace}dlg-container .${namespace}dlg-foot .${namespace}dlg-yes,
            .${namespace}dlg-prompt .${namespace}dlg-container .${namespace}dlg-foot .${namespace}dlg-yes {
                margin-left: -1px;
                ${Prefix.border_radius(state, '0 '+ basic.btn.radius +'em '+ basic.btn.radius +'em 0')}
            }
            .${namespace}dlg-prompt .${namespace}dlg-container {
                padding: 0px;
            }
            .${namespace}dlg-prompt .${namespace}dlg-container .${namespace}dlg-body {
                padding: 15px;
                padding-top: 30px;
                padding-bottom: 0;
            }
            .${namespace}dlg-prompt .${namespace}dlg-container .${namespace}dlg-body .${namespace}dlg-label {
                display: block;
                padding: 0px 5px;
                margin-bottom: 5px;
            }
            .${namespace}dlg-prompt .${namespace}dlg-container .${namespace}dlg-body .${namespace}dlg-input,
            .${namespace}dlg-prompt .${namespace}dlg-container .${namespace}dlg-body .${namespace}dlg-textarea {
                margin-bottom: 10px;
            }
            .${namespace}dlg-prompt .${namespace}dlg-container .${namespace}dlg-foot {
                padding: 15px;
            }
        `;
    }
};


