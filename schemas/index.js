const { buildSchema } = require("graphql");

module.exports = buildSchema(`
    type Category {
      _id: ID!
      name: String!
      subcategories: [SubCategory!]!
      subcategoriesCount: Int!
    }

    type SubCategory {
      _id: ID!
      name: String!
      category: Category!
    }

    input CategoryInput {
      name: String!
    }

    input SubCategoryInput {
      name: String!
      categoryId: ID!
    }

    input UpdateCategoryInput {
      id: ID!
      name: String!
    }

    input UpdateSubCategoryInput {
      id: ID!
      name: String!
    }

    type RootQuery {
      categories: [Category!]!
      subcategories: [SubCategory!]!
    }

    type RootMutation {
      createCategory(categoryInput: CategoryInput): Category
      createSubCategory(subCategoryInput: SubCategoryInput): SubCategory
      updateCategory(updateCategoryInput: UpdateCategoryInput): Category
      updateSubCategory(updateSubCategoryInput: UpdateSubCategoryInput): SubCategory
      deleteCategory(categoryId: ID!): String
      deleteSubCategory(subCategoryId: ID!): String
    }
   
    schema {
      query: RootQuery
      mutation: RootMutation
    }
`);
