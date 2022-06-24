const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const PersonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    cpf: {
      type: String,
      required: true,
      unique: true
    },
    birthDay: {
      type: Date,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      select: false
    },
    canDrive: {
      type: String,
      required: true,
      enum: {
        values: ['yes', 'no']
      }
    }
  },
  { timestamps: false, versionKey: false }
);

PersonSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;

  next();
});

const Person = mongoose.model('Person', PersonSchema);

module.exports = Person;
