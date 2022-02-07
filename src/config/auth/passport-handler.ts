import * as dotenv from 'dotenv';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportJwt from 'passport-jwt';
import UserRepository from '../../repositories/user-repository';

const LocalStrategy = passportLocal.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const userRepository = new UserRepository();

passport.use(new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {        
        const user = await userRepository.authenticate(username, password);

        if (!user) {
            return done(null, false);
        }

        return done(null, user);
    }
));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
}, (jwtToken, done) => {
    console.log("On jwt strategy is called ...");
    console.log(jwtToken);
    
    // userRepository.findOne({ username: jwtToken.username }, (err: Error, user: any) => {
    //     if (err) return done(err, false);

    //     if (user) {
            return done(null, jwtToken); // user,
    //     } else {
            // return done(null, false);
    //     }
    // });
}));