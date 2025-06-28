import React, { useEffect, useState } from 'react';

const Home = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('/products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(() => setProducts([]));
    }, []);

    return (
        <div style={{ fontFamily: 'sans-serif', background: '#f8f9fa', minHeight: '100vh' }}>
            <section style={{ maxWidth: 1200, margin: '2rem auto', padding: '0 1rem' }}>
                <h2 style={{ fontSize: '2rem', marginBottom: '1.5rem', color: '#333' }}>Featured Products</h2>
                <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {products.map(product => (
                        <div key={product.id} style={{
                            background: '#fff',
                            borderRadius: 8,
                            boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
                            padding: '1rem',
                            width: 250,
                            textAlign: 'center'
                        }}>
                            <img src={product.image} alt={product.name} style={{ width: '100%', borderRadius: 8, marginBottom: '1rem' }} />
                            <h3 style={{ fontSize: '1.2rem', margin: '0.5rem 0' }}>{product.name}</h3>
                            <p style={{ color: '#27ae60', fontWeight: 'bold', margin: '0.5rem 0' }}>{product.price}</p>
                            <button style={{
                                background: '#222',
                                color: '#fff',
                                border: 'none',
                                borderRadius: 4,
                                padding: '0.5rem 1.5rem',
                                cursor: 'pointer',
                                fontWeight: 'bold'
                            }}>
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
