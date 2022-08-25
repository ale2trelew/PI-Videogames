const axios = require("axios");
const { Router } = require("express");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("../db");

const getAllVideogames = async () => {
    var games = [];
    const apiUrl1 = axios.get(`https://api.rawg.io/api/games?page_size=40&key=${API_KEY}`);
    const apiUrl2 = axios.get(`https://api.rawg.io/api/games?page_size=40&key=${API_KEY}`);
    const apiUrl3 = axios.get(`https://api.rawg.io/api/games?page_size=20&key=${API_KEY}`);

    return Promise.all([apiUrl1, apiUrl2, apiUrl3]).then((resolve) => {
        let [apiUrl1, apiUrl2, apiUrl3] = resolve;
        games = [
            ...apiUrl1.data.results,
            ...apiUrl2.data.results,
            ...apiUrl3.data.results,
        ].map((v) => {
            const plataformas = v.plataforms.map((g) => g.plataform);
            // aca yo tengo un arreglo de objetos que son las plataformas
            return {
                idApi: v.id,
                name: v.name,
                img: v.background_image,
                description: v.description,
                released: v.released,
                rating: v.rating,
                platforms: plataformas,
                genres: v.genres,
            };
        });
        return games;
    }).catch((err) => console.log("ERROR EN EL GET DE TODOS LOS VG, ", err));
};

const fillGenresDB = async function () {
    let genresDb = [];
    try {
        genresDb = await Genre.findAll({ where: { createdInDb: true } });
        const cantGenresDb = await Genre.count();
        if ( genresDb.length === cantGenresDb) {
            const api = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
            const apiGenres = api.data.results.map(element => element.name);
            for(let i = 0; i < apiGenres.length; i++) {
                Genre.findOrCreate({
                    where: { name: apiGenres[i] }
                });
            };
        };
        console.log("Generos creados.. ", await Genre.count());
    } catch (error) {
        console.log("ERROR EN EL FILL GENRES ", err.message);
    }
}