import react, { useEffect, useState } from "react";
import { useRef } from 'react';
import APIHandler from "../../API/APIHandler";


const Favorites = () => {

    const elementRef = useRef();

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        APIHandler.get("/favorites")
            .then((res) => setFavorites(res.data.favorites))
            .catch((e) => console.log(e));
    }, [])


    const visibilityHandler = () => {
        elementRef.current.classList.toggle("collapse");
    }


    return (
        <>
            <h3 className="text-danger text-uppercase">Your favorite restaurants</h3>
            <div className="container">
                <div className="row">
                    <div className="col-6">
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
                    </div>
                    <div className="col-6">
                        <p>
                            <button onClick={visibilityHandler} className="btn btn-primary px-5 py-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                LEAVE A COMMENT FOR THIS BUSINESS
                            </button>
                        </p>
                        <div className="collapse" id="collapseExample" ref={elementRef}>
                            <div className="card card-body">
                                <form className="p-4">
                                <div className="form-group m-3">
                                    <label htmlFor="comment" className="card-title"></label>
                                    <input type="text" id="comment" min="1" className="form-control-file"/>
                                    </div>
                                    <button className="btn btn-primary px-5 py-2">POST COMMENT</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Favorites;