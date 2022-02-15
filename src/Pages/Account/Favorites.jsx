import react, { useEffect, useState } from "react";
import { useRef } from 'react';
import APIHandler from "../../API/APIHandler";
import { TrashIcon } from "@primer/octicons-react";


const Favorites = () => {

    const elementRef = useRef();

    const [favorites, setFavorites] = useState([]);

    const [content, setContent] = useState("");
    const [favoriteId, setFavoriteId] = useState("");
    // const [comments, setComments] = useState("");


    useEffect(() => {
        APIHandler.get("/favorites")
            .then((res) => {
                console.log(res.data)
                setFavorites(res.data.favorites)
                console.log("those are the favorites", favorites)
            })
            .catch((e) => console.log(e));
    }, [])

    // Toggle the dropdown.

    const visibilityHandler = () => {
        elementRef.current.classList.toggle("collapse");
    }

    // Allows to create a review.

    const reviewHandler = (e) => {
        e.preventDefault();
        console.log("this is the content", content);
        const data = {
            content,
            favoriteId,
        }
        APIHandler.post("/api/review/create", data)
            .then((res) => {
                console.log("this is what comes back from res data", res.data._id);
                setFavorites((prevValues) => {
                    const filtered = prevValues.filter(elem => elem._id !== res.data._id);
                    const newValue = res.data;
                    const newArray = [...filtered, newValue];
                    return newArray;
                })


            })
            .catch((e) => console.log(e))
    }

    const handleChange = (e, id) => {
        setFavoriteId(id);
    }

    // Delete handler, trying to retrieve the business of the array.

    const handleDelete = (e, reviewId, favorites) => {
        console.log("this is the complete array normally", favorites);
        console.log('this is the reviewId', reviewId);

        let myIndex;

        favorites.map((elem, index, array) => {
            if (elem.reviews.find((el) => el._id === reviewId)) {
                myIndex = index;
            } else {
                myIndex = 0
            }
        })
        console.log(myIndex);

        let businessId = favorites[myIndex]._id;
        console.log(businessId);

        APIHandler.delete(`/api/review/delete/${reviewId}/${businessId}`)
            .then((dbRes) => {
                console.log(dbRes.data);
                setFavorites((prevValues) => {
                    const filtered = prevValues.filter(elem => elem._id !== dbRes.data._id);
                    console.log("pls get there", filtered)
                    const newValue = dbRes.data;
                    console.log("new value", newValue)
                    const newArray = [...filtered, newValue];
                    return newArray;
                })
            }
            )
            .catch((e) => console.log(e))
    }

    return (
        <>

            <div className="container-fluid pt-3 pb-3 background">
                {/* <h3 className="text-uppercase" style={{ color: "red" }}>Your favorite restaurants</h3> */}
                <div className="row pt-3">

                    {favorites.map((elem, index, favorites) => {
                        return (

                            <>
                                <div className="col-6">
                                    <div className="card" style={{ width: "auto", margin: "2%", borderRadius: "10px", color: "red", backgroundColor: "rgb(255, 172, 141)" }}>
                                        <img
                                            className="img-card-top p-5"
                                            src={elem.picture}
                                            alt={elem.name}
                                            style={{ borderRadius: "5%", maxHeight: "400px" }}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title text-uppercase" style={{ color: "red" }}>{elem.name}</h5>
                                            <p className="card-text">{elem.description}</p>
                                            {elem.reviews && elem.reviews.map((review) => {
                                                return (
                                                    <div style={{ color: "white", width: "auto", margin: "2rem", padding: "4em" }} className='d-inline-flex p-1 bg-dark'>
                                                        <p>{review.content} by <span style={{ color: "#FFB396" }}>{review.writer?.name}</span></p>
                                                        <span
                                                            style={{ cursor: "pointer" }}
                                                            onClick={(e) => handleDelete(e, review._id, favorites)}
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
                                        <button onClick={visibilityHandler} className="btn px-5 py-2 bg-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample" style={{color: "silver"}}>
                                            LEAVE A REVIEW FOR THIS ENTERPRISE
                                        </button>
                                    </p>
                                    <div className="collapse rounded" id="collapseExample" ref={elementRef}>
                                        <div className="card card-body rounded">
                                            <form className="p-4" onSubmit={reviewHandler} onChange={(e) => handleChange(e, elem._id)}>
                                                <div className="form-group m-3">
                                                    <label htmlFor="comment" className="card-title"></label>
                                                    <input type="text" id="comment" min="1" className="form-control-file" style={{ width: "80%", height: "300px", backgroundColor: "rgb(255, 172, 141)" }} onChange={(e) => setContent(e.target.value)} />
                                                </div>
                                                <button className="btn px-5 py-2" style={{ color: "#FF4646", fontWeight: "bolder" }}>POST COMMENT</button>
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