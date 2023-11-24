class FbStorage {
  static async getDatabyId(db, ownerId) {
    let fbData = [];
    try {
      const result = await db.query(
        "SELECT * FROM footballers WHERE owner_id = $1",
        [ownerId]
      );
      fbData = result.rows;
    } catch (err) {
      console.error("Error reading footballers data", err);
    }
    return fbData;
  }

  static async getAllData(db) {
    let fbData = [];
    try {
      const result = await db.query("SELECT * FROM footballers");
      fbData = result.rows;
    } catch (err) {
      console.error("Error reading footballers data", err);
    }
    return fbData;
  }

  static async set(db, fbData) {
    const { owner_id, fullName } = fbData[0];
    await db.query(
      "INSERT INTO footballers (owner_id,fullname) VALUES ($1,$2)",
      [owner_id, fullName]
    );
  }

  static async delete(db, id) {
    await db.query("DELETE FROM footballers WHERE footballer_Id = $1", [id]);
  }

  static async update(db, id, updatedData) {
    await db.query(
      "UPDATE footballers SET fullname =$1 WHERE footballer_Id =$2",
      [updatedData, id]
    );
  }
}

export default FbStorage;
