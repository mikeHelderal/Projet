import { getAll } from "../controllers/neighbordhoods.controller.js";
//const Livre = require("../../src/models/livreModel");
//jest.mock("../../src/models/livreModel");
import {jest} from '@jest/globals'

import neighbordhoodsModel from "../models/neighbordhoods.model.js";
import { Neighbordhoods } from "../models/index.js";

jest.mock("../models/index.js");

const mockData = [{
    id: 1,
    name: "test",
    createdAt: "2024-07-05T11:22:03.000Z",
    updatedAt: "2024-07-05T11:22:03.000Z",
    CityId: 107
},
{
    id: 2,
    name: "test1",
    createdAt: "2024-07-05T11:46:16.000Z",
    updatedAt: "2024-07-05T11:46:16.000Z",
    CityId: 107
}];
describe("getAllNeighbordhoods", () => {
  let mNext, res;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    mNext =  jest.fn() ;
    jest.spyOn(Neighbordhoods, "findAll").mockResolvedValue(mockData)
  });
  afterEach( () => {
    jest.resetAllMocks();
  })


  test("get list of neighbordhood : should return 200", async () => {
    await getAll({}, res, mNext)
    expect(res.status).toBeCalledWith(200)
    expect(res.status().json).toBeCalledWith(mockData)
  })


/**
  it("should return a list of neighbordhoods", async () => {
    Livre.findAll.mockResolvedValue(mockNeigbordhoods);
    await getAll(req, res);
    expect(Livre.findAll).toHaveBeenCalledTimes(1);
    expect(res.json).toHaveBeenCalledWith(mockNeigbordhoods);
  });
  it("should return a 500 status code if an error occurs", async () => {
    const errorMessage = "Une erreur est survenue";
    Neighbordhoods.findAll.mockRejectedValue(new Error(errorMessage));
    await getAll(req, res);
    expect(Neighbordhoods.findAll).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
  */
});