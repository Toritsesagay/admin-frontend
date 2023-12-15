export const SIGNUP_USER = "SIGNUP_USER";
export const LOGIN_ADMIN = "LOGIN_ADMIN";
export const LOG_ADMIN_IN = 'LOG_ADMIN_IN'
export const LOGOUT = 'LOGOUT'
export const GET_THEME = 'GET_THEME'

export const FETCH_USERS = 'FETCH_USERS'
export const FETCH_USER = 'FETCH_USER'
export const UPDATE_USER = 'UPDATE_USER'
export const DELETE_USER = 'DELETE_USER'

export const FETCH_DEPOSITS = 'FETCH_DEPOSITS'
export const FETCH_DEPOSIT= 'FETCH_DEPOSIT'
export const UPDATE_DEPOSIT = 'UPDATE_DEPOSIT'
export const DELETE_DEPOSIT = 'DELETE_DEPOSIT'


export const FETCH_WITHDRAWS = 'FETCH_WITHDRAW'
export const FETCH_WITHDRAW= 'FETCH_WITHDRAW'
export const UPDATE_WITHDRAW = 'UPDATE_WITHDRAW'
export const DELETE_WITHDRAW = 'DELETE_WITHDRAW'

export const FETCH_TRANSFERS = 'FETCH_TRANSFERS'
export const FETCH_TRANSFER = 'FETCH_TRANSFER'
export const UPDATE_TRANSFER = 'UPDATE_TRANSFER'
export const DELETE_TRANSFER = 'DELETE_TRANSFER'
export const CREATE_TRANSFER = 'CREATE_TRANSFER'
export const UPDATE_ADMIN = 'UPDATE_ADMIN'

//pure functions to calculate the time remaining

let calculateRemainingTime = (expiryDate) => {
  //getting current time in milliseconds
  const currentTime = new Date().getMilliseconds()
  //getting expiration time in milliseconds
  const adjustExpirationTime = (expiryDate * 60 * 60 * 1000)
  const timeLeft = adjustExpirationTime - currentTime
  return timeLeft
}

/* admin section */
let retrievedAdminStoredToken = () => {
  let tokenFromStorage = localStorage.getItem('admin_token')
  let expiryDate = localStorage.getItem('admin_expiry')
  const timeLeft = calculateRemainingTime(expiryDate)

  if (timeLeft <= 3600) {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_expiry')
    localStorage.removeItem('admin')

    return {
      adminToken: "",
      adminExpiresIn: ""

    }
  }

  return {
    adminToken: tokenFromStorage,
    adminExpiresIn: timeLeft
  }
}

export const checkIfAdminIsLoggedIn = () => {
  return async (dispatch, getState) => {
    try {
      let response
      //check if token is expired
      let { adminToken, adminExpiresIn } = retrievedAdminStoredToken()

      if (!adminToken) {
        return
      }
      //convert expiresIN backt to hours
      adminExpiresIn = adminExpiresIn / (60 * 60 * 1000)

      localStorage.setItem('admin_token', adminToken)
      localStorage.setItem('admin_expiry', adminExpiresIn)

      let admin = JSON.parse(localStorage.getItem('admin'))

      if (!admin) {
        return
      }
    
      response = await fetch(`https://mobile-backend-kfdr.onrender.com/adminbytoken`, {
        method: "GET",
        headers:{
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      if (response.status == 200) {
        let data = await response.json()
        data.response.token = adminToken
        dispatch({ type: LOG_ADMIN_IN, payload: data.response })
      }
    } catch (err) {

    }
  }
}

export const loginAdmin = (data) => {
  let dataObj = data
  return async (dispatch, getState) => {
    try {
      let response = await fetch('https://mobile-backend-kfdr.onrender.com/adminlogin', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/adminsignup'
        }
      }

      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/adminlogin'
        }
      }


      if (response.status === 200) {
        let data = await response.json()
        //saving credentials to local storage

        localStorage.setItem("admin", JSON.stringify(data.response.admin))

        localStorage.setItem("admin_token", JSON.stringify(data.response.token))

        localStorage.setItem("admin_expiry", JSON.stringify(data.response.expiresIn))
        //dispatch login events
        dispatch({ type: LOGIN_ADMIN, payload: data.response })

        return {
          bool: true,
          message: data.response,
          url: `/users`
        }
      }
    }
    catch (err) {
      return {
        bool: false,
        message: err.message,
        url: `/adminlogin`
      }
    }
  }

}
export const signupAdmin = (data) => {
  let dataObj = data
  return async (dispatch, getState) => {
    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/adminsignup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      })

      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
          url: '/adminsignup'
        }
      }

      if (response.status === 301) {
        let data = await response.json()

        return {
          bool: false,
          message: data.response,
          url: '/adminlogin'
        }
      }
   

      if (response.status === 200) {
        let data = await response.json()
        localStorage.setItem("admin", JSON.stringify(data.response.admin))

        localStorage.setItem("admin_token", JSON.stringify(data.response.token))

        localStorage.setItem("admin_expiry", JSON.stringify(data.response.expiresIn))
        //dispatch login events
        dispatch({ type: LOGIN_ADMIN, payload: data.response })


        return {
          bool: true,
          message: data.response,
          url: `/users`
        }
      }

    }
    catch (err) {
      return {
        bool: false,
        message: err.message,
        url: `/adminsignup`
      }
    }
  }
}


export const fetchUsers = ()=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth
    try {
      let response = await fetch('https://mobile-backend-kfdr.onrender.com/users', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
     
      if (response.status === 404) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }
       //an error 

      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_USERS,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const deleteUser = (id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({type:DELETE_USER,payload:id})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const updateUser = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/users`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_USER,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

export const fetchDeposits = ()=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/deposits`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_DEPOSITS,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const deleteDeposit = (id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/deposits/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({type:DELETE_DEPOSIT,payload:id})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}

export const updateDeposit = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/deposits/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_DEPOSIT,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}



//withdraw methods
export const fetchWithdraws = ()=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/withdraws`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_WITHDRAWS,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}
export const deleteWithdraw = (id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/withdraws/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({type:DELETE_WITHDRAW,payload:id})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}
export const updateWithdraw = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/withdraws/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_WITHDRAW,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}





//transfer methods
export const fetchTransfers = ()=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/transfers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:FETCH_TRANSFERS,payload:data.response})

        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}
export const deleteTransfer = (id)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/trades/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        }
      })
      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()

        dispatch({type:DELETE_TRANSFER,payload:id})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      return {
        bool: false,
        message: err.message
      }
    }
  }

}


export const updateTransfer = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/transfers/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_TRANSFER,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}





export const createTransfer = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/trades`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:CREATE_TRANSFER,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}







export const updateAdmin = (data)=>{
  return async (dispatch, getState) => {
    let {
      adminToken
    } = getState().userAuth

    try {
      let response = await fetch(`https://mobile-backend-kfdr.onrender.com/admin/${data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "header": `${adminToken}`
        },
        body:JSON.stringify(data)
      })


      //an error 
      if (response.status === 300) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 301) {
        let data = await response.json()
        return {
          bool: false,
          message: data.response,
        }
      }

      if (response.status === 200) {
        let data = await response.json()
        dispatch({type:UPDATE_ADMIN,payload:data.response})
        return {
          bool: true,
          message: data.response
        }
      }
    }

    catch (err) {
      console.log(err)
      return {
        bool: false,
        message: err.message
      }
    }
  }
}

export const logout = (id)=>{
  return async (dispatch, getState) => {

  }

}


















