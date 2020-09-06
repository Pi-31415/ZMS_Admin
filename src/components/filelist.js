import React from 'react'
import axios from 'axios';

class FileUpload extends React.Component {

    constructor() {
        super();
        this.state = {
            filelist: ''
        }

    }


    submit() {

    }

    componentDidMount() {

        var url = "https://zmsedu.com/api/admin/homework/get";
        axios.post(url,{}, { // receive two parameter endpoint url ,form data 
        })
            .then(res => {

                for (var i=0 ; i <= res.data.HOMEWORK.length;i++)
                {
                    console.log(res.data.HOMEWORK[i].LESSON_ID);
                }
            
                //then edit the Lessons
                //
            }).catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div>
                asdf {this.props.lessonid}
            </div>
        )
    }
}

export default FileUpload;