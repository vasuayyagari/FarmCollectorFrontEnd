import React, {Component} from 'react'
import './Farmcollector.css'
import axios from 'axios'

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      border: 'solid 2px brown',
      textAlign: 'center'
    }
  };

class Home extends Component {

      constructor(){
              super();
              this.state = {
                  farmName: '',
                  errorMessage: undefined,
                  planted: [],
                  plantedResult: false,
                  harvested: [],
                  harvestedResult: false
              }
          }

  handleGetPlantedDetails = () => {
        const { farmName } = this.state;

        axios.get('http://localhost:9000/planted', {
          params: {
            farmName: farmName
          }
        }).then(response => this.setState({ planted: response.data, plantedResult: true}))
                       .catch(errorMessage => this.setState({ errorMessage: errorMessage}))

    }

    handleGetHarvestedDetails = () => {
            const { farmName } = this.state;

            axios.get('http://localhost:9000/harvested', {
              params: {
                farmName: farmName
              }
            }).then(response => this.setState({ harvested: response.data, harvestedResult: true}))
                           .catch(errorMessage => this.setState({ errorMessage: errorMessage}))

        }

    handleChange = (event, state) => {
         this.setState({[state]: event.target.value})
    }

    render() {

        const { planted,harvested,errorMessage} = this.state;
        const plantedResult = this.state.plantedResult;
        const harvestedResult = this.state.harvestedResult;

        return(

            <div>
                  if (plantedResult) {
                  <div>
                   <h1> plantedResult:  </h1>
                     <table className="table table-bordered table-hover table-striped">
                        <tr>
                           <td  className="header" colSpan="4">Planted Details</td>
                        </tr>
                       <tr>
                         <td className="header">CROP_NAME</td>
                         <td className="header">FARM_NAME</td>
                         <td className="header">EXPECTED_PRODUCT</td>
                         <td className="header">PLANTING_AREA</td>
                       </tr>

                        {planted.length != 0 ? planted.map((planted) => {
                            return <tr>
                            <td className="data" key="{planted.cropName}">{planted.cropName}</td>
                            <td className="data" key="{planted.farmName}">{planted.farmName}</td>
                            <td className="data" key="{planted.expectedProduct}">{planted.expectedProduct}</td>
                            <td className="data" key="{planted.plantingArea}">{planted.plantingArea}</td>
                           </tr>
                        }):  <tr>
                                <td  className="para" colSpan="4">There are no recent crops</td>
                            </tr>
                    }

                    </table>
                    </div>
                }

                if (harvestedResult) {
                  <div>
                   <h1> harvestedResult: </h1>
                     <table className="table table-bordered table-hover table-striped">
                        <tr>
                           <td  className="header" colSpan="4">Harvested Details</td>
                        </tr>
                       <tr>
                         <td className="header">CROP_NAME</td>
                         <td className="header">FARM_NAME</td>
                         <td className="header">HARVESTED_PRODUCT</td>
                        </tr>

                        {harvested.length != 0 ? harvested.map((harvested) => {
                            return <tr>
                            <td className="data" key="{harvested.cropName}">{harvested.cropName}</td>
                            <td className="data" key="{harvested.farmName}">{harvested.farmName}</td>
                            <td className="data" key="{harvested.harvestedProduct}">{harvested.harvestedProduct}</td>
                           </tr>
                        }):  <tr>
                                <td  className="para" colSpan="4">There are no recent crops</td>
                            </tr>
                    }

                    </table>
                    </div>
                }

              <form>
                      <label className="farmName">Farm Name:</label>
                      <input onChange={(event) => this.handleChange(event, 'farmName')} type="text"/><br/><br/>
                      <button type="submit" className="btn btn-success margin" onClick={this.handleGetPlantedDetails}>Get Planted Details</button> <br/>
                      <button type="submit" className="btn btn-success margin" onClick={this.handleGetHarvestedDetails}>Get Harvested Details</button> <br/>
                </form>

            </div>
        );
    }

}

export default Home;