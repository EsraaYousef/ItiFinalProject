import { React, useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
import { useHistory } from "react-router";

export default function Profile() {
    const history = useHistory();
    const id = localStorage.getItem("ID");
    const [userInfo, setUserInfo] = useState(null);

    const handleButton = () => {
        history.push("/");
    }

=======

export default function Profile() {
    const id = localStorage.getItem("ID");
    const [userInfo, setUserInfo] = useState(null);
>>>>>>> 2189323e47a0ad68fae9815726faa297042cc046
    useEffect(() => {
        const getUserInfo = () => {
            const URL = `http://localhost:8000/api/v1/users/${id}`;
            axios
                .get(URL)
                .then((res) => {
                    console.log(res.data);
                    setUserInfo(res.data.user);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        getUserInfo();
    }, []);
    return (
        <>
            {userInfo && (
                <div className="form-container center p-3">
                    <div>
                        <div className="m-2">
                            <b className="m-2">Name: </b>
                            {userInfo.name}{" "}
                        </div>
                        <div className="m-2">
                            <b className="m-2">E-mail: </b>
                            {userInfo.email}{" "}
                        </div>
                        <div className="m-2">
                            <b className="m-2">Mobile: </b>
                            {userInfo.phone}{" "}
                        </div>
                        <div className="m-2">
                            <b className="m-2">Address: </b>{userInfo.address[0].apartment}{" "}
                            {userInfo.address[0].street} , {userInfo.address[0].city} ,
                            <br /> {userInfo.address[0].country}
                        </div>
                        <div className="center">
<<<<<<< HEAD
                            <button className="btn btn-main btn-hover btn-200" onClick={handleButton}>Back To Home</button>
=======
                            <button className="btn btn-main btn-hover btn-200">Back To Home</button>
>>>>>>> 2189323e47a0ad68fae9815726faa297042cc046
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
