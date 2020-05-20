import React from 'react';
import { CustomInput, Form, FormGroup, Label } from 'reactstrap';

const Toggle = (props) => {
    return (
        <Form>
        <FormGroup>
            <div>
                <CustomInput onChange={props.switchMeasure} type="switch" id="exampleCustomSwitch" name="customSwitch" label="" />
            </div>
        </FormGroup>
        </Form>
    )
}

export default Toggle;
