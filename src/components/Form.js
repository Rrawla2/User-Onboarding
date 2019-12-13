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
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={values.name}
                    />
                    {touched.name && errors.name && (
                        <p>{errors.name}</p>
                    )}
                </label>
                <br />
                <br />
                <label htmlFor="password">  Password:
                    <Field
                        type="text"
                        name="password"
                        placeholder="Enter password"
                        value={values.password}
                    />
                    {touched.password && errors.password && (
                        <p>{errors.password}</p>
                    )}
                </label>
                <br />
                <br />
                <label htmlFor="email">  E-Mail:
                    <Field
                        type="text"
                        name="email"
                        placeholder="Enter E-Mail address"
                        value={values.email}
                    />
                </label>
                <br />
                <br />
                    <Field
                        type="checkbox"
                        name="terms"
                        checked={values.terms}
                    />
                    <label>
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
                    <ul key={person.name}>
                        <li>Name: {person.name}</li>
                        <li>E-Mail: {person.email}</li>
                    </ul>
                )
            })}
        </div>
    )
}
const FormikOnboardForm = withFormik({
    mapPropsToValues({ name, password, email, terms }) {
        console.log("name", name)
        return {
            name: name || "",
            password: password || "",
            email: email || "",
            terms: terms || false
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
                resetForm()
            })
            .catch(error => console.log(error.response));
    
        }
        

})(OnboardForm);



export default FormikOnboardForm;