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
      storageManager: { type: null },
      fromElement: true,
      height: '100%'
    });

    this.panelManager = this.editor.Panels;
    this.setDefaultComponentTheme();
    this.listenToEvents();

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

  listenToEvents() {

    this.editor.on('component:update:attributes', (arg) => {
      console.log(arg)
    })
  }


  setDefaultComponentTheme() {
    const cssComposer = this.editor.CssComposer;
    const sm = this.editor.SelectorManager;

    const button = sm.add('button'), buttonRule = cssComposer.add([button]);
    const form = sm.add('form'), formRule = cssComposer.add([form]);;
    const textArea = sm.add('textarea'), textAreaRule = cssComposer.add([textArea]);
    const select = sm.add('select'), selectRule = cssComposer.add([select]);
    const input = sm.add('input'), inputRule = cssComposer.add([input]);
    const label = sm.add('label'), labelRule = cssComposer.add([label]);

    let domComps = this.editor.DomComponents;
    let dType = domComps.getType('default');
    let dModel = dType.model;
    let dView = dType.view;

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

    domComps.addType('input', {
      model: dModel.extend({
        defaults: Object.assign({}, dModel.prototype.defaults, {
          traits: [
            // strings are automatically converted to text types
            'id',
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

    // Need to remove previous and drag a new one => the custom attribute will show up

    domComps.addType('button', {
      model: dModel.extend({
        defaults: Object.assign({}, dModel.prototype.defaults, {
          traits: [
            // strings are automatically converted to text types
            'id',
          ],
        }),
      }, {
          isComponent: function (el) {
            if (el.tagName === 'BUTTON') {
              return { type: 'button' };
            }
          },
        }),

      view: dView,
    });

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

  render() {
    return (

      <div style={{ height: '100%', }}>
        <div id="gjs" >
        </div>
      </div>
    )
  }
}
