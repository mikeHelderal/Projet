
import express from 'express';
import request from 'supertest';
import routeComment from '../routes/comments.route';

const app = express();
app.use(express.json());
app.use("/api/comment",routeComment);

describe("test d'integration pour neighbordhood", () => {
    it("test get all neighbordhood", async () => {
        const {body, statusCode } = await request(app).get("/api/comment/all");
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    content: expect.any(String),
                    createdAt: expect.any(String),
                    updatedAt: expect.any(String),
                    PublicationId: expect.any(Number),
                    UserId: expect.any(Number),
                    firstName: expect.any(String),
                }),
            ])
        ); 
        expect(statusCode).toBe(200);
});
it("test get comment by id", async () => {
    const {body, statusCode } = await request(app).get("/api/comment/get/1");
    expect(body).toEqual(
        expect.objectContaining({
            id: expect.any(Number),
            content: expect.any(String),
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
            PublicationId: expect.any(Number),
            UserId: expect.any(Number),
        }),        
    ); 
    expect(statusCode).toBe(200);
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



})