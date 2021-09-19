import React, { Component } from 'react';
import './App.css';

import { isEmpty } from 'lodash';

import InputBox from '../../components/ui/inputBox/InputBox';
import Button from '../../components/ui/button/Button';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileName: '',
      bancali: [],
      a: '',
      b: '',
      c: '',
      d: '',
      e: '',
      f: '',
      spessoreLastra: '',
      testoPezzi: '',
      warningClassFileName: false,
      warningClassA: false,
      warningClassB: false,
      warningClassC: false,
      warningClassD: false,
      warningClassE: false,
      warningClassF: false,
      warningClassSpessoreLastra: false,
      warningClassTestoPezzi: false,
      operationResult: ''
    };

  }

  handleInputDimensions = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addNewBancale = () => {
    let objErrors = {};

    if (!this.state.fileName) {
      objErrors.warningClassFileName = true;
    }
    if (!this.state.a || isNaN(this.state.a)) {
      objErrors.warningClassA = true;
    }
    if (!this.state.b || isNaN(this.state.b)) {
      objErrors.warningClassB = true;
    }
    if (!this.state.c || isNaN(this.state.c)) {
      objErrors.warningClassC = true;
    }
    if (!this.state.d || isNaN(this.state.d)) {
      objErrors.warningClassD = true;
    }
    if (!this.state.e || isNaN(this.state.e)) {
      objErrors.warningClassE = true;
    }
    if (!this.state.f || isNaN(this.state.f)) {
      objErrors.warningClassF = true;
    }


    if (!this.state.spessoreLastra || isNaN(this.state.spessoreLastra)) {
      objErrors.warningClassSpessoreLastra = true;
    }
    if (!this.state.testoPezzi) {
      objErrors.warningClassTestoPezzi = true;
    }

    // Final control
    if (!isEmpty(objErrors)) {
      this.setState(objErrors);
    } else {
      let arrayBancali = [
        ...this.state.bancali
      ];

      arrayBancali.push({
        dimensioniBancale: {
          a: parseFloat(this.state.a),
          b: parseFloat(this.state.b),
          c: parseFloat(this.state.c),
          d: parseFloat(this.state.d),
          e: parseFloat(this.state.e),
          f: parseFloat(this.state.f)
        },
        spessoreLastra: parseFloat(this.state.spessoreLastra),
        testoPezzi: this.state.testoPezzi
      });

      this.setState({
        bancali: arrayBancali,
        a: '',
        b: '',
        c: '',
        d: '',
        e: '',
        f: '',
        spessoreLastra: '',
        testoPezzi: ''
      });
    }

  }

  deleteBancale = (index) => () => {
    let arrayBancali = [
      ...this.state.bancali
    ];

    arrayBancali.splice(index, 1);

    this.setState({
      bancali: arrayBancali
    });
  }

  handleInputFocus = (warningClass) => () => {
    let obj = {};
    obj[warningClass] = false;

    this.setState(obj);
  }

  handleSubmit = (event) => {  

    axios.post('/api/create-dxf', {
      data: this.state.bancali,
      fileName: this.state.fileName
    }, {
      params: {
        headers: 'Content-Type: application/json'
      }
    })
      .then((res) => {
        if(res.data.result === 'success!') {
          this.setState({
            operationResult: 'Il file  stato creato correttamente!'
          })
        }
      })
      .catch((err) => {
        this.setState({
          operationResult: 'C\'è stato un problema nell\'esecuzione dell\'operazione.'
        })
        console.log('error:', err)
      })

  }

  render() {
    return (
      <div className="app">

        <h1>Crea file .dxf</h1>

        <div className='file-name-container'>

          <label
            className={this.state.warningClassFileName ? 'alert' : ''}
            alert-text="Inserire Nome file"
          >
            Nome File
          </label>

          <div>
            <InputBox
              alert={this.state.warningClassFileName}
              type="text"
              placeholder="Scegli il nome del file"
              name="fileName"
              callback={this.handleInputDimensions}
              callbackFocus={this.handleInputFocus('warningClassFileName')}
              value={this.state.fileName}
            />.dxf
          </div>

        </div>


        {/* Container Info da inserire */}
        <div className="container-info">


          <div className="dimensioni">
            <h2>Dimensioni bancale:</h2>

            <div className="inputs-container">

              <div className="input-group">
                <label alert-text="Inserire un Numero" className={this.state.warningClassA ? 'alert' : ''}>a:</label>
                <InputBox
                  alert={this.state.warningClassA}
                  type="text"
                  placeholder="a"
                  name="a"
                  callback={this.handleInputDimensions}
                  callbackFocus={this.handleInputFocus('warningClassA')}
                  value={this.state.a}
                />
              </div>

              <div className="input-group">
                <label alert-text="Inserire un Numero" className={this.state.warningClassB ? 'alert' : ''}>b:</label>
                <InputBox
                  alert={this.state.warningClassB}
                  type="text"
                  placeholder="b"
                  name="b"
                  callback={this.handleInputDimensions}
                  callbackFocus={this.handleInputFocus('warningClassB')}
                  value={this.state.b}
                />
              </div>


              <div className="input-group">
                <label alert-text="Inserire un Numero" className={this.state.warningClassC ? 'alert' : ''}>c:</label>
                <InputBox
                  alert={this.state.warningClassC}
                  type="text"
                  placeholder="c"
                  name="c"
                  callback={this.handleInputDimensions}
                  callbackFocus={this.handleInputFocus('warningClassC')}
                  value={this.state.c}
                />
              </div>

              <div className="input-group">
                <label alert-text="Inserire un Numero" className={this.state.warningClassD ? 'alert' : ''}>d:</label>
                <InputBox
                  alert={this.state.warningClassD}
                  type="text"
                  placeholder="d"
                  name="d"
                  callback={this.handleInputDimensions}
                  callbackFocus={this.handleInputFocus('warningClassD')}
                  value={this.state.d}
                />
              </div>


              <div className="input-group">
                <label alert-text="Inserire un Numero" className={this.state.warningClassE ? 'alert' : ''}>e:</label>
                <InputBox
                  alert={this.state.warningClassE}
                  type="text"
                  placeholder="e"
                  name="e"
                  callback={this.handleInputDimensions}
                  callbackFocus={this.handleInputFocus('warningClassE')}
                  value={this.state.e}
                />

              </div>

              <div className="input-group">
                <label alert-text="Inserire un Numero" className={this.state.warningClassF ? 'alert' : ''}>f:</label>
                <InputBox
                  alert={this.state.warningClassF}
                  type="text"
                  placeholder="f"
                  name="f"
                  callback={this.handleInputDimensions}
                  callbackFocus={this.handleInputFocus('warningClassF')}
                  value={this.state.f}
                />
              </div>
            </div>

            <div className="spessore-testo-container">

              <div className="input-group">
                <label alert-text="Inserire un Numero" className={this.state.warningClassSpessoreLastra ? 'alert' : ''}>Spessore lastra:</label>
                <InputBox
                  alert={this.state.warningClassSpessoreLastra}
                  type="text"
                  placeholder="Spessore lastra"
                  name="spessoreLastra"
                  callback={this.handleInputDimensions}
                  callbackFocus={this.handleInputFocus('warningClassSpessoreLastra')}
                  value={this.state.spessoreLastra}
                />
              </div>

              <div className="input-group">
                <label alert-text="Inserire una Stringa di Testo" className={this.state.warningClassTestoPezzi ? 'alert' : ''}>Numero riferimento e pezzi:</label>
                <InputBox
                  alert={this.state.warningClassTestoPezzi}
                  type="text"
                  placeholder="Es: F1 - 1 Pezzo"
                  name="testoPezzi"
                  callback={this.handleInputDimensions}
                  callbackFocus={this.handleInputFocus('warningClassTestoPezzi')}
                  value={this.state.testoPezzi}
                />
              </div>

            </div>


            <div className="btn-container">
              <Button
                text="Aggiungi"
                callback={this.addNewBancale}
              />

              <div>{this.state.operationResult}</div>

              {
                this.state.bancali.length > 0 &&
                <Button
                  text="Crea file dxf"
                  callback={this.handleSubmit}
                  style={{ marginRight: '10px', backgroundColor: '#69c236' }}
                />
              }
            </div>
          </div>

        </div>

        {
          this.state.bancali.length > 0 &&
          <div className="container-results">

            {
              this.state.bancali.map((bancale, index) => {
                return (
                  <div className="single-result-row" key={index}>
                    <div className="result-index">{index + 1})</div>
                    <div className="result-text">{bancale.testoPezzi}</div>
                    <div className="dimension">a: {bancale.dimensioniBancale.a}</div>
                    <div className="dimension">b: {bancale.dimensioniBancale.b}</div>
                    <div className="dimension">c: {bancale.dimensioniBancale.c}</div>
                    <div className="dimension">d: {bancale.dimensioniBancale.d}</div>
                    <div className="dimension">e: {bancale.dimensioniBancale.e}</div>
                    <div className="dimension">f: {bancale.dimensioniBancale.f}</div>
                    <div className="result-spessore">Spessore lastra: {bancale.spessoreLastra}</div>
                    <Button text="elimina" callback={this.deleteBancale(index)} />
                  </div>
                )
              })
            }

          </div>
        }

      </div>
    );
  }
}

export default App;
