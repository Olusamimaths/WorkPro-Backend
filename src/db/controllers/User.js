import User from '../models/User'

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
    static async signup({password, email }) {
        // check if user exists
        const foundUser = await User.findOne({email, })

        if(foundUser) return {};

        const user = new User({
            password,
            email
        })

        try {
            const response = await user.save()
            if (response) {
                const token = response.generateToken()
                const userObj = { ...response._doc }
                // delete the password
                delete userObj.password
                return userObj ? { ...userObj, token } : {}
            } else {
                return {
                    error: 'An error occured.'
                }
            }
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
            const user = await User.findById({ _id })
            const userObj = { ...user._doc }
            delete userObj.password
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
    static async signin({ email, password }) {
        try {
            const user = await User.findOne({ email })
            if(!user) return {};

            // authenticate
            const authenticated = user.comparePassword(password)
            if (authenticated) {
                // generate token
                const token = user.generateToken()
                const userObj = { ...user._doc }
                // delete password
                delete userObj.password
                return { ...userObj, token }
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
            response ? response : {}
        } catch (error) {
            console.log(e)
        }
    }
}

export default UserMethod
