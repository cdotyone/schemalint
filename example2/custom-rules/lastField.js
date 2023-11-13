// This example rule will enforce primary key columns be named like this: tablename_id

const lastField = {
  name: 'last-field',
  docs: {
    description: 'field is last',
    url: '...',
  },
  process({ options, schemaObject, report }) {
    const validator = ({ tags, columns, name: tableName }) => {
      let columnName = options.filter((o) => o !== "error")[0];
      const parts = columnName.split(':');
      columnName = parts[0];
      const requiredColumn = columns.filter((o) => o.name === columnName);
      const lastColumn = columns[columns.length - 1];
      if (lastColumn.name !== columnName && requiredColumn.length > 0) {
        report({
          rule: this.name,
          identifier: `${schemaObject.name}.${tableName}`,
          message: `Column ${columnName} in table ${tableName} should be the last field by convention.`,
          suggestedMigration: `ALTER TABLE ${tableName} modify ${columnName} ${parts[1]} after ${lastColumn.name};`
        });
      }
    };
    schemaObject.tables.forEach(validator);
  },
};

module.exports = lastField;
