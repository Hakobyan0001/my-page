class FbStorage {
  static async getDatabyId(db, ownerId) {
    let fbData = [];
    try {
      fbData = await db.query("SELECT * FROM footballers WHERE ownerId = $1", [
        ownerId,
      ]);
    } catch (err) {
      console.error("Error reading footballers data", err);
    }
    return fbData;
  }

  static async getAllData(db) {
    let fbData = [];
    try {
      fbData = await db.query("SELECT * FROM footballers");
    } catch (err) {
      console.error("Error reading footballers data", err);
    }
    return fbListData;
  }

  static async set(db, fbData) {
    const { fullName } = fbData[0];
    await db.query("INSERT INTO footballers (fullName) VALUES ($1)", [
      fullName,
    ]);
  }

  static async delete(db, id) {
    await db.query("DELETE FROM footballers WHERE footballerId = $1", [id]);
  }

  static async update(db, id, updatedData) {
    await db.query(
      "UPDATE footballers SET fullName =$1 WHERE footballerId =$2",
      [updatedData, id]
    );
  }
}

export default FbStorage;
