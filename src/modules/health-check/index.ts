import Elysia from "elysia";

export const hcApp = new Elysia({name: "health-check"}).get('/hc', () => {
    
    return 'OK';
});