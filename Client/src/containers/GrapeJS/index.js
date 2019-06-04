import React, { Component, Fragment, } from 'react'

import grapesjs from 'grapesjs';
import presetWebpage from 'grapesjs-preset-webpage';
import customCodePlugin from 'grapesjs-custom-code'

import 'grapesjs/dist/css/grapes.min.css';
// import 'grapesjs-preset-webpage/dist/grapesjs-preset-webpage.min.css';

import $ from 'jquery';
import ReactDOMServer from 'react-dom/server';
import styles from './style';

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
    this.allowEditingCode();
    this.setProperties();
    this.listenToEvents();
    this.loadExistingForm();
    this.setDefaultComponentTheme();
  }

  loadExistingForm = () => {
    const { initialForm, elementsIdSet } = this.props;

    if (initialForm != null && initialForm.formHtml !== "") {
      const { editor } = this;
      editor.setComponents(initialForm.formHtml);
      editor.setStyle(initialForm.formCss);
    } else {
      // create initial forms according to service interface
      if (this.props.formType === "inputFormNoService") {
        const { taskId } = this.props;
        this.editor.setComponents(`<div>This is a form of ${taskId}</div>`);
      }
      else if (this.props.service != null) {
        const html = this.createFormsByElementIds();
        this.editor.setComponents(html);
      }
    }
  }

  createFormsByElementIds() {
    const { service, formType, onSetElementId } = this.props;
    let typeOfForm, interfaceData = null;

    if (formType === "inputForm") {
      typeOfForm = "Input form";
      interfaceData = service.method.input_interface;
    } else if (formType === "outputForm") {
      typeOfForm = "Output form";
      interfaceData = service.method.output_interface;
    }

    const elements = [];
    const keys = Object.keys(interfaceData);

    keys.forEach((key, index) => {
      onSetElementId(key, true);
      const data = interfaceData[key];
      const { elementType } = data;

      switch (elementType) {
        case "TextInput": {
          elements.push(
            <Fragment>
              <label>{key.toUpperCase()}</label>
              <input id={key} style={styles.textinput}
                placeholder={`Type your ${key}`} />
            </Fragment>
          );
        } break;
        case "TextArea": {
          elements.push(
            <Fragment>
              <label>{key.toUpperCase()}</label>
              <textarea id={key} style={styles.textarea}
                placeholder={`Type your ${key}`} />
            </Fragment>
          );
        } break;

        default:
          break;
      }
    })

    const html = ReactDOMServer.renderToString(
      <div style={{ padding: 10 }}>
        {elements}
      </div>
    );

    return html;
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
    const formHtml = this.editor.getHtml(),
      formCss = this.editor.getCss(),
      formJs = this.editor.getJs();
    this.props.onExportForm({ formHtml, formCss, formJs });
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
      if (changedId !== '') {
        this.props.onSetElementId(changedId, true);
      }
      if (changedAttributes.id !== previousAttributes.id) {
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

    buttonRule.set('style', styles.button);
    formRule.set('style', styles.form)
    textAreaRule.set('style', styles.textarea);
    selectRule.set('style', styles.select)
    inputRule.set('style', styles.textinput)
    labelRule.set('style', styles.label)
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
