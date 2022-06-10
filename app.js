const express = require('express')
const app = express()
const bodyParser = require('body-parser')
//MIDDLEWARE MULTER
const multer = require('multer')
const upload = multer()

//MIDDLEWARE BODY-PARSER
    const urlencodedParser = bodyParser.urlencoded({extension: 'true'})
    // app.use(bodyParser.urlencoded({extension:false}))
// ---------------------------
// -----------------------------

const PORT = 3005;
let listeMovies = []

//STATIC
app.use('/public', express.static("public"))
//jS
app.use("/views/script", express.static('views/script'));

//EJS
    //le 1er view c basic, le 2e io chemin misy zay fichier ejs
app.set('views', './views') 
    //juste pour ne pas a preciser l'extension ejs dans par ex pour le res.render('index')
app.set('view engine', 'ejs') 

//ROUTES
app.get("/", (req, res) => {
    //on a pas besoin de preciser l'extension ejs car avec la methode set cela
    //a deja ete preciser avec 'view engine', 'ejs'
    res.render('index')
})

//SEARCH PAGE
app.get('/movie-search',  (req, res)=>{
    res.render("movie-search")
})

//LOGIN  PAGE
app.get('/login', (req, res)=>{
    res.render('login', {title: "connexion"})
})

//Login POST
const fakeUser = {email : 'testEmail@gmail.com', pwd: '123' }
app.post('/login', urlencodedParser, (req, res)=>{
    console.log('post page login  reussi');
    if (!req.body) {
        res.sendStatus(500)
        console.log('Aucun info entree par l\'user');
    } else {
        console.log(req.body.email, req.body.pwd);
        if (req.body.email===fakeUser.email && req.body.pwd===fakeUser.pwd) {
            //👇
            //Une promesse qui se résout en un objet JavaScript.
            // le résultat n'est pas JSON mais plutôt 
            //le résultat de la prise de JSON en entrée et de son analyse pour produire un objet JavaScript.
            res.json({
                email: 'testEmail@gmail.com',
                favorisMovie: 'Harry poter',
                lastLogin: new Date()
            //👆
            })
            console.log('Info exactes');
        } else {
            res.sendStatus(401)
            console.log('Pas info exacte');
        }
    }
})





app.get("/movies", (req,res) => {
    const theTitle = "This is a title"
     listeMovies =[
        { monTitle:'let\'s go', monYear: 1989 },
        { monTitle:'where?',  monYear: 1958},
        { monTitle:'IDK', monYear: 2981 }
    ]
    res.render('movies', {movies : listeMovies, title : theTitle})
})

// --------------------------------------------
//POST SANS MULATER
// app.post("/movies", urlencodedParser,(req,res) => {
//     // console.log("Le titre du film :  " + req.body.titleMovies)
//     // console.log("L'annee du film : " + req.body.yearMovies)
//     res.sendStatus(201)

//     //QD UN USER AJOUT UN NOUVEAU titre et year ON LE RAJOUTE DANS LA LISTE EXISTANTE.
//     const newListeMovies = { newTitreAjoute : req.body.titleMovies, newYearAjoute : req.body.yearMovies}
//     listeMovies = [ ...listeMovies, newListeMovies]
//     console.log(listeMovies);
// })

//---------------------POST AVEC MULATER---------------------
app.post('/movies', upload.fields([]), (req, res)=>{
    if(!req.body){
        return res.sendStatus(500)
    }else{
        console.log('formData :', req.body);
        const newListeMovies = { newTitreAjoute : req.body.titleMovies}
        listeMovies = [...listeMovies, newListeMovies]
        res.sendStatus(201)
    }
})
// -------------FIN POST AVEC MULATER---------------------------





//ce route spécialisé doit etre mis avant le route génériques qui est le route: /movies/:id
app.get("/movies/add", (req, res) => {
    res.send("<h2>Ajout d'un film disponible prochainement</h2>") 
})


app.get("/movies/:id/:title", (req, res)=>{
    const monId= req.params.id
    const title = req.params.title
    res.render("movie-details", {movieId:monId, movieTitle: title})
})

app.listen(PORT, ()=>{
    console.log(`connexion etablieur sur ${PORT}`);
})