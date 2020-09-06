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
        axios({
            method:'post',
            url: url,
            data:{
                LESSON_ID: lessonid,
                FILE_ID: fileid
            },
            responseType: 'blob'
        })
            .then(response => {
                console.log(response)
                const type = response.headers['content-type']
                const blob = new Blob([response.data], { type: type, encoding: 'UTF-8' })
                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = name
                link.click()
                //fileDownload(res.data, name);
                //then edit the Lessons
                //
            }).catch(error => {
                console.log(error);
            });
    }

    delete(name, lessonid, fileid,homework) {
        console.log({
            LESSON_ID: lessonid,
            FILE_ID: fileid,
            HOMEWORK_ID: homework
        });
        var url = "https://zmsedu.com/api/admin/homework/delete";
        axios({
            method:'post',
            url: url,
            data:{
                LESSON_ID: lessonid,
                FILE_ID: fileid,
                HOMEWORK_ID: homework
            },
            responseType: 'blob'
        })
            .then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
            <div onClick={() => this.handleClick(this.props.name, this.props.lessonid, this.props.fileid)}>
                {this.props.name}
            </div>
            <div onClick={() => this.delete(this.props.name, this.props.lessonid, this.props.fileid,this.props.homeworkid)}>
                [Delete]
            </div>
            </div>
        )
    }
}

export default FileUpload;