import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import { MongoClient } from "mongodb";
import { openDBConnection } from './db';
import { mainApp } from './app';

dotenv.config();
await openDBConnection();
const PORT = process.env.PORT || 3001;

mainApp.listen(PORT, () => {
  console.log(`API Server Started at ${PORT}`)
})
