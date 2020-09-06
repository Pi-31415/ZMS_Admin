import React from 'react'
import axios from 'axios';
var fileDownload = require('js-file-download');
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
            .then(response => {
                //console.log(res.data)
                /*const type = response.headers['content-type']
                const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = name
                link.click()*/
                //fileDownload(res.data, name);
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