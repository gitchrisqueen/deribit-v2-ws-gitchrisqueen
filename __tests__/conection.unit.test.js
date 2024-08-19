/*
 * Copyright (c) 2020. Christopher Queen Consulting LLC (http://www.ChristopherQueenConsulting.com/)
 */

//'use strict'

const Connection = require('../connection');

jest.mock('../connection');

let con;

jest.setTimeout(10000); // 10 seconds

beforeAll(() => {

    const key = 'xxxxx';
    const secret = 'yyyyy';
    const domain = 'test.deribit.com';
    const debug = false;

    // Mock the constructor
    Connection.mockImplementation(() => {
        return {
            connected: false,
            authenticated: false,
            connect: jest.fn().mockImplementation(function() {
                this.connected = true;
                this.authenticate()
                return Promise.resolve(true);
            }),
            authenticate: jest.fn().mockImplementation(function() {
                this.authenticated = true;
                return Promise.resolve(true);
            }),
            end: jest.fn().mockResolvedValue(true),
            token: 'mockToken',
            refreshToken: 'mockRefreshToken'
        };
    });

    con = new Connection({key, secret, domain, debug});

});

afterAll(() => {
    return con.end();
});

describe('constructor()', () => {

    test('expects property connected = true', () => {
        expect(con).toHaveProperty('connected', false);
    });

    test('expects property authenticated = false', () => {
        expect(con).toHaveProperty('authenticated', false);
    });

});


describe('connect()', () => {
    beforeAll(() => {
        con.connect();
    });

    test('expects property connected = true', () => {
        expect(con).toHaveProperty('connected', true);
    });
    test('expects property token', () => {
        expect(con).toHaveProperty('token');
    });
    test('expects property refreshToken', () => {
        expect(con).toHaveProperty('refreshToken');
    });
    test('expects property authenticated = true', () => {
        expect(con).toHaveProperty('authenticated', true);
    });

});

