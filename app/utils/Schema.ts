export function constructSchema(fields: { type: string; name: string }[]) {
  // Ensure the input is an array of objects with 'type' and 'name' properties
  if (
    !Array.isArray(fields) ||
    !fields.every(
      (field) => typeof field === "object" && field.type && field.name
    )
  ) {
    throw new Error(
      'Invalid input format. Expected an array of objects with "type" and "name" properties.'
    );
  }

  // Map each field object to a string "type name" and join them with a comma and space
  const schema = fields
    .map((field) => `${field.type} ${field.name}`)
    .join(", ");
  return schema;
}

export function prepareDataForEncoding(
  schemaString: string,
  values: Record<string, any>
) {
  // Split the schema string into individual field definitions
  const fields = schemaString.split(", ").map((field) => {
    const [type, name] = field.split(" ");
    return { type, name };
  });

  // Map each field definition to the required format for encoding
  const encodedData = fields.map(({ name, type }) => {
    // Check if the value for the field is provided
    if (values.hasOwnProperty(name)) {
      return {
        name,
        value: values[name],
        type,
      };
    } else {
      throw new Error(`Value for field "${name}" is not provided.`);
    }
  });

  return encodedData;
}

// Example usage:
const schema =
  "bytes32 ProjectID, address Freelancer, address Client, bool isCompleted";
const projectValues = {
  ProjectID: "1",
  Freelancer: "0xFreelancerAddress",
  Client: "0xClientAddress",
  isCompleted: "false",
};

const encodedData = prepareDataForEncoding(schema, projectValues);
console.log(encodedData);
