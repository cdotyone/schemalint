const renameField = {
  name: 'rename-field',
  docs: {
    description: 'field has should be renamed',
    url: '...',
  },
  process({ options, schemaObject, report }) {
    const validator = ({ tags, columns, name: tableName }) => {
      const needsColumns = options.filter((o) => o.indexOf(":") > 0);

      needsColumns.forEach((o) => {
        const parts = o.split(':');
        //if (parts.length < 2) return;
        const columnName = parts[0];

        const matches = columns.filter((c) => c.name === columnName);
        if (matches.length > 0) {
          report({
            rule: this.name,
            identifier: `${schemaObject.name}.${tableName}`,
            message: `Column ${columnName} in table ${tableName} should be named ${parts[1]}, which doesn't follow the convention.`,
            suggestedMigration: `ALTER TABLE ${tableName} change ${columnName} ${parts[1]};`,
          });
        }

      });
    };
    schemaObject.tables.forEach(validator);
  },
};

module.exports = renameField;
