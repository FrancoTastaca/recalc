import { Operation, createTables } from "./models.js";

export async function seed() {
    await createTables()

        const operations = [
          { name: "ADD" },
          { name: "SUB" },
          { name: "MUL" },
          { name: "DIV" },
          { name: "POW" },
        ]
        await Operation.bulkCreate(operations)
        console.log("Operations created:", operations)
  }
      
      

if (process.env.NODE_ENV !== 'test') {
    seed()
}