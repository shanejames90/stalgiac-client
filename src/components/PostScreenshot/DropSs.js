const React = require('react')
const Dropzone = require('react-dropzone')
const axios = require('axios')

class DropSs extends Component({
  _onDrop: function (files) {
    var file = files[0];

    axios.get(ENDPOINT_TO_GET_SIGNED_URL, {
      filename: file.name,
      filetype: file.type
    })
    .then(function (result) {
      var signedUrl = result.data.signedUrl;

      var options = {
        headers: {
          'Content-Type': file.type
        }
      };

      return axios.put(signedUrl, file, options);
    })
    .then(function (result) {
      console.log(result);
    })
    .catch(function (err) {
      console.log(err);
    });
  },
  render: function () {
    return (
      <Dropzone onDrop={ this._onDrop } size={ 150 }>
        <div>
          Drop some files here!
        </div>
      </Dropzone>
    );
  }
});
