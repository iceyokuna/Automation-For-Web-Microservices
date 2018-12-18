import React, { Component } from 'react'

import grapesjs from 'grapesjs';
import presetWebpage from 'grapesjs-preset-webpage';
import customCodePlugin from 'grapesjs-custom-code'

import 'grapesjs/dist/css/grapes.min.css';
// import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';

import { global } from 'style';

export default class GrapeJSWrapper extends Component {
  componentDidMount = () => {

    this.editor = grapesjs.init({
      container: '#gjs',
      plugins: [presetWebpage, customCodePlugin],
      pluginsOpts: {
        'gjs-preset-webpage': {
          // options
        }
      },
      allowScripts: 1,
      height: '100%'
    });

    this.panelManager = this.editor.Panels;

    const cssComposer = this.editor.CssComposer;
    const sm = this.editor.SelectorManager;

    const button = sm.add('button'), buttonRule = cssComposer.add([button]);
    const form = sm.add('form'), formRule = cssComposer.add([form]);;
    const textArea = sm.add('textarea'), textAreaRule = cssComposer.add([textArea]);
    const select = sm.add('select'), selectRule = cssComposer.add([select]);
    const input = sm.add('input'), inputRule = cssComposer.add([input]);
    const label = sm.add('label'), labelRule = cssComposer.add([label]);

    var domComps = this.editor.DomComponents;
    var dType = domComps.getType('default');
    var dModel = dType.model;
    var dView = dType.view;

    domComps.addType('input', {
      model: dModel.extend({
        defaults: Object.assign({}, dModel.prototype.defaults, {
          traits: [
            // strings are automatically converted to text types
            'name',
            'placeholder',
            {
              type: 'select',
              label: 'Type',
              name: 'type',
              options: [
                { value: 'text', name: 'Text' },
                { value: 'email', name: 'Email' },
                { value: 'password', name: 'Password' },
                { value: 'number', name: 'Number' },
              ]
            }, {
              type: 'checkbox',
              label: 'Required',
              name: 'required',
            }],
        }),
      }, {
          isComponent: function (el) {
            if (el.tagName === 'INPUT') {
              return { type: 'input' };
            }
          },
        }),

      view: dView,
    });


    // const buttonProps = Object.assign({}, dModel.prototype.defaults);

    // // console.log(buttonProps)

    // // var originalButton = domComps.getType('button');

    // buttonProps.traits = [...buttonProps.traits,
    //   'id',
    //   'text',
    // {
    //   type: 'select',
    //   label: 'Type',
    //   name: 'type',
    //   options: [
    //     { value: 'submit', name: 'Submit' },
    //     { value: 'reset', name: 'Reset' },
    //     { value: 'button', name: 'Button' },
    //   ]
    // }]

    // domComps.addType('button', {
    //   model: dModel.extend({
    //     defaults: buttonProps,
    //   }, {
    //       isComponent: function (el) {
    //         if (el.tagName == 'BUTTON') {
    //           return { type: 'button' };
    //         }
    //       },
    //     }),

    //   view: dView,
    // });


    buttonRule.set('style', {
      'width': '100%',
      'margin': '15px 0',
      'background-color': global.color.green1,
      'border': 'none',
      'color': '#f6f6f6',
      'border-radius': '2px',
      'padding': '7px 10px',
      'font-size': '1em',
      'cursor': 'pointer',
    });

    formRule.set('style', {
      'border-radius': `3px`,
      'padding': `10px 15px`,
      'box-shadow': `0 1px 4px rgba(0, 0, 0, 0.3)`,
      'color': '#444444'
    })

    textAreaRule.set('style', {
      "width": "100%",
      "margin-bottom": "15px",
      "padding": "7px 10px",
      "border-radius": "2px",
      "color": "#444444",
      "background-color": "#eeeeee",
      "border": "none"
    });

    selectRule.set('style', {
      'width': '100%',
      'margin-bottom': '15px',
      'padding': '7px 10px',
      'border-radius': '2px',
      'color': '#fff',
      'background-color': '#554c57',
      'border': 'none',
      'height': '30px',
    })

    inputRule.set('style', {
      'width': '100%',
      'margin-bottom': '15px',
      'padding': '7px 10px',
      'border-radius': '2px',
      'color': '#444444',
      'background-color': '#eee',
      'border': 'none',
    })

    labelRule.set('style', {
      'width': '100%',
      'display': 'block',
    })


    this.panelManager.addButton('options',
      [
        {
          id: 'import',
          className: 'fa fa-check-circle',
          attributes: {
            title: 'Add this form to a BPMN process'
          },
          command: (editor) => {
            this.exportToHTMLCSS();
          }
        }
      ]
    );

  }

  exportToHTMLCSS() {
    // Add javascript to the form
    // this.editor.addComponents('<script>alert(2)</script>');

    // console.log(this.editor);
    // console.log(this.panelManager.getPanels());
    // const options = this.panelManager.getPanel('commands');
    const formHtml = this.editor.getHtml(), formCss = this.editor.getCss();
    this.props.onExportForm({ formHtml, formCss });
  }


  render() {
    return (

      <div style={{ height: '100%', }}>
        <div id="gjs" >
        </div>
      </div>
    )
  }
}
