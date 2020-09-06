import React from 'react'
import axios from 'axios';

class FileUpload extends React.Component {

    constructor() {
        super();
        this.state = {
            selectedFile: '',
            uploading: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event) {
        this.setState({
            selectedFile: event.target.files[0],
            uploading: false
        })
    }



    submit() {
        this.setState({
            uploading: true
        })
        const data = new FormData()
        data.append('LESSON_ID', this.props.lessonid);
        data.append('FILE', this.state.selectedFile);
        data.append('TOKEN', localStorage.getItem("TOKEN"));


        let url = "https://zmsedu.com/api/admin/homework/upload";
        //console.log(data);
        axios.post(url, data, { // receive two parameter endpoint url ,form data 
        })
            .then(res => {
                //alert("File Uploaded");
                var file_id = res.data.FILE_ID;

                //then get into lessons API
                url = "https://zmsedu.com/api/admin/lesson/get";
                axios.post(url, data, { // receive two parameter endpoint url ,form data 
                })
                    .then(res => {
                        console.log("Requested");


                        for (var i = 0; i < res.data.LESSONS.length; i++) {
                            if (res.data.LESSONS[i].LESSON_ID == this.props.lessonid) {
                                var material_old = res.data.LESSONS[i].EXTRA_MATERIAL;
                                material_old.push(file_id);
                                console.log(material_old);
                                //update lessons
                                url = "https://zmsedu.com/api/admin/lesson/edit";
                                axios.post(url, {
                                    LESSON_ID: this.props.lessonid,
                                    EXTRA_MATERIAL: material_old
                                }, { // receive two parameter endpoint url ,form data 
                                })
                                    .then(res => {
                                        console.log(res.data);
                                        alert("File Uploaded. Please click Refresh to update the table.");
                                        this.setState({
                                            uploading: false
                                        })
                                        //then edit the Lessons
                                        //
                                    }).catch(error => {
                                        console.log(error);
                                    });
                            }
                        }
                        //then edit the Lessons
                        //
                    }).catch(error => {
                        console.log(error);
                    });

            }).catch(error => {
                console.log(error);
            });
    }


    render() {
        return (
            <div>
                <div className="row">
                    <div className="col-md-6 offset-md-3">
                        <br /><br />

                        <h3 className="text-white">File Upload</h3>
                        <br />
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label className="text-white">Select File :</label>
                                <input type="file" className="form-control" name="upload_file" onChange={this.handleInputChange} />
                            </div>
                        </div>
                        <br/>
                        <div className="form-row">
                            {this.state.uploading === true ? "Uploading File ... ":
                            <div className="col-md-6">
                                <button type="submit" className="btn btn-dark" onClick={() => this.submit()}>Upload</button>
                            </div>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FileUpload;