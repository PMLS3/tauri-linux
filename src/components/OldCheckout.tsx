import  { Component, } from 'react';

class Checkout extends Component {

  // state = { post: null }

  componentDidMount() {
    console.log('Loading checkout...')
    // axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=4&format=text')
    //   .then(response => this.setState({ post: response.data }));
  }

  render() {
    return (
      <div className="card card-product shadow-sm">
        <div className="card-header pb-0 bg-white">
          <h5 className="font-weight-bold mt-2">Summary</h5>
          <p>You are purchasing bla bla...</p>
        </div>
        <div className="card-body d-flex flex-column">
          <p className="text-muted m-0"> 
            Please present card
          </p>
        </div>
      </div>
    );
  }

}

export default Checkout;
