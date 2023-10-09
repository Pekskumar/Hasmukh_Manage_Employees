import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AiOutlineCloseCircle } from 'react-icons/ai';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import * as Yup from "yup";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";

const Todo = (props) => {
    const [first, setfirst] = useState(false)
    const data =
        JSON.parse(localStorage.getItem("addEmployee")) || [];

    const initialValues = {
        name: props?.Employee?.name ? props?.Employee?.name : "",
        email: props?.Employee?.email ? props?.Employee?.email : "",
        address: props?.Employee?.address ? props?.Employee?.address : "",
        phone: props?.Employee?.phone ? props?.Employee?.phone : "",
    }
    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        address: Yup.string().required("Address is required"),
        phone: Yup.string().required("Phone is required"),
    });
    return (
        <>
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                scrollable={true}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {props.flag}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            if (props.flag === "Edit") {
                                let updatedData = data?.map((item) => {
                                    if (item.email === values.email) {
                                        item.name = values.name;
                                        item.address = values.address;
                                        item.email = values.email;
                                        item.phone = values.phone;
                                    }
                                    return item;
                                });
                                toast.success("Edited Succesfully Task!");
                                localStorage.setItem("addEmployee", JSON.stringify(updatedData));
                                props.bindList(updatedData);
                                props.onHide();
                            } else {
                                if (data.length > 0) {
                                    data?.forEach(element => {
                                        if (element.email !== values.email) {
                                            const newData = [...data, { ...values }];
                                            localStorage.setItem("addEmployee", JSON.stringify(newData));
                                            toast.success("Employee added successfully!");
                                            props.bindList(newData);
                                            props.onHide();
                                        } else {
                                            toast.error("please use new email id!");
                                        }
                                    });

                                } else {
                                    const newData = [...data, { ...values }];
                                    localStorage.setItem("addEmployee", JSON.stringify(newData));
                                    props.bindList(newData);
                                    props.onHide();
                                }
                            }
                        }}
                    >
                            <Form className="d-grid gap-2"> 
                                <div className="form-group d-grid gap-1">
                                    <label>Name</label>
                                    <Field type="text" name="name" className="form-control" />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="error text-danger"
                                    />
                                </div>
                                <div className="form-group d-grid gap-1">
                                    <label>Email</label>
                                    <Field type="email" name="email" className="form-control" />
                                    <ErrorMessage
                                        name="email"
                                        component="div"
                                        className="error text-danger"
                                    />
                                </div>
                                <div className="form-group d-grid gap-1">
                                    <label>Address</label>
                                    <Field
                                        as="textarea"
                                        name="address"
                                        className="form-control"
                                    />
                                    <ErrorMessage
                                        name="address"
                                        component="div"
                                        className="error text-danger"
                                    />
                                </div>
                                <div className="form-group d-grid gap-1">
                                    <label>Phone</label>
                                    <Field type="text" name="phone" className="form-control" />
                                    <ErrorMessage
                                        name="phone"
                                        component="div"
                                        className="error text-danger"
                                    />
                                </div>
                                <Modal.Footer className="bg-white border-0 justify-content-center">
                                    <Button size="sm" variant="danger" onClick={props.onHide}>Close</Button>
                                    <Button size="sm" type="sumbit">{props.flag} Employee</Button>
                                </Modal.Footer>
                            </Form>
                    </Formik>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default Todo;
