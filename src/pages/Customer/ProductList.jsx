import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFetchCategories } from '../../hooks/useFetchCategories';
import { useFetchFilteredProducts } from '../../hooks/useFetchFilteredProducts';
import ProductFilter from '../../components/ui/product/ProductFilter';
import ProductCard from '../../components/ui/product/ProductCard';
import Pagination from '../../components/common/Pagination';
import Banner from "../../components/ui/home/Banner.jsx";

const sortOptions = [
    { value: '', label: 'Mặc định' },
    { value: 'createdDate,DESC', label: 'Mới nhất' },
    { value: 'unitPrice,ASC', label: 'Giá tăng dần' },
    { value: 'unitPrice,DESC', label: 'Giá giảm dần' },
    { value: 'totalSoldOut,DESC', label: 'Bán chạy' },
];

const ProductList = () => {
    const { products, totalItems, loading, error } = useFetchFilteredProducts();
    const { categories } = useFetchCategories();
    const [searchParams, setSearchParams] = useSearchParams();

    const pageNumber = Number(searchParams.get("pageNumber") || 0);
    const pageSize = Number(searchParams.get("pageSize") || 20);

    const currentSort = searchParams.get("sortBy") && searchParams.get("sortDirection")
        ? `${searchParams.get("sortBy")},${searchParams.get("sortDirection")}`
        : '';

    const handlePageChange = (newPage) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set("pageNumber", newPage);
        setSearchParams(newParams);
    };

    const handleSortChange = (e) => {
        const value = e.target.value;
        const newParams = new URLSearchParams(searchParams);
        if (value === '') {
            newParams.delete('sortBy');
            newParams.delete('sortDirection');
        } else {
            const [sortBy, sortDirection] = value.split(',');
            newParams.set('sortBy', sortBy);
            newParams.set('sortDirection', sortDirection);
        }
        newParams.set('pageNumber', 0);
        setSearchParams(newParams);
    };

    return (
        <div className="bg-gray-100 min-h-screen px-4 sm:px-6 lg:px-20 py-6 md:py-8 ">
            <div className="mb-6">
                <Banner
                    item={{
                        title: "SẢN PHẨM NỔI BẬT",
                        images: [{ imageUrl: "/banner-product.jpg" }]
                    }}
                    link="/products"
                />
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                <aside className="w-full lg:w-1/4">
                    <ProductFilter categories={categories || []} />
                </aside>

                <main className="flex-1">
                    {/* Sort Bar */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">Danh sách sản phẩm</h2>
                        <select
                            value={currentSort}
                            onChange={handleSortChange}
                            className="w-full sm:w-auto border border-gray-300 rounded-lg py-2.5 px-4 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                        >
                            {sortOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>

                    {loading ? (
                        <p className="text-center text-gray-500 text-sm">Đang tải sản phẩm...</p>
                    ) : error ? (
                        <p className="text-center text-red-500 text-sm">{error}</p>
                    ) : products.length === 0 ? (
                        <p className="text-center text-gray-500 text-sm">Không tìm thấy sản phẩm phù hợp</p>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                                {products.map((product) => (
                                    <ProductCard key={product.productId} product={product} />
                                ))}
                            </div>
                            <div className="mt-8 flex justify-center">
                                <Pagination
                                    currentPage={pageNumber}
                                    pageSize={pageSize}
                                    totalItems={totalItems}
                                    onPageChange={handlePageChange}
                                />
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    );
};

export default ProductList;