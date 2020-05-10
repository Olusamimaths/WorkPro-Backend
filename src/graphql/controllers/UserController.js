import User from '../../models/UserModel';
import Response from '../helpers/Response';

/**
 *
 * class User Methods
 */

class UserMethod {
  /**
   *
   * @param {string} email the user email
   * @param {string} password the user password
   */
  static async signup(email, password) {
    // check if user exists
    const foundUser = await User.findOne({ email });

    if (foundUser) return Response('Already exists', 404, 'User with the provided email already exists');

    const user = new User({
      password,
      email,
    });

    try {
      const savedUser = await user.save();
      if (savedUser) {
        const token = savedUser.generateToken();
        const userObj = { ...savedUser._doc, token };
        // delete the password
        delete userObj.password;
        return Response('Created', 201, 'User account created', userObj);
      }
      return Response('Bad Request', 400, 'User account could not be created');
    } catch (error) {
      console.log(error);
    }
    return Response('Internal Server Error', 500, 'Something went wrong.');
  }

  /**
   *
   * @param {string} email the user email
   * @param {string} password the user password
   */
  static async signin(email, password) {
    try {
      const user = await User.findOne({ email });
      if (!user) return Response('Not found', 404, 'User not found.');

      // authenticate
      const authenticated = user.comparePassword(password);
      if (authenticated) {
        // generate token
        const token = user.generateToken();
        const userObj = { ...user._doc, token };
        // delete password
        delete userObj.password;
        return Response('Auth Successfully', 200, 'Authentication successful for this user', userObj);
      }
      return Response('Auth failed', 500, 'Authentication failed for this user.');
    } catch (error) {
      console.log(error);
      return Response('Server error', 500, 'Internal server error.');
    }
  }

  /**
   * This section contains
   * Internal methods that are not directly exposed to the user
   */
  /**
   * Gets a user by id
   * @param {UserId} _id the id of the user to get
   * @param {User} User returns the user
   */
  static async get(_id) {
    try {
      const user = await User.findById({ _id });
      const userObj = { ...user._doc };
      delete userObj.password;
      return { ...userObj, status: 200, error: [] };
    } catch (error) {
      console.log(error);
      return {};
    }
  }
}

export default UserMethod;
