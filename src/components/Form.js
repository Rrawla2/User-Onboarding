import React, { useState, useEffect } from "react";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";



const OnboardForm = ({ values, errors, touched, status }) => {
    // console.log("values", values);
    // console.log("errors", errors);
    // console.log("touched", touched);
    // console.log("status", status);

    const [user, setUser] = useState([]);

    useEffect(() => {
        console.log('update status', status);
        status && setUser(user => [...user, status]);

    }, [status]);
    
    return (
        <div>
            <Form>
                <label htmlFor="name">  Name:
                    <Field
                        id="name"
                        type="text"
                        name="name"
                        placeholder="Enter name"
                    />
                    {touched.name && errors.name && (
                        <p>{errors.name}</p>
                    )}
                </label>
                <br />
                <br />
                <label htmlFor="password">  Password:
                    <Field
                        id="password"
                        type="text"
                        name="password"
                        placeholder="Enter password"
                    />
                    {touched.password && errors.password && (
                        <p>{errors.password}</p>
                    )}
                </label>
                <br />
                <br />
                <label htmlFor="email">  E-Mail:
                    <Field
                        id="email"
                        type="text"
                        name="email"
                        placeholder="Enter E-Mail address"
                    />
                </label>
                <br />
                <br />
                    <Field
                        type="checkbox"
                        name="Terms of Service"
                        checked={values.terms}
                    />
                    <label htmlFor="checkbox">
                    Terms of Service
                    <br />
                    <span className="checkmark" />
                    </label>
                <br />
                <br />
                <button type="submit">Submit</button>
            </Form>
            {user.map(person => {
                console.log(person)
                return (
                    <ul key={person.id}>
                        <li>Name: {person.name}</li>
                        <li>E-Mail: {person.email}</li>
                    </ul>
                )
            })}
        </div>
    )
}
const FormikOnboardForm = withFormik({
    mapPropsToValues(props) {
        //console.log(props)
        return {
            name: props.name || "",
            password: props.password || "",
            email: props.email || "",
            termsofservice: props.terms || ""
        }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string().required("You must enter a name"),
        password: Yup.string().required("You must enter a password")
    }),

    handleSubmit(values, { setStatus, resetForm }) {
        console.log("Submitted", values);
        axios
            .post("https://regres.in/api/users", values)
            .then(response => {
                console.log("Received data", response);
                setStatus(response.data);
                resetForm();
            })
            .catch(error => console.log(error.response));
    
        }
        

})(OnboardForm);



export default FormikOnboardForm;