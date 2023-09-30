const mongoose = require("mongoose");

const vacancySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
});

vacancySchema.statics.addVacancy = async function (
  title,
  description,
  deadline
) {
  const vacancy = await this.create({
    title,
    description,
    deadline,
  });

  return vacancy;
};

const Vacancy = mongoose.model("Vacancies", vacancySchema);

module.exports = Vacancy;
