import React, { useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import axios from "axios";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    input: {
        display: 'none',
    },
}));

export default function UploadButtons(props) {
    const classes = useStyles();
    const [selectedFiles, setSelectedFiles] = useState(undefined);
    const [lessonidtoupload, setLessonidtoupload ] = useState(props.lessonid);

    const selectFile = (event) => {
        setSelectedFiles(event.target.files);
        console.log(event.target.files)
    };

    const upload = () => {
        let currentFile = selectedFiles[0];
        const query = {
            "LESSON_ID": lessonidtoupload,
            "FILE": currentFile
            };
        console.log(query);
        axios.post('https://zmsedu.com/api/student/homework/upload', query)
            .then(response => console.log(response.data))
            .catch(error => {
              console.log(error);
        });
    };

    return (
        <div className={classes.root}>
            <label className="btn btn-default">
                <input type="file" onChange={selectFile} />
            </label>
            <Button variant="contained" color="primary" component="span" disabled={!selectedFiles}
                onClick={upload}>
                Upload
            </Button>
        </div>
    );
}