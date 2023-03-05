import { Schema, model } from "mongoose";

const recipeSchema = new Schema({
  recipeName: String,
  recipeCategory: String, 
  ingredients: [
    {
      ingredientName: String,
      quantity: String,
      unt: String,
      hasComponent: Boolean,
      componentId: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
      }
    }
  ],
  instructions: [String],
  isComponent: Boolean,
  associatedRecipes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Recipe'
    }
  ],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

export default model('Recipe', recipeSchema)