// This example rule will enforce primary key columns be named like this: tablename_id

const requiredField = {
  name: 'required-field',
  docs: {
    description: 'has required field',
    url: '...',
  },
  process({ options, schemaObject, report }) {
    const validator = ({ tags, columns, name: tableName }) => {
      const needsColumns = options.filter((o) => o.indexOf(":") > 0);

      needsColumns.forEach((o) => {
        const parts = o.split(':');
        const columnName = parts[0];

        const matches = columns.filter((c) => c.name === columnName);
        if (matches.length === 0) {
          report({
            rule: this.name,
            identifier: `${schemaObject.name}.${tableName}`,
            message: `Table ${tableName} is missing column ${columnName} which doesn't follow the convention.`,
            suggestedMigration: `ALTER TABLE ${tableName} ADD ${columnName} ${parts[1]};`,
          });
        }

      });
    };
    schemaObject.tables.forEach(validator);
  },
};

module.exports = requiredField;
