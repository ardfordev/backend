import Users from "../models/UserModel.js";
import argon2 from "argon2";

export const getUsers = async(req, res) => {
  try {
    const response = await Users.findAll({
      attributes: ['uuid', 'email', 'role'],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}

export const getUserById = async(req, res) => {
  try {
    const response = await Users.findOne({
      attributes: ['uuid', 'email', 'role'],
      where: {
        uuid: req.params.id,
      }
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}

export const createUser = async(req, res) => {
  const {email, password, confPassword, role} = req.body;
  if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
  const hashPassword = await argon2.hash(password);
  try {
    await Users.create({
      email: email,
      password: hashPassword,
      role: role,
    });
    return res.status(201).json({msg: "Register Berhasil"});
  } catch (error) {
    return res.status(400).json({msg: error.message});
  }
}

export const updateUser = async(req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    }
  });
  if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
  const {email, password, confPassword, role} = req.body;
  let hashPassword;
  if(password === "" || password === null) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
  try {
    await Users.update({
      email: email,
      password: hashPassword,
      role: role,
    }, {
      where: {
        id: user.id,
      },
    });
    return res.status(200).json({msg: "User Updated"});
  } catch (error) {
    return res.status(400).json({msg: error.message});
  }
}

export const deleteUser = async(req, res) => {
  const user = await Users.findOne({
    where: {
      uuid: req.params.id,
    }
  });
  if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
  try {
    await Users.destroy({
      where: {
        id: user.id
      }
    });
    return res.status(200).json({msg: "User Deleted"});
  } catch (error) {
    return res.status(400).json({msg: error.message});
  }
}