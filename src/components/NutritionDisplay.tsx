import React from "react";
import { FoodItem } from "../models/FoodItem";

interface NutritionDisplayProps {
    foodItems: { food: FoodItem; amount: number }[];
}

const NutritionDisplay: React.FC<NutritionDisplayProps> = ({ foodItems }) => {
    const totalNutrition = foodItems.reduce(
        (acc, { food, amount }) => {
            const servings = amount / food.servingSize;
            acc.protein += food.protein * servings;
            acc.carbs += food.carbs * servings;
            acc.fat += food.fat * servings;
            acc.calories += food.calories * servings;
            return acc;
        },
        { protein: 0, carbs: 0, fat: 0, calories: 0 }
    );

    return (
        <div>
            <h3>Total Nutrition</h3>
            <p>Protein: {totalNutrition.protein.toFixed(2)} g</p>
            <p>Carbs: {totalNutrition.carbs.toFixed(2)} g</p>
            <p>Fat: {totalNutrition.fat.toFixed(2)} g</p>
            <p>Calories: {totalNutrition.calories.toFixed(2)} kcal</p>
        </div>
    );
};

export default NutritionDisplay;
