import express from 'express';
import request from 'supertest';
import userRoutes from '../routes/users.route.js';
import { Users } from '../models/index.js';
import { jest } from '@jest/globals';
import bcrypt from 'bcrypt'; // Remplacez require par import



const app = express();
app.use(express.json());
app.use('/api/users', userRoutes);


jest.mock('../models/index.js', () => {
    return {
        Users: {
            findOne: jest.fn().mockResolvedValue(null),  // Mock de findOne
            create: jest.fn().mockResolvedValue({ id: 1, email: "test@example.com" }),
            findAll: jest.fn().mockResolvedValue([]),   // Mock de findAll
            findByPk: jest.fn().mockResolvedValue(null), // Mock de findByPk
            destroy: jest.fn().mockResolvedValue(1)     // Mock de destroy
        }
    };
});

describe("Tests d'intégration pour les routes utilisateurs", () => {
    beforeEach(() => {
        jest.clearAllMocks(); // Réinitialiser les mocks avant chaque test
    }); 
    it("Test de création d'utilisateur (signUp)", async () => {
        // Utilisation de jest.spyOn pour espionner `Users.findOne`
        const findOneSpy = jest.spyOn(Users, 'findOne').mockResolvedValue(null); // Simuler qu'aucun utilisateur n'existe déjà
        const createSpy = jest.spyOn(Users, 'create').mockResolvedValue({ id: 1, email: "test@example.com" });

        const { body, statusCode } = await request(app)
            .post('/api/users/signUp')
            .send({
                firstName: "John",
                lastname: "Doe",
                email: "test@example.com",
                password: "password123",
                born: "1990-01-01",
            });

        expect(statusCode).toBe(201);
        expect(body).toBe("User has been created!");
        expect(createSpy).toHaveBeenCalledWith({
            firstName: "John",
            lastname: "Doe",
            email: "test@example.com",
            password: expect.any(String),
            born: "1990-01-01",
        });

        createSpy.mockRestore();

        findOneSpy.mockRestore(); // Restaure la méthode originale après le test
    });

    it("Test de connexion d'utilisateur (login)", async () => { 
        const mockUser = {
            id: 1,
            email: "test@example.com",
            password: "$2b$10$hashedPassword",
        };
    
        // Espionner la méthode `findOne` de `Users` et simuler la valeur de retour
        const findOneSpy = jest.spyOn(Users, 'findOne').mockResolvedValue(mockUser);
    
        // Espionner et simuler la validation du mot de passe avec bcrypt
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
    
        const { body, statusCode } = await request(app)
            .post('/api/users/login')
            .send({
                email: "test@example.com",
                password: "password123",
            });
    
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            id: expect.any(Number),
            email: expect.any(String),
        }));
    
        // Vérifier que `findOne` a été appelé avec le bon email
        expect(findOneSpy).toHaveBeenCalledWith({
            where: { email: "test@example.com" }
        });
    
        // Restauration des méthodes espionnées
        findOneSpy.mockRestore();
    });
    

    it("Test de récupération de tous les utilisateurs (getAll)", async () => { 
        const mockUsers = [
            { id: 1, firstName: "John", lastname: "Doe", email: "john@example.com" },
            { id: 2, firstName: "Jane", lastname: "Doe", email: "jane@example.com" },
        ];
    
        // Espionner la méthode `findAll` de `Users` et simuler la valeur de retour
        const findAllSpy = jest.spyOn(Users, 'findAll').mockResolvedValue(mockUsers);
    
        const { body, statusCode } = await request(app).get('/api/users/all');
    
        expect(statusCode).toBe(200);
        expect(body.data).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                firstName: expect.any(String),
                email: expect.any(String),
            }),
        ]));
    
        // Vérifier que `findAll` a été appelé
        expect(findAllSpy).toHaveBeenCalled();
    
        // Restauration des méthodes espionnées
        findAllSpy.mockRestore();
    });
    
    it("Test de récupération d'un utilisateur par ID (getById)", async () => { 
        const mockUser = { id: 1, firstName: "John", lastname: "Doe", email: "john@example.com" };
    
        const findByPkSpy = jest.spyOn(Users, 'findByPk').mockResolvedValue(mockUser);
    
        const { body, statusCode } = await request(app).get('/api/users/get/1');
    
        expect(statusCode).toBe(200);
        expect(body.data).toEqual(expect.objectContaining({
            "email": "john@example.com",
            "firstName": "John",
            "id": 1,
            "lastname": "Doe",
        }));
    
        expect(findByPkSpy).toHaveBeenCalledWith("1");
    
        findByPkSpy.mockRestore();
    });
    
    it("Test de mise à jour d'un utilisateur (updateById)", async () => {
        const mockUser = { 
            id: 1, 
            firstName: "John", 
            lastname: "Doe", 
            isAdmin: 0,  
            email: "john@example.com", 
            set: jest.fn(), 
            save: jest.fn() 
        };
    
        // Espionner la méthode `findByPk` de `Users` et simuler la valeur de retour
        const findByPkSpy = jest.spyOn(Users, 'findByPk').mockResolvedValue(mockUser);
    
        const { body, statusCode } = await request(app)
            .put('/api/users/update/1')
            .send({ isAdmin: 1 });
    
        expect(statusCode).toBe(200);
        expect(mockUser.set).toHaveBeenCalledWith({ isAdmin: 1 });
        expect(mockUser.save).toHaveBeenCalled();
    
        // Vérifier que `findByPk` a bien été appelé avec l'ID 1
        expect(findByPkSpy).toHaveBeenCalledWith("1");
    
        // Restauration des méthodes espionnées
        findByPkSpy.mockRestore();
    });
    

    it("Test de suppression d'un utilisateur (deleteById)", async () => {
        // Espionner la méthode `destroy` de `Users` et simuler la suppression avec un retour de 1 (indiquant que l'utilisateur a été supprimé)
        const destroySpy = jest.spyOn(Users, 'destroy').mockResolvedValue(1);
    
        const { body, statusCode } = await request(app).delete('/api/users/delete/1');
    
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({ message: "User deleted" }));
    
        // Vérifier que `destroy` a été appelé avec l'ID 1
        expect(destroySpy).toHaveBeenCalledWith( {
               "where": {
                  "id": "1",
               },
              },
        );
    
        // Restaurer la méthode espionnée
        destroySpy.mockRestore();
    });
    
});
