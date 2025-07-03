import React, { useState, useEffect } from "react";
import ShowSection from "../../common/ShowSection.jsx";
import { useFetchBrands } from "../../../hooks/useFetchBrands.js";
import FilterGroup from "./FilterGroup.jsx";
import ColorFilterGroup from "./ColorFilterGroup.jsx";
import SizeFilterGroup from "./SizeFilterGroup.jsx";
import PriceRangeFilter from "./PriceRangeFilter.jsx";
import { useSearchParams } from "react-router-dom";

const ProductFilter = ({ categories }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [localFilters, setLocalFilters] = useState({});
    const [sectionVisibility, setSectionVisibility] = useState({
        categories: true,
        brands: true,
        materials: true,
        sizes: true,
        colors: true,
        price: true,
    });

    const { brands, loading: brandsLoading } = useFetchBrands();

    useEffect(() => {
        const fromParams = {};
        for (const [key, value] of searchParams.entries()) {
            fromParams[key] = value.includes(',') ? value.split(',') : value;
        }
        setLocalFilters(fromParams);
    }, [searchParams]);

    const toggleSection = (key) => {
        setSectionVisibility((prev) => ({
            ...prev,
            [key]: !prev[key],
        }));
    };

    const updateField = (key, selected) => {
        setLocalFilters((prev) => ({
            ...prev,
            [key]: selected,
        }));
    };

    const handleApplyFilters = () => {
        const newParams = {};

        Object.entries(localFilters).forEach(([key, val]) => {
            if (val !== '' && val !== null && val !== undefined) {
                newParams[key] = Array.isArray(val) ? val.join(',') : val;
            }
        });

        const keepParams = ['sortBy', 'sortDirection', 'pageSize'];
        keepParams.forEach((key) => {
            if (searchParams.get(key)) newParams[key] = searchParams.get(key);
        });

        newParams.pageNumber = 0;
        setSearchParams(newParams);
    };

    const handleResetFilters = () => {
        const resetParams = {};
        const keepParams = ['sortBy', 'sortDirection', 'pageSize'];

        keepParams.forEach((key) => {
            if (searchParams.get(key)) resetParams[key] = searchParams.get(key);
        });

        setSearchParams(resetParams);
    };

    const materialOptions = ["COTTON", "DENIM", "NYLON", "RECYCLED NYLON", "RECYCLED POLYESTER"];
    const sizeOptions = ["34", "35", "36", "37", "38", "39", "40", "42"];
    const colorOptions = ["#4169e1", "#ffa500", "#000000", "#2e8b57", "#333333", "#d2691e", "#c0c0c0", "#708090", "#8b4513"];

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold border-b pb-2">BỘ LỌC</h2>

            <ShowSection
                label="PHÂN LOẠI SẢN PHẨM"
                show={sectionVisibility.categories}
                onToggle={() => toggleSection("categories")}
            >
                <FilterGroup
                    label="Danh mục"
                    options={categories.map((c) => ({
                        label: c.categoryName,
                        value: c.categoryId,
                    }))}
                    selectedOptions={localFilters.categories || []}
                    onChange={(selected) => updateField("categories", selected)}
                />
            </ShowSection>

            <ShowSection
                label="THƯƠNG HIỆU"
                show={sectionVisibility.brands}
                onToggle={() => toggleSection("brands")}
            >
                {brandsLoading ? (
                    <p className="text-gray-500">Đang tải thương hiệu...</p>
                ) : (
                    <FilterGroup
                        label="Thương hiệu"
                        options={brands.map((b) => ({
                            label: b.brandName,
                            value: b.brandId,
                        }))}
                        selectedOptions={localFilters.brands || []}
                        onChange={(selected) => updateField("brands", selected)}
                    />
                )}
            </ShowSection>

            <ShowSection
                label="CHẤT LIỆU"
                show={sectionVisibility.materials}
                onToggle={() => toggleSection("materials")}
            >
                <FilterGroup
                    label="Chất liệu"
                    options={materialOptions}
                    selectedOptions={localFilters.materials || []}
                    onChange={(selected) => updateField("materials", selected)}
                />
            </ShowSection>

            <ShowSection
                label="KÍCH CỠ"
                show={sectionVisibility.sizes}
                onToggle={() => toggleSection("sizes")}
            >
                <SizeFilterGroup
                    options={sizeOptions}
                    selectedOptions={localFilters.sizes || []}
                    onChange={(selected) => updateField("sizes", selected)}
                />
            </ShowSection>

            <ShowSection
                label="MÀU SẮC"
                show={sectionVisibility.colors}
                onToggle={() => toggleSection("colors")}
            >
                <ColorFilterGroup
                    colors={colorOptions}
                    selectedColors={localFilters.colors || []}
                    onChange={(selected) => updateField("colors", selected)}
                />
            </ShowSection>

            <ShowSection
                label="KHOẢNG GIÁ"
                show={sectionVisibility.price}
                onToggle={() => toggleSection("price")}
            >
                <PriceRangeFilter
                    min={0}
                    max={3000000}
                    values={[
                        Number(localFilters.minPrice) || 0,
                        Number(localFilters.maxPrice) || 3000000,
                    ]}
                    onChange={([min, max]) => {
                        updateField("minPrice", min);
                        updateField("maxPrice", max);
                    }}
                />
            </ShowSection>

            <div className="pt-4 flex gap-4">
                <button
                    onClick={handleApplyFilters}
                    className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
                >
                    Áp dụng
                </button>
                <button
                    onClick={handleResetFilters}
                    className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
                >
                    Đặt lại
                </button>
            </div>
        </div>
    );
};

export default ProductFilter;
