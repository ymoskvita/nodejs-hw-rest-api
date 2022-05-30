const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");


const { User } = require("../../models");

const updateAvatar = async (req, res) => {
    const { path: tempUpload, originalname } = req.file;
    const { _id } = req.user;
    const imageName = `${_id}_${originalname}`;

     Jimp.read(`${tempUpload}`, (err, img) => {
      if (err) throw err;
        img.resize(256, 256).write(`${tempUpload}`)
    });
  try {
    const resultUpload = path.join(__dirname, "../../", "public", "avatars", imageName);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("public", "avatars", imageName);
      await User.findByIdAndUpdate(req.user._id, { avatarUrl });
      res.json({ avatarUrl });
  } catch (error) {
      await fs.unlink(tempUpload);
      throw error;
  }
}

module.exports = updateAvatar;
