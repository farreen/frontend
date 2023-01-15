
import React, { useEffect, useState } from "react"
import { BsFillPersonFill } from "react-icons/bs";
import { BsBoxArrowUpLeft } from "react-icons/bs";
import { BsPlusSquare } from "react-icons/bs";
import { BsTrashFill } from "react-icons/bs";
import { useParams } from "react-router-dom";

import { Modal, ModalBody } from "react-bootstrap";
import TaskModal from "./TaskModal";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditTask from "./EditTask"
import DeleteTask from "./DeleteTask";

const Dashboard = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [isAdd, setAdd] = useState(false);

    const [list, setList] = useState([]);
    const [userEmail, setuserEmail] = useState("");
    const [userData, setUserData] = useState({});
    const [taskDetails, setTaskDetails] = useState({});
    const [taskData, setTaskData] = useState({})
    const [isData, setData] = useState(false);
    const [filterData, setFilterData] = useState("");
    const [isEdit, setEdit] = useState(false);
    const [isDelete, setDelete] = useState(false);

    const getTaskByUserId = async (id) => {
        const res = await axios.get("http://localhost:8080/api/v1/get/task/" + id)
        if (res.data.status == "Success") {
            console.log("_______________NO DATA ", res.data.taskData)
            if (res.data.taskData.details.length > 0) {
                setList(res.data.taskData.details);
                setTaskData(res.data.taskData)
                setData(true);
            } else {
                setData(false);
            }
        }
    }
    const logout = () => {
        localStorage.clear();
        navigate("/");
    }
    useEffect(() => {
        let isLoggedIn = JSON.parse(localStorage.getItem("userData"))
        if (isLoggedIn) {
            setUserData(isLoggedIn)
            getTaskByUserId(params.id);
        } else {
            navigate("/");
        }
    }, [])



    const taskDone = async () => {
        const res = await axios.get(`http://localhost:8080/api/v1/done/task/${taskDetails._id}`)
        console.log("done_res", res);
        getTaskByUserId(params.id);
        setTaskDetails("")
    }

    return (
        <div style={styles.mainContainer}>
            <div class="row" style={styles.layoutContainer}>

                <div className="col-3"> {/**_____________FIRST COL */}

                    <p style={styles.title}>TASK MANAGER</p>
                    <BsFillPersonFill style={styles.icon} />
                    <p style={styles.userName}>{userData.userName}</p>
                    <p style={{ marginLeft: "30px", marginTop: "-10px" }}>{userData.userEmail}</p>

                    <div class="row" style={{ color: "blue", fontSize: "12px" }}>
                        <p class="col">TotalTask:{taskData.totalTask}</p>
                        <p class="col">ToDo:{taskData.pendingTask}</p>
                        <p class="col">Done: {taskData.completedTask}</p>
                    </div>

                    <p style={{ fontSzie: "12px", marginLeft: "40px", fontWeight: 'bold', color: "grey" }}>CATEGORY</p>
                    <div style={{ listStyle: "none", marginLeft: "15px", color: "blue" }}>

                        <list style={{ listStyle: "none" }} >
                            {
                                list.map((item) => {
                                    return (
                                        <div>{item.taskCategory}</div>
                                    )
                                })
                            }
                        </list>
                    </div>

                </div>

                <div className="col-3">{/**_____________SECOND COL */}
                    <div className="form-group mt-3">
                        <input
                            type="text"
                            value={filterData}
                            className="form-control mt-3"
                            placeholder="search ....."
                            style={{ border: "none", backgroundColor: "#F0F3F9" }}
                            onChange={(e) => setFilterData(e.target.value)}
                        />
                    </div>
                    <p style={{ textAlign: "center", marginTop: "25px", fontWeight: "bold", color: "grey" }}> LIST OF TASK</p>
                    <div style={{ listStyle: "none", marginLeft: "55px", color: "blue" }}>
                        <list style={{ listStyle: "none" }} >
                            {
                                list.filter((val) => {
                                    if (filterData === "") {
                                        return val;
                                    } else if (val.taskTitle.toLowerCase().includes(filterData.toLowerCase()) || val.taskCategory.toLowerCase().includes(filterData.toLowerCase())) {
                                        return val;
                                    }
                                }).map((item) => {
                                    return (
                                        <li>
                                            <a href="javascript:void 0" onClick={() => setTaskDetails(item)}>
                                                {item.taskTitle} <p style={{ color: "grey" }}>({item.taskStatus})</p>
                                            </a>
                                        </li>
                                    )
                                })

                            }

                        </list>
                    </div>
                </div>

                <div className="col-6">{/**_____________THIRD COL */}

                    <hr></hr>
                    <button style={{ backgroundColor: " #bcc2fa ", color: "white", marginLeft: "5px" }} onClick={() => setAdd(true)}> ADD</button>
                    <button style={{ backgroundColor: " #bcc2fa ", color: "white", marginLeft: "10px" }} onClick={() => { setEdit(true) }}>EDIT</button>
                    <button style={{ backgroundColor: " #bcc2fa ", color: "white", marginLeft: "10px" }} onClick={() => { setDelete(true) }}>DELETE</button>
                    <button style={{ backgroundColor: " #bcc2fa ", color: "white", marginLeft: "10px" }} onClick={() => taskDone()}>DONE</button>
                    <button style={{ backgroundColor: " #bcc2fa", color: "white", marginLeft: "10px" }} onClick={() => logout()}> LOGOUT</button>
                    <hr></hr>


                    <h5 style={{ marginTop: "13px", color: "grey" }}>TASK DETAILS________</h5>
                    {isData ? (
                        <div>
                            <p style={{ textAlign: "centerx", fontSize: "25px", color: "grey", marginTop: "12px" }}>{taskDetails.taskTitle}</p>
                            <p style={{ textAlign: "centerx", fontSize: "18px", color: "grey", marginTop: "15px" }}> Description:{taskDetails.taskDescription}</p>
                            <p style={{ textAlign: "centerx", fontSize: "18px", color: "grey", marginTop: "15px" }}>Status : {taskDetails.taskStatus}</p>
                            <p style={{ textAlign: "centerx", fontSize: "18px", color: "grey", marginTop: "15px" }}>Date: {taskDetails.taskAddedOn}</p>

                        </div>
                    ) : (<p>You have not added any task yet!</p>)}

                    {/* ____Add task modal_____________________________*/}
                    {
                        isAdd ? (
                            <div>
                                <Modal show={isAdd} onHide={() => { setAdd(false) }}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <ModalBody>
                                        <TaskModal taskAddedByUser={userData._id} />
                                    </ModalBody>
                                    <Modal.Footer>
                                        <button onClick={() => { setAdd(false); getTaskByUserId(params.id) }}>close</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        ) : null
                    }

                    {
                        isEdit ? (
                            <div>
                                <Modal show={isEdit} onHide={() => { setEdit(false) }}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <ModalBody>
                                        <EditTask taskAddedByUser={taskDetails} />
                                    </ModalBody>
                                    <Modal.Footer>
                                        <button onClick={() => { setEdit(false); getTaskByUserId(params.id) }}>close</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        ) : null
                    }
                    {
                        isDelete ? (
                            <div>
                                <Modal show={isDelete} onHide={() => { setDelete(false) }}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <ModalBody>
                                        <DeleteTask taskAddedByUser={taskDetails} />
                                    </ModalBody>
                                    <Modal.Footer>
                                        <button onClick={() => { setDelete(false); getTaskByUserId(params.id) }}>close</button>
                                    </Modal.Footer>
                                </Modal>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard

//____________________CSS

const styles = {
    mainContainer: {
        width: "1350px",
        backgroundImage: "linear-gradient(to right,#7191EE, white 25%,blue 25% ,#D1DCF8 ,#D1DCF8 80%)",
        margin: "Auto",
        position: "relative",
    },
    layoutContainer: {
        width: "80%",
        backgroundColor: "white",
        margin: "Auto",
        position: "relative",
        top: 45
    },
    title: {
        fontSize: "12px",
        color: "grey",
        marginTop: "30px",
        fontWeight: "bold",
        marginLeft: "35px"
    },
    icon: {
        marginLeft: "50px",
        fontSize: "50px",
        color: "blue"
    },
    userName: {
        marginLeft: "40px",
        fontSize: "15px",
        color: "grey",
    },
    actionBtn: {
        fontSize: "85px",
        fontWeight: "bold",
        color: "grey"
    }
}

