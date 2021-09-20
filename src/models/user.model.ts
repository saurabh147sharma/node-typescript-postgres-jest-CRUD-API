import { Model, DataTypes } from "sequelize";
import dbConnection from "../config/db/pg-connector";

// We need to declare an interface for our model that is basically what our class would be
interface UserInstance extends Model {
    id: number;
    name: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date | null; //mixed

  }
  
  const UserModel = dbConnection.define<UserInstance>("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true // Automatically gets converted to SERIAL for postgres
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    createdAt: {
        field: 'created_at',
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        field: 'updated_at',
        type: DataTypes.DATE,
        defaultValue: null
    },
  },
  {
    hooks: {
      beforeCreate: function (user:any) {
        user.email = user.email.toLowerCase();
        return user;
      }
    }
  }
  );

  export {UserModel};