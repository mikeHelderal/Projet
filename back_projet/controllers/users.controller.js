import jwt from "jsonwebtoken";
import { Users } from "../models/index.js";
import { env } from  '../config/config.js';
import bcrypt from "bcrypt";


const signUp = async (req, res, next) => {
    //console.log("OBJET => ", req.body);
    try {
        const hashedPassword = await bcrypt.hash(req.body.password,10);

        await User.create({...req.body, password: hashedPassword});
        res.status(201).json("User has been created!")
        
    } catch (error) {
        console.log(error);
        next(error);
        
    }
}
const login = async (req, res) => {
    try {
        const user = await User.findOne({
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
        res.cookie("access_token", token, { httpOnly: true }).status(200) .json(user);
    } catch (e) {
        console.log(e);
    }
}
const getAll = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
    }
}
const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        res.status(200).json(user);
    } catch (error) {
        
    }
}
const updateById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if(!user) return res.status(404).json("User not found!");
        await user.set(req.body);
        await user.save();
        res.status(200).json({message: "User has been updated!", user});
    } catch (error) {
        console.log(error);
        
    }
}
const deleteById = async (req, res) => {
    try {
        const userDeletes = await User.destroy({where: {id: req.params.id}});
        if (!userDeleted) return res.status(404).json("User not found !");
        res.status(200).json({ message: "User deleted" });
    } catch (error) {
        console.log(error);
        
    }
}


export {
    signUp, login, getAll, getById, updateById, deleteById
}




