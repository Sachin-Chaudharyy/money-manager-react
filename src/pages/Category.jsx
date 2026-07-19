import Dashboard from "../components/Dashboard";
import { useUser } from "../Hooks/useUser";
import { Plus } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import CategoryList from "../components/CategoryList"
import axiosConfig from "../util/axiosConfig";
import { API_ENDPOINTS } from "../util/apiEndPoints";
import Modal from "../components/Modal";
import AddCategoryForm from "../components/AddCategoryForm";

const Category = () => {
    useUser();
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openAddCategoryModal, setOpenAddCategoryModal] = useState(false);
    const [openEditCategoryModal, setOpenEditCategoryModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const fetchCategoryDetails = async () => {
        
        if(loading){
            return;
        }

        setLoading(true);

        try{
            const response = await axiosConfig.get(API_ENDPOINTS.GET_ALL_CATEGORIES);
            if(response.status === 200){
                console.log('categories', response.data);
                setCategoryData(response.data);
            }    
        }catch(error){
            console.log('Something went wrong. Please try again', error);
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchCategoryDetails();
    }, []);

    const handleAddCategory = async (category) => {
        const {name, type, icon} = category;
        if(!name.trim()){
            toast.error("Category Name is required");
            return;
        }

        const isDuplicate = categoryData.some((category) => {
            return category.name.toLowerCase() === name.trim().toLowerCase();
        })

        if(isDuplicate) {
            toast.error("Category Name already exists");
            return;
        }

        try{
            const response = await axiosConfig.post(API_ENDPOINTS.ADD_CATEGORY, {name, type, icon});
            if(response.status === 201){
                toast.success("Category added successfully");
                setOpenAddCategoryModal(false);
                fetchCategoryDetails();
            }
        }catch(error){
            console.log('Error adding category: ', error);
            toast.error(error.response?.data?.message || "Failed to add category");
        }
    }

    const handleEditCategory = (categoryToEdit) => {
        setSelectedCategory(categoryToEdit);
        setOpenEditCategoryModal(true);
    }

    const handleUpdateCategory =  async (updatedCategory) => {
        const {id, name, type, icon} = updatedCategory;
        if(!name.trim()){
            toast.error("Category Name is required");
            return;
        }

        if(!id){
            toast.error("Category ID is missing for update");
            return;
        }

        try{
            await axiosConfig.put(API_ENDPOINTS.UPDATE_CATEGORY(id), {name, type, icon});
            setOpenEditCategoryModal(false);
            setSelectedCategory(null);
            toast.success("Category updated successfully");
            fetchCategoryDetails();
        }catch(error){
            console.log('Error updating category:', error.response?.data?.message || error.message);
            toast.error( error.response?.data?.message || "Failed to update category."); 
        }
    }

    return (
        <Dashboard activeMenu="Category">
            <div className="my-5 mx-auto">
                {/* Add button to add category */}
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-2xl font-semibold">
                        All Categories
                    </h2>
                    <button
                    onClick={() => setOpenAddCategoryModal(true)} 
                    className="flex items-center gap-1 bg-green-200 text-green-800 px-4 py-2 rounded-lg font-medium hover:bg-green-300 transi5tion-colors">
                        <Plus size={15} className="text-green-700" />
                        Add Category
                    </button>
                </div>

                {/* Category list */}
                <CategoryList categories={categoryData} onEditCategory={handleEditCategory}/>

                {/* Adding category model */}
                <Modal
                    isOpen={openAddCategoryModal}
                    onClose={() => setOpenAddCategoryModal(false)}
                    title="Add Category"
                >
                    <AddCategoryForm onAddCategory={handleAddCategory}/>
                </Modal>

                {/* updating category model */}
                <Modal
                    onClose={() => {
                        setOpenEditCategoryModal(false);
                        setSelectedCategory(null);
                    }}
                    isOpen={openEditCategoryModal}
                    title="Update Category"
                    >   
                    <AddCategoryForm 
                        initialCategoryData={selectedCategory}
                        onAddCategory={handleUpdateCategory}
                        isEditing={true}
                    />
                </Modal>
                
            </div>
        </Dashboard>
    )
}

export default Category;