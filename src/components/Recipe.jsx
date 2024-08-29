import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const Recipe = () => {
    const { id } = useParams();
    const [cocktail, setCocktail] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCocktailDetails = async () => {
            try {
                const response = await axios.get(
                    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
                );
                setCocktail(response.data.drinks[0]);
            } catch (error) {
                setError("Error fetching cocktail details. Please try again later.");
                console.error("Error fetching the cocktail details", error);
            }
        };

        fetchCocktailDetails();
    }, [id]);

    if (error) return <div className="text-center mt-5">{error}</div>;
    if (!cocktail) return (
        <div className="text-center mt-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );

    return (
        <div className="min-vh-100 d-flex flex-column">
            <Link to="/" id="title" className="position-fixed top-0 start-0 m-3 fw-bold">
                Bar Bliss
            </Link>
            <div className="d-flex justify-content-center align-items-center flex-grow-1">
                <div className="container d-flex flex-column align-items-center" style={{ maxWidth: '60%' }}>
                    <div className="row">
                        <div className="col-md-6 mb-4 d-flex justify-content-center align-items-center">
                            <img
                                src={cocktail.strDrinkThumb}
                                className="img-fluid rounded shadow-lg"
                                alt={cocktail.strDrink}
                                style={{ maxHeight: '400px', objectFit: 'cover' }}
                            />
                        </div>
                        <div className="col-md-6 d-flex flex-column justify-content-center" id='text'>
                            <h1 className="mb-3 text-center"><strong>{cocktail.strDrink}</strong></h1>
                            <h4><strong>Category:</strong> {cocktail.strCategory}</h4>
                            <h4><strong>Alcoholic:</strong> {cocktail.strAlcoholic}</h4>
                            <h4><strong>Glass:</strong> {cocktail.strGlass}</h4>
                            <h4><strong>Instructions:</strong> {cocktail.strInstructions}</h4>
                            <h4><strong>Ingredients:</strong>
                                <ul className="list-unstyled">
                                    {Object.keys(cocktail)
                                        .filter(key => key.startsWith('strIngredient') && cocktail[key])
                                        .map((key, index) => (
                                            <li key={index}>{cocktail[key]} - {cocktail[`strMeasure${key.slice(13)}`]}</li>
                                        ))}
                                </ul>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Recipe;
