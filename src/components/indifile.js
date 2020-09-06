import React from 'react'
import axios from 'axios';

class FileUpload extends React.Component {

    constructor() {
        super();
        this.state = {
            filename: '',
            lessonid: ''
        }

    }

    componentDidMount() {
        this.setState({
            filename: this.props.filename,
            lessonid: this.props.lessonid
        });
    }

    handleClick(name, lessonid, fileid) {
        var url = "https://zmsedu.com/api/student/homework/download";
        axios.post(url, {
            "LESSON_ID": "5f4b927bfcdfa224050ad698",
            "FILE_ID": "fa5f6bf756637789405f"
          }, { // receive two parameter endpoint url ,form data 
        })
            .then(res => {
                
                //then edit the Lessons
                //
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div onClick={() => this.handleClick(this.props.name, this.props.lessonid, this.props.fileid)}>
                {this.props.name}

            </div>
        )
    }
}

export default FileUpload;