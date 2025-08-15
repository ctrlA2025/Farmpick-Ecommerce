import { useState, useEffect } from "react";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const SellerCategories = () => {
  const { axios } = useAppContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);

  // ✅ Fetch categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get("/api/category/list");
      if (data.success) {
        setCategories(data.categories);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!name) return toast.error("Category name is required");

    try {
      const { data } = await axios.post("/api/category/add", {
        name,
        description,
      });

      if (data.success) {
        toast.success(data.message);
        setName("");
        setDescription("");
        fetchCategories(); // ✅ Refresh the list
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-xl font-bold mb-4">Add New Category</h1>
      <form onSubmit={handleAddCategory} className="space-y-4 max-w-md">
        <div>
          <label className="block mb-1 font-medium">Category Name</label>
          <input
            type="text"
            className="w-full border rounded px-3 py-2"
            placeholder="e.g. Vegetables"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description (optional)</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            placeholder="Brief description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-primary-dull"
        >
          Add Category
        </button>
      </form>

      <div className="mt-8">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        {categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <ul className="list-disc pl-5">
            {categories.map((cat) => (
              <li key={cat._id}>
                <strong>{cat.name}</strong> — {cat.description || "No description"}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SellerCategories;
