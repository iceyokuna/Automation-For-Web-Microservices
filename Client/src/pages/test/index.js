import React, { Component } from 'react'
import { ClientStyle as Style } from 'react-css-component'
import { socketActions } from 'actions'
import { connect } from 'react-redux'
import { Button } from 'grommet'

var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;
var htmlToReactParser = new HtmlToReactParser();

const htmlInput = `<form action="/test" method="post">
First name: <input type="text" name="firstname"><br>
Last name: <input type="text" name="lastname"><br>
<input type="submit" value="Submit">
</form>`

const css = `* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
.button{
  width:100%;
  margin:15px 0;
  background-color:#009688;
  border:none;
  color:#f6f6f6;
  border-radius:2px;
  padding:7px 10px;
  font-size:1em;
  cursor:pointer;
}
.form{
  border-radius:3px;
  padding:10px 15px;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3);
  color:#444444;
}
.textarea{
  width:100%;
  margin-bottom:15px;
  padding:7px 10px;
  border-radius:2px;
  color:#444444;
  background-color:#eeeeee;
  border:none;
}
.input{
  width:100%;
  margin-bottom:15px;
  padding:7px 10px;
  border-radius:2px;
  color:#444444;
  background-color:#eee;
  border:none;
}
.label{
  width:100%;
  display:block;
}
`

// var FormElement = htmlToReactParser.parse(htmlInput);
// var reactHtml = ReactDOMServer.renderToStaticMarkup(formElement);

class FormElement extends React.Component {
  render() {
    return <div dangerouslySetInnerHTML={{ __html: htmlInput }} />;
  }
}


class Test extends Component {

  componentDidMount = () => {
    const dynamicElement = document.getElementById('dynamicElement').children[0];
    dynamicElement.addEventListener('submit', function (event) {
      alert('Element clicked through function!');

      console.log(event.target.elements)
      event.preventDefault();
      // event.stopPropagation();
    });
  }


  sendMessage = () => {
    // this.props.dispatch(socketActions.sendMessage('Hello', 'Good morning'))
    // console.log(this.refs.dynamicElement.children[0])
    // const dynamicElement = this.refs.dynamicElement.children[0];




  }




  render() {
    return (
      <div>
        <Style css={css} />
        <div>
          test
          <div id="dynamicElement" ref="dynamicElement" dangerouslySetInnerHTML={{ __html: htmlInput }} />
          {/* {formElement} */}
          {/* <FormElement /> */}

        </div>
        <button onClick={() => this.sendMessage()}>Send message</button>
      </div>
    )
  }
}

export default connect(null, null)(Test);