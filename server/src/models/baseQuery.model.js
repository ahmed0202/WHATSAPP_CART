const db = require("../db");

class modelBaseQuery {
  mutationCreateResultError = async ({ tableName, data }) => {
    if (!tableName) {
      throw new Error("Table name is required.");
    }
    try {
      const result = await db(tableName).insert(data);
      return [result, null];
    } catch (error) {
      return [null, error];
    }
  };
  queryGetResultError = async ({
    selectArray = "*",
    tableName,
    whereObjects = {},
    whereNotNullArray = [],
  }) => {
    if (!tableName) {
      throw new Error("Table name is required.");
    }

    try {
      const query = db.select(selectArray).from(tableName);
      if (Object.keys(whereObjects).length !== 0) {
        query.where(whereObjects);
      }
      if (whereNotNullArray.length !== 0) {
        whereNotNullArray.forEach((element) => {
          query.whereNotNull(element);
        });
      }

      const result = await query;

      return [result, null];
    } catch (error) {
      return [null, error];
    }
  };

  mutationUpdateResultError = async ({
    tableName,
    data = {},
    whereObjects = {},
  }) => {
    if (!tableName) {
      throw new Error("Table name is required.");
    }
    if (Object.keys(whereObjects).length === 0) {
      throw new Error("where object cant be empty");
    }
    try {
      const result = await db(tableName).update(data).where(whereObjects);

      return [result, null];
    } catch (error) {
      return [null, error];
    }
  };
  mutationDeleteResultError = async ({ tableName, whereObjects = {} }) => {
    if (!tableName) {
      throw new Error("Table name is required.");
    }
    if (Object.keys(whereObjects).length === 0) {
      throw new Error("where object  cant be empty");
    }
    try {
      const result = await db(tableName).where(whereObjects).del();
      return [result, null];
    } catch (error) {
      return [null, error];
    }
  };
  trxMutationDeleteComRol = async ({ tableName, whereObjects = {} }) => {
    if (!tableName) {
      throw new Error("Table name is required.");
    }
    if (Object.keys(whereObjects).length === 0) {
      throw new Error("where object cant be empty");
    }
    try {
      let trx = await db.transaction();
      await trx(tableName).where(whereObjects).del();
      return trx;
    } catch (error) {
      throw new Error(error);
    }
  };
}

module.exports = new modelBaseQuery();
