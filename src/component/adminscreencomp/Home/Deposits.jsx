import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { fetchDeposits } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate, useParams } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";




export const AdminDepositsComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [userList, setUserList] = useState([])
    let [filteredUsers, setfilteredUsers] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { color } = useSelector(state => state.userAuth)
    let {user} = useParams()




    useEffect(() => {
        fetchAllDeposits()
    }, [])




    let fetchAllDeposits = async () => {
        setIsError(false)
        let res = await dispatch(fetchDeposits())
        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        
        //filtering users
        let usersDeposits = res.message
        let filtrerdArr = usersDeposits.filter(data=>data.user.toString() === user.toString())

        setUserList(filtrerdArr)
        setfilteredUsers(filtrerdArr)
        setIsLoading(false)
    }



    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredUsers.filter((item) => {
                const itemData = item.depositId ? item.depositId : '';
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


    let depositHandler = (id) => {
        //navigate to deposits table for this user
        navigate(`/deposits/${user}/${id}`)
    }







    return (<>
        {isLoading && <Loader />}
        {isError && <Error />}

        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>
            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                <div className={styles.filter}>
                    <div className={styles.searchContainer}>
                        <div className={styles.searchBar}>
                            < input className={styles.input} placeholder='search by depositID' onChange={searchHandler} />
                            <span className='material-icons'>
                                search
                            </span>

                        </div>
                    </div>
                </div>
                <div className={styles.tableContainer} >

                

                    <table>
                        <tbody>




                            <tr>
                                <td>
                                    DepositID
                                </td>
                                <td>
                                    Date Of Deposit
                                </td>

                                <td>
                                    Amount

                                </td>


                                <td>
                                    Status

                                </td>

                            </tr>




                            {userList.map(data => <tr key={data.__id} onClick={() => depositHandler(data._id)}>
                               
                            
                                <td>
                                    {data.depositId}
                                </td>
                                <td>
                                    {data.dateOfDeposit}

                                </td>

                                <td>
                                    ${data.amount}

                                </td>

                                <td>
                                    {data.status}

                                </td>

                            </tr>)}


                        </tbody>
                    </table>

                </div>
            </div>
        </div></>)




}
