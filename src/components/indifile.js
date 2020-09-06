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
            LESSON_ID: lessonid,
            FILE_ID: fileid
        }, { // receive two parameter endpoint url ,form data 
        })
            .then(res => {
                console.log(name)
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