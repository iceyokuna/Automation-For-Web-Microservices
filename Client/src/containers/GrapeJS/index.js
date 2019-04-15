import React, { Component, Fragment } from 'react'

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
      fromElement: true,
      height: '100%',
    });

    this.panelManager = this.editor.Panels;
    this.setDefaultComponentTheme();
    this.allowEditingCode();
    this.setProperties();
    this.listenToEvents();
    this.loadExistingForm();
  }

  loadExistingForm = () => {
    const { initialForm } = this.props;
    if (initialForm != null) {
      const { editor } = this;
      editor.setComponents(initialForm.formHtml);
      editor.setStyle(initialForm.formCss);
    } else {
      const { editor } = this;
      editor.setComponents("");
      editor.setStyle("");
    }
  }


  allowEditingCode() {
    const { editor } = this;
    var pfx = editor.getConfig().stylePrefix;
    var modal = editor.Modal;
    var cmdm = editor.Commands;
    var codeViewer = editor.CodeManager.getViewer('CodeMirror').clone();
    var pnm = editor.Panels;
    var container = document.createElement('div');
    var btnEdit = document.createElement('button');

    codeViewer.set({
      codeName: 'htmlmixed',
      readOnly: 0,
      theme: 'hopscotch',
      autoBeautify: true,
      autoCloseTags: true,
      autoCloseBrackets: true,
      lineWrapping: true,
      styleActiveLine: true,
      smartIndent: true,
      indentWithTabs: true
    });

    btnEdit.innerHTML = 'Save';
    btnEdit.className = pfx + 'btn-prim ' + pfx + 'btn-import';
    btnEdit.onclick = function () {
      var code = codeViewer.editor.getValue();
      editor.DomComponents.getWrapper().set('content', '');
      editor.setComponents(code.trim());
      modal.close();
    };

    cmdm.add('html-edit', {
      run: function (editor, sender) {
        sender && sender.set('active', 0);
        var viewer = codeViewer.editor;
        modal.setTitle('Edit code');
        if (!viewer) {
          var txtarea = document.createElement('textarea');
          container.appendChild(txtarea);
          container.appendChild(btnEdit);
          codeViewer.init(txtarea);
          viewer = codeViewer.editor;
        }
        var InnerHtml = editor.getHtml();
        var Css = editor.getCss();
        modal.setContent('');
        modal.setContent(container);
        codeViewer.setContent(InnerHtml + "<style>" + Css + '</style>');
        modal.open();
        viewer.refresh();
      }
    });

    pnm.addButton('options',
      [
        {
          id: 'edit',
          className: 'fa fa-edit',
          command: 'html-edit',
          attributes: {
            title: 'Edit'
          }
        }
      ]
    );
  }

  exportToHTMLCSS() {
    // Add javascript to the form
    // this.editor.addComponents('<script>alert(2)</script>');
    // const options = this.panelManager.getPanel('commands');
    const formHtml = this.editor.getHtml(), formCss = this.editor.getCss();
    this.props.onExportForm({ formHtml, formCss });
  }

  listenToEvents() {
    // Create save form button
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

    // Binding event for updating attributes
    this.editor.on('component:update:attributes', (event) => {
      // Handle attributes change
      const changedAttributes = event.changed.attributes;
      const previousAttributes = event._previousAttributes.attributes;
      const changedId = changedAttributes.id;
      console.log(changedAttributes);
      console.log(previousAttributes);
      if (changedId !== '') {
        this.props.onSetElementId(changedId, true);
      }
     if (changedAttributes.id != previousAttributes.id) {
        console.log("Not equal")
        this.props.onSetElementId(previousAttributes.id, false);
      }
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
  }

  setProperties = () => {
    const domComps = this.editor.DomComponents;
    const dType = domComps.getType('default');
    const dModel = dType.model;
    const dView = dType.view;

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

    domComps.addType('textarea', {
      model: dModel.extend({
        defaults: Object.assign({}, dModel.prototype.defaults, {
          traits: [
            // strings are automatically converted to text types
            'id',
            'name',
            'placeholder',
            {
              type: 'checkbox',
              label: 'Required',
              name: 'required',
            }],
        }),
      }, {
          isComponent: function (el) {
            if (el.tagName === 'TEXTAREA') {
              return { type: 'textarea' };
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

  }


  render() {
    return (
      <div style={{ height: '100%', }}>
        <div id="gjs" />
      </div>
    )
  }
}
