import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CocktailPage = () => {
    const { query } = useParams();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCocktails = async () => {
            try {
                const response = await axios.get(
                    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
                );
                setResults(response.data.drinks || []);
            } catch (error) {
                setError("Error fetching the cocktail data. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchCocktails();
    }, [query]);

    if (loading) {
        return (
            <div className="text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center mt-5">{error}</div>;
    }

    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
            <Link to="/" id="title" className="position-fixed top-0 start-0 m-3 fw-bold">
                Bar Bliss
            </Link>
            <div className="container" style={{ maxWidth: '70%', height: '70vh' }}>
                <h2 className="mb-4 text-center" id='text'>Here is your Cocktail "{query}"</h2>
                {results.length > 0 ? (
                    <div className="row">
                        {results.map((cocktail) => (
                            <div key={cocktail.idDrink} className="col-md-4 mb-3">
                                <div className="card shadow-sm">
                                    <img
                                        src={cocktail.strDrinkThumb}
                                        className="card-img-top"
                                        alt={cocktail.strDrink}
                                        style={{ height: '200px', objectFit: 'cover' }}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title" id='text'>
                                            <Link className="text-decoration-none text-dark" to={`/recipe/${cocktail.idDrink}`}>
                                                {cocktail.strDrink}
                                            </Link>
                                        </h5>
                                        <p className="card-text text-black" id='text'>
                                            {cocktail.strInstructions.substring(0, 100)}...
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center mt-5" id='text'>No results found for "{query}"</div>
                )}
            </div>
        </div>
    );
};

export default CocktailPage;
