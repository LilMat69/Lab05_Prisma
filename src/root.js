import {DateTime} from './dateTime.js'
import {prisma} from './db.js';
export const root = {
    DateTime,
    deleteCategory: async ({id})  => {
      try{
        const deleteCategory = await prisma.category.delete({
          where: {
            id
          }
        });
        return deleteCategory;
      } catch (Error) {
        throw new Error('Failed to delete a Category with id ${id}: ${Error}')
      }
    },
    products: async ({ price, categoryId }) => {

      let whereClause = {}

      if (price !== undefined) {
        whereClause = {
          ...whereClause,
          price: {
            equals: price
          }
        }
      }

      if (categoryId !== undefined) {
        whereClause = {
          ...whereClause,
          categoryId: {
            equals: categoryId
          }
        }
      }

      return await prisma.product.findMany({
        where: whereClause,
        include: {
          category: true
        }
      });
    },
    categories: async () => {
      return await prisma.category.findMany({
        include: {
            products: true
        }
      });
    },
    product: async ({ id }) => {
      return await prisma.product.findUnique({
        where: { id },
        include: { category: true }
      });
    },
    category: async ({ id }) => {
      return await prisma.category.findUnique({
        where: { id },
        include: { products: true }
      });
    },
    createProduct: async ({ name, price, categoryId, stock }) => {
      return await prisma.product.create({
        data: {
          name,
          price,
          createdAt: new Date(),
          categoryId,
          stock     
        },
        include: {
            category: true
        }
      });
    },
    createCategory: async ({ name }) => {
      return await prisma.category.create({ data: { name } });
    },
    deleteProduct: async ({id}) => {
      try {
        const deleteProduct = await prisma.product.delete({
          where: {
            id
          }
        });
        return deleteProduct;
      } catch (error) {
        throw new Error ('Failed to delete product with id ${id}: ${error}')
      }
    },
    updateProduct: async ({id, name, price, stock }) =>{
        try {
            const updateProduct = await prisma.product.update ({
                where: { id },
                data: {
                    name,
                    price,
                    stock
                }
            });
            return updateProduct
        }catch(error){
            throw new Error(`Failed to update product with id ${id}: ${error}`);
         }
    }
  };
