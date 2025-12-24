import { Link } from 'react-router-dom';
import { useCollection } from '../context/CollectionContext';
import './CategoryGrid.css';

const CategoryGrid = () => {
    const { collections } = useCollection();

    if (!collections || collections.length === 0) {
        return null; // Or some placeholder
    }

    return (
        <section className="categories-section container">
            <h2 className="collection-title serif-title">OUR COLLECTION</h2>
            <div className="category-grid">
                {collections.map((cat) => (
                    <Link key={cat.id} to={cat.link} className="category-card-link">
                        <div className="category-card vertical">
                            <div className="img-wrapper">
                                <img src={cat.image} alt={cat.title} className="category-image" />
                            </div>
                            <div className={`category-info-overlay pos-${cat.textPosition || 'middle'}`}>
                                <h3 className="cat-card-title" style={{ color: cat.textColor || '#ffffff' }}>{cat.title}</h3>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
};

export default CategoryGrid;
