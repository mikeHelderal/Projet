//const express = require("express");
//const request = require("supertest");
//const routerNeighbordhoods = require("../routes/neighbordhoods.route.js");
import express from 'express';
import request from 'supertest';
import routerNeighbordhoods from '../routes/neighbordhoods.route';
const app = express();

app.use(express.json());

app.use("/api/neighbordhood",routerNeighbordhoods);


describe("test d'integration pour neighbordhood", () => {
    //test get all
    it("test get all neighbordhood", async () => {
        const {body, statusCode } = await request(app).get("/api/neighbordhood/all");
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    name: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    CityId: expect.any(Number),
                }),
            ])
        ); 
        expect(statusCode).toBe(200);
});

// test get by id
it("test get neighbordhood by id", async () => {
    const {body, statusCode } = await request(app).get("/api/neighbordhood/get/1");
    expect(body).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            CityId: expect.any(Number),
        }),
        
    ); 
    expect(statusCode).toBe(201);
}); 

//test get city

it("test get neighbordhood by id", async () => {
    const {body, statusCode } = await request(app).get("/api/neighbordhood/city/2");
    expect(body).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
        }),
        
    ); 
    expect(statusCode).toBe(200);
}); 



//test delete 
})