const Category = require('../models/category');
const SubCategory = require('../models/subcategory');

const resolvers = {
    categories: async () => {
        return await Category.find().populate('subcategories');
    },
    subcategories: async () => {
        return await SubCategory.find().populate('category');
    },
    createCategory: async (args) => {
        const category = new Category({
            name: args.categoryInput.name
        });
        return await category.save();
    },
    createSubCategory: async (args) => {
        const subcategory = new SubCategory({
            name: args.subCategoryInput.name,
            category: args.subCategoryInput.categoryId
        });
        await subcategory.save();
        await Category.findByIdAndUpdate(args.subCategoryInput.categoryId, {
            $push: { subcategories: subcategory._id }
        });
        return subcategory;
    },
    updateCategory: async (args) => {
        const updatedCategory = await Category.findByIdAndUpdate(
            args.updateCategoryInput.id,
            { name: args.updateCategoryInput.name },
            { new: true }
        );
        return updatedCategory;
    },
    updateSubCategory: async (args) => {
        const updatedSubCategory = await SubCategory.findByIdAndUpdate(
            args.updateSubCategoryInput.id,
            { name: args.updateSubCategoryInput.name },
            { new: true }
        );
        return updatedSubCategory;
    },
    deleteCategory: async (args) => {
        await Category.findByIdAndDelete(args.categoryId);
        await SubCategory.deleteMany({ category: args.categoryId });
        return "Category deleted successfully";
    },
    deleteSubCategory: async (args) => {
        await SubCategory.findByIdAndDelete(args.subCategoryId);
        return "Subcategory deleted successfully";
    }
};

module.exports = resolvers;
