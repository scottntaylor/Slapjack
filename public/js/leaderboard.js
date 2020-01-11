module.exports = function(sequelize, DataTypes) {
    var Leaderboard = sequelize.define("Leaderboard", {
      User: DataTypes.STRING,
      Wins: Integer
    });
    return User;
  };