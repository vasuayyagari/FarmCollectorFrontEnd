import React, {Component} from 'react'
import '../Farmcollector.css'
import axios from 'axios'
import Modal from 'react-modal'

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
            planted: []
        }
    }

    handleGetPlanted = () => {
        const { amount, interestRate } = this.state;
        const addObj = {
            "amount": amount,
            "interestRate": interestRate
        };
        axios({
            method: 'POST',
            url: `http://localhost:8080/interest`,
            headers: { 'Content-Type': 'application/json' },
            data: addObj
        }).then(response => axios("http://localhost:8080/interests")
                .then(response => this.setState({ recentInterests: response.data, isOpen: false, errorMessage : undefined, amount:'',interestRate:''}))
                .catch(err => console.log(err))
        ).catch(errorMessage => this.setState({ errorMessage: errorMessage.response.data.message}))

    }

    handleChange = (event, state) => {
     this.setState({[state]: event.target.value})
    }

    handleClose = () => {
        this.setState({errorMessage: undefined})
    }

    componentDidMount() {
         axios.get('http://localhost:9000/planted',
            {
                farmName: farmName
            })
             .then(response => this.setState({ planted: response.data}))
             .catch(errorMessage => this.setState({ errorMessage: errorMessage}))
         }
    }

    render() {
        const { planted,errorMessage} = this.state;
        return(
            <div>

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

                <input type="farmName"> Farm Name: </input>
               <button type="submit" className="btn btn-success" onClick={this.handleGetPlanted}>Get Planted Details</button>


            </div>
        );
    }

}

export default Home;