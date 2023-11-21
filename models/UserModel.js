import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
  uuid: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email telah terdaftar"
    },
    validate: {
      isEmail: {
        args: true,
        msg: "Email tidak valid"
      },
      notEmpty: {
        args: true,  
        msg: 'Email tidak boleh kosong'
      }
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,  
        msg: 'Password tidak boleh kosong'
      }
    }
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,  
        msg: 'Role tidak boleh kosong'
      }
    }
  },
},{
  freezeTableName: true,
});

export default Users;