import React, { useState } from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import DatePicker from "react-datepicker";


const Date = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <div>
            <Button color="primary" onClick={toggle} style={{ marginBottom: '1rem' }}>Toggle</Button>
            <Collapse isOpen={isOpen}>
                <Card>
                    <CardBody>
                        <DatePicker
                            onChange={date => props.setStart(date)}
                            placeholderText="Select a start date"
                            selected={props.startDate}
                            selectsStart
                            startDate={props.startDate}
                            endDate={props.endDate}
                        />
                        <DatePicker
                            onChange={date => props.setEnd(date, props.item.book_id, props.index)}
                            placeholderText="Select an end date"
                            selected={props.end}
                            selectsEnd
                            startDate={props.startDate}
                            endDate={props.endDate}
                            minDate={props.startDate}
                        />
                    </CardBody>
                </Card>
            </Collapse>
        </div>
    );
}

export default Date;