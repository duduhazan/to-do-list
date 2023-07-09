import Joi from "joi";

export default function validateTask(task) {
  const schemaOfTask = Joi.object({
    name: Joi.string().required(),
    destinationDate: Joi.required(),
  });

  return schemaOfTask.validate(task);
}
