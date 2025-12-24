import React, { useState } from 'react';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import './FilterSidebar.css';

const FilterGroup = ({ title, children, defaultOpen = true }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="filter-group">
            <div className="filter-header" onClick={() => setIsOpen(!isOpen)}>
                <h4>{title}</h4>
                {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
            {isOpen && <div className="filter-content">{children}</div>}
        </div>
    );
};

const FilterSidebar = ({ onApply, onClose }) => {
    const [filters, setFilters] = useState({
        categories: [],
        availability: [],
        size: [],
        priceMin: '',
        priceMax: ''
    });

    const handleCheckboxChange = (group, value) => {
        setFilters(prev => {
            const currentGroup = prev[group];
            if (currentGroup.includes(value)) {
                return { ...prev, [group]: currentGroup.filter(item => item !== value) };
            } else {
                return { ...prev, [group]: [...currentGroup, value] };
            }
        });
    };

    const handleInputChange = (field, value) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const handleApply = () => {
        onApply(filters);
    };

    const handleClear = () => {
        setFilters({
            categories: [],
            availability: [],
            size: [],
            priceMin: '',
            priceMax: ''
        });
    };

    return (
        <aside className="filter-sidebar">
            <div className="filter-header-main">
                <h3>Filters</h3>
                <button className="close-btn-mobile" onClick={onClose}><X size={20} /></button>
            </div>

            <div className="filter-scroll-area">
                <FilterGroup title="Availability">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={filters.availability.includes('In Stock')}
                            onChange={() => handleCheckboxChange('availability', 'In Stock')}
                        /> In Stock
                    </label>
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={filters.availability.includes('Out of Stock')}
                            onChange={() => handleCheckboxChange('availability', 'Out of Stock')}
                        /> Out of Stock
                    </label>
                </FilterGroup>

                <FilterGroup title="Price Range">
                    <div className="price-inputs">
                        <input
                            type="number"
                            placeholder="Min"
                            value={filters.priceMin}
                            onChange={(e) => handleInputChange('priceMin', e.target.value)}
                        />
                        <span>-</span>
                        <input
                            type="number"
                            placeholder="Max"
                            value={filters.priceMax}
                            onChange={(e) => handleInputChange('priceMax', e.target.value)}
                        />
                    </div>
                </FilterGroup>

                <FilterGroup title="Size">
                    <div className="size-grid">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                            <button
                                key={size}
                                className={`size-btn-filter ${filters.size.includes(size) ? 'active' : ''}`}
                                onClick={() => handleCheckboxChange('size', size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </FilterGroup>

                <FilterGroup title="Category">
                    {['Shirts', 'T-Shirts', 'Pants', 'Accessories'].map(category => (
                        <label key={category} className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={filters.categories.includes(category)}
                                onChange={() => handleCheckboxChange('categories', category)}
                            /> {category}
                        </label>
                    ))}
                </FilterGroup>
            </div>

            <div className="filter-actions">
                <button className="clear-btn" onClick={handleClear}>Clear All</button>
                <button className="apply-btn" onClick={handleApply}>Apply Filters</button>
            </div>
        </aside>
    );
};

export default FilterSidebar;
