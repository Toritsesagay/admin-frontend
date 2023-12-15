import React, { useState, useEffect } from 'react';
import styles from '../../common/Home.module.css'
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';



export const AdminEditComponent = ({ updateHandler, }) => {

    let [isData, setIsData] = useState(null)
    let { color, admin } = useSelector(state => state.userAuth)

    let { id } = useParams()


    let handleChangeHandler = (e, nameField) => {
        let val = e.target.value

        setIsData(prev => {
            prev[`${nameField}`] = val
            let newData = { ...prev }
            return newData
        })

    }


    useEffect(() => {
        setIsData(admin)
    }, [id])



    let submitHandler = (e) => {
        e.preventDefault()
        updateHandler(isData)
        return

    }

   
    return (<>
        <div className={styles.homeScreen} style={{ backgroundColor: color.background }}>

            <div className={styles.timeline} style={{ backgroundColor: color.background }}>

                {admin && isData && <form className={styles.editForm} onSubmit={submitHandler}>


                    <div className={styles.inputCards}>
                        <label>
                            Email
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'email')} value={isData.email} type='text' required />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Password
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'password')} value={isData.password} type='text' required />
                    </div>

                    


                    <div className={styles.inputCards}>
                        <label>
                            Admin Phone Number
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'phoneNumber')} value={isData.phoneNumber} type='text' required />
                    </div>


                    <div className={styles.inputCards}>
                        <label>
                            Admin Name
                        </label>
                        <input onChange={(e) => handleChangeHandler(e, 'name')} value={isData.name} type='text' required />
                    </div>


                    <div className={styles.buttonContainer} >
                        <button >save</button>

                    </div>




                </form>}
            </div>






        </div></>)




}