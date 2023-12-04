import express from "express";
import multer from "multer";

const app = express();
const port = 4000;

const multerUpload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 1 },
});
const fileUpload = multerUpload.fields([{ name: "file" }]);

app.post("/upload", fileUpload, (req, res) => {
  if (!req.files || !req.files.file) {
    return res.status(422).json({ error: "Please select a file" });
  }

  const file = req.files.file[0];

  const originalName = file.originalname;
  const size = file.size / (1024 * 1024);
  const extension = originalName.split(".").pop();

  return res.status(200).json({
    fileName: `${originalName}`,
    size: `${size.toFixed(2)} MB`,
    extension: `${extension}`,
  });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
