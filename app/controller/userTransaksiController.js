const { UserTransaksi, Reservasi, User } = require("../models");
const apiError = require("../../utils/apiError");

const getUserTransaksi = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userTransaksi = await UserTransaksi.findByPk(id, {
      include: [
        { model: Reservasi, as: "reservasi" },
        { model: User, as: "user" },
      ],
    });
    if (!userTransaksi) {
      return next(new apiError("User transaksi not found", 404));
    }
    res.status(200).json({
      status: "Get user transaksi successful",
      data: userTransaksi,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const deleteUserTransaksi = async (req, res, next) => {
  const { id } = req.params;
  try {
    const userTransaksi = await UserTransaksi.findByPk(id);
    if (!userTransaksi) {
      return next(new apiError("User transaksi not found", 404));
    }
    await userTransaksi.destroy();
    res.status(204).json({
      status: "Delete user transaksi successful",
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

const updateUserTransaksi = async (req, res, next) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const userTransaksi = await UserTransaksi.findByPk(id);
    if (!userTransaksi) {
      return next(new apiError("User transaksi not found", 404));
    }

    const reservasi = await Reservasi.findByPk(userTransaksi.id_reservasi);
    if (!reservasi) {
      return next(new apiError("Reservasi not found", 404));
    }

    const user = await User.findByPk(userTransaksi.id_user);
    if (!user) {
      return next(new apiError("User not found", 404));
    }

    const currentTime = new Date();
    const transactionTime = new Date(userTransaksi.createdAt);
    const timeDifference = (currentTime - transactionTime) / (1000 * 60); // Time difference in minutes

    if (timeDifference > 5) {
      userTransaksi.status = "cancel";
      await userTransaksi.save();
      return res.status(200).json({
        status: "User transaksi updated",
        message: "Payment time exceeded, status set to cancel",
        data: userTransaksi,
      });
    }

    if (status === "pending" || status === "cancel") {
      userTransaksi.status = status;
    } else if (status === "success") {
      if (user.saldo_user >= reservasi.total_price) {
        user.saldo_user -= reservasi.total_price;
        userTransaksi.status = "success";
        await user.save();
      } else {
        return res.status(400).json({
          status: "User transaksi not updated",
          message: "Insufficient balance, payment failed",
          data: userTransaksi,
        });
      }
    }

    await userTransaksi.save();
    res.status(200).json({
      status: "User transaksi updated",
      data: userTransaksi,
    });
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

module.exports = {
  getUserTransaksi,
  updateUserTransaksi,
  deleteUserTransaksi,
};
