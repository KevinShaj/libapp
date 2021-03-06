var express = require('express');
var app = express();
var signupRouter = require('./src/routes/signupRoutes');
var loginRouter = require('./src/routes/loginRoutes');
const port = process.env.PORT || 2000;


var navb = [ 
    {
        link: '/home', name: 'Home'
    },
    {
        link: '/books', name: 'Books'
    }, 
    {
        link: '/authors', name: 'Authors'
    },
    {
        link: '/newbook', name: 'Add new book'
    },
    {
        link: '/', name: 'Sign out'
    }
];

var booksRouter = require('./src/routes/bookRoutes')(navb);
var authorsRouter = require('./src/routes/authorRoutes')(navb);
var newbookRouter = require('./src/routes/addnewbookRoutes')(navb);







app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views','./src/views');
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/newbook', newbookRouter);
app.use('/signup', signupRouter);
app.use('/login', loginRouter);

app.get('/', function(req,res){

    res.render("index", { 
        navb1 : [ 
            {    
                link: '/signup', name: 'Signup'
            },
            {
                link: '/login', name: 'Login'
            },
            
        ],
        title : 'Digital Library',
        img : 'library1.jpg'

    });
});

app.get('/home', function(req,res){

    res.render("home", { 
        navb,
        title : 'Library APP',
        img : 'library1.jpg'

    });
});
app.listen(port, ()=>{console.log("Server running at " + port)});
