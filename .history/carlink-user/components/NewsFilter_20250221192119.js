import { useState } from "react";
import { Filter } from "lucide-react";

const FilterSection = ({ products, setFilteredProducts }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const types = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Type)).filter(Boolean))];
  const brands = [...new Set(products.flatMap(p => p.properties.map(prop => prop.Brand)).filter(Boolean))];

  const filterProducts = () => {
    let filtered = products;

    if (selectedTypes.length > 0) {
      filtered = filtered.filter(product =>
        product.properties.some(prop => selectedTypes.includes(prop.Type))
      );
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(product =>
        product.properties.some(prop => selectedBrands.includes(prop.Brand))
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(product =>
        (product.title && product.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.properties?.some(prop => prop.Type?.toLowerCase().includes(searchTerm.toLowerCase())) ||
        product.properties?.some(prop => prop.Brand?.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  };

  const handleToggleType = (type) => {
    setSelectedTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const handleToggleBrand = (brand) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value) {
      setSelectedTypes([]);
      setSelectedBrands([]);
    }
    filterProducts();
  };

  const handleApplyFilters = () => {
    filterProducts();
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setSelectedTypes([]);
    setSelectedBrands([]);
    setSearchTerm("");
    setFilteredProducts(products);
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50"
        >
          <Filter className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
          <div className="space-y-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Topics</h2>
              <div className="flex flex-wrap gap-2">
                {types.map(type => (
                  <button
                    key={type}
                    onClick={() => handleToggleType(type)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      selectedTypes.includes(type)
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-sm font-semibold text-gray-700 mb-2">Brands</h2>
              <div className="flex flex-wrap gap-2">
                {brands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => handleToggleBrand(brand)}
                    className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                      selectedBrands.includes(brand)
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {brand}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors font-medium"
              >
                Apply
              </button>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors font-medium"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterSection;