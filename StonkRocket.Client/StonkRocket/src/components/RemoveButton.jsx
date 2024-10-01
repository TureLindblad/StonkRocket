import { useContext } from "react"
import config from "../config"
import { AuthContext } from "../authContext";

const RemoveButton = ({ ticker }) => {
    const { user, getUser } = useContext(AuthContext);

    const removeFavourite = () => {
        fetch(`${config.stonkRocketApiUrl}/user/stocks/${user.id}?ticker=${ticker}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => {
            getUser(user.id)
            if (!response.ok) {
                throw new Error(`Unable to delete with error code: ${response.status}`)
            }
        })
        .catch(error => {
            console.log('Error removing data', error)
            alert(`Error removing data: ${error.message}`)
        })
    }

    return (
        <button className="dashBoardButton" onClick={removeFavourite}><i className="fa fa-trash"></i> Unfollow</button>
    )
}

export default RemoveButton