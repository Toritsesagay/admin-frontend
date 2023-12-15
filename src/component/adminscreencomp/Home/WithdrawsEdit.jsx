import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminWithrawEditComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState(null)
    let { color, withdrawsList } = useSelector(state => state.userAuth)

    let { id } = useParams()


    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value
        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }



    let submitHandler = (e) => {
        e.preventDefault()
        //patch case on 
        updateHandler(isData)

    }

    useEffect(() => {
        let dataObj = withdrawsList.find(data => data._id.toString() === id.toString())

        setIsData(dataObj)

    }, [id])




   
 




    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>
                

                {withdrawsList && isData && <form className={styles.editForm} onSubmit={submitHandler}>


                    <div className={styles.inputCards}>
                        <label>
                            Withdrawer Name
                        </label>
                        <input value={isData.user.email} type='text' readOnly />
                    </div>
                    
                    <div className={styles.inputCards}>
                        <label>
                            WithdrawerID
                        </label>
                        <input value={isData.withdrawId} type='text' readOnly />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Bitcoin address
                        </label>
                        <input  value={isData.bitcoin_address} type='text' readOnly/>
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Binance address
                        </label>
                        <input  value={isData.binance_address} type='text' readOnly/>
                    </div>
                 
                    <div className={styles.inputCards}>
                        <label>
                            Zelle
                        </label>
                        <input  value={isData.zelle_address} type='text' readOnly/>
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Etherium address
                        </label>
                        <input  value={isData.etherium_address} type='text' readOnly/>
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Cash App
                        </label>
                        <input  value={isData.cashapp_address} type='text' readOnly/>
                    </div>
                    
                    <div className={styles.inputCards}>
                        <label>
                            Amount
                        </label>
                        <input  value={isData.amount} onChange={(e) => handleChangeHandler(e, 'amount')} type='text' />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            Method
                        </label>
                        <input  value={isData.method}  type='text' readOnly/>
                    </div>
                    <div className={styles.inputCards}>
                        <label>
                            Swift
                        </label>
                        <input  value={isData.swift}  type='text' readOnly/>
                    </div>
                    <div className={styles.inputCards}>
                        <label>
                            Bank Name
                        </label>
                        <input  value={isData.bank_name}  type='text' readOnly/>
                    </div>
                    <div className={styles.inputCards}>
                        <label>
                            Account Number
                        </label>
                        <input  value={isData.account_number}  type='text' readOnly/>
                    </div>
                    <div className={styles.inputCards}>
                        <label>
                            Account Name
                        </label>
                        <input  value={isData.account_name}  type='text' readOnly/>
                    </div>
                    <div className={styles.inputCards}>
                        <label>
                            Gcash Name
                        </label>
                        <input  value={isData.name}  type='text' readOnly/>
                    </div>
                    <div className={styles.inputCards}>
                        <label>
                            Gcash Phone
                        </label>
                        <input  value={isData.phone}  type='text' readOnly/>
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            date
                        </label>
                        <input  value={isData.date}  type='text' readOnly/>
                    </div>




                    <div className={styles.inputCards}>
                        <label>
                            status
                        </label>
                        <select onChange={(e) => handleChangeHandler(e, 'status')}
                            value={isData.status}
                        >
                            <option>
                                active

                            </option>
                            <option>
                                Pending
                            </option>

                        </select>


                    </div>






                    <div className={styles.buttonContainer} >
                        <button >save</button>
                    </div>



                </form>}
            </div>






        </div></>)




}