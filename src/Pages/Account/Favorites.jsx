import react, { useEffect, useState } from "react";
import { useRef } from 'react';
import APIHandler from "../../API/APIHandler";
import { TrashIcon } from "@primer/octicons-react";


const Favorites = () => {

    const elementRef = useRef();

    const [favorites, setFavorites] = useState([]);

    const [content, setContent] = useState("");
    const [favoriteId, setFavoriteId] = useState("");


    useEffect(() => {
        APIHandler.get("/favorites")
            .then((res) => {
                console.log(res.data)
                setFavorites(res.data.favorites)
            })
            .catch((e) => console.log(e));
    }, [])


    const visibilityHandler = () => {
        elementRef.current.classList.toggle("collapse");
    }

    const reviewHandler = (e) => {
        e.preventDefault();
        console.log("this is the content", content);
        const data = {
            content,
            favoriteId,
        }
        APIHandler.post("/api/review/create", data)
            .then((res) => {
                console.log("this is what comes back from res data", res.data);

            })
            .catch((e) => console.log(e))
    }

    const handleChange = (e, id) => {
        setFavoriteId(id);
    }

    const handleDelete = (reviewId) => {
        APIHandler.delete(`/api/review/delete/${reviewId}`)
        .then((dbRes) => console.log(dbRes.data))
        .catch ((e) => console.log(e))
    }

    return (
        <>
            <h3 className="text-danger text-uppercase">Your favorite restaurants</h3>
            <div className="container">
                <div className="row">

                    {favorites.map((elem) => {
                        return (

                            <>


                                <div className="col-6">
                                    <div className="card" style={{ width: "30rem" }}>
                                        <img
                                            className="card-img-top"
                                            src={elem.picture}
                                            alt={elem.name}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title">{elem.name}</h5>
                                            <p className="card-text">{elem.description}</p>
                                            {elem.reviews && elem.reviews.map((review) => {
                                                return (
                                                    <div style={{ border: "2px solid blue", margin: "2rem" }}>
                                                        <p>{review.content} by <span style={{ color: "slateblue" }}>{review.writer.name}</span></p>
                                                        <span
                                                            style={{ cursor: "pointer" }}
                                                            onClick={() => handleDelete(review._id)}
                                                            className="col-sm p-4"
                                                        >
                                                            <TrashIcon size={24} />
                                                        </span>
                                                    </div>
                                                )
                                            })
                                            }

                                        </div>
                                    </div>

                                </div>
                                <div className="col-6">
                                    <p>
                                        <button onClick={visibilityHandler} className="btn btn-primary px-5 py-2" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                            LEAVE A COMMENT FOR THIS BUSINESS
                                        </button>
                                    </p>
                                    <div className="collapse" id="collapseExample" ref={elementRef}>
                                        <div className="card card-body">
                                            <form className="p-4" onSubmit={reviewHandler} onChange={(e) => handleChange(e, elem._id)}>
                                                <div className="form-group m-3">
                                                    <label htmlFor="comment" className="card-title"></label>
                                                    <input type="text" id="comment" min="1" className="form-control-file" onChange={(e) => setContent(e.target.value)} />
                                                </div>
                                                <button className="btn btn-primary px-5 py-2">POST COMMENT</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>

                            </>

                        )

                    })}


                </div>
            </div>
        </>
    )
}

export default Favorites;