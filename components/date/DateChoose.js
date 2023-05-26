import DatePicker from "react-datepicker";
import {useEffect} from "react";

export default function DateChoose(props) {
    return (
        <>
            <DatePicker className="form-control py-1" selected={props.selected} onChange={props.onChange}/>
        </>
    )
}