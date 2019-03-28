import React, { Component } from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const BASE_URL = 'http://localhost:8080/';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      imageUrls: [],
      message: ''
    }
  }
  selectImages = (event) => {
    let images = []
    for (var i = 0; i < event.target.files.length; i++) {
      images[i] = event.target.files.item(i);
    }
    images = images.filter(image => image.name.match(/\.(jpg|jpeg|png|gif)$/))
    let message = `${images.length} valid image(s) selected`
    this.setState({ images, message })
  }

  uploadImages = () => {
    const uploaders = this.state.images.map(image => {
      const data = new FormData();
      data.append("image", image, image.name);

      // Make an AJAX upload request using Axios
      return axios.post(BASE_URL + 'upload', data)
        .then(response => {
          console.log(response.data)
          this.setState({
            imageUrls: [response.data, ...this.state.imageUrls]
          });
        })
    });

    // Once all the files are uploaded 
    axios.all(uploaders).then(() => {
      console.log('done');
    }).catch(err => alert(err.message));

  }


  render() {
    let data = this.state.imageUrls.map((url, i) => (
      <div className="col-lg-2" key={i}>
        <h3>Image Submitted</h3>
        <img height='200' src={url.imageLocation} className="img-rounded img-responsive" alt="not available" /><br />
        <h3>Line Text Detection</h3>
        <ul>
          {url.rekognition.TextDetections.map((detection, i) => detection.Type === "LINE" && <div key={i}>{detection.DetectedText}<br /></div>)}
        </ul>
      </div>
    ));
    return (
      <div>
        <br />
        <div className="col-sm-12">
          <h1>AWS Image Text Detection</h1><hr />
          <div className="col-sm-4">
            <input className="form-control " type="file" title=" " id="contained-button-file" onChange={this.selectImages} multiple />
            <label htmlFor="contained-button-file">
              <Button variant="contained" component="span" >
                <b> Image to Upload </b>
              </Button>
            </label>
          </div>
          <p className="text-info">{this.state.message}</p>
          <br />
          <div className="col-sm-4">
            <Button variant="contained" color="primary" value="Submit"
              onClick={this.uploadImages}><b> Submit </b></Button>
          </div>
        </div>
        <hr /><br />
        <div className="row col-lg-12">
          {data}
        </div>
      </div>
    );
  }
}

export default App;