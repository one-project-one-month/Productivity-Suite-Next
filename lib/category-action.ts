"use server";

import { db } from "@/database/drizzle";
import { category } from "@/database/schema";
import { getUserSession } from "@/features/auth/actions/get-user-session";
import { eq, isNull, or } from "drizzle-orm";
import { GlobalCategoryInfo } from "@/components/category/predefined-category-list";

export const getAllCategories = async () => {
  try {
    const session = await getUserSession();
    if (!session) {
      return null;
    }
    const data = await db
      .select({
        id: category.id,
        name: category.name,
        color: category.color,
        userId: category.userId,
      })
      .from(category)
      .where(or(eq(category.userId, session.user.id), isNull(category.userId)));

    return data.reduce(
      (acc, curr) => {
        if (!curr.userId) {
          return {
            ...acc,
            preDefined: [...acc.preDefined, curr],
          };
        }
        return {
          ...acc,
          userId: [...acc.userDefined, curr],
        };
      },
      {
        preDefined: [],
        userDefined: [],
      } as {
        preDefined: GlobalCategoryInfo[];
        userDefined: GlobalCategoryInfo[];
      },
    ) as unknown as {
      preDefined: GlobalCategoryInfo[];
      userDefined: GlobalCategoryInfo[];
    };
  } catch (error) {
    console.log(error);
  }
};
