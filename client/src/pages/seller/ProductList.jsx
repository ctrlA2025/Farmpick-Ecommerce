import React from 'react'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'
import { useState } from 'react'

const ProductList = () => {
    const { products, currency, axios, fetchProducts } = useAppContext()

    const [editProduct, setEditProduct] = useState(null);
    const [updatedProduct, setUpdatedProduct] = useState({});
    const [images, setImages] = useState([]);

    const handleEdit = (product) => {
        setEditProduct(product);
        setUpdatedProduct(product);
        setImages([]);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            const { data } = await axios.delete(`/api/product/delete/${id}`);
            if (data.success) {
                toast.success(data.message);
                fetchProducts();
            } else {
                toast.error(data.message);
            }
        }
    };


    const toggleStock = async (id, inStock) => {
        try {
            const { data } = await axios.post('/api/product/stock', { id, inStock });
            if (data.success) {
                fetchProducts();
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }
    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium">All Products</h2>
                <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Product</th>
                                <th className="px-4 py-3 font-semibold truncate">Category</th>
                                {/* <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th> */}
                                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500">
                            {products.map((product) => (
                                <tr key={product._id} className="border-t border-gray-500/20">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                        <div className="border border-gray-300 rounded p-2">
                                            <img src={product.image[0]} alt="Product" className="w-16" />
                                        </div>
                                        <span className="truncate max-sm:hidden w-full">{product.name}</span>
                                    </td>
                                    <td className="px-4 py-3">{product.category?.name}</td>
                                    {/* <td className="px-4 py-3 max-sm:hidden">
                                        {product.variants && product.variants.length > 0
                                            ? `${currency}${product.variants[0].offerPrice}`
                                            : 'N/A'}
                                    </td> */}
                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
                                            <input
                                                type="checkbox"
                                                checked={product.inStock}
                                                onChange={() => toggleStock(product._id, !product.inStock)}
                                                className="sr-only peer"
                                            />

                                            <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>
                                    <td className="px-4 py-3 flex gap-2">
                                        <button
                                            onClick={() => handleEdit(product)}
                                            className="text-blue-600 underline"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(product._id)}
                                            className="text-red-600 underline"
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {editProduct && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                            <div className="bg-white p-6 rounded w-full max-w-lg overflow-y-auto max-h-[80vh]">
                                <h2 className="text-lg mb-4">Edit Product</h2>

                                <input
                                    value={updatedProduct.name}
                                    onChange={(e) =>
                                        setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                                    }
                                    className="border p-2 w-full mb-2"
                                    placeholder="Name"
                                />

                                <textarea
                                    value={updatedProduct.description.join("\n")}
                                    onChange={(e) =>
                                        setUpdatedProduct({
                                            ...updatedProduct,
                                            description: e.target.value.split("\n"),
                                        })
                                    }
                                    className="border p-2 w-full mb-2"
                                    placeholder="Description"
                                />

                                <input
                                    value={updatedProduct.category}
                                    onChange={(e) =>
                                        setUpdatedProduct({ ...updatedProduct, category: e.target.value })
                                    }
                                    className="border p-2 w-full mb-2"
                                    placeholder="Category"
                                />

                                <div className="mb-2">
                                    <label>Upload New Images:</label>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) => setImages(e.target.files)}
                                        className="border p-2 w-full"
                                    />
                                </div>

                                {/* Variants */}
                                <div className="mb-2">
                                    <h3 className="font-semibold mb-2">Variants:</h3>
                                    {updatedProduct.variants.map((variant, index) => (
                                        <div key={index} className="border p-2 mb-2 rounded">
                                            <input
                                                className="border p-1 mr-2"
                                                placeholder="Unit"
                                                value={variant.unit}
                                                onChange={(e) => {
                                                    const variants = [...updatedProduct.variants];
                                                    variants[index].unit = e.target.value;
                                                    setUpdatedProduct({ ...updatedProduct, variants });
                                                }}
                                            />
                                            <input
                                                className="border p-1 mr-2"
                                                placeholder="Weight"
                                                type="number"
                                                value={variant.weight}
                                                onChange={(e) => {
                                                    const variants = [...updatedProduct.variants];
                                                    variants[index].weight = Number(e.target.value);
                                                    setUpdatedProduct({ ...updatedProduct, variants });
                                                }}
                                            />
                                            <input
                                                className="border p-1 mr-2"
                                                placeholder="Price"
                                                type="number"
                                                value={variant.price}
                                                onChange={(e) => {
                                                    const variants = [...updatedProduct.variants];
                                                    variants[index].price = Number(e.target.value);
                                                    setUpdatedProduct({ ...updatedProduct, variants });
                                                }}
                                            />
                                            <input
                                                className="border p-1"
                                                placeholder="Offer Price"
                                                type="number"
                                                value={variant.offerPrice}
                                                onChange={(e) => {
                                                    const variants = [...updatedProduct.variants];
                                                    variants[index].offerPrice = Number(e.target.value);
                                                    setUpdatedProduct({ ...updatedProduct, variants });
                                                }}
                                            />
                                        </div>
                                    ))}
                                    <button
                                        onClick={() =>
                                            setUpdatedProduct({
                                                ...updatedProduct,
                                                variants: [
                                                    ...updatedProduct.variants,
                                                    { unit: "", weight: 0, price: 0, offerPrice: 0 },
                                                ],
                                            })
                                        }
                                        className="text-blue-600 underline mb-4"
                                    >
                                        + Add Variant
                                    </button>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={async () => {
                                            const formData = new FormData();
                                            formData.append("productData", JSON.stringify(updatedProduct));
                                            formData.append("id", updatedProduct._id);
                                            for (let i = 0; i < images.length; i++) {
                                                formData.append("images", images[i]);
                                            }

                                            const { data } = await axios.post(
                                                "/api/product/edit",
                                                formData,
                                                {
                                                    headers: { "Content-Type": "multipart/form-data" },
                                                }
                                            );

                                            if (data.success) {
                                                toast.success(data.message);
                                                fetchProducts();
                                                setEditProduct(null);
                                            } else {
                                                toast.error(data.message);
                                            }
                                        }}
                                        className="bg-blue-600 text-white px-4 py-2 rounded"
                                    >
                                        Save
                                    </button>
                                    <button
                                        onClick={() => setEditProduct(null)}
                                        className="bg-gray-400 text-white px-4 py-2 rounded"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </div>
    )
}

export default ProductList
