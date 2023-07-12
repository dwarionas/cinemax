import axios from "axios";
import { MongoClient } from 'mongodb';
import bcrypt from "bcrypt";

const client = new MongoClient(process.env.MONGO_CONNECTION);

const BASE = process.env.BASE;
const API_KEY = process.env.API_KEY;

(async () => {
    try {
        await client.connect();
        console.log('db connected successfully');
    } catch (error) {
        console.log('Mongo error: ', error);
    }
})();

const createUser = (input) => {
    const id = String(Date.now());
    const role = 'user';
    const joined = String(new Date());
    const bookmarks = [];
    return { id, role, bookmarks, joined, ...input };
}

const resolvers = {
    getAllUsers: async () => {
        const users = client.db().collection('users');
        const allUsers = await users.find().toArray()
        return allUsers;
    },

    createUser: async ({ input }) => {
        const user = createUser(input);
        const users = client.db().collection('users');
        const candidate = await users.findOne({ email: user.email });
        if (candidate) {
            return { emailError: true }
        }

        const hashedPassword = bcrypt.hashSync(user.password, 7);
        await users.insertOne({ ...user, password: hashedPassword });
        return { emailError: false, ...user, password: hashedPassword }
    },

    login: async ({ email, password }) => {
        const users = client.db().collection('users');
        const user = await users.findOne({ email });
        if (!user) {
            return { emailError: true }
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) {
            return { emailError: false, passwordError: true }
        }

        return { emailError: false, passwordError: false, ...user };
    },

    checkUser: async ({ id }) => {
        const users = client.db().collection('users');
        const user = await users.findOne({ id })
        if (!user) {
            return { idError: true }
        }

        return { idError: false, ...user };
    },

    addBookmark: async ({ input }) => {
        const users = client.db().collection('users');

        const bookmarkID = String(Date.now());

        await users.updateOne(
            { id: input.userID },
            { $addToSet: { bookmarks: { ...input, bookmarkID } } }
        )

        return { ...input, bookmarkID }
    },

    removeBookmark: async ({ userID, bookmarkID }) => {
        const users = client.db().collection('users');
        const user = await users.findOne({ id: userID })

        await users.updateOne(
            { id: userID },
            { $pull: { bookmarks: { bookmarkID } } }
        )

        return { ...user }
    },

    getSlider: async (props) => {
        const { page, genre } = props;
        const popularMovies =
            await axios.get(`${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre}`);
        const popularTV =
            await axios.get(`${BASE}/tv/popular?api_key=${API_KEY}&language=en-US&page=${page}&with_genres=${genre}`);
        return [...popularMovies.data.results, ...popularTV.data.results];
    },

    getGenres: async () => {
        const movieGenres = await axios.get(`${BASE}/genre/movie/list?api_key=${API_KEY}`);
        const tvGenres = await axios.get(`${BASE}/genre/tv/list?api_key=${API_KEY}`);
        return [...movieGenres.data.genres, ...tvGenres.data.genres]
            .filter((value, index, self) => self.findIndex(el => el.id === value.id) === index);
    },

    getRec: async () => {
        const response = await axios.get(`${BASE}/trending/all/week?api_key=${API_KEY}`);
        return response.data.results;
    },

    getSearch: async (props) => {
        const { searchQuery, page } = props;
        const searchResponse = await axios.get(`${BASE}/search/multi?api_key=${API_KEY}&query=${searchQuery}&page=${page}&language=en-US`);
        return searchResponse.data;
    },

    getSliced: async (props) => {
        const { searchQuery, page } = props;
        const searchSliceResponse = await axios.get(`${BASE}/search/multi?api_key=${API_KEY}&query=${searchQuery}&page=${page}&language=en-US`);
        return searchSliceResponse.data.results.slice(0, 4);
    },

    getDetails: async (props) => {
        const { type, id } = props;
        const response = await axios.get(`${BASE}/${type}/${id}?api_key=${API_KEY}`);
        return [response.data];
    },

    getDiscover: async ({ genres }) => {
        const response = await axios.get(`${BASE}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=1&with_genres=${genres}`);
        return response.data.results;
    }
};

export default resolvers;
