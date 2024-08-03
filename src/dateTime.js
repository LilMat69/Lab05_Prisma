import { GraphQLScalarType, Kind } from 'graphql';
export const DateTime = new GraphQLScalarType({
    name: 'DateTime',
    description: 'A valid date time value',
    serialize(value) {
      // Convierte el valor de la base de datos a un formato legible
      return value instanceof Date ? value.toISOString() : null;
    },
    parseValue(value) {
      // Convierte el valor del cliente a un objeto Date
      return new Date(value);
    },
    parseLiteral(ast) {
      // Convierte el valor literal del cliente a un objeto Date
      return ast.kind === Kind.STRING ? new Date(ast.value) : null;
    },
  });
