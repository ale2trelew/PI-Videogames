const { Router } = require('express');
const router = Router();
const { Op } = require('sequelize');
const { Videogame, Genre, Platform } = require('../db');