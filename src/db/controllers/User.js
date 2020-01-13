import User from '../models/User';
import mongoose from 'mongoose';

/**
 *
 * class User Methods
 */

class UserMethod {
    /**
     *
     * @param {object} userDetails the details of the user to save
     * @returns {object} the saved user
     */
    static async signup({ username, password, email }) {
        const user = new User({
            username,
            password,
            email
        })

        try {
            const response = await user.save();
            const userObj = {...response._doc}

            // delete the password
            delete userObj.password;
            
            return userObj ? userObj : {};
        } catch (error) {
            console.log(error)
        }
    }

    /**
     * Gets a user by id
     * @param {UserId} _id the id of the user to get
     * @param {User} User returns the user
     */
    static async get(_id) {
        try {
            const user = await User.findById({_id,});
            const userObj = {...user._doc};
            delete userObj.password;
            return userObj
        
        } catch (error) {
            console.log(error)
            return {
                error: 'User not found'
            }
        }
    }

    /**
     * 
     * @param {object} userDetails the id of the user to get
     * @param {User} User returns the user
     */
    static async signin({username, password}) {
        try {
            const user = await User.findOne({username,});
            const hash = user.password;

            const authenticated = user.comparePassword(password, hash);
            console.log(user)

            if(authenticated) {
                const userObj = {...user._doc};
                delete userObj.password;
                return userObj;
            } else {
                return {
                    error: 'Auth failed'
                }
            }
        } catch (error) {
            console.log(error)
            return {
                error: 'User not found'
            }
        }
    }

    /**
     * Removes a user with the provided Id
     * @param {UserId} _id the id of the user to remove
     * @param {}
     */
    static async remove(_id) {
        try {
            const response = await User.findByIdAndDelete(_id)
            response ? response : {}; 
        } catch (error) {
            console.log(e)
        }
        
        
    }
}

export default UserMethod
