export interface FoodItem {
  id: string;
  name: string;
  servingSize: number;  // in grams
  protein: number;      // per serving (grams)
  carbs: number;       // per serving (grams)
  fat: number;         // per serving (grams)
  calories: number;    // per serving (kcal)
}
