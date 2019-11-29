import React, { Component } from "react";

var DEFAULT_TEMPLATE = "Dear {Hiring Manager},\
    In my five-year career as a {Current Job}, I have \
    honed my legal research and writing skills, and \
    the attorneys I’ve worked with have complimented \
    me on my command of case law and litigation \
    support. {Company Name}’s 20 years in practice \
    proves that the firm has strong values and \
    excellent attorneys, which is why I want to be \
    a part of the {Company Name} team."

var DEFAULT_MATCHES = DEFAULT_TEMPLATE.match(/\{([^}]+)\}/g);
var DEFAULT_REPLACEMENT_LIST = {}

DEFAULT_MATCHES.forEach(function(item){
  DEFAULT_REPLACEMENT_LIST[item] = item;
});


class NameForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: DEFAULT_TEMPLATE,
      variable: "{Name}",
      variable_replacement: "",
      replacementList: DEFAULT_REPLACEMENT_LIST,
      originalText: DEFAULT_TEMPLATE//"Hello {Name} have {School} you {Town} seen {Name} {Town}"
    };
    this.handleTextArea = this.handleTextArea.bind(this);
    this.replaceText = this.replaceText.bind(this);
  }
  handleTextArea(e) {
    let value = e.target.value;
    var matches = value.match(/\{([^}]+)\}/g);
    let new_replacementList = {};
    if (matches !== null) {
      matches.forEach(function(item){
        new_replacementList[item] = item;
      });
    };


    this.setState({ text: value, originalText: value, replacementList: new_replacementList  });
  }

  replaceText(e) {
    let value = e.target.value;
    let name = e.target.name;
    let new_replacementList = this.state.replacementList;
    new_replacementList[name] = value;
    let originalText = this.state.originalText;
    Object.keys(new_replacementList).forEach(function(item){
      let regex = new RegExp(item,'g');
      originalText = originalText.replace(regex, new_replacementList[item]);
    });
    this.setState({ text: originalText, variable_replacement:value, replacementList:new_replacementList});
  }

  render() {
    let textBoxList = [];
    let replace_function = this.replaceText;
    var replacementList = this.state.replacementList;
    Object.keys(replacementList).forEach(function(item){
      let textBox = (
        <div key={item} className="replacement-input-text">
        <div class="replacement-input-label">replace {item} with:</div>
        <input
          type="text"
          name={item}
          value={replacementList[item]}
          onChange={replace_function}
        />
        <br/>
        </div>
      );
      textBoxList.push(textBox);
    });


    return (
      <form className="container-fluid" onSubmit={this.handleFormSubmit}>
        <div className="text-box">
          <textarea
            className="form-control text-box"
            value={this.state.text}
            onChange={this.handleTextArea}
            placeholder={""}
          />
        </div>
        <div className="replacement-input">
          <ul>
          {textBoxList.map(function(replace_input) {
            return (
              replace_input

            );
          })}
        </ul>
        </div>
      </form>
    );
  }
}

export default NameForm;
