import React, { useState, useEffect } from 'react'
import { assets, categories } from '../../assets/assets';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const AddProduct = () => {
  const [files, setFiles] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]); // ✅
  const [variants, setVariants] = useState([
    { unit: '', weight: '', price: '', offerPrice: '' },
  ]);

  const { axios } = useAppContext();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get("/api/category/all");
        if (data.success) {
          setCategories(data.categories);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };

    fetchCategories();
  }, []);

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const productData = {
        name,
        description: description.split('\n'),
        category,
        variants,
      };

      const formData = new FormData();
      formData.append('productData', JSON.stringify(productData));
      for (let i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }

      const { data } = await axios.post('/api/product/add', formData);

      if (data.success) {
        toast.success(data.message);
        setName('');
        setDescription('');
        setCategory('');
        setVariants([{ unit: '', weight: '', price: '', offerPrice: '' }]);
        setFiles([]);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  const addVariant = () => {
    setVariants([...variants, { unit: '', weight: '', price: '', offerPrice: '' }]);
  };

  const removeVariant = (index) => {
    const updated = [...variants];
    updated.splice(index, 1);
    setVariants(updated);
  };

  const updateVariant = (index, field, value) => {
    const updated = [...variants];
    updated[index][field] = value;
    setVariants(updated);
  };

  return (
    <div className="no-scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
      <form onSubmit={onSubmitHandler} className="md:p-10 p-4 space-y-5 max-w-lg">
        <div>
          <p className="text-base font-medium">Product Image</p>
          <div className="flex flex-wrap items-center gap-3 mt-2">
            {Array(4).fill('').map((_, index) => (
              <label key={index} htmlFor={`image${index}`}>
                <input
                  onChange={(e) => {
                    const updatedFiles = [...files];
                    updatedFiles[index] = e.target.files[0];
                    setFiles(updatedFiles);
                  }}
                  type="file"
                  id={`image${index}`}
                  hidden
                />
                <img
                  className="max-w-24 cursor-pointer"
                  src={files[index] ? URL.createObjectURL(files[index]) : assets.upload_area}
                  alt="uploadArea"
                  width={100}
                  height={100}
                />
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-name">Product Name</label>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            id="product-name"
            type="text"
            placeholder="Type here"
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40"
            required
          />
        </div>

        <div className="flex flex-col gap-1 max-w-md">
          <label className="text-base font-medium" htmlFor="product-description">Product Description</label>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            id="product-description"
            rows={4}
            className="outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500/40 resize-none"
            placeholder="Type here"
          ></textarea>
        </div>

        <div className="w-full flex flex-col gap-1">
          <label className="text-base font-medium" htmlFor="category">Category</label>
          <select
            onChange={(e) => setCategory(e.target.value)}
            value={category}
            id="category"
            className="..."
          >
            <option value="">Select Category</option>
            {categories.map((item) => (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            ))}
          </select>

        </div>

        <div className="space-y-4">
          <p className="text-base font-medium">Product Variants</p>
          {variants.map((variant, index) => (
            <div key={index} className="flex flex-wrap gap-3 items-center">
              <select
                value={variant.unit}
                onChange={(e) => updateVariant(index, 'unit', e.target.value)}
                className="border px-3 py-2 rounded"
                required
              >
                <option value="">Select Unit</option>
                <option value="gm">gm</option>
                <option value="kg">kg</option>
                <option value="litre">litre</option>
              </select>

              <input
                type="number"
                placeholder="Weight"
                value={variant.weight}
                onChange={(e) => updateVariant(index, 'weight', e.target.value)}
                className="border px-3 py-2 w-24 rounded"
                required
              />

              <input
                type="number"
                placeholder="Price"
                value={variant.price}
                onChange={(e) => updateVariant(index, 'price', e.target.value)}
                className="border px-3 py-2 w-24 rounded"
                required
              />

              <input
                type="number"
                placeholder="Offer Price"
                value={variant.offerPrice}
                onChange={(e) => updateVariant(index, 'offerPrice', e.target.value)}
                className="border px-3 py-2 w-24 rounded"
                required
              />

              {variants.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVariant(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addVariant} className="text-primary underline">
            + Add Variant
          </button>
        </div>

        <button className="px-8 py-2.5 bg-primary text-white font-medium rounded cursor-pointer">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
