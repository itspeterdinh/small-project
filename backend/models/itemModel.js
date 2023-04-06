const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Item must belong to a user'],
  },
  title: {
    type: String,
    required: [true, 'An item must have a title'],
    trim: true,
    maxlength: [30, 'An item name must have less or equal than 30 characters'],
    minlength: [6, 'An item name must have more or equal than 6 characters'],
  },
  description: {
    type: String,
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'A product must have a price'],
  },
  quantity: {
    type: Number,
    integer: true,
    default: 1,
  },
  images: [String],
  location: {
    type: {
      type: String,
      default: 'Point',
      enum: ['Point'],
    },
    coordinates: [Number],
    address: String,
    description: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// itemSchema.pre('save', function (next) {
//   this.slug = slugify(this.name, { lower: true });
//   next();
// });

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
