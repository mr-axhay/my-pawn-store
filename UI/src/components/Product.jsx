import { Link, useNavigate } from 'react-router-dom';
import { __productapiurl } from '../API_URL';
import Button from './Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Product.css';

function Product() {

    const navigate = useNavigate();

    const editProduct = (event) => {
        event.stopPropagation();
        //navigate to add categ
        navigate('/editProduct');
    }
    const addProduct = () => {
        //navigate to add categ
        navigate('/addProduct');
    }
    const viewProduct = (id) => {
        //navigate to add categ
        navigate(`/viewProduct/${id}`);
    }
    const [Product, setProduct] = useState([]);
    const removeProduct = (name, event) => {
        event.stopPropagation();
        axios.delete(__productapiurl + "delete",
            {
                data: {
                    condition_obj: JSON.stringify({ catnm: name })
                }
            }
        ).then((response) => {
            setProduct(response.data.info);
        }).catch((error) => {
            console.log(error);
        });
    }
    useEffect(() => {
        axios.get(__productapiurl + "fetch", /* {
          params: { "role": "user" }
        } */).then((response) => {
            //console.log(response.data.info);
            setProduct(response.data.info);
        }).catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <>
            <div className="Product-wrapper">

                <div className="Product-header">
                    <h1>Products</h1>

                    <Button
                        id="Product-button"
                        title="Add Product"
                        onClick={addProduct}
                        containerClass="add-Product-btn"
                    />
                </div>

                <div className="Product-grid">
                    {Product.length ?
                        (Product.map((cat, index) => (
                            <div className="Product-card" key={cat._id}
                                onClick={() => viewProduct(cat._id)}>

                                {/* <Button title='edit'></Button> */}
                                <i className="bi bi-pencil-fill"
                                    onClick={($event) => editProduct(/* cat.catnm, */$event)}></i>
                                <i className="bi bi-x-octagon-fill"
                                    onClick={($event) => removeProduct(cat.catnm, $event)}></i>
                                <div className='image'>
                                    <img
                                        src={`../../public/assets/uploads/caticons/${cat.caticonnm}`}
                                        alt={cat.catnm}
                                        className="Product-avatar"
                                    />
                                </div>
                                <h3>{cat.catnm}</h3>
                            </div>
                        ))
                        ) :
                        (
                            <h1>No Product Data found</h1>
                        )}
                </div>

            </div>
        </>
    );
}

export default Product;
