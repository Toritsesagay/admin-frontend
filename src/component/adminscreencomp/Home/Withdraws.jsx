import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import { fetchWithdraws } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";



export const AdminWithdrawsComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [withdrawList, setWithdrawList] = useState([])
    let [filteredWithdraws, setfilteredWithdraws] = useState([])
    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let { color } = useSelector(state => state.userAuth)


    useEffect(() => {
        fetchAllWithdraws()
    }, [])




    let fetchAllWithdraws = async () => {
        setIsError(false)
        let res = await dispatch(fetchWithdraws())

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }

        //do some filtering here

        setWithdrawList(res.message)
        setfilteredWithdraws(res.message)
        setIsLoading(false)
    }



    let navigateHandler = (id) => {
        //navigate to the next page
        navigate(`/withdraws/${id}`)
    }



    let searchHandler = (e) => {
        setIsLoading(true)
        if (e) {
            const newData = filteredWithdraws.filter((item) => {
                const itemData = item.user.email ? item.user.email : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })

            setWithdrawList(newData)
            setIsLoading(false)
        } else {
            setWithdrawList(filteredWithdraws)
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

                <div className={styles.dateFilter}>
                </div>


            </div>

            <div className={styles.tableContainer} >

                {withdrawList.length === 0 && <div className={styles.emptyContainer}>
                    <p>No withdraw found</p>
                </div>}

                {withdrawList.length !== 0 && <table>
                    <tbody>
                        <tr>
                            <td>
                                Name Of Withdrawer
                            </td>
                            <td>
                                WithdrawID
                            </td>
                            <td>
                                Amount

                            </td>
                            <td>
                                Swift/ Route Number

                            </td>
                            <td>
                                Bank Name

                            </td>

                            <td>
                                Account Number

                            </td>

                            <td>
                                Account Name
                            </td>
                            <td>
                                Bank Address
                            </td>

                            <td>
                                State Name
                            </td>

                        </tr>

                        {withdrawList.map(data => <tr key={data.__id}  onClick={navigateHandler}>
                            <td>
                                {data.nameOfWithdrawer}
                            </td>
                            <td>
                                {data.withdrawID}
                            </td>
                            <td>
                                {data.amount}

                            </td>
                            <td>
                                {data.swift}

                            </td>
                            <td>
                                {data.bankName}
                            </td>

                            <td>
                                {data.accountNumber}
                            </td>

                            <td>
                                {data.accountName}
                            </td>
                            <td>
                                {data.bankAddress}
                            </td>

                            <td>
                                {data.stateName}
                            </td>

                            


                        </tr>)}


                    </tbody>
                </table>}

            </div>



        </div>



    </div>)




}
