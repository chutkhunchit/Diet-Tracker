import React, { useState } from "react";
import { FoodItem } from "./models/FoodItem";
import { foodData } from "./data/foodData";

const App: React.FC = () => {
  const [selectedFoods, setSelectedFoods] = useState<
    { food: FoodItem; amount: number }[]
  >([]);
  const [selectedFood, setSelectedFood] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);

  const handleFoodSelect = (food: FoodItem, amount: number) => {
    setSelectedFoods([...selectedFoods, { food, amount }]);
  };

  const handleFoodDelete = (foodId: string) => {
    setSelectedFoods(selectedFoods.filter(item => item.food.id !== foodId));
  };

  const selectedFoodItem = foodData.find(item => item.id === selectedFood);

  const handleFoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFood(e.target.value);
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(Number(e.target.value));
  };

  const handleSubmit = () => {
    const food = selectedFoodItem;
    if (food && amount > 0) {
      handleFoodSelect(food, amount);
      setSelectedFood("");  // Reset selection
      setAmount(0);  // Reset amount
    }
  };

  // Calculate the totals
  const totals = selectedFoods.reduce(
    (acc, item) => {
      const quantityRatio = item.amount / item.food.servingSize;
      acc.totalProtein += item.food.protein * quantityRatio;
      acc.totalCarbs += item.food.carbs * quantityRatio;
      acc.totalFat += item.food.fat * quantityRatio;
      acc.totalCalories += item.food.calories * quantityRatio;
      acc.totalPrice += item.food.pricePerUnit * quantityRatio;
      return acc;
    },
    {
      totalProtein: 0,
      totalCarbs: 0,
      totalFat: 0,
      totalCalories: 0,
      totalPrice: 0,
    }
  );

  return (
    <div>
      <h1>LCHF Diet Tracker</h1>

      {/* Food Input Row in the Table - above food rows */}
      <table>
        <thead>
          <tr>
            <th>Food</th>
            <th>Amount (g)</th>
            <th>Protein (g)</th>
            <th>Carbs (g)</th>
            <th>Fat (g)</th>
            <th>Calories</th>
            <th>Price (AUD)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <select value={selectedFood} onChange={handleFoodChange}>
                <option value="">Select Food</option>
                {foodData.map(food => (
                  <option key={food.id} value={food.id}>
                    {food.name}
                  </option>
                ))}
              </select>
            </td>
            <td>
              {selectedFoodItem && (
                <div>
                  <input
                    type="number"
                    placeholder={`Amount in grams`}
                    value={amount}
                    onChange={handleAmountChange}
                  />
                  <span>{` grams`}</span>
                </div>
              )}
            </td>
            <td>{selectedFoodItem ? (selectedFoodItem.protein * (amount / selectedFoodItem.servingSize)).toFixed(2) : 0}</td>
            <td>{selectedFoodItem ? (selectedFoodItem.carbs * (amount / selectedFoodItem.servingSize)).toFixed(2) : 0}</td>
            <td>{selectedFoodItem ? (selectedFoodItem.fat * (amount / selectedFoodItem.servingSize)).toFixed(2) : 0}</td>
            <td>{selectedFoodItem ? (selectedFoodItem.calories * (amount / selectedFoodItem.servingSize)).toFixed(2) : 0}</td>
            <td>{selectedFoodItem ? ((selectedFoodItem.pricePerUnit * (amount / selectedFoodItem.servingSize)).toFixed(2)) : 0}</td>
            <td>
              <button onClick={handleSubmit}>Add Food</button>
            </td>
          </tr>

          {/* Display Selected Foods in Table Rows */}
          {selectedFoods.map((item, index) => (
            <tr key={index}>
              <td>{item.food.name}</td>
              <td>{item.amount}</td>
              <td>{(item.food.protein * (item.amount / item.food.servingSize)).toFixed(2)}</td>
              <td>{(item.food.carbs * (item.amount / item.food.servingSize)).toFixed(2)}</td>
              <td>{(item.food.fat * (item.amount / item.food.servingSize)).toFixed(2)}</td>
              <td>{(item.food.calories * (item.amount / item.food.servingSize)).toFixed(2)}</td>
              <td>{((item.food.pricePerUnit * (item.amount / item.food.servingSize)).toFixed(2))}</td>
              <td>
                <button onClick={() => handleFoodDelete(item.food.id)}>Delete</button>
              </td>
            </tr>
          ))}

          {/* Total Row - at the bottom */}
          <tr>
            <td colSpan={2}>Total</td>
            <td>{totals.totalProtein.toFixed(2)}</td>
            <td>{totals.totalCarbs.toFixed(2)}</td>
            <td>{totals.totalFat.toFixed(2)}</td>
            <td>{totals.totalCalories.toFixed(2)}</td>
            <td>{totals.totalPrice.toFixed(2)}</td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default App;
