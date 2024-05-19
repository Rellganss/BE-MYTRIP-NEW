const {
  UserTransaksi,
  Reservasi,
  User,
  HotelFacility,
  Pesawat,
} = require("../models");
const apiError = require("../../utils/apiError");

const getUserTransaksi = async (req, res, next) => {
  try {
    const userTransaksi = await UserTransaksi.findAll({
      where: { id_user: req.user.id },
      include: [
        { model: Reservasi, as: "reservasi" },
        { model: User, as: "user" },
      ],
    });

    if (!userTransaksi || userTransaksi.length === 0) {
      return next(new ApiError("User transaksi not found", 404));
    }

    res.status(200).json({
      status: "Get user transaksi successful",
      data: userTransaksi,
    });
  } catch (err) {
    next(new ApiError(err.message, 500));
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
      await userTransaksi.save();
      return res.status(200).json({
        status: "User transaksi updated",
        data: userTransaksi,
      });
    }

    if (status === "success") {
      if (user.saldo_user >= reservasi.total_price) {
        user.saldo_user -= reservasi.total_price;
        userTransaksi.status = "success";
        await user.save();
        await userTransaksi.save();

        if (reservasi.id_pesawat) {
          const pesawat = await Pesawat.findByPk(reservasi.id_pesawat);
          const pesawatOwner = await User.findByPk(pesawat.id_user);
          pesawatOwner.saldo_user += pesawat.pesawat_harga;
          await pesawatOwner.save();
        }

        if (reservasi.id_hotel_facility) {
          const hotelFacility = await HotelFacility.findByPk(
            reservasi.id_hotel_facility
          );
          const hotelFacilityOwner = await User.findByPk(hotelFacility.id_user);
          hotelFacilityOwner.saldo_user += hotelFacility.hotel_harga; // Assuming hotel_harga is the price of the hotel facility
          await hotelFacilityOwner.save();
        }

        return res.status(200).json({
          status: "User transaksi updated",
          data: userTransaksi,
        });
      } else {
        return res.status(400).json({
          status: "User transaksi not updated",
          message: "Insufficient balance, payment failed",
          data: userTransaksi,
        });
      }
    }

    return next(new apiError("Invalid status", 400));
  } catch (err) {
    next(new apiError(err.message, 500));
  }
};

module.exports = {
  getUserTransaksi,
  updateUserTransaksi,
  deleteUserTransaksi,
};
