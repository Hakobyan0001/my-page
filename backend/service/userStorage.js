class UserStorage {
  static async getUserData(db) {
    let usersData = [];
    try {
      const result = await db.query("SELECT * FROM users");
      usersData = result.rows;
    } catch (err) {
      console.error("Error reading data.json:", err);
    }
    return usersData;
  }

  static async setUserData(db, userData) {
    await db.query(
      "INSERT INTO users (userName, email,password) VALUES ($1, $2,$3)",
      [userData.userName, userData.email, userData.password]
    );
  }
}

export default UserStorage;
