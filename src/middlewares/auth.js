const express = require('express');

const auth = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
};

 // autenticación
 function isAuthenticated() {
s
    return false;
}

document.getElementById('profiles-link').addEventListener('click', function(event) {
    if (!isAuthenticated()) {
        event.preventDefault();
        var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    } else {
        window.location.href = '/views/profiles.html';
    }
});

document.getElementById('chats-link').addEventListener('click', function(event) {
    if (!isAuthenticated()) {
        event.preventDefault();
        var loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
        loginModal.show();
    } else {
        window.location.href = '/views/chat.html';
    }
});

module.exports = auth;