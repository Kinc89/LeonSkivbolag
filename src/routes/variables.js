// routes variables
const ROUTE = {
    root: '/',
    admin: '/admin',
    album: '/album/:id',
    addAlbum: '/add-album',
    signup: '/signup',
    login: '/login',
    addToCart: '/addToCart/:id',
    userProfile: '/userProfile',
    cart: '/cart',
    checkout: '/checkout',
    confirmation: '/confirmation'
};

// view variables
const VIEW = {
    root: 'main',
    admin: 'admin',
    album: 'album',
    addAlbum: 'add-album',
    signup: 'signup',
    login: 'login',
    userProfile: 'user-profile',
    cart: 'cart',
    checkout: 'checkout',
    confirmation: 'confirmation'
};

module.exports = { ROUTE, VIEW };