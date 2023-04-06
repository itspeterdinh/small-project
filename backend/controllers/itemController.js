// const multer = require('multer');
// const sharp = require('sharp');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Item = require('./../models/itemModel');

// const multerStorage = multer.memoryStorage();
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith('image')) {
//     cb(null, true);
//   } else {
//     cb(new AppError('Not an image!! Please upload another file', 400), false);
//   }
// };
// const upload = multer({
//   storage: multerStorage,
//   fileFilter: multerFilter,
// });

// exports.uploadItemPhoto = upload.fields([
//   {
//     name: 'images',
//     maxCount: 5,
//   },
// ]);

// exports.resizeItemPhoto = catchAsync(async (req, res, next) => {
//   if (!req.files.images) return next();

//   req.body.images = [];
//   await Promise.all(
//     req.files.images.map(async (file, i) => {
//       const filename = `item-${req.params.id}-${Date.now()}-${i + 1}.jpeg`;
//       await sharp(req.files.images[i].buffer)
//         .resize(2000, 1333)
//         .toFormat('jpeg')
//         .jpeg({ quality: 90 })
//         .toFile(`public/img/${filename}`);
//       req.body.images.push(filename);
//     })
//   );

//   next();
// });

exports.getAll = catchAsync(async (req, res, next) => {
  const items = await Item.find();

  res.status(200).json({
    status: 'success',
    results: items.length,
    data: {
      items,
    },
  });
});

exports.getItem = catchAsync(async (req, res, next) => {
  const item = await Item.findById(req.params.id);

  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
});

exports.createItem = catchAsync(async (req, res, next) => {
  const newItem = await Item.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      newItem,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) {
    return next(new AppError('No item found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.updateItem = catchAsync(async (req, res, next) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      item,
    },
  });
});
