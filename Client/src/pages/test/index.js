import React, { Component } from 'react'
import { ClientStyle as Style } from 'react-css-component'
import { socketActions } from 'actions'
import { connect } from 'react-redux'
import { Button } from 'grommet'

// import ServiceItem from 'components/service_item'

var ReactDOMServer = require('react-dom/server');
var HtmlToReactParser = require('html-to-react').Parser;
var htmlToReactParser = new HtmlToReactParser();

const htmlInput = `<form action="/test" method="post">
First name: <input id="firstName" type="text" name="firstname"><br>
Last name: <input id="lastname" type="text" name="lastname"><br>
<input id="submitButton" type="submit" value="Submit">
</form>`

const css = `* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
button{
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
form{
  border-radius:3px;
  padding:10px 15px;
  box-shadow:0 1px 4px rgba(0, 0, 0, 0.3);
  color:#444444;
}
textarea{
  width:100%;
  margin-bottom:15px;
  padding:7px 10px;
  border-radius:2px;
  color:#444444;
  background-color:#eeeeee;
  border:none;
}
input{
  width:100%;
  margin-bottom:15px;
  padding:7px 10px;
  border-radius:2px;
  color:#444444;
  background-color:#eee;
  border:none;
}
label{
  width:100%;
  display:block;
}
`

// var FormElement = htmlToReactParser.parse(htmlInput);
// var reactHtml = ReactDOMServer.renderToStaticMarkup(formElement);

const serviceMethods = [
  { methodName: 'Send email to a receiver' },
  { methodName: 'Send email to multiple users' },
]

class FormElement extends React.Component {
  render() {
    return <div dangerouslySetInnerHTML={{ __html: htmlInput }} />;
  }
}


class Test extends Component {


  componentDidMount = () => {
    const formContainer = document.getElementById('formContainer').children[0];



    formContainer.addEventListener('submit', this.onSubmitForm.bind(this));
  }

  onSubmitForm = (event) => {
    event.preventDefault();
    const { firstname, lastname } = event.target.elements;
    const formData = {
      firstname, lastname
    }

    const elementsWithId = document.querySelectorAll('*[id]');

    elementsWithId.forEach((item, key) => {
      console.log(item.nodeName, item.value)
    })

    this.props.dispatch(socketActions.requestNextForm(formData))


    // event.stopPropagation();
  }

  sendMessage = () => {
    this.props.dispatch(socketActions.sendMessage('Hello', 'Good morning'))
    console.log(this.refs.formContainer.children[0])
    const formContainer = this.refs.formContainer.children[0];


  }




  render() {
    return (
      <div>
        <Style css={css} />
        <div>
          test
        <div id="formContainer" ref="formContainer" dangerouslySetInnerHTML={{ __html: htmlInput }} />
        </div>
        <button onClick={() => this.sendMessage()}>Send message</button>

      </div>
    )
  }
}

export default connect(null, null)(Test);