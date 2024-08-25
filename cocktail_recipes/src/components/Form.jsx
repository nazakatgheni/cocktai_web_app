import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const Form = (props) => {
    const [recipes, setRecipes] = useState("");
    const navigate = useNavigate();

    const handleCocktail = e => {
        setRecipes(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
        if (recipes) {
            navigate(`/search/${recipes}`);
        }
        setRecipes("");
    }


    return (
        <div className="min-vh-100 d-flex justify-content-center align-items-center">
            <div className="container text-center">
                <Link to="/" id="title" className="text-decoration-none text-dark fw-bold">Bar Bliss</Link>
                <form onSubmit={handleSubmit}>
                    <div className="row justify-content-center">
                        <div className="col-md-6 col-8">
                            <input
                                className="form-control mb-2 rounded-pill shadow-lg text-black"
                                type="text"
                                placeholder="What do you want to drink?" id='text'
                                onChange={handleCocktail}
                                value={recipes}
                            />
                        </div>
                        <div className="col-md-2 col-4">
                            <input
                                className="btn bg-custom w-100 rounded-5 shadow-lg"
                                type="submit"
                                value="Search" id='text'
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Form