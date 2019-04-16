import React, {Component, Fragment} from 'react';
import './App.css';

const Button = (props) => {
  const [hover, setHover] = React.useState(false);

  const backgrounds = props.backgrounds ? props.backgrounds : ["linear-gradient(to bottom right, #90A4AE, #B0BEC5)", "linear-gradient(to bottom right, #B0BEC5, #90A4AE)"];
  // React.useEffect(()=>{
  //
  // });

  return(
    <button
      id={props.id}
      className="btn"
      onClick={()=>props.onClick(props.title)}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
      style={{
        ...props.style,
        color: (props.color?props.color:"black"),
        fontSize: "1.25em",
        backgroundImage: (hover ? backgrounds[0] : backgrounds[1])
      }}>
      {props.title}
    </button>
  );
};



const Row = (props) => {
  return(
    <div style={{width:"-webkit-fill-available", display: "flex", justifyContent: "stretch"}}>
      {props.children}
    </div>
  );
};

const Display = (props) => {
  const [toggle, setToggle] = React.useState(false);
  let background = toggle ? "linear-gradient(to bottom right, #C5E1A5, #F1F8E9)" : "linear-gradient(to bottom right, #F1F8E9, #C5E1A5)";

  React.useEffect(()=>{
    setToggle(!toggle);
  }, [props.content]);

  return(
    <div
      id={props.id}
      style={{
      fontSize: "3em",
      border: "5px inset #555",
      // height: "4em",
      backgroundImage: background,
      width: "100%",
      display: "flex",
      justifyContent: "flex-end",
      alignItems: "center",
      alignText: "right",
      fontFamily: "Digital-7, monospace",
      margin: "0.25em",
      padding: "0.25em",
      color: "black",
      overflow: "hidden"
    }}>
      {props.content}
    </div>
  );
};


class Calculator extends Component {
  buttonWidth = 4;
  buttonHeight = 4;

  constructor(props) {
    super(props);
    this.state = {
      expression: "0",
      evaluation: 0
    };
  }

  isOperator(str){
    return "/*+-".indexOf(str) >= 0;
  }

  handleClick(title) {
    this.setState(state=>{

      let expression = state.expression;

      console.log("State: ", state.expression);
      console.log("Input: ", title);

      // let result = 0;
      if(title === "AC"){
        expression = "0";
      }
      else if(title === "Del"){
        expression = expression || "0";
        expression = (expression === "0" ? "0" : expression.substr(0, expression.length-1));

      }
      else if(title === "="){
        // expression = "0";
        let precision = 10 ** 10;
        expression = Math.round(eval(expression)*precision)/precision;
      } else if(this.isOperator(title)){
        if(expression.length > 0 && this.isOperator(expression[expression.length-1])){
          expression = expression.slice(0, expression.length-1)
        }
        expression += title;
      }
      else if(title === '.' && expression.indexOf(".") >= 0){
        let last = 0;
        let i = expression.length -1;
        while(!this.isOperator(expression[i]) && i >= 0){
          i--;
        }
        last = expression.substr(i+1);
        if(last.indexOf(".") < 0){
          expression += ".";
        }
      }
      else{
        if(expression === "0"){
          expression = title;
        }else{
          expression += title;
        }
      }
      console.log("Next State: ", state.expression);
      return {
        ...state,
        // evaluation: result,
        expression: expression
      };
    });
  }

  render(){
    let unit = 'em';

    let backgroundsAC = ["linear-gradient(to bottom right, #B71C1C, #C62828)", "linear-gradient(to bottom right, #C62828, #B71C1C)"];

    let backgroundsEquals = ["linear-gradient(to bottom right, #283593, #303F9F)", "linear-gradient(to bottom right, #303F9F, #283593)"];

    let backgroundsOperator = ["linear-gradient(to bottom right, #546E7A, #607D8B)", "linear-gradient(to bottom right, #607D8B, #546E7A)"];


    return (
      <div style={{
        padding: "0.5em",
        border: "1px solid #555",
        borderRadius: "0.5em",
        backgroundImage: "linear-gradient(to bottom right, #444, #aaa)",
        // color: "#555",
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        // minWidth: "50vw"
        boxShadow: "0 0 10px 0 #555"
      }}>
        <Row>
          <Display id="display" content={this.state.expression}/>
        </Row>
        <Row>
          <Button title="AC"
                  id="clear"
                  backgrounds={backgroundsAC}
                  color={"white"}
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
          <Button title="Del"
                  id="Delete"
                  backgrounds={backgroundsAC}
                  color={"white"}
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
          <Button title="/"
                  id="divide"
                  color={"white"}
                  backgrounds={backgroundsOperator}
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
          <Button title="*"
                  id="multiply"
                  color={"white"}
                  backgrounds={backgroundsOperator}
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
        </Row>
        <Row>
          <Button title="7"
                  id="seven"
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
          <Button title="8"
                  id="eight"
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
          <Button title="9"
                  id="nine"
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
          <Button title="-"
                  id="subtract"
                  color={"white"}
                  backgrounds={backgroundsOperator}
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
        </Row>
        <Row>
          <Button title="4"
                  id="four"
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
          <Button title="5"
                  id="five"
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
          <Button title="6"
                  id="six"
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
          <Button title="+"
                  id="add"
                  color={"white"}
                  backgrounds={backgroundsOperator}
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
        </Row>
        <Row>
          <div>
            <Row>
              <Button title="1"
                      id="one"
                      onClick = {(title)=>this.handleClick(title)}
                      style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
              />
              <Button title="2"
                      id="two"
                      onClick = {(title)=>this.handleClick(title)}
                      style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
              />
              <Button title="3"
                      id="three"
                      onClick = {(title)=>this.handleClick(title)}
                      style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
              />
            </Row>
            <Row>
              <Button title="0"
                      id="zero"
                      onClick = {(title)=>this.handleClick(title)}
                      style={{height: (this.buttonHeight + unit), width: (2*this.buttonWidth + unit)}}
              />
              <Button title="."
                      id="decimal"
                      onClick = {(title)=>this.handleClick(title)}
                      style={{height: (this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
              />

            </Row>
          </div>
          <Button
            id="equals"
                  title="="
                  color={"white"}
                  backgrounds={backgroundsEquals}
                  onClick = {(title)=>this.handleClick(title)}
                  style={{height: (2*this.buttonHeight + unit), width: (this.buttonWidth + unit)}}
          />
        </Row>
      </div>
    )
  }
}


class App extends Component {
  render() {
    return (
      <Fragment>

        <div className="container">
          <div style={{fontSize: "2.5em", padding: "1em 0"}}>Javascript Calculator</div>
          <Calculator/>
        </div>

        <footer style={{textAlign: "center",padding: "1.25em 1em", borderTop: "1px solid black", fontSize: "1.25em"}}>
          Link to github repo: <a style={{textDecoration: "none", color: "blue"}} href="https://github.com/lalitjain98/drum-machine" rel="noopener noreferrer" target="_blank">github.com/lalitjain98/js-calculator</a>
        </footer>

      </Fragment>
    );
  }
}

export default App;
