const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { auth, user } = require("../models");

const apiError = require("../../utils/apiError");

const register = async (req, res, next) => {
  try {
    const { name, email, no_telp, password } = req.body;

    const usercek = await auth.findOne({
      where: {
        email,
      },
    });
    if (usercek) {
      return next(new apiError("User email already taken", 400));
    }

    const passwordLength = password.length < 8;
    if (passwordLength) {
      return next(new apiError("Minimum password must be 8 characters", 400));
    }

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const newUser = await user.create({
      name,
      no_telp,
    });

    await auth.create({
      email,
      password: hashedPassword,
      id_user: newUser.id,
      verified: true,
    });

    res.status(200).json({
      status: "Register successful",
      data: {
        email,
        ...newUser,
      },
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await auth.findOne({
      where: {
        email,
      },
      include: ["user"],
    });

    if (!user) {
      return next(new apiError("Email not found", 404));
    }
    if (user.verified !== true) {
      return next(new apiError("User not verified", 401));
    }

    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign(
        {
          id: user.userId,
          username: user.user.name,
          role: user.user.role,
          email: user.email,
        },
        process.env.JWT_SECRET
      );

      res.status(200).json({
        status: "Success",
        message: "Login successful",
        data: token,
      });
    } else {
      return next(new apiError("Incorrect password", 401));
    }
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const topUp = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const { amount } = req.body;

    if (!userId || isNaN(amount) || amount <= 0) {
      return next(new apiError("Invalid input", 400));
    }

    const existingUser = await user.findByPk(userId);

    if (!existingUser) {
      return next(new apiError("User not found", 404));
    }

    existingUser.saldo_user = (existingUser.saldo_user || 0) + amount;
    await existingUser.save();

    res.status(200).json({
      status: "Success",
      message: `Top up successful. New balance: ${existingUser.saldo_user}`,
      data: {
        userId: existingUser.id,
        saldo_user: existingUser.saldo_user,
      },
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

module.exports = {
  register,
  login,
  topUp
};
