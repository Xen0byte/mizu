import React from "react";
import styles from './style/StatusCode.module.sass';
import Queryable from "./Queryable";

export enum StatusCodeClassification {
    SUCCESS = "success",
    FAILURE = "failure",
    NEUTRAL = "neutral"
}

interface EntryProps {
    statusCode: number
}

const StatusCode: React.FC<EntryProps> = ({statusCode}) => {

    const classification = getClassification(statusCode)

    return <Queryable
        query={`response.status == ${statusCode}`}
        displayIconOnMouseOver={true}
        flipped={true}
        iconStyle={{marginTop: "40px", paddingLeft: "10px"}}
    >
        <span
            title="Status Code"
            className={`${styles[classification]} ${styles.base}`}
        >
            {statusCode}
        </span>
    </Queryable>
};

export function getClassification(statusCode: number): string {
    let classification = StatusCodeClassification.NEUTRAL;

    // 1 - 16 HTTP/2 (gRPC) status codes
    // 2xx - 5xx HTTP/1.x status codes
    if ((statusCode >= 200 && statusCode <= 399) || statusCode === 0) {
        classification = StatusCodeClassification.SUCCESS;
    } else if (statusCode >= 400 || (statusCode >= 1 && statusCode <= 16)) {
        classification = StatusCodeClassification.FAILURE;
    }

    return classification
}

export default StatusCode;
