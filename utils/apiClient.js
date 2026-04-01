export function createAccount(request, userData) {
    return request.post('/api/createAccount', {
        form: userData
    });
}

export function getUserDetailByEmail(request, email) {
    return request.get('/api/getUserDetailByEmail', {
        params: { email }
    });
}

export function updateAccount(request, userData) {
    return request.put('/api/updateAccount', {
            form: userData
        });
}

export function deleteAccount(request, { email, password }) {
    return request.delete('/api/deleteAccount', {
        form: {
            email,
            password
        }
    });
}

export function verifyLogin(request, credentials = {}) {
    return request.post('/api/verifyLogin', {
            form: credentials
        });
}

export function verifyUnsupportedLogin(request) {
    return request.delete('/api/verifyLogin');
}

export function searchProduct(request, searchTerm) {
    if (searchTerm === undefined) {
        return request.post('/api/searchProduct');
    }
    return request.post('/api/searchProduct', {
        form: {
            search_product: searchTerm
        }
    });
}