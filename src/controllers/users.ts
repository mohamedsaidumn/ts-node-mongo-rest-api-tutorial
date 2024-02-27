import express from 'express';

import {  getUsers, deleteUserById, getUserById } from '../db/users';
import logger from '../logger';

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    logger.info("Get All Users Request Received");
    const users = await getUsers();

    return res.status(200).json(users);
  } catch (error) {
    logger.error("Exception Thrown :", error);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      logger.info(`Delete User Request Received for id: ${id}`);
  
      const deletedUser = await deleteUserById(id);
  
      return res.json(deletedUser);
    } catch (error) {
        logger.error("Exception Thrown :", error);
      return res.sendStatus(400);
    }
  }
  export const updateUser = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const { username } = req.body;
      logger.info(`Update User Request Received for id: ${id} by new username: ${username}`);
  
      if (!username) {
        return res.sendStatus(400);
      }
  
      const user = await getUserById(id);
      
      user.username = username;
      await user.save();
  
      return res.status(200).json(user).end();
    } catch (error) {
      logger.error("Exception Thrown :", error);
      return res.sendStatus(400);
    }
  }