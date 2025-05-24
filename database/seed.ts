import { Faker, en } from "@faker-js/faker";
import { db } from "@/database/drizzle";
import { budget, category, transactions } from "./schema";
import { addDays, subDays } from "date-fns";

const categories = ["food", "leisure", "transport", "academic", "other"];
const faker = new Faker({ locale: [en] });
export const BUDGET_PLANS = [
  {
    title: "Monthly Groceries",
    description: "Budget for all grocery shopping",
    category: "Food",
    amount: 150_000,
  },
  {
    title: "Entertainment",
    description: "Movies, games, and other entertainment",
    amount: 200_000,
  },
  {
    title: "Utilities",
    description: "Electricity, water, and internet bills",
    category: "Housing",
    amount: 230_000,
  },
  {
    title: "Dining Out",
    description: "Restaurants and takeout",
    category: "Food",
    amount: 200_000,
  },
  {
    title: "Transportation",
    description: "Gas, public transit, and car maintenance",
    category: "Transport",
    amount: 95_000,
  },
];

async function cleanUp() {
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(transactions);
  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(budget);

  // eslint-disable-next-line drizzle/enforce-delete-with-where
  await db.delete(category);
}

try {
  console.log("Seeding Start");
  console.log("Cleaning Up....");
  await cleanUp();
  console.log("Clean up finished...");
  const categoryPromises = categories.map(async (item) => {
    const data = await db.insert(category).values({ name: item }).returning();
    return data[0];
  });
  const generatedCategories = await Promise.all(categoryPromises);
  const budgetPlanPromises = BUDGET_PLANS.map(async (item, idx) => {
    const categoryId = generatedCategories[idx].id;
    const data = await db
      .insert(budget)
      .values({
        categoryId,
        ...item,
        userId: "YFwclaR5ifD6bn8cbZvzmTjE6rFQHpQ2",
        durationFrom: subDays(Date.now(), 30),
        durationTo: new Date(addDays(Date.now(), 30)),
      })
      .returning();
    return data[0];
  });
  const generatedBudgetPlans = await Promise.all(budgetPlanPromises);

  const generatedExpenses = generatedBudgetPlans.map(async (item) => {
    const len = faker.helpers.rangeToNumber({ min: 5, max: 12 });
    const expenses = Array.from({ length: len }, async () => {
      const amount = faker.helpers.rangeToNumber({ min: 5, max: 11 }) * 1000;
      return db
        .insert(transactions)
        .values({
          userId: "YFwclaR5ifD6bn8cbZvzmTjE6rFQHpQ2",
          amount: amount,
          budgetId: item.id,
          title: faker.lorem.words(5),
          createdAt: faker.date.between({
            from: subDays(Date.now(), 30),
            to: Date.now(),
          }),
        })
        .returning();
    });
    return await Promise.all(expenses);
  });
  await Promise.all(generatedExpenses);
  console.log("Seeding End");
} catch (err) {
  console.log("Error during seeding:", err);
}
