const fieldType = {
  name: 'field-type',
  docs: {
    description: 'field is of type',
    url: '...',
  },
  process({ options, schemaObject, report }) {
    const validator = ({ tags, columns, name: tableName }) => {
      const needsColumns = options.filter((o) => o.indexOf(":") > 0);

      needsColumns.forEach((o) => {
        const parts = o.split(':');
        if (parts.length < 3) return;
        const columnName = parts[0];
        parts[1] = parts[1].toUpperCase();

        const matches = columns.filter((c) => c.name === columnName);
        if (matches.length > 0 && matches[0].sqltype.toUpperCase() !== parts[1]) {
          report({
            rule: this.name,
            identifier: `${schemaObject.name}.${tableName}`,
            message: `Column ${columnName} in table ${tableName} is is wrong type, which doesn't follow the convention.`,
            suggestedMigration: `ALTER TABLE ${tableName} modify ${columnName} ${parts[2]};`,
          });
        }

      });
    };
    schemaObject.tables.forEach(validator);
  },
};

module.exports = fieldType;
