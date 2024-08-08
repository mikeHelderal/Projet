import jwt from "jsonwebtoken";
import { Users } from "../models/index.js";
import { env } from  '../config/config.js';
import bcrypt from "bcrypt";
import express from 'express'



const signUp = async (req, res, next) => {
    //console.log("OBJET => ", req.body);
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);

        await Users.create({...req.body, password: hashedPassword});
        res.status(201).json("User has been created!")
        
    } catch (error) {
        res.status(500).json({message : "signup encountered a problem", data: error});
        next(error);
        
    }
}
const login = async (req, res) => {
    try {
        const user = await Users.findOne({
            where:
                { email: req.body.email }
        });
        if (!user) return res.status(404).json("User not found !");
        const comparePassword = await bcrypt.compare(
            req.body.password,
            user.password
        );        
        if (!comparePassword) return res.status(400).json("Wrong Credentials ! ");
        const token = jwt.sign(           
            { id: user.id },
            env.token,
            { expiresIn: "24h" }
        );
        console.log(user);
        //const { password, ...others } = user._doc
        res.cookie("access_token", token, { httpOnly: true }).status(200) .json(user);
    } catch (e) {
        res.status(500).json({message : "login encountered a problem", data: e.message});
    }
}
const getAll = async (req, res) => {
    try {
        const result = await Users.findAll();
        if(!result) return res.status(404).json({message: "users not found!", data: null});
        res.status(200).json({message: "get all users", data: result});
    } catch (error) {
        res.status(500).json({message : "get all users  encountered a problem", data: error});
    }
}
const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Users.findByPk(id);
        if(!result) return res.status(404).json({message: "user not found!", data: null});
        res.status(200).json({message: "get by id", data: result});
    } catch (error) {
        res.status(500).json({message : "get by id user  encountered a problem", data: error}); 
    }
}
const updateById = async (req, res) => {
    try {
        const user = await Users.findByPk(req.params.id);
        if(!user) return res.status(404).json("User not found!");
        user.set(req.body);
        await user.save();
        res.status(200).json({message: "User has been updated!",data: user});
    } catch (error) {
        res.status(500).json({message : "update by id user  encountered a problem", data: error});
        
    }
}
const deleteById = async (req, res) => {
    try {
        const userDeleted = await Users.destroy({where: {id: req.params.id}});
        if (!userDeleted) return res.status(404).json("User not found !");
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        res.status(500).json({message : "delete by id user encountered a problem", data: error});
        
    }
}


export {
    signUp, login, getAll, getById, updateById, deleteById
}




