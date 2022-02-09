import react, {useEffect, useState} from "react";
import APIHandler from "../../API/APIHandler";


const Favorites = () => {

const [favorites, setFavorites] = useState([]);

useEffect(() => {
    APIHandler.get("/favorites")
    .then((res) => setFavorites(res.data.favorites))
    .catch((e) => console.log(e));
}, [])



    return (
        <>
        <h3>Your favorites restaurant</h3>
        {favorites.map((elem) => {
            return (
                <>

                <div className="card" style={{ width: "30rem" }}>
                <img
                    className="card-img-top"
                    src={elem.picture}
                    alt={elem.name}
                />
                <div className="card-body">
                    <h5 className="card-title">{elem.name}</h5>
                    <p className="card-text">{elem.description}</p>
                </div>
            </div>
        </>
            )
        })}
        </>
    )
}

export default Favorites;