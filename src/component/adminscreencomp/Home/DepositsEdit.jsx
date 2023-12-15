import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';


export const AdminDepositEditComponent = ({ updateHandler, }) => {
    let [isData, setIsData] = useState(null)
    let [isEmail, setIsEmail] = useState(null)
    let { color, depositsList,usersList } = useSelector(state => state.userAuth)
    let { id,user } = useParams()


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
        console.log(isData)
        updateHandler(isData)
    }

    useEffect(() => {
        let dataObj = depositsList.find(data => data._id.toString() === id.toString())
        setIsData(dataObj)
        let foundUser = usersList.find(data => data._id.toString() === user.toString())
        setIsEmail(foundUser.email)

    }, [id])








    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>

                {depositsList && isData && <form className={styles.editForm} onSubmit={submitHandler}>

                    <div className={styles.inputCards}>
                        <label>
                            Depositor Email
                        </label>
                        <input value={isEmail} type='text' readOnly />
                    </div>

                    <div className={styles.inputCards}>
                        <label>
                            DepositID
                        </label>
                        <input value={isData.depositId} type='text' readOnly />
                    </div>
                    
                    <div className={styles.inputCards}>
                        <label>
                            Amount
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'amount')} value={isData.amount} type='text' />
                    </div>
                  

                    <div className={styles.inputCards}>
                        <label>
                            Date Of Deposit
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'dateOfDeposit')} value={isData.dateOfDeposit} type='date' />
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
                            <option >
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