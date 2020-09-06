import React from 'react'
import axios from 'axios';

class FileUpload extends React.Component{

    constructor(){
        super();
        this.state = {
            selectedFile:'',
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
          })
    }

    

    submit(){
        const data = new FormData() 
        data.append('LESSON_ID', this.props.lessonid);
        data.append('FILE', this.state.selectedFile);
        data.append('TOKEN',localStorage.getItem("TOKEN"));
        let url = "https://zmsedu.com/api/admin/homework/upload";
        console.log(data);
        axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
        .then(res => {
            console.log(res.data);
        }).catch(error => {
            console.log(error);
        });

    }

    render(){
        return(
            <div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <br /><br />

                            <h3 className="text-white">File Upload Test {this.props.lessonid}</h3>
                            <br />
                            <div className="form-row">
                                <div className="form-group col-md-6">
                                    <label className="text-white">Select File :</label>
                                    <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="col-md-6">
                                    <button type="submit" className="btn btn-dark" onClick={()=>this.submit()}>Save</button>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
        )  
    }
}

export default FileUpload;