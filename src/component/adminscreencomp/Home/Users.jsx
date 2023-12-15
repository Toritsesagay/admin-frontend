import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { deleteUser, fetchUsers } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";




export const AdminUsersComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [userList, setUserList] = useState([])
    let [filteredUsers, setfilteredUsers] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color} = useSelector(state => state.userAuth)

    useEffect(() => {
        fetchAllUsers()
    }, [])




    let fetchAllUsers = async () => {
        setIsError(false)
        let res = await dispatch(fetchUsers())

        console.log(res)

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setUserList(res.message)
        setfilteredUsers(res.message)
        setIsLoading(false)
    }



    let editHandler = (id) => {
        //navigate to the next page
        navigate(`/users/${id}`)
    }


    let deleteHandler = async (id) => {
        //delete this specific case from server
        setIsError(false)
        let res = await dispatch(deleteUser(id))
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //filtering the already list

        let filteredArray = userList.filter(data => data._id !== id)

        setUserList(filteredArray)
        setfilteredUsers(filteredArray)
        setIsLoading(false)

    }





    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredUsers.filter((item) => {
                const itemData = item.email ? item.email : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })
            setUserList(newData)
            setIsLoading(false)
        } else {
            setUserList(filteredUsers)
            setIsLoading(false)

        }
    }


    if (isLoading) {
        return <Loader />
    }

    if (isError) {
        return <Error />
    }


    return (<div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

        <div className={styles.timeline} style={{ backgroundColor: color.background }}>
            <div className={styles.filter}>
                <div className={styles.searchContainer}>
                    <div className={styles.searchBar}>
                        < input className={styles.input} placeholder='search by email' onChange={searchHandler} />
                        <span className='material-icons'>
                            search
                        </span>

                    </div>
                </div>
            </div>
            <div className={styles.tableContainer} >

                {userList.length === 0 && <div className={styles.emptyContainer}>
                    <p>No registered users</p>
                </div>}

                {userList.length !== 0 && <table>
                    <tbody>
                        <tr>
                            <td>
                                Email
                            </td>
                            <td>
                                First Name
                            </td>

                            <td>
                                Phone Number

                            </td>


                            <td>
                                Country

                            </td>

                            <td>
                                Delete
                            </td>

                            <td>
                                Edit
                            </td>

                        </tr>




                        {userList.map(data => <tr key={data.__id} >
                            <td>
                                {data.email}
                            </td>
                            <td>
                                {data.firstName}

                            </td>

                            <td>
                                {data.phoneNumber}

                            </td>

                            <td>
                                {data.country}

                            </td>

                            <td onClick={() => deleteHandler(data._id)}>
                                <span className='material-icons'> delete</span>
                            </td>

                            <td onClick={() => editHandler(data._id)}>
                                <span className='material-icons'> edit</span>
                            </td>
                        </tr>)}


                    </tbody>
                </table>}

            </div>
        </div>



    </div>)




}
