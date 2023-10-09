import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Todo from "../modal/todoModal";
import { AiFillDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import { BsPersonFillAdd } from "react-icons/bs";
import { ButtonGroup } from "react-bootstrap";


const Crud = () => {
  const data = JSON.parse(localStorage.getItem("addEmployee")) || [];
  const [modalShow, setModalShow] = useState(false);
  const [U_data, setU_data] = useState(data)
  const [AddName, setAddName] = useState("")
  const [EmpValue, setEmpValue] = useState({})

  function fndelete(id) {
    let abc = data.filter((f) => f.email !== id.email)
    localStorage.setItem("addEmployee", JSON.stringify(abc));
    setU_data(abc)
  }

  function fnEditAddEmp(type, value) {
    setModalShow(true)
    setAddName(type)
    setEmpValue(value)
  }

  return (
    <>
      <div className="container">
        <div className="table-wrapper">
          <div className="table-title">
            <div className="row">
              <div className="col-sm-6">
                <h2>
                  Manage <b>Employees</b>
                </h2>
              </div>
              <div className="col-sm-6 d-flex justify-content-end">
                <h6 className="d-flex align-items-center">
                  Add Employees

                  <Button variant="success" size="lg" onClick={(e) => fnEditAddEmp("Add")}><BsPersonFillAdd /></Button>
                </h6>
              </div>
            </div>
          </div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {U_data.length > 0 &&
                U_data.map((employee, index) => (
                  <tr key={index}>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.address}</td>
                    <td>{employee.phone}</td>
                    <td>
                      <ButtonGroup>
                        <Button size="sm" onClick={(e) => fnEditAddEmp("Edit", employee)} variant="primary"><BiSolidEdit /></Button>
                        <Button size="sm" onClick={(e) => fndelete(employee)} variant="danger"><AiFillDelete /></Button>
                      </ButtonGroup>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {modalShow && <Todo
        show={modalShow}
        bindList={setU_data}
        flag={AddName}
        Employee={EmpValue}
        onHide={() => setModalShow(false)}
      />}
    </>
  );
};

export default Crud;
