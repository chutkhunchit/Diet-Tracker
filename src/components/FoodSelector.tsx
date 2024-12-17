import React, { useState } from "react";
import { FoodItem } from "../models/FoodItem";
import { foodData } from "../data/foodData";

interface FoodSelectorProps {
  onFoodSelect: (food: FoodItem, amount: number) => void;
}

const FoodSelector: React.FC<FoodSelectorProps> = ({ onFoodSelect }) => {
  const [selectedFood, setSelectedFood] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  // Get the selected food item from the data
  const selectedFoodItem = foodData.find(item => item.id === selectedFood);

  const handleFoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFood(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleSubmit = () => {
    const food = selectedFoodItem;
    if (food) {
      onFoodSelect(food, amount);
    }
  };

  return (
    <div>
      <h3>Select Food</h3>
      <select value={selectedFood} onChange={handleFoodChange}>
        <option value="">Select Food</option>
        {foodData.map(food => (
          <option key={food.id} value={food.id}>
            {food.name}
          </option>
        ))}
      </select>

      {selectedFoodItem && (
        <div>
          {/* Display the unit next to the amount input */}
          <input
            type="number"
            placeholder={`Amount in ${selectedFoodItem.servingSize > 1 ? 'grams' : 'pieces'}`}
            value={amount}
            onChange={handleAmountChange}
          />
          <span>{` ${selectedFoodItem.servingSize > 1 ? 'grams' : 'pieces'}`}</span>
        </div>
      )}

      <button onClick={handleSubmit}>Add Food</button>
    </div>
  );
};

export default FoodSelector;
