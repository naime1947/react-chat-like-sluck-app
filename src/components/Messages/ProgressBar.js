import React from 'react'
import {Progress} from 'semantic-ui-react'

const ProgressBar = ({uploadState, percentUploaded})=> {
    return uploadState==='uploading' && (
        <Progress
            className="progress__bar"
            percent={percentUploaded}
            inverted
            progress
            size="large"
            indicating
        />
    )
}
export default ProgressBar;