
import * as api from '../api'

export const getsportsname = () => async(dispatch) => {
try{
    const {data}= await api.getsportsname()
    dispatch({type: 'getsportsname', payload: data})
}
catch(error){
console.log(error.message);
}
}


