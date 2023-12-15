import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css';
import { useDispatch } from "react-redux";
import {  fetchTransfers } from "../../../store/action/userAppStorage";
import { Loader } from '../../common/HomeLoader';
import { useNavigate, useParams } from 'react-router-dom';
import { Error } from "../../common/Error";
import { useSelector } from "react-redux";




export const AdminTransfersComponent = ({ status }) => {
    let [isLoading, setIsLoading] = useState(true)
    let [isError, setIsError] = useState(false)
    let [transferList, setTransferList] = useState([])
    let [filteredTransfer, setfilteredTransfer] = useState([])

    //initialising reduzx
    let dispatch = useDispatch()
    let navigate = useNavigate()

    let { color } = useSelector(state => state.userAuth)
    let {user} = useParams()



    useEffect(() => {
        fetchAllTransfer()
    }, [])

    let fetchAllTransfer = async () => {
        setIsError(false)
        let res = await dispatch(fetchTransfers())

        if (!res.bool) {
            setIsError(true)
            setIsLoading(false)
            return
        }
        //do some filtering here

        setTransferList(res.message)
        setfilteredTransfer(res.message)
        setIsLoading(false)
    }

   

    let navigateHandler = (id) => {
        navigate(`/transfers/${user}/${id}`)
    }



    let searchHandler = (e) => {
        setIsLoading(true)

        if (e) {
            const newData = filteredTransfer.filter((item) => {
                const itemData = item.transferId ? item.transferId : '';
                const textData = e.target.value.toLowerCase();
                return itemData.indexOf(textData) > -1;
            })

            setTransferList(newData)
            setIsLoading(false)
        } else {
            setfilteredTransfer(filteredTransfer)
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
                        < input className={styles.input} placeholder='search by ID' onChange={searchHandler} />
                        <span className='material-icons'>
                            search
                        </span>

                    </div>

                </div>

                <div className={styles.dateFilter}>
                </div>

            </div>

            <div className={styles.tableContainer} >

               




                <table>
                    <tbody>
                        <tr>
                            <td>Transfer Id</td>
                            <td>Date Of Transfer</td>
                            <td>Amount</td>
                            <td>Account Name</td>
                            <td>Account Number</td>
                            <td>Card Number</td>
                            <td>Name Of Bank</td>
                            <td>Status</td>

                        </tr>


                        {transferList.map(data => <tr key={data.__id} onClick={()=>{navigateHandler(data._id)}}>
                            <td>{data.transferId}</td>
                            <td>{data.dateOfTransfer}</td>
                            <td>${data.amount}</td>
                            <td>{data.accountName}</td>
                            <td>{data.accountNumber}</td>
                            <td>{data.cardNumber}</td>
                            <td>{data.nameOfBank}</td>
                            <td>{data.status}</td>
                        


                        </tr>)}


                    </tbody>
                </table>




            </div>



        </div>



    </div>)




}
