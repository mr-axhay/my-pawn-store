import { Link, useNavigate } from 'react-router-dom';
import { __categoryapiurl } from '../API_URL';
import Button from './Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Categories.css';

function Categories() {

    const navigate = useNavigate();

    const addCategory = () => {
        //navigate to add categ
        navigate('/addCategory');
    }

    const goToSubCategory = (name) => {
        //navigate to add categ
        navigate(`/subCategories/${name}`);
    }

    const goToAddSubCategory = (event, name) => {
        //navigate to add categ
        event.stopPropagation();
        navigate(`/addSubCategory/${name}`);
    }

     const removeCategory = (name, event) => {
        event.stopPropagation();
        axios.delete(__categoryapiurl + "delete",
            {
                data: {
                    condition_obj: JSON.stringify({ catnm: name })
                }
            }
        ).then((response) => {
             setCategories(response.data.info);
        }).catch((error) => {
            console.log(error);
        });
    }
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(__categoryapiurl + "fetch", /* {
          params: { "role": "user" }
        } */).then((response) => {
            setCategories(response.data.info);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <div className="categories-wrapper">

                <div className="categories-header">
                    <h2>Categories</h2>

                    <Button
                        id="category-button"
                        title="Add Category"
                        onClick={addCategory}
                        containerClass="add-category-btn"
                    />
                </div>

                <div className="category-grid">

                    {categories.map((cat, index) => (
                        <div className="category-card" key={cat._id}
                            onClick={() => goToSubCategory(cat.catnm)}>

                            {/* <Button title='edit'></Button> */}
                            <i className="bi bi-pencil-fill"></i>
                            <i className="bi bi-x-octagon-fill"
                            onClick={($event) => removeCategory(cat.catnm,$event)}></i>
                            <div className='image'>
                                <img
                                    src={`../../public/assets/uploads/caticons/${cat.caticonnm}`}
                                    alt={cat.catnm}
                                    className="category-avatar"
                                />
                            </div>
                            <h3>{cat.catnm}</h3>
                            <Button title='Add Sub-Category'
                                onClick={(event) => goToAddSubCategory(event, cat.catnm)}></Button>
                        </div>
                    ))}

                </div>

            </div>
        </>
    );
}

export default Categories;
